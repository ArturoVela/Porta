import type { CoverImage, ProjectContent } from "@/types/content";
import { CV_URL } from "@/lib/links";
import type { Locale } from "@/i18n";

export const SPOTLIGHT_PROJECT_SLUGS = ["nieto-import", "explora-san-martin", "coffee"] as const;

export const SPOTLIGHT_DESTINATIONS = [
  { title: "NIETO Import", category: "Sistema interno", description: "Operación para equipos autorizados", domain: "portal.nietoimport.com", url: "https://portal.nietoimport.com" },
  { title: "Explora San Martín", category: "Turismo digital", description: "Lugares y rutas con fuentes visibles", domain: "explora.velaarturo.com", url: "https://explora.velaarturo.com" },
  { title: "Cafetero", category: "Producto en pruebas", description: "Directorio y pasaporte cafetero", domain: "cafetero.velaarturo.com", url: "https://cafetero.velaarturo.com" },
  { title: "Mi CV", category: "Trayectoria", description: "Experiencia, formación y habilidades", domain: "cv.velaarturo.com", url: CV_URL },
] as const;

const spotlightCovers: Record<string, CoverImage> = {
  "explora-san-martin": { src: "/assets/images/portfolio/spotlight-explora.webp", alt: "Mapa y destinos de Explora San Martín", width: 1280, height: 720 },
  coffee: { src: "/assets/images/portfolio/spotlight-coffee.webp", alt: "Portada y búsqueda de Cafetero", width: 1280, height: 720 },
};

export function projectDisplayCover(project: ProjectContent, locale: Locale = "es") {
  if (project.cover) return project.cover;
  const cover = spotlightCovers[project.slug];
  if (!cover || locale === "es") return cover;
  const alt = project.slug === "explora-san-martin" ? "Map and destinations in Explore San Martín" : "Cafetero home and search experience";
  return { ...cover, alt };
}

export function selectSpotlightProjects(projects: ProjectContent[], limit = 3) {
  const sorted = [...projects].sort((a, b) => a.order - b.order);
  const candidates = [
    ...SPOTLIGHT_PROJECT_SLUGS.flatMap((slug) => sorted.filter((project) => project.slug === slug)),
    ...sorted.filter((project) => project.featured),
  ];
  return candidates.filter((project, index) => candidates.findIndex((item) => item.id === project.id) === index).slice(0, limit);
}
