import type { ProjectContent } from "@/types/content";

type ProjectAvailability = Pick<ProjectContent, "liveUrl" | "repoUrl" | "type">;

export function projectAvailabilityLabel(project: ProjectAvailability) {
  const isRestricted = /privad|intern|restringid/i.test(project.type);
  if (project.liveUrl) return isRestricted ? "Acceso restringido" : "Disponible en línea";
  if (project.repoUrl) return "Código público";
  return isRestricted ? "Proyecto privado" : "Sin demo pública";
}
