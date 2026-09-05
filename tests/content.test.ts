import { describe, expect, it } from "vitest";
import { FALLBACK_ENVELOPE } from "@/content/fallback";
import { isPortfolioEnvelope } from "@/lib/content";
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
});
