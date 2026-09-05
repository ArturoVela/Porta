import { FALLBACK_ENVELOPE } from "@/content/fallback";
import type { PortfolioEnvelope, PortfolioManifest } from "@/types/content";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasOnlyKeys(value: Record<string, unknown>, keys: readonly string[]) {
  const allowed = new Set(keys);
  return Object.keys(value).every((key) => allowed.has(key));
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString);
}

function isSeo(value: unknown) {
  return isRecord(value)
    && hasOnlyKeys(value, ["title", "description", "ogImage"])
    && (value.title === undefined || isString(value.title))
    && (value.description === undefined || isString(value.description))
    && (value.ogImage === undefined || isString(value.ogImage));
}

function isCover(value: unknown) {
  return isRecord(value)
    && hasOnlyKeys(value, ["src", "alt", "width", "height"])
    && isString(value.src)
    && isString(value.alt)
    && Number.isInteger(value.width)
    && Number(value.width) > 0
    && Number.isInteger(value.height)
    && Number(value.height) > 0;
}

function isSite(value: unknown) {
  if (!isRecord(value) || !hasOnlyKeys(value, ["name", "headline", "intro", "availability", "location", "bio", "email", "phone", "cvUrl", "portrait", "socials", "seo"])) return false;
  return [value.name, value.headline, value.intro, value.availability, value.location, value.bio, value.email].every(isString)
    && (value.phone === undefined || isString(value.phone))
    && (value.cvUrl === undefined || isString(value.cvUrl))
    && (value.portrait === undefined || isCover(value.portrait))
    && Array.isArray(value.socials)
    && value.socials.every((social) => isRecord(social) && hasOnlyKeys(social, ["label", "url"]) && isString(social.label) && isString(social.url))
    && isSeo(value.seo)
    && isRecord(value.seo)
    && isString(value.seo.title)
    && isString(value.seo.description);
}

function isService(value: unknown) {
  return isRecord(value)
    && hasOnlyKeys(value, ["id", "title", "description", "capabilities"])
    && isString(value.id)
    && isString(value.title)
    && isString(value.description)
    && isStringArray(value.capabilities);
}

function isProject(value: unknown) {
  if (!isRecord(value) || !hasOnlyKeys(value, ["id", "slug", "title", "excerpt", "body", "category", "type", "role", "year", "stack", "outcomes", "liveUrl", "repoUrl", "featured", "order", "cover", "gallery", "seo"])) return false;
  return [value.id, value.slug, value.title, value.excerpt, value.body, value.category, value.type, value.role, value.year].every(isString)
    && isStringArray(value.stack)
    && isStringArray(value.outcomes)
    && (value.liveUrl === undefined || isString(value.liveUrl))
    && (value.repoUrl === undefined || isString(value.repoUrl))
    && typeof value.featured === "boolean"
    && Number.isInteger(value.order)
    && (value.cover === undefined || isCover(value.cover))
    && (value.gallery === undefined || (Array.isArray(value.gallery) && value.gallery.every(isCover)))
    && isSeo(value.seo);
}

function isArticle(value: unknown) {
  if (!isRecord(value) || !hasOnlyKeys(value, ["id", "slug", "title", "excerpt", "body", "category", "tags", "publishedAt", "readingMinutes", "cover", "seo"])) return false;
  return [value.id, value.slug, value.title, value.excerpt, value.body, value.category, value.publishedAt].every(isString)
    && isStringArray(value.tags)
    && Number.isInteger(value.readingMinutes)
    && Number(value.readingMinutes) > 0
    && (value.cover === undefined || isCover(value.cover))
    && isSeo(value.seo);
}

export function isPortfolioEnvelope(value: unknown): value is PortfolioEnvelope {
  if (!isRecord(value)
    || !hasOnlyKeys(value, ["schemaVersion", "siteKey", "publishedRevision", "generatedAt", "data"])
    || value.schemaVersion !== "1"
    || value.siteKey !== "velaarturo"
    || !Number.isInteger(value.publishedRevision)
    || Number(value.publishedRevision) < 0
    || !isString(value.generatedAt)
    || !isRecord(value.data)
    || !hasOnlyKeys(value.data, ["site", "services", "projects", "articles"])) return false;
  const data = value.data;
  return isSite(data.site)
    && Array.isArray(data.services)
    && data.services.every(isService)
    && Array.isArray(data.projects)
    && data.projects.every(isProject)
    && Array.isArray(data.articles)
    && data.articles.every(isArticle);
}

export function bootstrapEnvelope(): PortfolioEnvelope | null {
  if (typeof document === "undefined") return null;
  const raw = document.querySelector<HTMLScriptElement>("#portfolio-content")?.textContent?.trim();
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    return isPortfolioEnvelope(value) ? value : null;
  } catch {
    return null;
  }
}

export async function fetchManifest(signal?: AbortSignal, previewToken?: string | null): Promise<PortfolioEnvelope> {
  const endpoint = previewToken ? `/api/content/preview?token=${encodeURIComponent(previewToken)}` : "/api/content/manifest";
  const response = await fetch(endpoint, { signal, headers: { Accept: "application/json" }, ...(previewToken ? { cache: "no-store" as const } : {}) });
  if (!response.ok) throw new Error("No se pudo actualizar el contenido");
  const value: unknown = await response.json();
  if (!isPortfolioEnvelope(value)) throw new Error("El contenido recibido no cumple el contrato v1");
  return value;
}

export function initialManifest(): PortfolioManifest {
  return bootstrapEnvelope()?.data ?? FALLBACK_ENVELOPE.data;
}
