export type UptimeSummary = {
  averagePercent: number | null;
  serviceCount: number;
  totalServices: number;
  periodDays: 90;
  checkedAt: string | null;
  stale: boolean;
};

export function summarizeUptime(value: unknown): UptimeSummary {
  if (typeof value !== "object" || value === null || !("services" in value) || !Array.isArray(value.services) || !value.services.length) throw new Error("Estado inválido");
  if (!("lastRunAt" in value) || (value.lastRunAt !== null && (typeof value.lastRunAt !== "string" || !Number.isFinite(Date.parse(value.lastRunAt))))) throw new Error("Fecha de estado inválida");
  let total = 0, serviceCount = 0, stale = value.lastRunAt === null;
  for (const service of value.services) {
    if (typeof service !== "object" || service === null || !Number.isSafeInteger(service.samples) || service.samples < 0 || typeof service.stale !== "boolean" || !Array.isArray(service.days) || service.days.length !== 90) throw new Error("Servicio inválido");
    const percent = service.observedPercent;
    if (service.samples === 0 ? percent !== null : typeof percent !== "number" || !Number.isFinite(percent) || percent < 0 || percent > 100) throw new Error("Disponibilidad inválida");
    if (service.samples > 0) { total += percent; serviceCount++; }
    stale ||= service.stale;
  }
  return { averagePercent: serviceCount ? total / serviceCount : null, serviceCount, totalServices: value.services.length, periodDays: 90, checkedAt: value.lastRunAt, stale };
}

export function isUptimeSummary(value: unknown): value is UptimeSummary {
  if (typeof value !== "object" || value === null) return false;
  const data = value as UptimeSummary;
  return Number.isSafeInteger(data.serviceCount) && data.serviceCount >= 0
    && Number.isSafeInteger(data.totalServices) && data.totalServices > 0 && data.serviceCount <= data.totalServices
    && (data.serviceCount === 0 ? data.averagePercent === null : typeof data.averagePercent === "number" && Number.isFinite(data.averagePercent) && data.averagePercent >= 0 && data.averagePercent <= 100)
    && data.periodDays === 90 && typeof data.stale === "boolean"
    && (data.checkedAt === null || (typeof data.checkedAt === "string" && Number.isFinite(Date.parse(data.checkedAt))));
}
