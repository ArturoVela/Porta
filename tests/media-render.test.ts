import { ChakraProvider } from "@chakra-ui/react";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter, Route, Routes } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ContentProvider } from "@/content/context";
import { HomeProductCarousel } from "@/components/HomeProductCarousel";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { FALLBACK_ENVELOPE } from "@/content/fallback";
import { HomePage } from "@/pages/HomePage";
import { ProfilePage } from "@/pages/ProfilePage";
import { ProjectPage } from "@/pages/ProjectPage";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { selectHomeProducts, selectSpotlightProjects } from "@/lib/spotlight";
import { projectCatalogGroups } from "@/lib/projectCatalog";
import { system } from "@/theme";
import type { ProjectContent } from "@/types/content";

const cover = { src: "/media/2/cover?token=preview-token", alt: "Portada editada", width: 1280, height: 720 };
const screen = { ...cover, src: "/media/2/screen?token=preview-token", alt: "Pantalla editada" };
const portrait = { ...cover, src: "/media/2/portrait?token=preview-token", alt: "Retrato editado" };
const project = { ...FALLBACK_ENVELOPE.data.projects[0], id: "project-new", slug: "nuevo", title: "Título desde Second Brain", cover, gallery: [screen] };

function renderContent(child: ReturnType<typeof createElement>, projects: ProjectContent[] = [project]) {
  const envelope = { ...FALLBACK_ENVELOPE, data: { ...FALLBACK_ENVELOPE.data, site: { ...FALLBACK_ENVELOPE.data.site, portrait }, projects } };
  vi.stubGlobal("document", { documentElement: { lang: "es" }, querySelector: () => ({ textContent: JSON.stringify(envelope) }) });
  return renderToStaticMarkup(createElement(MemoryRouter, { initialEntries: ["/__preview?token=preview-token&path=%2Fproyectos%2Fnuevo"] },
    createElement(ChakraProvider, { value: system, children: createElement(ContentProvider, { children: child }) })));
}

afterEach(() => vi.unstubAllGlobals());

describe("imágenes editadas en Second Brain", () => {
  it("ofrece variantes AVIF/WebP sin aplicar rutas generadas a imágenes del CMS", () => {
    const markup = renderContent(createElement(ResponsiveImage, {
      image: { src: "/assets/images/project-covers/divide-home.webp", alt: "Página de inicio de Divide", width: 1280, height: 720 },
      sizes: "(min-width: 80rem) 400px, 100vw",
    }));
    for (const format of ["avif", "webp"]) {
      for (const width of [640, 1280]) {
        expect(markup).toContain(`/assets/images/project-covers/divide-home${width === 1280 ? "" : `-${width}`}.${format} ${width}w`);
      }
    }
    expect(markup).toContain('sizes="(min-width: 80rem) 400px, 100vw"');
    const cmsMarkup = renderContent(createElement(ResponsiveImage, { image: cover }));
    expect(cmsMarkup).toContain('src="/media/2/cover?token=preview-token"');
    expect(cmsMarkup).not.toContain("srcSet=");
  });

  it("ubica hora local y uptime bajo disponibilidad sin bloquear el hero durante carga", () => {
    const markup = renderContent(createElement(HomePage));
    const availability = markup.indexOf(FALLBACK_ENVELOPE.data.site.availability);
    const signals = markup.indexOf('class="home-signals"');
    expect(signals).toBeGreaterThan(availability);
    expect(signals).toBeLessThan(markup.indexOf('aria-roledescription="carrusel"'));
    expect(markup).toContain("Tu hora local");
    expect(markup).toContain("Uptime medio");
    expect(markup).toMatch(/<time dateTime="[^\"]+">/);
    expect(markup).toContain('aria-label="Consultando uptime…"');
    expect(markup).toContain('href="https://status.velaarturo.com/"');
  });

  it("mantiene Proceso legible sin animación y oculta su fondo decorativo a lectores de pantalla", () => {
    const markup = renderContent(createElement(HomePage));
    const section = markup.match(/<section\b[^>]*\bid="enfoque"[^>]*>([\s\S]*?)<\/section>/)?.[1];
    expect(section).toBeDefined();
    expect(section).toMatch(/class="process-scan"[^>]*aria-hidden="true"/);
    expect(section).toContain("Entender antes de construir");
    for (const title of ["Entender", "Construir", "Verificar"]) expect(section).toContain(`>${title}</h3>`);
    expect(section).not.toMatch(/<video|<iframe|<img|role="status"/);
  });

  it("muestra una sola vez el proyecto destacado en la portada corta", () => {
    const markup = renderContent(createElement(HomePage));
    expect(markup).toContain('src="/media/2/cover?token=preview-token"');
    expect(markup.match(/<h3[^>]*>Título desde Second Brain<\/h3>/g)).toHaveLength(1);
    expect(markup).toContain("Convierto procesos complejos en productos web claros y mantenibles.");
    expect(markup).not.toContain("En foco");
    expect(markup).not.toContain("Mis proyectos SaaS");
    expect(markup).not.toContain("Notas de trabajo");
    expect(markup).not.toContain("Stack actual");
  });

  it("mantiene tres destacados y permite acceso adicional desde el slider público", () => {
    const markup = renderContent(createElement(HomePage), FALLBACK_ENVELOPE.data.projects);
    for (const slug of ["nieto-import", "explora-san-martin", "coffee"]) {
      expect(markup).toContain(`path=%2Fes%2Fproyectos%2F${slug}`);
    }
    expect(markup.match(/class="project-feature /g)).toHaveLength(3);
  });

  it("usa captura editada en slider y conserva productos públicos sin casos del manifiesto", () => {
    const explora = FALLBACK_ENVELOPE.data.projects.find((item) => item.slug === "explora-san-martin")!;
    const markup = renderContent(createElement(HomePage), [{ ...explora, cover }]);
    expect(markup).toContain('class="home-product-carousel');
    expect(markup).toContain('src="/media/2/cover?token=preview-token"');
    expect(markup).toContain('loading="eager"');
    const withoutCases = renderContent(createElement(HomePage), []);
    expect(withoutCases).toContain('class="home-product-carousel');
    expect(withoutCases).toContain('https://explora.velaarturo.com');
    expect(withoutCases).not.toContain('path=%2Fes%2Fproyectos%2Fexplora-san-martin');
  });

  it("elige ocho productos públicos únicos, incluidos SaaS, y reutiliza marca sin inventar capturas", () => {
    const products = selectHomeProducts(FALLBACK_ENVELOPE.data.projects);
    expect(products.map(({ app }) => app.id)).toEqual(["explora", "coffee", "hub", "cotiza", "ventas", "finanzas", "bc", "tarjetas"]);
    expect(products.every(({ app }) => !app.private)).toBe(true);
    expect(new Set(products.map(({ app }) => app.id)).size).toBe(products.length);
    expect(products[0].cover?.src).toContain('project-covers/explora');
    expect(products.find(({ app }) => app.id === 'ventas')?.cover).toBeUndefined();
    const markup = renderContent(createElement(HomePage), FALLBACK_ENVELOPE.data.projects);
    expect(markup).toContain('data-brand="true"');
    expect(markup).toContain('alt="Imagen de marca: Vela Ventas"');
    expect(markup).toContain('aria-label="Siguiente producto"');
    expect(markup).toContain('sizes="(min-width: 80rem) 640px, (min-width: 64rem) 50vw, 100vw"');
    expect(markup.match(/<div\b(?=[^>]*data-part="item")(?=[^>]*inert="")[^>]*>/g)).toHaveLength(7);
    expect(markup.match(/aria-pressed="true"/g)).toHaveLength(1);
    expect(markup.match(/aria-pressed="false"/g)).toHaveLength(7);
    expect(markup).toContain('aria-label="Explora San Martín — 1 de 8"');
  });

  it("muestra el retrato del manifiesto en el perfil", () => {
    expect(renderContent(createElement(ProfilePage))).toContain('src="/media/2/portrait?token=preview-token"');
  });

  it("conserva navegación circular y pausa accesible; desactiva avance con un solo producto", () => {
    const products = selectHomeProducts(FALLBACK_ENVELOPE.data.projects);
    const markup = renderContent(createElement(HomeProductCarousel, { products }));
    expect(markup).toContain('class="home-product-indicator-dot');
    expect(markup).toContain('aria-label="Reproducir carrusel"');
    expect(markup).not.toContain('disabled=""');
    const single = renderContent(createElement(HomeProductCarousel, { products: products.slice(0, 1) }));
    expect(single.match(/disabled=""/g)).toHaveLength(3);
    expect(single.match(/aria-pressed="true"/g)).toHaveLength(1);
  });

  it("muestra un proyecto nuevo con portada y galería", () => {
    const markup = renderContent(createElement(Routes, { location: "/proyectos/nuevo", children: createElement(Route, { path: "/proyectos/:slug", element: createElement(ProjectPage) }) }));
    expect(markup).toContain("Título desde Second Brain");
    expect(markup).toContain('src="/media/2/cover?token=preview-token"');
    expect(markup).toContain('src="/media/2/screen?token=preview-token"');
    expect(markup).toContain("Pantalla editada");
    expect(markup.match(/data-project-hero="true"/g)).toHaveLength(1);
    expect(markup).toContain('data-project-image="nuevo"');
    expect(markup).toContain('loading="eager" fetchPriority="high"');
    expect(markup.indexOf("El reto")).toBeLessThan(markup.indexOf('src="/media/2/screen?token=preview-token"'));
    expect(markup.indexOf("¿Necesitas simplificar un proceso parecido?")).toBeLessThan(markup.indexOf("Siguiente lectura"));
  });

  it("muestra una vista visual para cada proyecto del archivo", () => {
    const projects = FALLBACK_ENVELOPE.data.projects.map((item, index) => ({ ...item, featured: index === 0 }));
    const envelope = { ...FALLBACK_ENVELOPE, data: { ...FALLBACK_ENVELOPE.data, projects } };
    vi.stubGlobal("document", { documentElement: { lang: "es" }, querySelector: () => ({ textContent: JSON.stringify(envelope) }) });
    const markup = renderToStaticMarkup(createElement(MemoryRouter, { initialEntries: ["/proyectos"] },
      createElement(ChakraProvider, { value: system, children: createElement(ContentProvider, { children: createElement(ProjectsPage) }) })));

    expect(markup.match(/class="[^"]*project-card__visual/g)).toHaveLength(projectCatalogGroups(projects).reduce((total, group) => total + group.projects.length, 0));
    expect(markup).toContain("details-thumb_cana.webp");
    expect(projects.every((item) => markup.includes(item.title))).toBe(true);
  });

  it("mantiene fichas ocultas fuera del teclado y botones separados de enlaces", () => {
    const markup = renderContent(createElement(ProjectsPage));
    const controls = [...markup.matchAll(/<button[^>]*class="project-preview-toggle"[^>]*aria-controls="([^"]+)"[^>]*aria-expanded="false"/g)];
    expect(controls.length).toBeGreaterThan(0);
    expect(markup.match(/class="project-preview-controls"><button/g)).toHaveLength(controls.length);
    for (const [, id] of controls) expect(markup).toContain(`id="${id}" class="project-preview-panel" inert="" aria-hidden="true"`);
    expect(markup).toContain('class="project-preview-dots" aria-hidden="true"><i></i><i></i><i></i>');
    expect(markup).toContain('role="status">Cargando portada…');
    expect(markup).toContain('aria-label="Información: Título desde Second Brain"');
    for (const anchor of markup.match(/<a\b[^>]*>[\s\S]*?<\/a>/g) ?? []) expect(anchor).not.toMatch(/<button\b|<a\b[^>]*>[\s\S]*<a\b/);
  });
});
