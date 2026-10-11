import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ChakraProvider } from "@chakra-ui/react";
import { MemoryRouter } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";
import { App } from "@/App";
import { ContentProvider } from "@/content/context";
import { FALLBACK_ENVELOPE } from "@/content/fallback";
import { contactVCard, shareDevCard } from "@/lib/contact";
import { publicWorkUrl, WORK_COMPANIES, workCompanyForPath, type WorkCompany, type WorkCompanyId } from "@/lib/work";
import { WorkPage } from "@/pages/WorkPage";
import { WorkIndexPage } from "@/pages/WorkIndexPage";
import { system } from "@/theme";
import worker, { metaForPath } from "../worker/index";

afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

function renderCard(companyId: WorkCompanyId) {
  return renderToStaticMarkup(createElement(MemoryRouter, { initialEntries: [WORK_COMPANIES[companyId].path] },
    createElement(ChakraProvider, { value: system, children: createElement(ContentProvider, { children: createElement(WorkPage, { companyId }) }) })));
}

describe("tarjetas laborales", () => {
  it.each(["agromaf", "nieto", "pachas", "wasky"] as const)("muestra contacto y materiales propios de %s", (id) => {
    const company: WorkCompany = WORK_COMPANIES[id];
    const html = renderCard(id);
    for (const email of [company.email, company.systemsEmail, company.marketingEmail].filter(Boolean)) expect(html).toContain(`href="mailto:${email}"`);
    if (company.website) expect(html).toContain(company.website);
    expect(html).toContain(company.name);
    expect(html).toContain(company.role);
    expect(html).toContain(company.subtitle);
    expect(html).toContain(company.period);
    expect(html).toContain('href="/work"');
    expect(html).toContain(company.portrait.src);
    expect(html).toContain("Guardar contacto");
    expect(html).toContain("Compartir tarjeta");
    expect(html).toContain("<summary>Mostrar QR</summary>");
    const smallPortrait = company.portrait.srcSet.split(",")[0].trim().split(" ")[0];
    for (const asset of [company.logo, company.darkLogo, company.portrait.src, smallPortrait, `/assets/images/portfolio/work-qr-${id}.png`]) {
      expect(existsSync(resolve("public", asset.slice(1)))).toBe(true);
    }
    if (company.current) expect(html).not.toContain("dev@velaarturo.com");
    expect(html).not.toContain('class="site-footer"');
  });

  it("reserva espacio y anuncia carga de imágenes sin retrasar los contactos", () => {
    const html = renderCard("agromaf");
    expect(html.match(/aria-busy="true"/g)).toHaveLength(2);
    expect(html).toContain('width="1086" height="1448"');
    expect(html).toContain('fetchPriority="high"');
    expect(html).toContain('srcSet="');
    expect(html).toContain("480w");
    expect(html).toContain("Cargando imagen…");
    expect(html).toContain('href="mailto:arturo.vela@agromaf.pe"');
  });

  it("añade marketing y trabajo desplegable solo a Nieto Import", () => {
    const html = renderCard("nieto");
    expect(html).toContain('href="mailto:marketing@nietoimport.com"');
    expect(html).toContain('<details class="work-contributions">');
    expect(html).not.toContain('<details class="work-contributions" open');
    for (const project of WORK_COMPANIES.nieto.projects) {
      expect(html).toContain(`href="${project.url}"`);
      expect(html).toContain(project.description);
    }
    expect(html).toContain("Apoyo en TikTok, Facebook e Instagram.");
    const agromaf = renderCard("agromaf");
    expect(agromaf).not.toContain("work-contributions");
    expect(agromaf).not.toContain("marketing@nietoimport.com");
  });

  it("muestra las 11 actividades de marketing de Nieto con fechas descendentes y roles", () => {
    const html = renderCard("nieto");
    const activities = WORK_COMPANIES.nieto.marketingActivities;
    const dates = ["2026-09-18", "2026-09-01", "2026-08-22", "2026-07-05", "2026-02-11", "2025-12-18", "2025-12-14", "2025-11-29", "2025-11-21", "2025-10-20", "2025-09-03"];
    expect(activities).toHaveLength(11);
    expect([...html.matchAll(/<time dateTime="([^"]+)">([^<]+)<\/time>/g)].map(match => [match[1], match[2]]))
      .toEqual(dates.map(date => [date, date.split("-").reverse().join("/")]));
    for (const activity of activities) {
      expect(html).toContain(`<strong>${activity.title}</strong><span>${activity.role}</span>`);
    }
    expect(activities.filter(activity => activity.role === "Responsable").map(activity => activity.title))
      .toEqual(["Campaña de mantenimiento 2026", "Chocolatada Nueva Cajamarca", "Chocolatada Tarapoto", "I ExpoAgro"]);
    expect(renderCard("agromaf")).not.toContain("Actividades de marketing");
  });

  it.each(["/work/agromaf", "/work/nieto/", "/work/pachas", "/work/wasky/"])("sirve %s con canonical laboral y sin indexación", (path) => {
    const company = workCompanyForPath(path)!;
    expect(company).toBeDefined();
    const meta = metaForPath(path, FALLBACK_ENVELOPE.data, "https://velaarturo.com");
    expect(meta).toMatchObject({ status: 200, canonicalPath: company.path, noindex: true });
    expect(meta.title).toContain(company.name);
    expect(meta.image).toBe(`https://velaarturo.com${company.portrait.src}`);
    expect(meta).toMatchObject({ imageWidth: company.portrait.width, imageHeight: company.portrait.height });
    expect(meta.structuredData).toMatchObject({ email: company.email, jobTitle: company.role });
    if (company.current) expect(meta.structuredData).toMatchObject({ worksFor: { name: company.name, url: company.website } });
    else {
      expect(meta.structuredData).not.toHaveProperty("worksFor");
      expect(meta.structuredData).toMatchObject({ affiliation: { name: company.name } });
      expect(meta.structuredData.affiliation).not.toHaveProperty("url");
    }
    expect(metaForPath(path, FALLBACK_ENVELOPE.data, "https://velaarturo.com", true).noindex).toBe(true);
  });

  it("mantiene 404 para empresas y subrutas desconocidas", () => {
    for (const path of ["/work/otra", "/work/nieto/privado", "/work/agromaf-extra", "/work/constructor"]) {
      expect(workCompanyForPath(path)).toBeUndefined();
      expect(metaForPath(path, FALLBACK_ENVELOPE.data, "https://velaarturo.com").status).toBe(404);
    }
  });

  it.each(["/work/agromaf", "/work/nieto/", "/work/pachas/", "/work/wasky", "/__preview?path=%2Fwork%2Fnieto&token=private-preview", "/__preview?path=%2Fwork%2Fpachas&token=private-preview", "/__preview?path=%2Fwork%2Fwasky&token=private-preview"])("omite shell completo también en %s", (path) => {
    const html = renderToStaticMarkup(createElement(MemoryRouter, { initialEntries: [path] },
      createElement(ChakraProvider, { value: system, children: createElement(App) })));
    expect(html).not.toContain('class="site-footer"');
    expect(html).not.toContain("Abrir navegación");
    expect(html).not.toContain("portfolio_locale");
  });

  it("excluye listado y tarjetas del sitemap público", async () => {
    vi.stubGlobal("caches", { default: { match: vi.fn(), put: vi.fn() } });
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const env = { SITE_KEY: "velaarturo", CANONICAL_ORIGIN: "https://velaarturo.com", BRAIN: { fetch: vi.fn() } } as unknown as Env;
    const ctx = { waitUntil: vi.fn(), passThroughOnException: vi.fn() } as unknown as ExecutionContext;
    const response = await worker.fetch(new Request("https://velaarturo.com/sitemap.xml") as never, env, ctx);
    expect(response.status).toBe(200);
    const xml = await response.text();
    expect(xml).toContain("https://velaarturo.com/dev");
    expect(xml).not.toContain("/work/");
    expect(xml).not.toContain("https://velaarturo.com/work<");
  });

  it.each(["agromaf", "nieto", "pachas", "wasky"] as const)("guarda VCF de %s con empresa y correos confirmados", (id) => {
    const company: WorkCompany = WORK_COMPANIES[id];
    const card = contactVCard({ name: "Arturo Vela", email: company.email }, "es", {
      organization: company.name, title: company.role, alternateEmail: company.systemsEmail, url: publicWorkUrl(company),
      additionalEmails: company.marketingEmail ? [company.marketingEmail] : undefined,
    });
    expect(card).toContain(`EMAIL:${company.email}\r\n`);
    if (company.systemsEmail) expect(card).toContain(`EMAIL;TYPE=WORK:${company.systemsEmail}\r\n`);
    if (company.marketingEmail) expect(card).toContain(`EMAIL;TYPE=WORK:${company.marketingEmail}\r\n`);
    expect(card).toContain(`ORG:${company.name}\r\n`);
    expect(card).toContain(`TITLE:${company.role}\r\n`);
    expect(card).toContain(`URL:${publicWorkUrl(company)}\r\n`);
    expect(card).not.toContain("/dev");
    expect(card).not.toMatch(/^TEL:|^PHOTO:/m);
    expect(card).not.toContain("undefined");
    expect(card.match(/^EMAIL/gm)).toHaveLength([company.email, company.systemsEmail, company.marketingEmail].filter(Boolean).length);
  });

  it.each(["pachas", "wasky"] as const)("presenta %s como experiencia anterior sin inventar contactos empresariales", (id) => {
    const html = renderCard(id);
    expect(html).toContain("Experiencia anterior");
    expect(html).toContain("Correo personal profesional");
    expect(html).toContain('href="mailto:dev@velaarturo.com"');
    expect(html).toContain("Desarrollador Web");
    expect(html).toContain("3 meses");
    expect(html).not.toContain("Web de la empresa");
    expect(html).not.toContain("Correo de Sistemas");
    expect(html).not.toContain("Correo de Marketing");
    expect(html).not.toContain("pachascaffe.pe");
    for (const item of WORK_COMPANIES[id].contributions) expect(html).toContain(item);
  });

  it("lista cuatro tarjetas con periodos y conserva shell y footer Work", () => {
    const html = renderToStaticMarkup(createElement(MemoryRouter, { initialEntries: ["/work"] },
      createElement(ChakraProvider, { value: system, children: createElement(ContentProvider, { children: createElement(WorkIndexPage) }) })));
    for (const company of Object.values(WORK_COMPANIES)) {
      expect(html).toContain(`href="${company.path}"`);
      expect(html).toContain(company.period);
    }
    expect(html.match(/Ver tarjeta/g)).toHaveLength(4);
    const shell = renderToStaticMarkup(createElement(MemoryRouter, { initialEntries: ["/work/"] },
      createElement(ChakraProvider, { value: system, children: createElement(App) })));
    expect(shell).toMatch(/<footer class="site-footer(?:\s|")/);
    expect(shell).toMatch(/<a[^>]*href="\/work"[^>]*>Work<\/a>/);
    expect(metaForPath("/work/", FALLBACK_ENVELOPE.data, "https://velaarturo.com")).toMatchObject({ status: 200, canonicalPath: "/work", noindex: true });
  });

  it("escapa todos los nuevos campos VCF y conserva plegado UTF-8", () => {
    const card = contactVCard({ name: "Arturo Vela", email: "user@example.com" }, "es", {
      organization: "Empresa; Sur, Perú\r\nTEL:privado", title: "Sistemas\\Marketing",
      alternateEmail: "sistemas@example.com\nTEL:privado", additionalEmails: ["marketing@example.com\r\nTEL:privado"], url: "https://example.com/\nTEL:privado",
    });
    expect(card).toContain("ORG:Empresa\\; Sur\\, Perú\\nTEL:privado");
    expect(card).toContain("TITLE:Sistemas\\\\Marketing");
    expect(card).toContain("EMAIL;TYPE=WORK:marketing@example.com\\nTEL:privado");
    expect(card).not.toMatch(/^TEL:/m);
    expect(card.split("\r\n").every((line) => new TextEncoder().encode(line).length <= 75)).toBe(true);
  });

  it("comparte URL laboral pública sin filtrar URL de vista previa", async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    const writeText = vi.fn();
    vi.stubGlobal("location", { href: "http://127.0.0.1:5173/__preview?token=private-preview" });
    vi.stubGlobal("navigator", { share, clipboard: { writeText } });
    const url = publicWorkUrl(WORK_COMPANIES.agromaf);
    expect(await shareDevCard("Arturo Vela — Cía. Agromaf", "es", url)).toBe("shared");
    expect(share).toHaveBeenCalledWith({ title: "Arturo Vela — Cía. Agromaf", url });
    share.mockRejectedValue(new DOMException("Cancelled", "AbortError"));
    expect(await shareDevCard("Arturo Vela", "es", url)).toBe("cancelled");
    expect(writeText).not.toHaveBeenCalled();
  });

  it("copia URL laboral y devuelve recuperación ante permisos bloqueados", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    const url = publicWorkUrl(WORK_COMPANIES.nieto);
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    expect(await shareDevCard("Arturo Vela", "es", url)).toBe("copied");
    expect(writeText).toHaveBeenCalledWith(url);
    vi.stubGlobal("navigator", { share: vi.fn().mockRejectedValue(new Error("Denied")), clipboard: { writeText } });
    expect(await shareDevCard("Arturo Vela", "es", url)).toBe("copied");
    writeText.mockRejectedValue(new Error("Denied"));
    expect(await shareDevCard("Arturo Vela", "es", url)).toBe("blocked");
    vi.stubGlobal("navigator", {});
    expect(await shareDevCard("Arturo Vela", "es", url)).toBe("blocked");
  });
});
