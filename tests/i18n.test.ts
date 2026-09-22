import { describe, expect, it } from "vitest";
import { localizedPath, matchLocalizedRoute, preferredLocale, routePath } from "@/i18n";
import { FALLBACK_ENVELOPE_EN } from "@/content/fallback-en";
import { isPortfolioEnvelope } from "@/lib/content";

describe("rutas localizadas", () => {
  it("conserva slugs al cambiar de idioma", () => {
    expect(localizedPath("/es/proyectos/explora-san-martin", "en")).toBe("/en/projects/explora-san-martin");
    expect(localizedPath("/articulos/discord-para-negocios", "en")).toBe("/en/articles/discord-para-negocios");
    expect(matchLocalizedRoute("/en/projects/coffee")).toEqual({ locale: "en", name: "project", slug: "coffee" });
    expect(routePath("es", "contact")).toBe("/es/contacto");
  });

  it("prefiere cookie, luego Accept-Language y finalmente español", () => {
    expect(preferredLocale("portfolio_locale=en", "es-PE,es;q=0.9")).toBe("en");
    expect(preferredLocale(null, "en-US,en;q=0.8")).toBe("en");
    expect(preferredLocale(null, "fr-FR")).toBe("es");
  });

  it("mantiene fallback inglés válido y completo", () => {
    expect(isPortfolioEnvelope(FALLBACK_ENVELOPE_EN)).toBe(true);
    expect(FALLBACK_ENVELOPE_EN.data.projects).toHaveLength(28);
    expect(FALLBACK_ENVELOPE_EN.data.articles).toHaveLength(3);
    expect(FALLBACK_ENVELOPE_EN.data.site.headline).toContain("complex processes");
  });
});
