import { afterEach, describe, expect, it, vi } from "vitest";
import { FALLBACK_ENVELOPE } from "@/content/fallback";
import { fetchManifest, isPortfolioEnvelope } from "@/lib/content";
import { contentHref } from "@/lib/preview";
import { projectAvailabilityLabel } from "@/lib/projectAvailability";
import { projectDisplayCover, selectSpotlightProjects, SPOTLIGHT_DESTINATIONS } from "@/lib/spotlight";
import contractFixture from "../contracts/portfolio-v1.example.json";

afterEach(() => vi.unstubAllGlobals());

describe("vista previa del editor", () => {
  it("actualiza desde el borrador privado sin reemplazarlo con el manifiesto publicado", async () => {
    const fetchMock = vi.fn(async () => Response.json(FALLBACK_ENVELOPE));
    vi.stubGlobal("fetch", fetchMock);
    await fetchManifest("es", undefined, "private/preview+token");
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock).toHaveBeenCalledWith("/api/content/preview?locale=es&token=private%2Fpreview%2Btoken", expect.objectContaining({ cache: "no-store" }));
  });

  it("mantiene el token al abrir otras páginas del borrador y no lo agrega a enlaces externos", () => {
    const href = new URL(contentHref("/proyectos/nuevo", "private-token"), "https://velaarturo.com");
    expect(href.pathname).toBe("/__preview");
    expect(href.searchParams.get("token")).toBe("private-token");
    expect(href.searchParams.get("path")).toBe("/proyectos/nuevo");
    expect(contentHref("/proyectos/nuevo", null)).toBe("/proyectos/nuevo");
    expect(contentHref("https://example.com", "private-token")).toBe("https://example.com");
    expect(contentHref("//example.com", "private-token")).toBe("//example.com");
  });
});

describe("contrato de contenido v1", () => {
  it("acepta el snapshot empaquetado", () => {
    expect(isPortfolioEnvelope(FALLBACK_ENVELOPE)).toBe(true);
    expect(isPortfolioEnvelope(contractFixture)).toBe(true);
  });

  it("rechaza contenido con versión o campos públicos inválidos", () => {
    expect(isPortfolioEnvelope({ ...FALLBACK_ENVELOPE, schemaVersion: "2" })).toBe(false);
    expect(isPortfolioEnvelope({ ...FALLBACK_ENVELOPE, data: { ...FALLBACK_ENVELOPE.data, articles: [{ privateEmail: "secret@example.com" }] } })).toBe(false);
    expect(isPortfolioEnvelope({ ...FALLBACK_ENVELOPE, data: { ...FALLBACK_ENVELOPE.data, site: { ...FALLBACK_ENVELOPE.data.site, internalNotes: "privado" } } })).toBe(false);
  });

  it("acepta retrato y pantallas del CMS y rechaza metadatos de imagen inválidos", () => {
    const image = { src: "/media/2/portrait?token=preview", alt: "Retrato", width: 800, height: 1000 };
    const envelope = {
      ...FALLBACK_ENVELOPE,
      data: {
        ...FALLBACK_ENVELOPE.data,
        site: { ...FALLBACK_ENVELOPE.data.site, portrait: image },
        projects: [{ ...FALLBACK_ENVELOPE.data.projects[0], gallery: [image] }],
      },
    };
    expect(isPortfolioEnvelope(envelope)).toBe(true);
    expect(isPortfolioEnvelope({ ...envelope, data: { ...envelope.data, projects: [{ ...envelope.data.projects[0], gallery: [{ ...image, width: 0 }] }] } })).toBe(false);
    expect(isPortfolioEnvelope({ ...envelope, data: { ...envelope.data, site: { ...envelope.data.site, portrait: { ...image, internalId: "private" } } } })).toBe(false);
  });

  it("publica el catálogo ampliado con enlaces y estados honestos", () => {
    const projects = FALLBACK_ENVELOPE.data.projects;
    expect(projects).toHaveLength(28);
    expect(new Set(projects.map((project) => project.slug)).size).toBe(projects.length);
    expect(new Set(projects.map((project) => project.order)).size).toBe(projects.length);
    expect(projects.map((project) => project.slug)).toEqual([
      "hub",
      "un-ramito",
      "security-lab",
      "cana-wasky",
      "porta",
      "second-brain",
      "db-nieto",
      "nieto-import",
      "mercadillo-pe",
      "kc-automotriz",
      "pachas-cafe-web",
      "misterio-maria",
      "cumpleanos",
      "seas-venta",
      "municipalidad-de-rioja",
      "discord",
      "nieto-hub",
      "coffee",
      "explora-san-martin",
      "ruleta",
      "llevamos",
      "horas",
      "qr",
      "pdf",
      "foto",
      "cuando",
      "cotiza",
      "color",
    ]);
    expect(projects.find((project) => project.slug === "hub")?.liveUrl).toBe("https://hub.velaarturo.com");
    expect(projects.find((project) => project.slug === "nieto-import")?.liveUrl).toBe("https://portal.nietoimport.com");
    expect(projects.find((project) => project.slug === "nieto-hub")?.liveUrl).toBe("https://nieto.velaarturo.com");
    expect(projects.find((project) => project.slug === "porta")?.repoUrl).toBe("https://github.com/ArturoVela/Porta");
    expect(projects.slice(-11).map((project) => project.liveUrl)).toEqual([
      "https://cafetero.velaarturo.com",
      "https://explora.velaarturo.com",
      "https://ruleta.velaarturo.com",
      "https://llevamos.velaarturo.com",
      "https://horas.velaarturo.com",
      "https://qr.velaarturo.com",
      "https://pdf.velaarturo.com",
      "https://foto.velaarturo.com",
      "https://cuando.velaarturo.com",
      "https://cotiza.velaarturo.com",
      "https://color.velaarturo.com",
    ]);
    expect(projects.slice(-11).every((project) => project.repoUrl?.startsWith("https://github.com/ArturoVela/"))).toBe(true);
    expect(projects.filter((project) => project.featured).map((project) => project.slug)).toEqual([
      "hub",
      "un-ramito",
      "security-lab",
      "cana-wasky",
      "coffee",
      "explora-san-martin",
    ]);
    expect(projectAvailabilityLabel(projects.find((project) => project.slug === "second-brain")!)).toBe("Proyecto privado");
    expect(projectAvailabilityLabel(projects.find((project) => project.slug === "db-nieto")!)).toBe("Acceso restringido");
  });
});

describe("trabajo destacado", () => {
  it("prioriza los tres casos elegidos aunque el CMS conserve otros destacados", () => {
    expect(selectSpotlightProjects(FALLBACK_ENVELOPE.data.projects).map((project) => project.slug)).toEqual([
      "nieto-import", "explora-san-martin", "coffee",
    ]);
    expect(SPOTLIGHT_DESTINATIONS.map((item) => item.url)).toEqual([
      "https://portal.nietoimport.com",
      "https://explora.velaarturo.com",
      "https://cafetero.velaarturo.com",
      "https://cv.velaarturo.com",
    ]);
  });

  it("usa capturas públicas solo cuando el CMS no entrega una portada", () => {
    const coffee = FALLBACK_ENVELOPE.data.projects.find((project) => project.slug === "coffee")!;
    expect(projectDisplayCover(coffee)?.src).toBe("/assets/images/portfolio/spotlight-coffee.webp");
    const cmsCover = { src: "/media/2/cms-cover", alt: "Portada del CMS", width: 1200, height: 675 };
    expect(projectDisplayCover({ ...coffee, cover: cmsCover })).toEqual(cmsCover);
  });

  it("documenta los tres casos con problema, decisiones, proceso y resultados verificables", () => {
    const cases = ["nieto-import", "explora-san-martin", "coffee"].map((slug) => FALLBACK_ENVELOPE.data.projects.find((project) => project.slug === slug)!);
    for (const project of cases) {
      expect(project.body).toContain("## Problema");
      expect(project.body).toContain("## Decisiones clave");
      expect(project.body).toContain("## Proceso");
      expect(project.body).toContain("## Resultados y alcance");
    }
    expect(cases[0].body).toContain("dos empresas");
    expect(cases[1].body).toContain("164 lugares");
    expect(cases[2].body).toContain("41 cafeterías");
  });
});
