import { afterEach, describe, expect, it, vi } from "vitest";
import { contactVCard, copyText, publicDevUrl, shareDevCard } from "@/lib/contact";
import { DEV_APPS, DEV_APP_GROUPS, DEV_COPY, devAppDescription, filterDevApps, projectTechnologies } from "@/lib/dev";
import { FALLBACK_ENVELOPE } from "@/content/fallback";
import { FALLBACK_ENVELOPE_EN } from "@/content/fallback-en";
import { localizedPath, matchLocalizedRoute } from "@/i18n";
import { metaForPath } from "../worker/index";

afterEach(() => vi.unstubAllGlobals());

describe("catálogo y traducción de /dev", () => {
  it("clasifica todas las apps una vez sin incluir enlaces personales", () => {
    const ids = Object.values(DEV_APP_GROUPS).flat();
    expect(new Set(ids).size).toBe(ids.length);
    expect([...ids].sort()).toEqual(DEV_APPS.map((app) => app.id).sort());
    expect(ids).not.toContain("brain");
  });

  it("combina categoría y búsqueda sin distinguir tildes o mayúsculas", () => {
    const projects = FALLBACK_ENVELOPE.data.projects;
    expect(filterDevApps("  COTIZACIÓN  ", "all", "es", projects).map((app) => app.id)).toEqual(["cotiza"]);
    expect(filterDevApps("pdf.velaarturo.com", "tools", "es", projects).map((app) => app.id)).toEqual(["pdf"]);
    expect(filterDevApps("Cafetero", "tools", "es", projects)).toEqual([]);
    expect(filterDevApps("nada-encontrado", "all", "en", FALLBACK_ENVELOPE_EN.data.projects)).toEqual([]);
  });

  it("traduce todas las apps y admite buscar descripciones inglesas", () => {
    const projects = FALLBACK_ENVELOPE_EN.data.projects;
    for (const app of DEV_APPS) {
      expect(devAppDescription(app, "en", projects)).not.toBe(app.description);
      expect(devAppDescription(app, "en", [])).not.toBe(app.description);
    }
    expect(filterDevApps("balanced teams", "organization", "en", projects).map((app) => app.id)).toEqual(["torneo"]);
    expect(Object.keys(DEV_COPY.en)).toEqual(Object.keys(DEV_COPY.es));
    expect(Object.keys(DEV_COPY.en.groups)).toEqual(Object.keys(DEV_APP_GROUPS));
  });

  it("cada tecnología enlaza evidencia real y desaparece si no hay proyectos", () => {
    const technologies = projectTechnologies(FALLBACK_ENVELOPE.data.projects);
    expect(technologies.map((technology) => technology.name)).toContain("Flutter");
    expect(technologies.every(({ name, project }) => project.stack.includes(name))).toBe(true);
    expect(projectTechnologies([])).toEqual([]);
  });

  it("conserva /dev, idioma, anclas y metadatos propios", () => {
    expect(matchLocalizedRoute("/dev/")).toEqual({ locale: "es", name: "dev" });
    expect(matchLocalizedRoute("/en/dev")).toEqual({ locale: "en", name: "dev" });
    expect(localizedPath("/dev#apps", "en")).toBe("/en/dev#apps");
    expect(localizedPath("/en/dev?year=2025#actividad", "es")).toBe("/dev?year=2025#actividad");
    const meta = metaForPath("/en/dev", FALLBACK_ENVELOPE_EN.data, "https://velaarturo.com");
    expect(meta).toMatchObject({ status: 200, canonicalPath: "/en/dev", noindex: false });
    expect(meta.title).toContain("Product and web engineering");
    expect(meta.structuredData).toMatchObject({ url: "https://velaarturo.com/en/dev", inLanguage: "en" });
  });
});

describe("contacto público", () => {
  it("exporta solo nombre, correo y web con escape y CRLF", () => {
    const card = contactVCard({ name: "Vela, Arturo; \\\nTEL:privado", email: "cv@velaarturo.com" }, "es");
    expect(card).toContain("VERSION:3.0\r\n");
    expect(card).toContain("FN:Vela\\, Arturo\\; \\\\\\nTEL:privado\r\n");
    expect(card).not.toMatch(/^TEL:|^PHOTO:|^NOTE:/m);
    expect(card).toContain("URL:https://velaarturo.com/dev\r\nEND:VCARD\r\n");
    expect(card.replace(/\r\n/g, "")).not.toMatch(/[\r\n]/);
  });

  it("pliega líneas UTF-8 sin cortar caracteres ni exceder 75 bytes", () => {
    const name = "Arturo áéñ 😀 ".repeat(12);
    const card = contactVCard({ name, email: "cv@velaarturo.com" }, "en");
    expect(card.split("\r\n").every((line) => new TextEncoder().encode(line).length <= 75)).toBe(true);
    expect(card.replace(/\r\n /g, "")).toContain(`FN:${name}`);
  });

  it("ofrece recuperación si portapapeles no existe o permiso falla", async () => {
    vi.stubGlobal("navigator", {});
    expect(await copyText("cv@velaarturo.com")).toBe("blocked");
    vi.stubGlobal("navigator", { clipboard: { writeText: vi.fn().mockRejectedValue(new Error("Denied")) } });
    expect(await copyText("cv@velaarturo.com")).toBe("blocked");
  });

  it("comparte URL pública y trata cancelación como acción neutral", async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    const writeText = vi.fn();
    vi.stubGlobal("location", { href: "http://127.0.0.1:5173/__preview?token=privado" });
    vi.stubGlobal("navigator", { share, clipboard: { writeText } });
    expect(await shareDevCard("Arturo Vela", "en")).toBe("shared");
    expect(share).toHaveBeenCalledWith({ title: "Arturo Vela", url: "https://velaarturo.com/en/dev" });
    share.mockRejectedValue(new DOMException("Cancelled", "AbortError"));
    expect(await shareDevCard("Arturo Vela", "es")).toBe("cancelled");
    expect(writeText).not.toHaveBeenCalled();
  });

  it("copia enlace si compartir no está disponible o está bloqueado", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    expect(await shareDevCard("Arturo Vela", "es")).toBe("copied");
    expect(writeText).toHaveBeenCalledWith(publicDevUrl("es"));
    vi.stubGlobal("navigator", { share: vi.fn().mockRejectedValue(new Error("Denied")), clipboard: { writeText } });
    expect(await shareDevCard("Arturo Vela", "en")).toBe("copied");
    expect(writeText).toHaveBeenLastCalledWith("https://velaarturo.com/en/dev");
  });
});
