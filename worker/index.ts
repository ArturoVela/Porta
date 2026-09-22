import { FALLBACK_ENVELOPE } from "../src/content/fallback";
import { fallbackEnvelope, isPortfolioEnvelope } from "../src/lib/content";
import { isLocale, localeFromPath, localizedPath, matchLocalizedRoute, preferredLocale, routePath, type Locale } from "../src/i18n";
import { projectDisplayCover } from "../src/lib/spotlight";
import type { PortfolioEnvelope, PortfolioManifest, PublicComment } from "../src/types/content";

const JSON_HEADERS = { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", "x-content-type-options": "nosniff" };
const MAX_JSON_BYTES = 8_192;
const CACHE_TTL_SECONDS = 60;
const BACKUP_TTL_SECONDS = 86_400;

type ContentResult = { envelope: PortfolioEnvelope; source: "brain" | "cache" | "backup" | "bundled" | "preview" };
type CommentRow = { id: string; author_name: string; body: string; created_at: string };
type CommentInput = { publicationId: string; name: string; message: string; turnstileToken: string };
type RouteMeta = { title: string; description: string; canonicalPath: string; image: string; imageWidth: number; imageHeight: number; type: "website" | "article"; status: number; noindex: boolean; structuredData: Record<string, unknown> };

function defaultCache() {
  return (caches as unknown as { readonly default: Cache }).default;
}

function json(data: unknown, status = 200, headers?: HeadersInit) {
  return Response.json(data, { status, headers: { ...JSON_HEADERS, ...headers } });
}

function optionalString(env: Env, key: string) {
  const value: unknown = Reflect.get(env, key);
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function isBrainIntegrationConfigured(env: Env) {
  const binding: unknown = Reflect.get(env, "BRAIN");
  const hasBinding = (typeof binding === "object" && binding !== null) || typeof binding === "function";
  return Boolean(optionalString(env, "BRAIN_CONTENT_TOKEN") && hasBinding && typeof Reflect.get(binding as object, "fetch") === "function");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

async function readJson(request: Request) {
  if (!(request.headers.get("content-type") ?? "").includes("application/json")) return null;
  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (declaredLength > MAX_JSON_BYTES) return null;
  if (!request.body) return null;
  try {
    const reader = request.body.getReader();
    const chunks: Uint8Array[] = [];
    let byteLength = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      byteLength += value.byteLength;
      if (byteLength > MAX_JSON_BYTES) {
        await reader.cancel();
        return null;
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(byteLength);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    const value: unknown = JSON.parse(new TextDecoder().decode(bytes));
    return isRecord(value) ? value : null;
  } catch {
    return null;
  }
}

export function parseCommentPayload(value: Record<string, unknown> | null): CommentInput | null {
  if (!value) return null;
  const publicationId = typeof value.publicationId === "string" ? value.publicationId.trim() : "";
  const name = typeof value.name === "string" ? value.name.trim().replace(/\s+/g, " ") : "";
  const message = typeof value.message === "string" ? value.message.trim() : "";
  const turnstileToken = typeof value.turnstileToken === "string" ? value.turnstileToken.trim() : "";
  if (!/^[a-zA-Z0-9][a-zA-Z0-9_-]{2,127}$/.test(publicationId) || name.length < 1 || name.length > 80 || message.length < 1 || message.length > 2000 || turnstileToken.length < 1 || turnstileToken.length > 4096) return null;
  return { publicationId, name, message, turnstileToken };
}

export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return request.headers.get("sec-fetch-site") === "same-origin";
  try { return new URL(origin).origin === new URL(request.url).origin; }
  catch { return false; }
}

function cacheKey(path: string, variant: "current" | "backup") {
  return new Request(`https://portfolio-content.invalid/${variant}${path}`, { method: "GET" });
}

function cacheResponse(envelope: PortfolioEnvelope, ttl: number) {
  return Response.json(envelope, { headers: { "cache-control": `public, max-age=${ttl}`, "content-type": "application/json; charset=utf-8" } });
}

async function readCachedEnvelope(request: Request): Promise<PortfolioEnvelope | null> {
  const response = await defaultCache().match(request);
  if (!response) return null;
  try {
    const value: unknown = await response.json();
    return isPortfolioEnvelope(value) ? value : null;
  } catch {
    return null;
  }
}

async function fetchBrainEnvelope(env: Env, internalPath: string): Promise<PortfolioEnvelope> {
  const token = optionalString(env, "BRAIN_CONTENT_TOKEN");
  if (!token) throw new Error("brain_secret_missing");
  const response = await env.BRAIN.fetch(new Request(`https://secondbrain.internal${internalPath}`, {
    headers: { authorization: `Bearer ${token}`, accept: "application/json" },
  }));
  if (!response.ok) throw new Error(`brain_${response.status}`);
  const value: unknown = await response.json();
  if (!isPortfolioEnvelope(value)) throw new Error("brain_contract_invalid");
  return value;
}

async function loadContent(env: Env, ctx: ExecutionContext, locale: Locale = "es", previewToken?: string): Promise<ContentResult> {
  const siteKey = env.SITE_KEY;
  if (previewToken) {
    const params = new URLSearchParams({ token: previewToken, locale });
    const envelope = await fetchBrainEnvelope(env, `/internal/v1/portfolio/${encodeURIComponent(siteKey)}/preview?${params}`);
    return { envelope, source: "preview" };
  }

  const path = `/internal/v1/portfolio/${encodeURIComponent(siteKey)}/manifest?locale=${locale}`;
  const currentKey = cacheKey(path, "current");
  const current = await readCachedEnvelope(currentKey);
  if (current) return { envelope: current, source: "cache" };

  try {
    const envelope = await fetchBrainEnvelope(env, path);
    ctx.waitUntil(Promise.all([
      defaultCache().put(currentKey, cacheResponse(envelope, CACHE_TTL_SECONDS)),
      defaultCache().put(cacheKey(path, "backup"), cacheResponse(envelope, BACKUP_TTL_SECONDS)),
    ]));
    return { envelope, source: "brain" };
  } catch (error) {
    console.warn(JSON.stringify({ event: "content_fallback", reason: error instanceof Error ? error.message : String(error) }));
    const backup = await readCachedEnvelope(cacheKey(path, "backup"));
    if (backup) return { envelope: backup, source: "backup" };
    if (isBrainIntegrationConfigured(env)) throw error;
    return { envelope: fallbackEnvelope(locale), source: "bundled" };
  }
}

function publicationExists(manifest: PortfolioManifest, publicationId: string) {
  return manifest.projects.some((item) => item.id === publicationId) || manifest.articles.some((item) => item.id === publicationId);
}

async function listComments(request: Request, env: Env) {
  const publicationId = new URL(request.url).searchParams.get("publicationId")?.trim() ?? "";
  if (!/^[a-zA-Z0-9][a-zA-Z0-9_-]{2,127}$/.test(publicationId)) return json({ error: "Publicación inválida" }, 400);
  const result = await env.DB.prepare("SELECT id, author_name, body, created_at FROM comments WHERE publication_id = ? AND hidden_at IS NULL ORDER BY created_at DESC LIMIT 50").bind(publicationId).all<CommentRow>();
  const data: PublicComment[] = result.results.map((row) => ({ id: row.id, name: row.author_name, message: row.body, createdAt: row.created_at }));
  return json({ data });
}

async function verifyTurnstile(request: Request, env: Env, token: string) {
  const secret = optionalString(env, "TURNSTILE_SECRET_KEY");
  if (!secret) return { configured: false, success: false };
  const body = new FormData();
  body.set("secret", secret);
  body.set("response", token);
  const ip = request.headers.get("CF-Connecting-IP");
  if (ip) body.set("remoteip", ip);
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
  if (!response.ok) return { configured: true, success: false };
  const result: unknown = await response.json();
  return { configured: true, success: isRecord(result) && result.success === true };
}

async function createComment(request: Request, env: Env, ctx: ExecutionContext) {
  if (!isSameOrigin(request)) return json({ error: "Origen no permitido" }, 403);
  const input = parseCommentPayload(await readJson(request));
  if (!input) return json({ error: "Revisa el nombre, el comentario y la verificación" }, 400);
  const rateKey = request.headers.get("CF-Connecting-IP") ?? "local";
  const rate = await env.COMMENT_RATE_LIMITER.limit({ key: rateKey });
  if (!rate.success) return json({ error: "Espera un momento antes de publicar otro comentario" }, 429, { "retry-after": "60" });
  const verification = await verifyTurnstile(request, env, input.turnstileToken);
  if (!verification.configured) return json({ error: "Los comentarios aún no están configurados" }, 503);
  if (!verification.success) return json({ error: "La verificación expiró o no es válida" }, 400);

  const { envelope } = await loadContent(env, ctx, "es");
  if (!publicationExists(envelope.data, input.publicationId)) return json({ error: "La publicación no existe" }, 404);
  const comment: PublicComment = { id: crypto.randomUUID(), name: input.name, message: input.message, createdAt: new Date().toISOString() };
  await env.DB.prepare("INSERT INTO comments (id, publication_id, author_name, body, created_at, hidden_at, legacy_id) VALUES (?, ?, ?, ?, ?, NULL, NULL)").bind(comment.id, input.publicationId, input.name, input.message, comment.createdAt).run();
  return json({ data: comment }, 201);
}

async function contentApi(url: URL, env: Env, ctx: ExecutionContext) {
  const requestedLocale = url.searchParams.get("locale");
  if (requestedLocale && !isLocale(requestedLocale)) return json({ error: "Locale inválido" }, 400);
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : "es";
  const previewToken = url.pathname === "/api/content/preview" ? url.searchParams.get("token") ?? undefined : undefined;
  if (url.pathname === "/api/content/preview" && !previewToken) return json({ error: "Vista previa inválida o expirada" }, 404);
  try {
    const result = await loadContent(env, ctx, locale, previewToken);
    const manifest = result.envelope.data;
    let envelope: PortfolioEnvelope<unknown> = result.envelope;
    const projectMatch = url.pathname.match(/^\/api\/content\/projects\/([^/]+)$/);
    const articleMatch = url.pathname.match(/^\/api\/content\/articles\/([^/]+)$/);
    if (url.pathname === "/api/content/projects") envelope = { ...result.envelope, data: manifest.projects };
    else if (url.pathname === "/api/content/articles") envelope = { ...result.envelope, data: manifest.articles };
    else if (projectMatch) {
      const item = manifest.projects.find((project) => project.slug === decodeURIComponent(projectMatch[1]));
      if (!item) return json({ error: "Proyecto no encontrado" }, 404);
      envelope = { ...result.envelope, data: item };
    } else if (articleMatch) {
      const item = manifest.articles.find((article) => article.slug === decodeURIComponent(articleMatch[1]));
      if (!item) return json({ error: "Artículo no encontrado" }, 404);
      envelope = { ...result.envelope, data: item };
    } else if (url.pathname !== "/api/content/manifest" && url.pathname !== "/api/content/preview") return json({ error: "Ruta de contenido no encontrada" }, 404);
    return json(envelope, 200, { "x-portfolio-source": result.source, "content-language": locale, etag: `W/\"${result.envelope.publishedRevision}-${locale}\"`, "cache-control": previewToken ? "private, no-store" : "public, max-age=60", ...(previewToken ? { "referrer-policy": "no-referrer" } : {}) });
  } catch {
    return previewToken
      ? json({ error: "Vista previa inválida o expirada" }, 404)
      : json({ error: "El contenido dinámico no está disponible" }, 503);
  }
}

async function media(request: Request, env: Env, ctx: ExecutionContext, path: string) {
  if (!/^\/media\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/.test(path)) return json({ error: "Medio no encontrado" }, 404);
  const previewToken = new URL(request.url).searchParams.get("token");
  const cached = previewToken ? null : await defaultCache().match(request);
  if (cached) return cached;
  const token = optionalString(env, "BRAIN_CONTENT_TOKEN");
  if (!token) return json({ error: "Medios no configurados" }, 503);
  const internalUrl = new URL(`https://secondbrain.internal/internal/v1/portfolio/${encodeURIComponent(env.SITE_KEY)}${path}`);
  if (previewToken) internalUrl.searchParams.set("token", previewToken);
  const response = await env.BRAIN.fetch(new Request(internalUrl, { headers: { authorization: `Bearer ${token}` } }));
  if (!response.ok) return json({ error: "Medio no encontrado" }, response.status === 404 ? 404 : 502);
  const headers = new Headers(response.headers);
  headers.set("cache-control", previewToken ? "private, no-store" : "public, max-age=31536000, immutable");
  headers.set("x-content-type-options", "nosniff");
  if (previewToken) headers.set("referrer-policy", "no-referrer");
  const publicResponse = new Response(response.body, { status: response.status, headers });
  if (!previewToken) ctx.waitUntil(defaultCache().put(request, publicResponse.clone()));
  return publicResponse;
}

function escapeXml(value: string) {
  return value.replace(/[<>&'\"]/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", "\"": "&quot;" })[character]!);
}

async function sitemap(env: Env, ctx: ExecutionContext) {
  const [es, en] = await Promise.all([loadContent(env, ctx, "es"), loadContent(env, ctx, "en")]);
  const origin = env.CANONICAL_ORIGIN.replace(/\/$/, "");
  const entries = ([{ locale: "es", manifest: es.envelope.data }, { locale: "en", manifest: en.envelope.data }] as const).flatMap(({ locale, manifest }) => [
    { locale, name: "home" as const }, { locale, name: "projects" as const }, { locale, name: "profile" as const }, { locale, name: "articles" as const }, { locale, name: "contact" as const },
    ...manifest.projects.map((item) => ({ locale, name: "project" as const, slug: item.slug })),
    ...manifest.articles.map((item) => ({ locale, name: "article" as const, slug: item.slug })),
  ]);
  const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries.map((entry) => {
    const slug = "slug" in entry ? entry.slug : undefined;
    const path = routePath(entry.locale, entry.name, slug);
    const esPath = routePath("es", entry.name, slug);
    const enPath = routePath("en", entry.name, slug);
    return `<url><loc>${escapeXml(`${origin}${path}`)}</loc><xhtml:link rel="alternate" hreflang="es" href="${escapeXml(`${origin}${esPath}`)}"/><xhtml:link rel="alternate" hreflang="en" href="${escapeXml(`${origin}${enPath}`)}"/><xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${origin}${esPath}`)}"/></url>`;
  }).join("")}</urlset>`;
  return new Response(body, { headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=300" } });
}

async function feed(env: Env, ctx: ExecutionContext, locale: Locale) {
  const { envelope } = await loadContent(env, ctx, locale);
  const origin = env.CANONICAL_ORIGIN.replace(/\/$/, "");
  const feedPath = `/${locale}/feed.xml`;
  const body = `<?xml version="1.0" encoding="UTF-8"?><feed xmlns="http://www.w3.org/2005/Atom" xml:lang="${locale}"><title>${escapeXml(envelope.data.site.name)}</title><id>${origin}${routePath(locale, "home")}</id><link href="${origin}${feedPath}" rel="self"/>${[...envelope.data.articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).map((item) => { const path = routePath(locale, "article", item.slug); return `<entry><title>${escapeXml(item.title)}</title><id>${origin}${escapeXml(path)}</id><link href="${origin}${escapeXml(path)}"/><updated>${item.publishedAt}T12:00:00-05:00</updated><summary>${escapeXml(item.excerpt)}</summary></entry>`; }).join("")}</feed>`;
  return new Response(body, { headers: { "content-type": "application/atom+xml; charset=utf-8", "content-language": locale, "cache-control": "public, max-age=300" } });
}

export function normalizeLegacyPath(pathname: string) {
  if (pathname === "/proyectos" || pathname === "/project") return routePath("es", "projects");
  if (pathname.startsWith("/proyectos/")) return routePath("es", "project", pathname.slice(11));
  if (pathname.startsWith("/project/")) return routePath("es", "project", pathname.slice(9).toLocaleLowerCase("es"));
  if (pathname === "/articulos" || pathname === "/blog") return routePath("es", "articles");
  if (pathname.startsWith("/articulos/")) return routePath("es", "article", pathname.slice(11));
  if (pathname.startsWith("/blog/")) return routePath("es", "article", pathname.slice(6).toLocaleLowerCase("es"));
  if (pathname === "/perfil" || pathname === "/about" || pathname === "/cv" || pathname.startsWith("/eventos")) return routePath("es", "profile");
  if (pathname === "/contacto" || pathname === "/contact") return routePath("es", "contact");
  if (pathname === "/all") return routePath("es", "allProjects");
  if (pathname === "/pricing" || pathname.startsWith("/service")) return `${routePath("es", "home")}#servicios`;
  if (pathname === "/feed.xml") return "/es/feed.xml";
  return null;
}

export function metaForPath(pathname: string, manifest: PortfolioManifest, origin: string, preview = false): RouteMeta {
  const match = matchLocalizedRoute(pathname) ?? matchLocalizedRoute(localizedPath(pathname, "es"));
  const locale = match?.locale ?? localeFromPath(pathname) ?? "es";
  const canonicalPath = match ? routePath(locale, match.name, match.slug) : pathname;
  const baseImage = new URL(manifest.site.seo.ogImage ?? "/og-card.svg", origin).href;
  const base = {
    image: baseImage,
    imageWidth: 1200,
    imageHeight: 630,
    type: "website" as const,
    status: 200,
    noindex: preview,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: manifest.site.name,
      url: new URL(routePath(locale, "home"), origin).href,
      email: manifest.site.email,
      jobTitle: locale === "en" ? "Systems engineer and web developer" : "Ingeniero de sistemas y desarrollador web",
      inLanguage: locale,
      address: { "@type": "PostalAddress", addressCountry: "PE" },
    },
  };
  if (match?.name === "home") return { ...base, title: manifest.site.seo.title, description: manifest.site.seo.description, canonicalPath };
  if (match?.name === "projects") return { ...base, title: `${locale === "en" ? "Projects" : "Proyectos"} — ${manifest.site.name}`, description: locale === "en" ? "Web products, internal systems, and digital experiences built by Arturo Vela." : "Productos web, sistemas internos y experiencias digitales construidas por Arturo Vela.", canonicalPath };
  if (match?.name === "allProjects") return { ...base, title: `${locale === "en" ? "All projects" : "Todos los proyectos"} — ${manifest.site.name}`, description: locale === "en" ? "Quick access to every project by Arturo Vela." : "Acceso rápido a todos los proyectos de Arturo Vela.", canonicalPath, noindex: true, structuredData: {} };
  if (match?.name === "profile") return { ...base, title: `${locale === "en" ? "Profile" : "Perfil"} — ${manifest.site.name}`, description: manifest.site.bio, canonicalPath };
  if (match?.name === "articles") return { ...base, title: `${locale === "en" ? "Articles" : "Artículos"} — ${manifest.site.name}`, description: locale === "en" ? "Notes on research, product, communities, and web engineering." : "Notas sobre investigación, producto, comunidades e ingeniería web.", canonicalPath };
  if (match?.name === "contact") return { ...base, title: `${locale === "en" ? "Contact" : "Contacto"} — ${manifest.site.name}`, description: locale === "en" ? "Talk with Arturo Vela about web products, internal systems, and technical collaboration." : "Conversa con Arturo Vela sobre productos web, sistemas internos y colaboración técnica.", canonicalPath };
  const project = match?.name === "project" ? manifest.projects.find((item) => item.slug === match.slug) : undefined;
  if (project) {
    const cover = projectDisplayCover(project);
    return { ...base, title: project.seo.title ?? `${project.title} — ${manifest.site.name}`, description: project.seo.description ?? project.excerpt, canonicalPath, image: cover ? new URL(cover.src, origin).href : baseImage, imageWidth: cover?.width ?? 1200, imageHeight: cover?.height ?? 630, structuredData: { "@context": "https://schema.org", "@type": "CreativeWork", name: project.title, description: project.excerpt, inLanguage: locale, creator: { "@type": "Person", name: manifest.site.name }, url: new URL(canonicalPath, origin).href } };
  }
  const article = match?.name === "article" ? manifest.articles.find((item) => item.slug === match.slug) : undefined;
  if (article) return { ...base, title: article.seo.title ?? `${article.title} — ${manifest.site.name}`, description: article.seo.description ?? article.excerpt, canonicalPath, image: article.cover ? new URL(article.cover.src, origin).href : baseImage, imageWidth: article.cover?.width ?? 1200, imageHeight: article.cover?.height ?? 630, type: "article", structuredData: { "@context": "https://schema.org", "@type": "BlogPosting", headline: article.title, description: article.excerpt, datePublished: article.publishedAt, inLanguage: locale, author: { "@type": "Person", name: manifest.site.name }, url: new URL(canonicalPath, origin).href } };
  return { ...base, title: `${locale === "en" ? "Page not found" : "Página no encontrada"} — ${manifest.site.name}`, description: locale === "en" ? "The requested page does not exist." : "La ruta solicitada no existe.", canonicalPath, status: 404, noindex: true, structuredData: {} };
}

function isHtmlNavigation(request: Request, pathname: string) {
  if (request.method !== "GET" && request.method !== "HEAD") return false;
  if (/\.[a-zA-Z0-9]{2,8}$/.test(pathname)) return false;
  return request.headers.get("sec-fetch-mode") === "navigate" || (request.headers.get("accept") ?? "").includes("text/html");
}

async function html(request: Request, env: Env, ctx: ExecutionContext) {
  const url = new URL(request.url);
  const previewToken = url.pathname === "/__preview" ? url.searchParams.get("token") ?? undefined : undefined;
  if (url.pathname === "/__preview" && !previewToken) return json({ error: "Vista previa inválida o expirada" }, 404);
  const renderedPath = previewToken ? url.searchParams.get("path") ?? routePath("es", "home") : url.pathname;
  const locale = localeFromPath(renderedPath) ?? "es";
  let result: ContentResult;
  try {
    result = await loadContent(env, ctx, locale, previewToken);
  } catch (error) {
    if (!previewToken) throw error;
    return json({ error: "Vista previa inválida o expirada" }, 404);
  }
  const meta = metaForPath(renderedPath, result.envelope.data, env.CANONICAL_ORIGIN, Boolean(previewToken));
  const asset = await env.ASSETS.fetch(request);
  if (!asset.ok || !asset.body) return new Response("No se pudo cargar la aplicación", { status: 503 });
  const headers = new Headers(asset.headers);
  headers.set("cache-control", previewToken ? "private, no-store" : "no-cache");
  headers.set("x-content-type-options", "nosniff");
  headers.set("referrer-policy", previewToken ? "no-referrer" : "strict-origin-when-cross-origin");
  headers.set("permissions-policy", "camera=(), microphone=(), geolocation=()");
  headers.set("x-frame-options", "DENY");
  headers.set("content-language", locale);
  if (url.hostname !== "localhost" && url.hostname !== "127.0.0.1") {
    headers.set("content-security-policy", "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self' https://formspree.io; script-src 'self' https://challenges.cloudflare.com https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data:; connect-src 'self' https://formspree.io https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com; upgrade-insecure-requests");
  }
  const shell = new Response(asset.body, { status: meta.status, headers });
  const canonical = new URL(meta.canonicalPath, env.CANONICAL_ORIGIN).href;
  const routeMatch = matchLocalizedRoute(meta.canonicalPath);
  const spanish = new URL(routeMatch ? routePath("es", routeMatch.name, routeMatch.slug) : routePath("es", "home"), env.CANONICAL_ORIGIN).href;
  const english = new URL(routeMatch ? routePath("en", routeMatch.name, routeMatch.slug) : routePath("en", "home"), env.CANONICAL_ORIGIN).href;
  const safeEnvelope = JSON.stringify(result.envelope).replace(/</g, "\\u003c");
  const safeStructuredData = JSON.stringify(meta.structuredData).replace(/</g, "\\u003c");
  return new HTMLRewriter()
    .on("html", { element(element) { element.setAttribute("lang", locale); } })
    .on("title", { element(element) { element.setInnerContent(meta.title); } })
    .on('meta[name="description"]', { element(element) { element.setAttribute("content", meta.description); } })
    .on('meta[name="robots"]', { element(element) { element.setAttribute("content", meta.noindex ? "noindex,nofollow" : "index,follow"); } })
    .on('meta[property="og:type"]', { element(element) { element.setAttribute("content", meta.type); } })
    .on('meta[property="og:title"]', { element(element) { element.setAttribute("content", meta.title); } })
    .on('meta[property="og:description"]', { element(element) { element.setAttribute("content", meta.description); } })
    .on('meta[property="og:image"]', { element(element) { element.setAttribute("content", meta.image); } })
    .on('meta[property="og:image:width"]', { element(element) { element.setAttribute("content", String(meta.imageWidth)); } })
    .on('meta[property="og:image:height"]', { element(element) { element.setAttribute("content", String(meta.imageHeight)); } })
    .on('meta[property="og:url"]', { element(element) { element.setAttribute("content", canonical); } })
    .on('meta[property="og:locale"]', { element(element) { element.setAttribute("content", locale === "en" ? "en_US" : "es_PE"); } })
    .on('meta[name="twitter:title"]', { element(element) { element.setAttribute("content", meta.title); } })
    .on('meta[name="twitter:description"]', { element(element) { element.setAttribute("content", meta.description); } })
    .on('meta[name="twitter:image"]', { element(element) { element.setAttribute("content", meta.image); } })
    .on('link[rel="canonical"]', { element(element) { element.setAttribute("href", canonical); } })
    .on('link[data-hreflang="es"]', { element(element) { element.setAttribute("href", spanish); } })
    .on('link[data-hreflang="en"]', { element(element) { element.setAttribute("href", english); } })
    .on('link[data-hreflang="x-default"]', { element(element) { element.setAttribute("href", spanish); } })
    .on('link[data-localized-feed]', { element(element) { element.setAttribute("href", `/${locale}/feed.xml`); element.setAttribute("title", locale === "en" ? "Arturo Vela's articles" : "Artículos de Arturo Vela"); } })
    .on("#portfolio-content", { element(element) { element.setInnerContent(safeEnvelope, { html: true }); } })
    .on("#structured-data", { element(element) { element.setInnerContent(safeStructuredData, { html: true }); } })
    .transform(shell);
}

async function route(request: Request, env: Env, ctx: ExecutionContext) {
  const url = new URL(request.url);
  if (url.hostname === "www.velaarturo.com") return Response.redirect(`https://velaarturo.com${url.pathname}${url.search}${url.hash}`, 301);
  if (url.pathname === "/" && (request.method === "GET" || request.method === "HEAD")) {
    const locale = preferredLocale(request.headers.get("cookie"), request.headers.get("accept-language"));
    return Response.redirect(new URL(routePath(locale, "home"), env.CANONICAL_ORIGIN).href, 302);
  }
  const legacy = normalizeLegacyPath(url.pathname);
  if (legacy) return Response.redirect(new URL(`${legacy}${legacy.includes("#") ? "" : url.search}`, env.CANONICAL_ORIGIN).href, 301);
  if (url.pathname === "/api/health" && request.method === "GET") return json({ data: { ok: true, service: "velaarturo" } });
  if (url.pathname === "/api/comments" && request.method === "GET") return listComments(request, env);
  if (url.pathname === "/api/comments" && request.method === "POST") return createComment(request, env, ctx);
  if (url.pathname.startsWith("/api/content/") && request.method === "GET") return contentApi(url, env, ctx);
  if (url.pathname.startsWith("/api/")) return json({ error: "Ruta no encontrada" }, 404);
  if (url.pathname.startsWith("/media/") && request.method === "GET") return media(request, env, ctx, url.pathname);
  if (url.pathname === "/sitemap.xml" && request.method === "GET") return sitemap(env, ctx);
  if (url.pathname === "/es/feed.xml" && request.method === "GET") return feed(env, ctx, "es");
  if (url.pathname === "/en/feed.xml" && request.method === "GET") return feed(env, ctx, "en");
  if (url.pathname === "/robots.txt" && request.method === "GET") return new Response(`User-agent: *\nAllow: /\nSitemap: ${env.CANONICAL_ORIGIN}/sitemap.xml\n`, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=86400" } });
  if (isHtmlNavigation(request, url.pathname) || url.pathname === "/__preview") return html(request, env, ctx);
  return env.ASSETS.fetch(request);
}

export default {
  async fetch(request, env, ctx) {
    try { return await route(request, env, ctx); }
    catch (error) {
      console.error(JSON.stringify({ event: "request_failed", path: new URL(request.url).pathname, error: error instanceof Error ? error.message : String(error) }));
      return json({ error: "Error interno" }, 500);
    }
  },
} satisfies ExportedHandler<Env>;
