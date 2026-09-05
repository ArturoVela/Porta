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
    expect(projects).toHaveLength(16);
    expect(new Set(projects.map((project) => project.slug)).size).toBe(projects.length);
    expect(projects.find((project) => project.slug === "hub")?.liveUrl).toBe("https://hub.velaarturo.com");
    expect(projects.find((project) => project.slug === "porta")?.repoUrl).toBe("https://github.com/ArturoVela/Porta");
    expect(projectAvailabilityLabel(projects.find((project) => project.slug === "second-brain")!)).toBe("Proyecto privado");
    expect(projectAvailabilityLabel(projects.find((project) => project.slug === "db-nieto")!)).toBe("Acceso restringido");
  });
});
