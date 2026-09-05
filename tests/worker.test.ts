import { describe, expect, it } from "vitest";
import { FALLBACK_ENVELOPE } from "@/content/fallback";
import { isSameOrigin, metaForPath, normalizeLegacyPath, parseCommentPayload } from "../worker/index";

describe("rutas heredadas", () => {
  it.each([
    ["/project", "/proyectos"],
    ["/blog", "/articulos"],
    ["/about", "/perfil"],
    ["/cv", "/perfil"],
    ["/contact", "/contacto"],
    ["/pricing", "/#servicios"],
  ])("redirige %s a %s", (from, to) => {
    expect(normalizeLegacyPath(from)).toBe(to);
  });
});

describe("comentarios", () => {
  it("normaliza una carga válida", () => {
    expect(parseCommentPayload({ publicationId: "article-discord-business", name: "  Ada   Lovelace ", message: " Interesante ", turnstileToken: "token" })).toEqual({
      publicationId: "article-discord-business",
      name: "Ada Lovelace",
      message: "Interesante",
      turnstileToken: "token",
    });
  });

  it("rechaza entradas fuera de límites", () => {
    expect(parseCommentPayload({ publicationId: "x", name: "Ada", message: "Hola", turnstileToken: "token" })).toBeNull();
    expect(parseCommentPayload({ publicationId: "article-1", name: "Ada", message: "x".repeat(2001), turnstileToken: "token" })).toBeNull();
  });

  it("solo permite el mismo origen cuando Origin está presente", () => {
    expect(isSameOrigin(new Request("https://velaarturo.com/api/comments", { headers: { origin: "https://velaarturo.com" } }))).toBe(true);
    expect(isSameOrigin(new Request("https://velaarturo.com/api/comments", { headers: { origin: "https://example.com" } }))).toBe(false);
    expect(isSameOrigin(new Request("https://velaarturo.com/api/comments"))).toBe(false);
    expect(isSameOrigin(new Request("https://velaarturo.com/api/comments", { headers: { "sec-fetch-site": "same-origin" } }))).toBe(true);
  });
});

describe("SEO por ruta", () => {
  it("crea metadatos de proyecto y artículo", () => {
    const project = metaForPath("/proyectos/hub", FALLBACK_ENVELOPE.data, "https://velaarturo.com");
    const article = metaForPath("/articulos/discord-para-negocios", FALLBACK_ENVELOPE.data, "https://velaarturo.com");
    expect(project.status).toBe(200);
    expect(project.structuredData["@type"]).toBe("CreativeWork");
    expect(article.type).toBe("article");
    expect(article.structuredData["@type"]).toBe("BlogPosting");
  });

  it("devuelve 404 real y noindex para un slug desconocido", () => {
    const meta = metaForPath("/proyectos/no-existe", FALLBACK_ENVELOPE.data, "https://velaarturo.com");
    expect(meta.status).toBe(404);
    expect(meta.noindex).toBe(true);
  });
});
