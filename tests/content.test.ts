import { describe, expect, it } from "vitest";
import { FALLBACK_ENVELOPE } from "@/content/fallback";
import { isPortfolioEnvelope } from "@/lib/content";
import { projectAvailabilityLabel } from "@/lib/projectAvailability";
import contractFixture from "../contracts/portfolio-v1.example.json";

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

  it("publica el catálogo ampliado con enlaces y estados honestos", () => {
    const projects = FALLBACK_ENVELOPE.data.projects;
    expect(projects).toHaveLength(17);
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
    ]);
    expect(projects.find((project) => project.slug === "hub")?.liveUrl).toBe("https://hub.velaarturo.com");
    expect(projects.find((project) => project.slug === "nieto-import")?.liveUrl).toBe("https://portal.nietoimport.com");
    expect(projects.find((project) => project.slug === "nieto-hub")?.liveUrl).toBe("https://nieto.velarturo.com");
    expect(projects.find((project) => project.slug === "porta")?.repoUrl).toBe("https://github.com/ArturoVela/Porta");
    expect(projectAvailabilityLabel(projects.find((project) => project.slug === "second-brain")!)).toBe("Proyecto privado");
    expect(projectAvailabilityLabel(projects.find((project) => project.slug === "db-nieto")!)).toBe("Acceso restringido");
  });
});
