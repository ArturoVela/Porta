import { WALLET_COLLECTIONS, WALLET_COPY_EN, WALLET_PROJECTS } from "@/lib/linktree";
import { FALLBACK_ENVELOPE } from "@/content/fallback";
import { FALLBACK_ENVELOPE_EN } from "@/content/fallback-en";
import type { Locale } from "@/i18n";
import type { PortfolioEnvelope, ProjectContent } from "@/types/content";

export function withProjectCatalog(envelope: PortfolioEnvelope, locale: Locale): PortfolioEnvelope {
  const bundled = locale === "en" ? FALLBACK_ENVELOPE_EN : FALLBACK_ENVELOPE;
  const projects = envelope.data.projects.map((project) => {
    const app = WALLET_PROJECTS.find((item) => item.caseSlug === project.slug);
    return app && (!project.liveUrl || /^https:\/\/[^/]+\.workers\.dev\/?$/.test(project.liveUrl))
      ? { ...project, liveUrl: `https://${app.domain}` } : project;
  });
  const order = Math.max(0, ...projects.map((project) => project.order)) + 1;
  const additions = WALLET_PROJECTS.filter((app) => !projects.some((project) => project.slug === app.caseSlug))
    .map((app, index): ProjectContent => {
      const authored = bundled.data.projects.find((project) => project.slug === app.caseSlug);
      if (authored) return { ...authored, liveUrl: `https://${app.domain}`, order: order + index };
      const english = WALLET_COPY_EN[app.id];
      const description = locale === "en" ? english?.description ?? app.description : app.description;
      const features = locale === "en" ? english?.features ?? app.features : app.features;
      const collection = WALLET_COLLECTIONS.find((group) => group.projects.includes(app.id));
      const access = locale === "en"
        ? app.private ? "Access to the application is reserved for authorized accounts." : "Visit the product website for its features and access conditions."
        : app.private ? "El acceso a la aplicación está reservado a cuentas autorizadas." : "Visita la web del producto para consultar sus funciones y condiciones de acceso.";
      const body = [
        `## ${locale === "en" ? "Purpose" : "Propósito"}\n\n${description}`,
        `## ${locale === "en" ? "Capabilities" : "Capacidades"}\n\n${features.map((feature) => `- ${feature}`).join("\n")}`,
        `## ${locale === "en" ? "Access" : "Acceso"}\n\n${access}\n\n[${app.domain}](https://${app.domain})`,
        ...(app.id === "tarjetas" ? [`${locale === "en" ? "Contact" : "Contacto"}: [tarjetas@velaarturo.com](mailto:tarjetas@velaarturo.com)`] : []),
      ].join("\n\n");
      return {
        id: `catalog-${app.id}`, slug: app.caseSlug!, title: app.name, excerpt: description, body,
        category: locale === "en" ? collection?.nameEn ?? "Independent product" : collection?.name ?? "Producto propio",
        type: locale === "en" ? app.private ? "Private web application" : "Web application" : app.private ? "Aplicación web privada" : "Aplicación web",
        role: locale === "en" ? "Independent product" : "Producto propio",
        year: locale === "en" ? "Current" : "Actual", stack: [], outcomes: features,
        liveUrl: `https://${app.domain}`, featured: false, order: order + index,
        ...(app.image ? { cover: { src: app.image, alt: `${locale === "en" ? "Visual identity" : "Identidad visual"}: ${app.name}`, width: 750, height: 288 } } : {}),
        seo: { description },
      };
    });
  return { ...envelope, data: { ...envelope.data, site: { ...envelope.data.site, email: envelope.data.site.email === "cv@velaarturo.com" ? bundled.data.site.email : envelope.data.site.email }, projects: [...projects, ...additions] } };
}

export function projectCatalogGroups(projects: ProjectContent[]) {
  const groups = WALLET_COLLECTIONS.map((collection) => ({
    ...collection,
    projects: collection.projects.flatMap((id) => {
      const app = WALLET_PROJECTS.find((item) => item.id === id)!;
      return projects.filter((project) => project.slug === app.caseSlug);
    }),
  }));
  const assigned = new Set(groups.flatMap((group) => group.projects.map((project) => project.id)));
  return [...groups, { id: "otros", name: "Otros proyectos", nameEn: "Other projects", projects: projects.filter((project) => !assigned.has(project.id)) }];
}
