import { afterEach, describe, expect, it, vi } from "vitest";
import { isUptimeSummary, summarizeUptime } from "@/lib/uptime";
import { localTime } from "@/components/HomeSignals";
import worker from "../worker/index";

const checkedAt = "2026-10-11T03:30:00Z";
const service = (observedPercent: number | null, samples = 10, stale = false) => ({ observedPercent, samples, stale, days: Array.from({ length: 90 }, () => ({})) });
const fixture = { lastRunAt: checkedAt, services: [service(100, 1000), service(90, 10), service(null, 0)] };

afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe("uptime del home", () => {
  it("promedia servicios con igual peso; excluye ausencia de datos y conserva un 0 % real", () => {
    expect(summarizeUptime(fixture)).toEqual({ averagePercent: 95, serviceCount: 2, totalServices: 3, periodDays: 90, checkedAt, stale: false });
    expect(summarizeUptime({ ...fixture, services: [service(100), service(0)] }).averagePercent).toBe(50);
    expect(summarizeUptime({ lastRunAt: null, services: [service(null, 0, true)] })).toMatchObject({ averagePercent: null, serviceCount: 0, stale: true });
    expect(summarizeUptime({ ...fixture, services: [service(100, 10, true)] }).stale).toBe(true);
  });

  it("rechaza datos inválidos o periodos distintos en lugar de inventar disponibilidad", () => {
    for (const value of [null, {}, { ...fixture, services: [] }, { ...fixture, lastRunAt: "invalid" },
      ...[NaN, Infinity, -1, 101, "99", null].map(observedPercent => ({ ...fixture, services: [{ ...service(100), observedPercent }] })),
      { ...fixture, services: [service(100, 0)] }, { ...fixture, services: [{ ...service(100), days: [] }] },
      { ...fixture, services: [{ ...service(100), samples: -1 }] }]) {
      expect(() => summarizeUptime(value)).toThrow();
    }
    const summary = summarizeUptime(fixture);
    expect(isUptimeSummary(summary)).toBe(true);
    for (const value of [null, {}, { ...summary, averagePercent: "95" }, { ...summary, averagePercent: Infinity }, { ...summary, periodDays: 30 }, { ...summary, serviceCount: 4 }, { ...summary, checkedAt: "invalid" }]) expect(isUptimeSummary(value)).toBe(false);
  });

  it("expone resumen pequeño, consulta fuente fija y reutiliza caché", async () => {
    const fetch = vi.fn(async () => Response.json(fixture));
    const match = vi.fn(async (): Promise<Response | undefined> => undefined), put = vi.fn(async () => undefined);
    vi.stubGlobal("fetch", fetch);
    vi.stubGlobal("caches", { default: { match, put } });
    const waitUntil = vi.fn();
    const request = new Request("https://velaarturo.com/api/uptime?url=https://example.com");
    const response = await worker.fetch(request as never, {} as Env, { waitUntil } as unknown as ExecutionContext);
    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("public, max-age=60, s-maxage=300");
    const body = await response.text();
    expect(body.length).toBeLessThan(300);
    expect(JSON.parse(body)).toEqual(summarizeUptime(fixture));
    expect(fetch).toHaveBeenCalledWith("https://status.velaarturo.com/api/status", expect.objectContaining({ signal: expect.any(AbortSignal) }));
    await Promise.all(waitUntil.mock.calls.map(([promise]) => promise));
    expect(put).toHaveBeenCalledOnce();
    match.mockResolvedValueOnce(Response.json(summarizeUptime(fixture)));
    await worker.fetch(request as never, {} as Env, { waitUntil } as unknown as ExecutionContext);
    expect(fetch).toHaveBeenCalledOnce();
    expect((await worker.fetch(new Request(request.url, { method: "POST" }) as never, {} as Env, { waitUntil } as unknown as ExecutionContext)).status).toBe(404);
  });

  it.each(["http", "json", "schema", "network"])("falla sin porcentaje ficticio cuando upstream devuelve %s", async (failure) => {
    vi.stubGlobal("caches", { default: { match: vi.fn(async () => undefined), put: vi.fn() } });
    vi.stubGlobal("fetch", vi.fn(async () => {
      if (failure === "network") throw new Error("Offline");
      if (failure === "http") return new Response(null, { status: 503 });
      if (failure === "json") return new Response("invalid JSON");
      return Response.json({ services: [] });
    }));
    const response = await worker.fetch(new Request("https://velaarturo.com/api/uptime") as never, {} as Env, { waitUntil: vi.fn() } as unknown as ExecutionContext);
    expect(response.status).toBe(503);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(await response.json()).toEqual({ error: "Estado no disponible" });
  });

  it("muestra misma fecha UTC en hora local de visitante, incluyendo cambio de día", () => {
    const original = process.env.TZ;
    try {
      const date = new Date("2026-10-11T03:30:00Z");
      process.env.TZ = "America/Lima";
      expect(localTime(date, "es")).toBe("22:30");
      process.env.TZ = "Asia/Tokyo";
      expect(localTime(date, "es")).toBe("12:30");
      process.env.TZ = "America/New_York";
      expect(localTime(date, "en")).toBe("11:30 PM");
    } finally { if (original === undefined) delete process.env.TZ; else process.env.TZ = original; }
  });
});
