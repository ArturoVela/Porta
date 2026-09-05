import { ChakraProvider } from "@chakra-ui/react";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter, Route, Routes } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";
import { HeroStage } from "@/components/HeroStage";
import { ContentProvider } from "@/content/context";
import { FALLBACK_ENVELOPE } from "@/content/fallback";
import { ProfilePage } from "@/pages/ProfilePage";
import { ProjectPage } from "@/pages/ProjectPage";
import { system } from "@/theme";

const cover = { src: "/media/2/cover?token=preview-token", alt: "Portada editada", width: 1280, height: 720 };
const screen = { ...cover, src: "/media/2/screen?token=preview-token", alt: "Pantalla editada" };
const portrait = { ...cover, src: "/media/2/portrait?token=preview-token", alt: "Retrato editado" };
const project = { ...FALLBACK_ENVELOPE.data.projects[0], id: "project-new", slug: "nuevo", title: "Título desde Second Brain", cover, gallery: [screen] };

function renderContent(child: ReturnType<typeof createElement>) {
  const envelope = { ...FALLBACK_ENVELOPE, data: { ...FALLBACK_ENVELOPE.data, site: { ...FALLBACK_ENVELOPE.data.site, portrait }, projects: [project] } };
  vi.stubGlobal("document", { querySelector: () => ({ textContent: JSON.stringify(envelope) }) });
  return renderToStaticMarkup(createElement(MemoryRouter, { initialEntries: ["/__preview?token=preview-token&path=%2Fproyectos%2Fnuevo"] },
    createElement(ChakraProvider, { value: system, children: createElement(ContentProvider, { children: child }) })));
}

afterEach(() => vi.unstubAllGlobals());

describe("imágenes editadas en Second Brain", () => {
  it("muestra portada y título en el proyecto destacado y conserva la navegación privada", () => {
    const markup = renderContent(createElement(HeroStage, { projects: [project] }));
    expect(markup).toContain('src="/media/2/cover?token=preview-token"');
    expect(markup).toContain("Título desde Second Brain");
    expect(markup).toContain('href="/__preview?token=preview-token&amp;path=%2Fproyectos%2Fnuevo"');
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
  });
});
