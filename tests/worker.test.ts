import { afterEach, describe, expect, it, vi } from "vitest";
import { FALLBACK_ENVELOPE } from "@/content/fallback";
import { FALLBACK_ENVELOPE_EN } from "@/content/fallback-en";
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
  it("expone proyectos nuevos y sus fotos desde Second Brain sin reconstruir el catálogo", async () => {
    stubContentCache();
    const project = {
      ...FALLBACK_ENVELOPE.data.projects[0], id: "project-new", slug: "nuevo", title: "Nuevo desde Second Brain",
      cover: { src: "/media/2/new-cover", alt: "Pantalla principal", width: 1280, height: 720 },
      gallery: [{ src: "/media/2/new-screen", alt: "Pantalla de detalle", width: 1280, height: 720 }],
    };
    const env = {
      SITE_KEY: "velaarturo", BRAIN_CONTENT_TOKEN: "test-only-token",
      BRAIN: { fetch: vi.fn(async () => Response.json({ ...FALLBACK_ENVELOPE, data: { ...FALLBACK_ENVELOPE.data, projects: [project] } })) },
    } as unknown as Env;
    const response = await worker.fetch(new Request("https://velaarturo.com/api/content/projects/nuevo") as unknown as Parameters<typeof worker.fetch>[0], env, executionContext());
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ data: project });
  });

  it("consulta el borrador autorizado sin leer ni escribir caché pública", async () => {
    const cache = stubContentCache();
    const brainFetch = vi.fn(async (_request: Request) => Response.json(FALLBACK_ENVELOPE));
    const env = { SITE_KEY: "velaarturo", BRAIN_CONTENT_TOKEN: "test-only-token", BRAIN: { fetch: brainFetch } } as unknown as Env;
    const response = await worker.fetch(new Request("https://velaarturo.com/api/content/preview?token=private-preview") as unknown as Parameters<typeof worker.fetch>[0], env, executionContext());
    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("private, no-store");
    expect(response.headers.get("x-portfolio-source")).toBe("preview");
    expect(brainFetch.mock.calls[0]![0].url).toBe("https://secondbrain.internal/internal/v1/portfolio/velaarturo/preview?token=private-preview&locale=es");
    expect(cache.match).not.toHaveBeenCalled();
    expect(cache.put).not.toHaveBeenCalled();
  });

  it.each(["/api/content/preview", "/__preview"])("rechaza %s sin token", async (path) => {
    const response = await worker.fetch(new Request(`https://velaarturo.com${path}`) as unknown as Parameters<typeof worker.fetch>[0], {} as Env, executionContext());
    expect(response.status).toBe(404);
    expect(response.headers.get("cache-control")).toBe("no-store");
  });

  it("responde 404 para una vista previa expirada sin cargar la aplicación pública", async () => {
    const assetsFetch = vi.fn();
    const env = { SITE_KEY: "velaarturo", BRAIN_CONTENT_TOKEN: "test-only-token", BRAIN: { fetch: vi.fn(async () => new Response(null, { status: 404 })) }, ASSETS: { fetch: assetsFetch } } as unknown as Env;
    const response = await worker.fetch(new Request("https://velaarturo.com/__preview?token=expired") as unknown as Parameters<typeof worker.fetch>[0], env, executionContext());
    expect(response.status).toBe(404);
    expect(assetsFetch).not.toHaveBeenCalled();
  });

  it("sirve fotos privadas de borrador con token y sin introducirlas en caché pública", async () => {
    const cache = stubContentCache();
    const brainFetch = vi.fn(async (_request: Request) => new Response("preview-image", { headers: { "content-type": "image/webp" } }));
    const env = { SITE_KEY: "velaarturo", BRAIN_CONTENT_TOKEN: "test-only-token", BRAIN: { fetch: brainFetch } } as unknown as Env;
    const response = await worker.fetch(new Request("https://velaarturo.com/media/2/draft-photo?token=private-preview") as unknown as Parameters<typeof worker.fetch>[0], env, executionContext());
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("image/webp");
    expect(response.headers.get("cache-control")).toBe("private, no-store");
    expect(response.headers.get("referrer-policy")).toBe("no-referrer");
    expect(brainFetch.mock.calls[0]![0].url).toBe("https://secondbrain.internal/internal/v1/portfolio/velaarturo/media/2/draft-photo?token=private-preview");
    expect(cache.match).not.toHaveBeenCalled();
    expect(cache.put).not.toHaveBeenCalled();
  });

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
    expect(brainRequest.url).toBe("https://secondbrain.internal/internal/v1/portfolio/velaarturo/manifest?locale=es");
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
    ["/project", "/es/proyectos"],
    ["/blog", "/es/articulos"],
    ["/about", "/es/perfil"],
    ["/cv", "/es/perfil"],
    ["/contact", "/es/contacto"],
    ["/pricing", "/es/#servicios"],
  ])("redirige %s a %s", (from, to) => {
    expect(normalizeLegacyPath(from)).toBe(to);
  });

  it("redirige la raíz según cookie y después Accept-Language", async () => {
    const env = { CANONICAL_ORIGIN: "https://velaarturo.com" } as Env;
    const cookie = await worker.fetch(new Request("https://velaarturo.com/", { headers: { cookie: "portfolio_locale=es", "accept-language": "en-US" } }) as never, env, executionContext());
    const language = await worker.fetch(new Request("https://velaarturo.com/", { headers: { "accept-language": "en-US,en;q=0.9" } }) as never, env, executionContext());
    expect([cookie.status, cookie.headers.get("location")]).toEqual([302, "https://velaarturo.com/es/"]);
    expect([language.status, language.headers.get("location")]).toEqual([302, "https://velaarturo.com/en/"]);
  });
});

describe("salidas bilingües", () => {
  it("separa manifiesto, caché y cabeceras por idioma", async () => {
    const cache = stubContentCache();
    const brainFetch = vi.fn(async (_request: Request) => Response.json(FALLBACK_ENVELOPE_EN));
    const env = { SITE_KEY: "velaarturo", BRAIN_CONTENT_TOKEN: "token", BRAIN: { fetch: brainFetch } } as unknown as Env;
    const response = await worker.fetch(new Request("https://velaarturo.com/api/content/manifest?locale=en") as never, env, executionContext());
    expect(response.headers.get("content-language")).toBe("en");
    expect(response.headers.get("etag")).toContain("-en");
    expect(brainFetch.mock.calls[0]![0].url).toContain("manifest?locale=en");
    expect(cache.put).toHaveBeenCalledTimes(2);
  });

  it("genera sitemap y feed con URLs localizadas", async () => {
    stubContentCache();
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const env = { SITE_KEY: "velaarturo", CANONICAL_ORIGIN: "https://velaarturo.com", BRAIN: { fetch: vi.fn() } } as unknown as Env;
    const sitemapResponse = await worker.fetch(new Request("https://velaarturo.com/sitemap.xml") as never, env, executionContext());
    const sitemap = await sitemapResponse.text();
    expect(sitemap).toContain("https://velaarturo.com/es/proyectos/coffee");
    expect(sitemap).toContain("https://velaarturo.com/en/projects/coffee");
    expect(sitemap).toContain('hreflang="x-default"');
    const feedResponse = await worker.fetch(new Request("https://velaarturo.com/en/feed.xml") as never, env, executionContext());
    const feed = await feedResponse.text();
    expect(feedResponse.headers.get("content-language")).toBe("en");
    expect(feed).toContain('xml:lang="en"');
    expect(feed).toContain("/en/articles/");
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
  it("sirve /all sin indexarlo", () => {
    const meta = metaForPath("/all", FALLBACK_ENVELOPE.data, "https://velaarturo.com");
    expect(meta.status).toBe(200);
    expect(meta.noindex).toBe(true);
    expect(meta.title).toContain("Todos los proyectos");
  });

  it("crea metadatos de proyecto y artículo", () => {
    const project = metaForPath("/proyectos/hub", FALLBACK_ENVELOPE.data, "https://velaarturo.com");
    const article = metaForPath("/articulos/discord-para-negocios", FALLBACK_ENVELOPE.data, "https://velaarturo.com");
    expect(project.status).toBe(200);
    expect(project.structuredData["@type"]).toBe("CreativeWork");
    const explora = metaForPath("/proyectos/explora-san-martin", FALLBACK_ENVELOPE.data, "https://velaarturo.com");
    expect(explora.image).toBe("https://velaarturo.com/assets/images/portfolio/spotlight-explora.webp");
    expect([explora.imageWidth, explora.imageHeight]).toEqual([1280, 720]);
    expect(article.type).toBe("article");
    expect(article.structuredData["@type"]).toBe("BlogPosting");
  });

  it("devuelve 404 real y noindex para un slug desconocido", () => {
    const meta = metaForPath("/proyectos/no-existe", FALLBACK_ENVELOPE.data, "https://velaarturo.com");
    expect(meta.status).toBe(404);
    expect(meta.noindex).toBe(true);
  });
});
