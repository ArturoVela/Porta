import { afterEach, describe, expect, it, vi } from "vitest";
import { FALLBACK_ENVELOPE } from "@/content/fallback";
import worker, { isSameOrigin, metaForPath, normalizeLegacyPath, parseCommentPayload } from "../worker/index";

function executionContext() {
  return { waitUntil: vi.fn(), passThroughOnException: vi.fn() } as unknown as ExecutionContext;
}

function stubContentCache(responses: Response[] = []) {
  const match = vi.fn(async () => responses.shift());
  const put = vi.fn(async () => undefined);
  vi.stubGlobal("caches", { default: { match, put } });
  return { match, put };
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("contenido dinámico", () => {
  it("sirve el manifiesto v1 de Second Brain cuando el token y el binding están configurados", async () => {
    const remoteEnvelope = {
      ...FALLBACK_ENVELOPE,
      publishedRevision: 99,
      generatedAt: "2026-09-05T12:00:00.000-05:00",
    };
    const brainFetch = vi.fn(async (_request: Request) => Response.json(remoteEnvelope));
    const cache = stubContentCache();
    const ctx = executionContext();
    const env = {
      SITE_KEY: "velaarturo",
      CANONICAL_ORIGIN: "https://velaarturo.com",
      BRAIN_CONTENT_TOKEN: "test-only-shared-token",
      BRAIN: { fetch: brainFetch },
    } as unknown as Env;

    const response = await worker.fetch(
      new Request("https://velaarturo.com/api/content/manifest") as unknown as Parameters<typeof worker.fetch>[0],
      env,
      ctx,
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("x-portfolio-source")).toBe("brain");
    expect(await response.json()).toEqual(remoteEnvelope);
    expect(brainFetch).toHaveBeenCalledTimes(1);
    const brainRequest = brainFetch.mock.calls[0]![0];
    expect(brainRequest.url).toBe("https://secondbrain.internal/internal/v1/portfolio/velaarturo/manifest");
    expect(brainRequest.headers.get("authorization")).toBe("Bearer test-only-shared-token");
    expect(ctx.waitUntil).toHaveBeenCalledTimes(1);
    expect(cache.put).toHaveBeenCalledTimes(2);
  });

  it("no oculta con el snapshot bundled un fallo de la integración configurada", async () => {
    stubContentCache();
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const env = {
      SITE_KEY: "velaarturo",
      CANONICAL_ORIGIN: "https://velaarturo.com",
      BRAIN_CONTENT_TOKEN: "test-only-shared-token",
      BRAIN: { fetch: vi.fn(async () => new Response(null, { status: 503 })) },
    } as unknown as Env;

    const response = await worker.fetch(
      new Request("https://velaarturo.com/api/content/manifest") as unknown as Parameters<typeof worker.fetch>[0],
      env,
      executionContext(),
    );

    expect(response.status).toBe(503);
    expect(response.headers.get("x-portfolio-source")).toBeNull();
    expect(await response.json()).toEqual({ error: "El contenido dinámico no está disponible" });
  });

  it("reserva el snapshot bundled para un entorno sin integración completa", async () => {
    stubContentCache();
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const env = {
      SITE_KEY: "velaarturo",
      CANONICAL_ORIGIN: "https://velaarturo.com",
      BRAIN: { fetch: vi.fn() },
    } as unknown as Env;

    const response = await worker.fetch(
      new Request("https://velaarturo.com/api/content/manifest") as unknown as Parameters<typeof worker.fetch>[0],
      env,
      executionContext(),
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("x-portfolio-source")).toBe("bundled");
    expect(await response.json()).toEqual(FALLBACK_ENVELOPE);
  });
});

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
