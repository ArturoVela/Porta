import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { FALLBACK_ENVELOPE } from "@/content/fallback";
import { FALLBACK_ENVELOPE_EN } from "@/content/fallback-en";
import { isPortfolioEnvelope } from "@/lib/content";
import { WALLET_COLLECTIONS, WALLET_PROJECTS } from "@/lib/linktree";
import { projectCatalogGroups, withProjectCatalog } from "@/lib/projectCatalog";
import { projectAvailabilityLabel } from "@/lib/projectAvailability";
import { metaForPath } from "../worker/index";

describe("catálogo compartido de proyectos", () => {
  it.each(["es", "en"] as const)("ofrece 18 capturas 16:9 con archivos responsive disponibles en %s", (locale) => {
    const source = locale === "en" ? FALLBACK_ENVELOPE_EN : FALLBACK_ENVELOPE;
    const projects = withProjectCatalog(source, locale).data.projects;
    const captures = projects.filter((project) => project.cover?.src.startsWith("/assets/images/project-covers/"));
    expect(captures).toHaveLength(18);
    for (const { cover } of captures) {
      expect(cover).toMatchObject({ width: 1280, height: 720 });
      expect(cover!.alt).toContain(locale === "en" ? "home page" : "Página de inicio");
      for (const width of [640, 1280]) {
        for (const format of ["avif", "webp"]) {
          const path = cover!.src.replace(/\.webp$/, `${width === 1280 ? "" : `-${width}`}.${format}`);
          expect(existsSync(new URL(`../public${path}`, import.meta.url)), path).toBe(true);
        }
      }
    }
    expect(projects.find((project) => project.slug === "status")?.cover).toBeUndefined();
  });

  it("actualiza capturas lejanas incluidas en manifiestos almacenados", () => {
    const project = { ...FALLBACK_ENVELOPE.data.projects[0], cover: { src: "/assets/images/project-covers/hub.webp", alt: "Portada anterior", width: 3840, height: 2160 } };
    const source = { ...FALLBACK_ENVELOPE, data: { ...FALLBACK_ENVELOPE.data, projects: [project] } };
    expect(withProjectCatalog(source, "es").data.projects.find((item) => item.slug === "hub")?.cover).toEqual({
      src: "/assets/images/project-covers/hub-home.webp", alt: "Página de inicio de Hub", width: 1280, height: 720,
    });
    expect(project.cover.src).toBe("/assets/images/project-covers/hub.webp");
  });

  it.each(["es", "en"] as const)("actualiza el correo anterior del CMS sin alterar otros contactos en %s", (locale) => {
    const source = locale === "en" ? FALLBACK_ENVELOPE_EN : FALLBACK_ENVELOPE;
    const legacy = { ...source, data: { ...source.data, site: { ...source.data.site, email: "cv@velaarturo.com" } } };
    const updated = withProjectCatalog(legacy, locale);
    expect(updated.data.site).toEqual({ ...source.data.site, email: "dev@velaarturo.com" });
    expect(metaForPath(locale === "en" ? "/en/dev" : "/dev", updated.data, "https://velaarturo.com").structuredData.email).toBe("dev@velaarturo.com");
    expect(legacy.data.site.email).toBe("cv@velaarturo.com");
    const other = { ...source, data: { ...source.data, site: { ...source.data.site, email: "other@example.com" } } };
    expect(withProjectCatalog(other, locale).data.site.email).toBe("other@example.com");
  });

  it.each(["es", "en"] as const)("incluye todos los dominios y conserva casos históricos en %s", (locale) => {
    const source = locale === "en" ? FALLBACK_ENVELOPE_EN : FALLBACK_ENVELOPE;
    const envelope = withProjectCatalog(source, locale);
    const projects = envelope.data.projects;
    expect(isPortfolioEnvelope(envelope)).toBe(true);
    expect(projects).toHaveLength(41);
    expect(new Set(projects.map((project) => project.slug)).size).toBe(41);
    expect(new Set(projects.map((project) => project.order)).size).toBe(41);
    for (const app of WALLET_PROJECTS) {
      expect(projects.find((project) => project.slug === app.caseSlug)?.liveUrl).toBe(`https://${app.domain}`);
    }
    for (const project of source.data.projects) {
      expect(projects.find((item) => item.slug === project.slug)).toMatchObject({ body: project.body, year: project.year, stack: project.stack });
    }
    expect(withProjectCatalog(envelope, locale)).toEqual(envelope);
  });

  it("preserva cambios del CMS y usa el contenido bilingüe para casos ausentes", () => {
    const edited = { ...FALLBACK_ENVELOPE_EN.data.projects[0], body: "Edited in CMS", cover: { src: "/media/custom", alt: "CMS cover", width: 1280, height: 720 } };
    const source = { ...FALLBACK_ENVELOPE_EN, publishedRevision: 99, data: { ...FALLBACK_ENVELOPE_EN.data, projects: [edited] } };
    const { data, publishedRevision } = withProjectCatalog(source, "en");
    expect(publishedRevision).toBe(99);
    expect(data.projects.find((project) => project.slug === "hub")).toEqual(edited);
    expect(data.projects.find((project) => project.slug === "coffee")?.body).toBe(FALLBACK_ENVELOPE_EN.data.projects.find((project) => project.slug === "coffee")?.body);
    expect(data.projects.find((project) => project.slug === "torneo")?.body).toContain("Teams balanced by skill and position");
    expect(data.projects.find((project) => project.slug === "tarjetas")?.body).toContain("mailto:tarjetas@velaarturo.com");
  });

  it("reutiliza las colecciones del tarjetero y conserva proyectos fuera de ellas", () => {
    const projects = withProjectCatalog(FALLBACK_ENVELOPE, "es").data.projects;
    const groups = projectCatalogGroups(projects);
    for (const collection of WALLET_COLLECTIONS) {
      expect(groups.find((group) => group.id === collection.id)?.projects.map((project) => project.slug)).toEqual(
        collection.projects.map((id) => WALLET_PROJECTS.find((app) => app.id === id)?.caseSlug),
      );
    }
    expect(groups.find((group) => group.id === "otros")?.projects.map((project) => project.slug)).toContain("nieto-import");
    expect(new Set(groups.flatMap((group) => group.projects.map((project) => project.id))).size).toBe(41);
  });

  it("mantiene acceso restringido y metadatos válidos para fichas nuevas", () => {
    const { data } = withProjectCatalog(FALLBACK_ENVELOPE_EN, "en");
    for (const slug of ["agua", "agro", "second-brain"]) {
      expect(projectAvailabilityLabel(data.projects.find((project) => project.slug === slug)!, "en")).toBe("Restricted access");
    }
    expect(metaForPath("/en/projects/status", data, "https://velaarturo.com")).toMatchObject({ status: 200, noindex: false });
    expect(data.projects.find((project) => project.slug === "status")?.stack).toEqual([]);
  });
});
