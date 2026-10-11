import type { CoverImage, ProjectContent } from "@/types/content";
import { CV_URL } from "@/lib/links";
import type { Locale } from "@/i18n";
import { WALLET_PROJECTS } from "@/lib/linktree";

export const SPOTLIGHT_PROJECT_SLUGS = ["nieto-import", "explora-san-martin", "coffee"] as const;

export const SPOTLIGHT_DESTINATIONS = [
  { title: "NIETO Import", category: "Sistema interno", description: "Operación para equipos autorizados", domain: "portal.nietoimport.com", url: "https://portal.nietoimport.com" },
  { title: "Explora San Martín", category: "Turismo digital", description: "Lugares y rutas con fuentes visibles", domain: "explora.velaarturo.com", url: "https://explora.velaarturo.com" },
  { title: "Cafetero", category: "Producto en pruebas", description: "Directorio y pasaporte cafetero", domain: "cafetero.velaarturo.com", url: "https://cafetero.velaarturo.com" },
  { title: "Mi CV", category: "Trayectoria", description: "Experiencia, formación y habilidades", domain: "cv.velaarturo.com", url: CV_URL },
] as const;

const homeCoverIds = new Set([
  "torneo", "divide", "textos", "color", "cotiza", "cuando", "foto", "pdf", "qr",
  "horas", "llevamos", "ruleta", "explora", "coffee", "formularios", "un-ramito", "hub", "cv",
]);
const homeCovers: Record<string, CoverImage> = Object.fromEntries(
  WALLET_PROJECTS.filter((app) => homeCoverIds.has(app.id)).map((app) => [app.caseSlug ?? app.id, {
    src: `/assets/images/project-covers/${app.id}-home.webp`, alt: `Página de inicio de ${app.name}`, width: 1280, height: 720,
  }]),
);

export function projectDisplayCover(project: ProjectContent, locale: Locale = "es") {
  const cover = homeCovers[project.slug];
  const bundledCover = project.cover && /^\/assets\/images\/(?:pases-webs|project-covers)\//.test(project.cover.src);
  if (project.cover && (!cover || !bundledCover)) return project.cover;
  if (!cover || locale === "es") return cover;
  return { ...cover, alt: `${project.title} home page` };
}

export function selectSpotlightProjects(projects: ProjectContent[], limit = 3) {
  const sorted = [...projects].sort((a, b) => a.order - b.order);
  const candidates = [
    ...SPOTLIGHT_PROJECT_SLUGS.flatMap((slug) => sorted.filter((project) => project.slug === slug)),
    ...sorted.filter((project) => project.featured),
  ];
  return candidates.filter((project, index) => candidates.findIndex((item) => item.id === project.id) === index).slice(0, limit);
}

const HOME_PRODUCT_IDS = ["explora", "coffee", "hub", "cotiza", "ventas", "finanzas", "bc", "tarjetas"];

export function selectHomeProducts(projects: ProjectContent[], locale: Locale = "es") {
  return HOME_PRODUCT_IDS.flatMap((id) => {
    const app = WALLET_PROJECTS.find((item) => item.id === id && !item.private);
    if (!app) return [];
    const project = projects.find((item) => item.slug === app.caseSlug);
    return [{ app, project, cover: project ? projectDisplayCover(project, locale) : undefined }];
  });
}
