import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { ChakraProvider } from "@chakra-ui/react";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import { ContentProvider } from "@/content/context";
import { LinktreePage } from "@/pages/LinktreePage";
import { WALLET_COLLECTIONS, WALLET_PROJECTS, walletCollections } from "@/lib/linktree";
import { localizedPath } from "@/i18n";
import { FALLBACK_ENVELOPE } from "@/content/fallback";
import { fallbackEnvelope } from "@/lib/content";
import { metaForPath } from "../worker/index";
import { system } from "@/theme";

function renderWallet(path: string) {
  return renderToStaticMarkup(createElement(MemoryRouter, { initialEntries: [path] },
    createElement(ChakraProvider, { value: system, children: createElement(ContentProvider, null, createElement(LinktreePage)) })));
}

describe("tarjetero de proyectos", () => {
  it("separa herramientas y proyectos, conservando las otras listas y sus pases", () => {
    expect(WALLET_PROJECTS).toHaveLength(35);
    expect(new Set(WALLET_PROJECTS.map((project) => project.id)).size).toBe(35);
    expect(WALLET_COLLECTIONS.map((group) => group.projects.length)).toEqual([15, 3, 12, 1, 6]);
    expect(WALLET_COLLECTIONS[0]).toMatchObject({ id: "herramientas", name: "Herramientas" });
    expect(WALLET_COLLECTIONS[1]).toEqual({ id: "proyectos", name: "Proyectos", nameEn: "Projects", projects: ["coffee", "explora", "un-ramito"] });
    expect(WALLET_COLLECTIONS[2].projects).toEqual(["brain", "crm", "dash", "store", "blog", "support", "docs", "updates", "status", "sphere", "hub", "cv"]);
    expect(WALLET_COLLECTIONS[0].projects).toContain("hub");
    expect(WALLET_COLLECTIONS[0].projects).toContain("cv");
    for (const group of WALLET_COLLECTIONS) {
      expect(group.projects.every((id) => WALLET_PROJECTS.some((project) => project.id === id))).toBe(true);
    }
    for (const project of WALLET_PROJECTS) {
      expect(new URL(`https://${project.domain}`).protocol).toBe("https:");
      expect(project.description.length).toBeGreaterThan(20);
      if (project.image) expect(existsSync(resolve("public", project.image.slice(1)))).toBe(true);
      if (project.caseSlug) expect(fallbackEnvelope("es").data.projects.some((item) => item.slug === project.caseSlug)).toBe(true);
    }
    expect(WALLET_PROJECTS.find((project) => project.id === "bc")?.domain).toBe("bc.velaarturo.com");
    expect(WALLET_PROJECTS.find((project) => project.id === "coffee")?.domain).toBe("cafetero.velaarturo.com");
  });

  it("filtra nombre, dominio y función sin distinguir acentos", () => {
    expect(walletCollections("  cotización  ").flatMap((group) => group.projects).map((project) => project.id)).toEqual(["cotiza", "store"]);
    expect(walletCollections("bc.velaarturo.com", "saas")[0].projects[0].id).toBe("bc");
    expect(walletCollections("tarjetas.velaarturo.com", "saas")[0].projects[0]).toMatchObject({ id: "tarjetas", image: "/assets/images/pases-webs/https-::tarjetas.velaarturo.com:.png" });
    expect(walletCollections("fidelización", "saas")[0].projects.map((project) => project.id)).toEqual(["tarjetas"]);
    expect(walletCollections("hub", "personal")[0].projects.map((project) => project.id)).toEqual(["hub"]);
    expect(walletCollections("blog.velaarturo.com", "personal")[0].projects.map((project) => project.id)).toEqual(["blog"]);
    expect(walletCollections("color", "herramientas")[0].projects.map((project) => project.id)).toEqual(["color"]);
    expect(walletCollections("Cafetero", "herramientas")).toEqual([]);
    expect(walletCollections("no-existe")).toEqual([]);
    expect(walletCollections("", "principal")[0].projects[0].id).toBe("principal");
  });

  it("sirve la ruta pública con metadatos válidos", () => {
    expect(localizedPath("/linktree?project=hub", "es")).toBe("/linktree?project=hub");
    for (const path of ["/linktree", "/linktree/"]) {
      const meta = metaForPath(path, FALLBACK_ENVELOPE.data, "https://velaarturo.com");
      expect(meta.status).toBe(200);
      expect(meta.noindex).toBe(false);
      expect(meta.title).toContain("Tarjetero");
      expect(meta.canonicalPath).toBe("/linktree");
    }
  });

  it("amplía una sola tarjeta en su grupo y conserva enlaces antiguos", () => {
    for (const [url, group] of [["/linktree?project=hub&group=personal", "personal"], ["/linktree?project=hub", "herramientas"], ["/linktree?project=hub&group=proyectos", "herramientas"]]) {
      const html = renderWallet(url);
      expect(html.match(/aria-expanded="true"/g)).toHaveLength(1);
      expect(html).toContain(`aria-expanded="true" aria-controls="detail-${group}-hub"`);
      expect(html.match(/aria-hidden="false"/g)).toHaveLength(1);
      expect(html.match(/class="wallet-detail" inert=""/g)).toHaveLength(36);
      expect(html).not.toContain("<dialog");
    }
  });

  it("conserva los pases y las identidades originales del tarjetero", () => {
    const html = renderWallet("/linktree?project=status&group=personal");
    for (const project of WALLET_PROJECTS.filter((item) => item.image)) expect(html).toContain(`src="${project.image}"`);
    expect(html).not.toContain("/assets/images/project-covers/");
    expect(html).toContain("<strong>Status</strong>");
    expect(html).toContain("<strong>divide.</strong>");
    expect(html).toContain('aria-expanded="true" aria-controls="detail-personal-status"');
  });

  it("abre Blog desde Personal con su enlace público", () => {
    const html = renderWallet("/linktree?project=blog&group=personal");
    expect(html).toContain('aria-expanded="true" aria-controls="detail-personal-blog"');
    expect(html).toContain('href="https://blog.velaarturo.com"');
    expect(html).toContain("Lectura en español e inglés");
  });

  it("abre Sphere desde Personal con su biblioteca y su icono", () => {
    const html = renderWallet("/linktree?project=sphere&group=personal");
    expect(walletCollections("sphere.velaarturo.com", "personal")[0].projects.map((project) => project.id)).toEqual(["sphere"]);
    expect(html).toContain('aria-expanded="true" aria-controls="detail-personal-sphere"');
    expect(html).toContain('href="https://sphere.velaarturo.com/#/library"');
    expect(html).toContain('src="/assets/images/sphere-icon.svg"');
  });

  it("incluye los nueve dominios personales sin duplicados y abre CRM con acceso privado", () => {
    const personal = walletCollections("", "personal")[0].projects;
    for (const id of ["brain", "status", "store", "crm", "dash", "docs", "updates", "blog", "support"]) {
      expect(personal.filter((project) => project.domain === `${id}.velaarturo.com`)).toHaveLength(1);
    }
    const html = renderWallet("/linktree?project=crm&group=personal");
    expect(html).toContain('aria-expanded="true" aria-controls="detail-personal-crm"');
    expect(html).toContain('href="https://crm.velaarturo.com"');
    expect(personal.find((project) => project.id === "crm")?.private).toBe(true);
  });

  it("mantiene los colores personales legibles y acordes a cada web", () => {
    const colors: Record<string, string> = {
      brain: "#050505", crm: "#087187", dash: "#383d49", store: "#995300", blog: "#8c3e68",
      support: "#14756f", docs: "#4e59a3", updates: "#b44321", status: "#177649", sphere: "#2453f4",
    };
    const luminance = (hex: string) => {
      const [r, g, b] = hex.slice(1).match(/../g)!.map((part) => {
        const value = parseInt(part, 16) / 255;
        return value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4;
      });
      return .2126 * r + .7152 * g + .0722 * b;
    };
    const html = renderWallet("/linktree?project=blog&group=personal");
    for (const [id, color] of Object.entries(colors)) {
      const card = html.match(new RegExp(`<article[^>]*data-project-card="wallet:personal-${id}"[^>]*>`))?.[0];
      expect(card).toContain(`--pass-color:${color}`);
      expect((luminance("#f7f9fc") + .05) / (luminance(color) + .05)).toBeGreaterThanOrEqual(4.5);
    }
  });

  it.each([
    ["dash", "dash.velaarturo.com"],
    ["store", "store.velaarturo.com"],
    ["blog", "blog.velaarturo.com 2"],
    ["support", "support.velaarturo.com"],
    ["docs", "docs.velarturo.com"],
    ["updates", "update.velaarturo.com"],
  ])("abre %s en Personal con su pase y acceso correcto", (id, image) => {
    const project = WALLET_PROJECTS.find((item) => item.id === id)!;
    const html = renderWallet(`/linktree?project=${id}&group=personal`);
    expect(walletCollections(project.domain, "personal")[0].projects.map((item) => item.id)).toEqual([id]);
    expect(html).toContain(`aria-expanded="true" aria-controls="detail-personal-${id}"`);
    expect(html).toContain(`href="https://${project.domain}"`);
    expect(project.domain).toBe(`${id}.velaarturo.com`);
    expect(project.image).toBe(`/assets/images/pases-webs/${image}.png`);
    expect(html).toContain(`src="${project.image}"`);
    expect(project.private ?? false).toBe(id === "dash");
  });

  it("ofrece el footer del home con contacto y navegación fuera del contenido principal", () => {
    const html = renderWallet("/linktree");
    expect(html.match(/<footer /g)).toHaveLength(1);
    expect(html.slice(0, html.indexOf("</main>"))).not.toContain("<footer ");
    const footer = html.slice(html.indexOf('<footer class="site-footer">'));
    expect(footer).toContain('href="mailto:dev@velaarturo.com"');
    expect(footer).toContain('aria-label="Explora"');
    expect(footer).toContain('aria-label="Conecta"');
    for (const section of ["privacidad", "cookies", "condiciones", "derechos"]) {
      expect(footer).toContain(`href="/es/legal#${section}"`);
    }
    expect(footer).toContain('<div class="footer-wordmark" aria-hidden="true"><span>VELA</span></div>');
  });
});
