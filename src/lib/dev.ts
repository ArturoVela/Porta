import type { Locale } from "@/i18n";
import { FALLBACK_ENVELOPE_EN } from "@/content/fallback-en";
import { WALLET_PROJECTS, type WalletProject } from "@/lib/linktree";
import type { ProjectContent } from "@/types/content";

export const DEV_APP_GROUPS = {
  tools: ["textos", "pdf", "qr", "hub"],
  design: ["color", "foto", "un-ramito"],
  organization: ["torneo", "cuando", "horas", "llevamos", "ruleta", "formularios", "divide"],
  business: ["cotiza", "finanzas", "ventas", "agua", "agro", "bc", "tarjetas"],
  exploration: ["explora", "coffee"],
} as const;
export type DevAppGroup = keyof typeof DEV_APP_GROUPS;
export const DEV_APPS = WALLET_PROJECTS.filter((app) => !["principal", "cv", "brain"].includes(app.id));

export const DEV_COPY = {
  es: {
    role: "Ingeniería, producto y código.", portrait: "Arturo Vela frente a un rack de servidores", workTogether: "Trabajemos juntos", cv: "Mi CV", index: "Apartados de mi tarjeta",
    projects: "Proyectos destacados", projectsTitle: "Ideas que ya funcionan.", projectsIntro: "Una selección de productos y sistemas que he construido.", allProjects: "Todos los proyectos",
    apps: "Mis apps", appsTitle: "Pequeñas apps. Soluciones reales.", appsIntro: "herramientas y productos propios para el día a día.", wallet: "Abrir tarjetero", private: "Acceso privado", search: "Buscar apps", searchPlaceholder: "Nombre, descripción o dominio", category: "Categoría", all: "Todas", clear: "Limpiar filtros", results: "apps encontradas", resultSingular: "app encontrada", empty: "No hay apps con esos filtros.", emptyHelp: "Prueba otro nombre o limpia los filtros.", showAll: "Ver todas las apps", showLess: "Mostrar menos apps", openApp: "Probar app", openAccess: "Abrir acceso", viewCase: "Ver caso",
    groups: { tools: "Herramientas", design: "Diseño", organization: "Organización", business: "Negocios", exploration: "Exploración" },
    technologies: "Tecnologías en mis proyectos", technologiesIntro: "Cada tecnología, conectada con un caso real.",
    activity: "Actividad en GitHub", activityTitle: "Código en movimiento.", activityIntro: "Mi actividad en GitHub, día a día.", github: "Ver GitHub", contributions: "contribuciones", contribution: "contribución", lastPeriod: "en los últimos 12 meses", inYear: "en", calendarTitle: "Contribuciones en GitHub", period: "Periodo", lastMonths: "Últimos 12 meses", calendarRegion: "Calendario de contribuciones; desplázate horizontalmente para ver todo el periodo", weekdays: ["Lun", "Mié", "Vie"], selectDay: "Selecciona un día o navega con las flechas del teclado.", intensity: "Intensidad de contribuciones: menos a más", less: "Menos", more: "Más", consistency: "Constancia al programar", activeDays: "Días con actividad", days: "días", streak: "Mejor racha del periodo", consecutiveDays: "días seguidos", publicRepos: "Repositorios públicos", activityNote: "GitHub cuenta commits, pull requests, issues y revisiones. La actividad muestra constancia; no mide calidad ni horas de trabajo.", calculating: "Calculando actividad…", directActivity: "Consulta mi actividad directamente en GitHub.", languages: "Lenguajes más usados", languagesNote: "Proporción de código en bytes de mis repositorios públicos, sin forks. Los repositorios privados no están incluidos.", noLanguages: "GitHub todavía no reporta lenguajes públicos.", loading: "Consultando GitHub…", unavailable: "GitHub no está disponible en este momento.", retry: "Reintentar", source: "Fuente: GitHub", stale: "Última copia disponible", updated: "Actualizado", sourceNote: "Métricas públicas; las contribuciones privadas dependen de lo que compartas en GitHub.",
    close: "Tu próxima idea, la construimos juntos.", contact: "Cuéntame tu proyecto", download: "Guardar contacto", share: "Compartir tarjeta", copied: "Enlace copiado.", shared: "Tarjeta compartida.", copyBlocked: "No se pudo copiar. Selecciona el enlace para copiarlo.", showQr: "Mostrar QR", qrAlt: "Código QR para abrir la tarjeta de Arturo Vela", downloadError: "No se pudo descargar el contacto. Puedes escribirme por correo.",
  },
  en: {
    role: "Engineering, product and code.", portrait: "Arturo Vela in front of a server rack", workTogether: "Let's work together", cv: "My CV", index: "Sections of my card",
    projects: "Featured projects", projectsTitle: "Ideas already at work.", projectsIntro: "A selection of products and systems I have built.", allProjects: "All projects",
    apps: "My apps", appsTitle: "Small apps. Real solutions.", appsIntro: "independent tools and products for everyday needs.", wallet: "Open wallet", private: "Private access", search: "Search apps", searchPlaceholder: "Name, description or domain", category: "Category", all: "All", clear: "Clear filters", results: "apps found", resultSingular: "app found", empty: "No apps match these filters.", emptyHelp: "Try another name or clear the filters.", showAll: "View all apps", showLess: "Show fewer apps", openApp: "Try app", openAccess: "Open access", viewCase: "View case",
    groups: { tools: "Tools", design: "Design", organization: "Organization", business: "Business", exploration: "Exploration" },
    technologies: "Technologies in my projects", technologiesIntro: "Each technology, linked to a real case.",
    activity: "GitHub activity", activityTitle: "Code in motion.", activityIntro: "My GitHub activity, day by day.", github: "View GitHub", contributions: "contributions", contribution: "contribution", lastPeriod: "in the last 12 months", inYear: "in", calendarTitle: "GitHub contributions", period: "Period", lastMonths: "Last 12 months", calendarRegion: "Contribution calendar; scroll horizontally to see the full period", weekdays: ["Mon", "Wed", "Fri"], selectDay: "Select a day or use the arrow keys.", intensity: "Contribution intensity: less to more", less: "Less", more: "More", consistency: "Coding consistency", activeDays: "Days with activity", days: "days", streak: "Best streak in this period", consecutiveDays: "consecutive days", publicRepos: "Public repositories", activityNote: "GitHub counts commits, pull requests, issues and reviews. Activity shows consistency; it does not measure quality or hours worked.", calculating: "Calculating activity…", directActivity: "View my activity directly on GitHub.", languages: "Most used languages", languagesNote: "Code proportion in bytes from my own public repositories, excluding forks. Private repositories are not included.", noLanguages: "GitHub does not report any public languages yet.", loading: "Loading GitHub activity…", unavailable: "GitHub is unavailable right now.", retry: "Try again", source: "Source: GitHub", stale: "Last available copy", updated: "Updated", sourceNote: "Public metrics; private contributions depend on what you share on GitHub.",
    close: "Your next idea, built together.", contact: "Tell me about your project", download: "Save contact", share: "Share card", copied: "Link copied.", shared: "Card shared.", copyBlocked: "Could not copy. Select the link to copy it.", showQr: "Show QR", qrAlt: "QR code to open Arturo Vela's card", downloadError: "Could not download the contact. You can email me instead.",
  },
} as const;

const appDescriptionsEn: Record<string, string> = {
  torneo: "Create balanced teams, organize tournaments, and share schedules and results without accounts.",
  textos: "Count, transform, sort and compare text directly in your browser.",
  formularios: "Create registrations, surveys and requests at your own pace, without accounts.",
  divide: "Split expenses for a meal, trip or household and find out who owes whom.",
  finanzas: "Organize accounts, transactions and goals for yourself and your household.",
  ventas: "Sales, purchasing, branch inventory and daily cash management for Peruvian businesses.",
  agua: "AquaVigía. A water platform with data access reserved for authorized accounts.",
  agro: "Your farm, your accounts. A protected agricultural workspace with private access.",
  bc: "Discover events and digital tickets, with tools for attendees and organizers.",
  tarjetas: "Create digital loyalty cards for your business and turn every visit into a reward.",
};

export function devAppDescription(app: WalletProject, locale: Locale, projects: ProjectContent[]) {
  if (locale === "es") return app.description;
  return projects.find((project) => project.slug === app.caseSlug)?.excerpt
    ?? FALLBACK_ENVELOPE_EN.data.projects.find((project) => project.slug === app.caseSlug)?.excerpt
    ?? appDescriptionsEn[app.id] ?? app.description;
}

export function filterDevApps(query: string, group: DevAppGroup | "all", locale: Locale, projects: ProjectContent[]) {
  const normalize = (value: string) => value.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().trim();
  const search = normalize(query);
  return DEV_APPS.filter((app) => (group === "all" || (DEV_APP_GROUPS[group] as readonly string[]).includes(app.id))
    && normalize(`${app.name} ${app.description} ${devAppDescription(app, locale, projects)} ${app.domain}`).includes(search));
}

export function projectTechnologies(projects: ProjectContent[]) {
  return ["React", "TypeScript", "Next.js", "Cloudflare Workers", "Supabase", "Flutter"].flatMap((name) => {
    const project = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured) || a.order - b.order)
      .find((item) => item.stack.some((technology) => technology.toLowerCase() === name.toLowerCase()));
    return project ? [{ name, project }] : [];
  });
}
