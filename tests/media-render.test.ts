import { ChakraProvider } from "@chakra-ui/react";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter, Route, Routes } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ContentProvider } from "@/content/context";
import { FALLBACK_ENVELOPE } from "@/content/fallback";
import { HomePage } from "@/pages/HomePage";
import { ProfilePage } from "@/pages/ProfilePage";
import { ProjectPage } from "@/pages/ProjectPage";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { selectHomeProducts, selectSpotlightProjects } from "@/lib/spotlight";
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
  it("muestra una sola vez el proyecto destacado en la portada corta", () => {
    const markup = renderContent(createElement(HomePage));
    expect(markup).toContain('src="/media/2/cover?token=preview-token"');
    expect(markup.match(/Título desde Second Brain/g)).toHaveLength(1);
    expect(markup).toContain("Convierto procesos complejos en productos web claros y mantenibles.");
    expect(markup).not.toContain("En foco");
    expect(markup).not.toContain("Mis proyectos SaaS");
    expect(markup).not.toContain("Notas de trabajo");
    expect(markup).not.toContain("Stack actual");
  });

  it("mantiene tres destacados y permite acceso adicional desde el slider público", () => {
    const markup = renderContent(createElement(HomePage), FALLBACK_ENVELOPE.data.projects);
    for (const slug of ["nieto-import", "explora-san-martin", "coffee"]) {
      expect(markup.match(new RegExp(`path=%2Fes%2Fproyectos%2F${slug}`, "g"))).toHaveLength(slug === "nieto-import" ? 1 : 2);
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
    expect(products[0].cover?.src).toContain('spotlight-explora');
    expect(products.find(({ app }) => app.id === 'ventas')?.cover).toBeUndefined();
    const markup = renderContent(createElement(HomePage), FALLBACK_ENVELOPE.data.projects);
    expect(markup).toContain('data-brand="true"');
    expect(markup).toContain('alt="Imagen de marca: Vela Ventas"');
    expect(markup).toContain('aria-label="Siguiente producto"');
    expect(markup.match(/inert=""/g)).toHaveLength(7);
  });

  it("muestra el retrato del manifiesto en el perfil", () => {
    expect(renderContent(createElement(ProfilePage))).toContain('src="/media/2/portrait?token=preview-token"');
  });

  it("muestra un proyecto nuevo con portada y galería", () => {
    const markup = renderContent(createElement(Routes, { location: "/proyectos/nuevo", children: createElement(Route, { path: "/proyectos/:slug", element: createElement(ProjectPage) }) }));
    expect(markup).toContain("Título desde Second Brain");
    expect(markup).toContain('src="/media/2/cover?token=preview-token"');
    expect(markup).toContain('src="/media/2/screen?token=preview-token"');
    expect(markup).toContain("Pantalla editada");
    expect(markup.indexOf("El reto")).toBeLessThan(markup.indexOf('src="/media/2/screen?token=preview-token"'));
    expect(markup.indexOf("¿Necesitas simplificar un proceso parecido?")).toBeLessThan(markup.indexOf("Siguiente lectura"));
  });

  it("muestra una vista visual para cada proyecto del archivo", () => {
    const projects = FALLBACK_ENVELOPE.data.projects.map((item, index) => ({ ...item, featured: index === 0 }));
    const envelope = { ...FALLBACK_ENVELOPE, data: { ...FALLBACK_ENVELOPE.data, projects } };
    vi.stubGlobal("document", { documentElement: { lang: "es" }, querySelector: () => ({ textContent: JSON.stringify(envelope) }) });
    const markup = renderToStaticMarkup(createElement(MemoryRouter, { initialEntries: ["/proyectos"] },
      createElement(ChakraProvider, { value: system, children: createElement(ContentProvider, { children: createElement(ProjectsPage) }) })));

    expect(markup.match(/class="[^"]*project-card__visual/g)).toHaveLength(projects.length - selectSpotlightProjects(projects).length);
    expect(markup).toContain("details-thumb_cana.webp");
    expect(projects.every((item) => markup.includes(item.title))).toBe(true);
  });
});
