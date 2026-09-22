import type { ProjectContent } from "@/types/content";
import type { Locale } from "@/i18n";

type ProjectAvailability = Pick<ProjectContent, "liveUrl" | "repoUrl" | "type">;

export function projectAvailabilityLabel(project: ProjectAvailability, locale: Locale = "es") {
  const labels = locale === "en"
    ? { live: "Available online", restricted: "Restricted access", code: "Public code", private: "Private project", noDemo: "No public demo" }
    : { live: "Disponible en línea", restricted: "Acceso restringido", code: "Código público", private: "Proyecto privado", noDemo: "Sin demo pública" };
  const isRestricted = /privad|intern|restringid|private|restricted/i.test(project.type);
  if (project.liveUrl) return isRestricted ? labels.restricted : labels.live;
  if (project.repoUrl) return labels.code;
  return isRestricted ? labels.private : labels.noDemo;
}
