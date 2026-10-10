import { afterEach, describe, expect, it, vi } from "vitest";
import { activityMetrics, contributionWeeks } from "@/lib/github";
import { contributionRange, githubApi, parseContributionCalendar } from "../worker/github";
import { metaForPath } from "../worker/index";
import { FALLBACK_ENVELOPE } from "@/content/fallback";

afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

const fixture = `<td data-date="2026-10-08" id="d1" data-level="1"></td><tool-tip for="d1">2 contributions on October 8th.</tool-tip>
<td id="d2" data-level="0" data-date="2026-10-09"></td><tool-tip for="d2">No contributions on October 9th.</tool-tip>
<td data-level="4" data-date="2026-10-10" id="d3"></td><tool-tip for="d3">1,234 contributions on October 10th.</tool-tip>`;

describe("actividad real de GitHub", () => {
  it("lee conteos e intensidades, ordena fechas y limita el periodo", () => {
    const days = parseContributionCalendar(fixture, "2026-10-08", "2026-10-10");
    expect(days).toEqual([{ date: "2026-10-08", count: 2, level: 1 }, { date: "2026-10-09", count: 0, level: 0 }, { date: "2026-10-10", count: 1234, level: 4 }]);
    expect(activityMetrics(days)).toEqual({ total: 1236, activeDays: 2, bestStreak: 1 });
    expect(parseContributionCalendar(fixture, "2026-10-09", "2026-10-09")).toHaveLength(1);
  });

  it("rechaza markup incompleto en lugar de inventar ceros", () => {
    expect(() => parseContributionCalendar("<html></html>", "2026-10-08", "2026-10-10")).toThrow("incompleto");
    expect(() => parseContributionCalendar(fixture.replace("No contributions", "Unknown activity"), "2026-10-08", "2026-10-10")).toThrow("inválido");
    expect(() => parseContributionCalendar(fixture.replace('data-level="4"', 'data-level="9"'), "2026-10-08", "2026-10-10")).toThrow("inválido");
  });

  it("alinea semanas de domingo a sábado sin añadir actividad", () => {
    const days = parseContributionCalendar(fixture, "2026-10-08", "2026-10-10");
    expect(contributionWeeks(days)).toEqual([[null, null, null, null, ...days]]);
    expect(contributionWeeks([])).toEqual([]);
    const continuous = Array.from({ length: 10 }, (_, index) => ({ date: `2026-10-${String(index + 1).padStart(2, "0")}`, count: index === 5 ? 0 : 1, level: 1 }));
    expect(activityMetrics(continuous).bestStreak).toBe(5);
    expect(contributionWeeks(continuous).every((week) => week.length === 7)).toBe(true);
  });

  it("valida años y corta año actual en hoy; últimos 12 meses incluyen 365 días", () => {
    const now = new Date("2026-10-10T12:00:00Z");
    expect(contributionRange("2026", now)).toEqual({ from: "2026-01-01", to: "2026-10-10" });
    expect(contributionRange("2024", now)).toEqual({ from: "2024-01-01", to: "2024-12-31" });
    expect(contributionRange("last", now)).toEqual({ from: "2025-10-11", to: "2026-10-10" });
    for (const year of ["2027", "2021", "oops", "2026/extra"]) expect(contributionRange(year, now)).toBeNull();
  });

  it("usa caché y recupera última copia si GitHub falla", async () => {
    const fetchMock = vi.fn(async () => new Response(null, { status: 403 }));
    vi.stubGlobal("fetch", fetchMock);
    const match = vi.fn().mockResolvedValueOnce(undefined).mockResolvedValueOnce(Response.json({ languages: [], fetchedAt: "2026-10-09T12:00:00Z" }));
    vi.stubGlobal("caches", { default: { match } });
    const ctx = { waitUntil: vi.fn() } as unknown as ExecutionContext;
    const response = await githubApi(new Request("https://velaarturo.com/api/github"), ctx);
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ stale: true });
    match.mockResolvedValueOnce(Response.json({ publicRepos: 13 }));
    fetchMock.mockClear();
    expect(await (await githubApi(new Request("https://velaarturo.com/api/github"), ctx)).json()).toEqual({ publicRepos: 13 });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("usa calendario por defecto para periodo móvil y filtra días extra", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-10T12:00:00Z"));
    try {
      const match = vi.fn(async () => undefined), put = vi.fn(async () => undefined);
      vi.stubGlobal("caches", { default: { match, put } });
      const start = new Date("2025-10-05T00:00:00Z");
      const html = Array.from({ length: 371 }, (_, index) => {
        const date = new Date(start.getTime() + index * 86_400_000).toISOString().slice(0, 10);
        return `<td data-date="${date}" data-level="0" id="day-${index}"></td><tool-tip for="day-${index}">No contributions on date.</tool-tip>`;
      }).join("");
      const fetchMock = vi.fn(async (_url: string) => new Response(html));
      vi.stubGlobal("fetch", fetchMock);
      const response = await githubApi(new Request("https://velaarturo.com/api/github/contributions?year=last"), { waitUntil: vi.fn() } as unknown as ExecutionContext);
      expect(response.status).toBe(200);
      expect(fetchMock.mock.calls[0]?.[0]).toBe("https://github.com/users/ArturoVela/contributions");
      expect(await response.json()).toMatchObject({ from: "2025-10-11", to: "2026-10-10", days: expect.arrayContaining([{ date: "2026-10-10", count: 0, level: 0 }]) });
    } finally { vi.useRealTimers(); }
  });

  it("suma bytes por lenguaje y excluye forks", async () => {
    const match = vi.fn(async () => undefined), put = vi.fn(async () => undefined);
    vi.stubGlobal("caches", { default: { match, put } });
    const fetchMock = vi.fn(async (input: string) => {
      if (input.endsWith("/users/ArturoVela")) return Response.json({ public_repos: 3, followers: 2, created_at: "2022-10-27T00:00:00Z" });
      if (input.includes("/repos?")) return Response.json([{ name: "Porta", fork: false, language: "TypeScript", stargazers_count: 1 }, { name: "fork", fork: true, language: "Java", stargazers_count: 99 }, { name: "Old", fork: false, language: "HTML", stargazers_count: 0 }]);
      return Response.json(input.includes("/Porta/") ? { TypeScript: 60, CSS: 20 } : { HTML: 20, CSS: 10 });
    });
    vi.stubGlobal("fetch", fetchMock);
    const ctx = { waitUntil: vi.fn() } as unknown as ExecutionContext;
    const response = await githubApi(new Request("https://velaarturo.com/api/github"), ctx);
    expect(await response.json()).toMatchObject({ publicRepos: 3, stars: 1, languages: [{ name: "TypeScript", bytes: 60 }, { name: "CSS", bytes: 30 }, { name: "HTML", bytes: 20 }] });
    expect(fetchMock.mock.calls.some(([url]) => url.includes("/fork/"))).toBe(false);
    expect(put).toHaveBeenCalledTimes(2);
  });

  it("responde 503 sin copia y rechaza años inválidos antes de consultar GitHub", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response(null, { status: 403 })));
    vi.stubGlobal("caches", { default: { match: vi.fn(async () => undefined) } });
    const ctx = { waitUntil: vi.fn() } as unknown as ExecutionContext;
    expect((await githubApi(new Request("https://velaarturo.com/api/github"), ctx)).status).toBe(503);
    expect((await githubApi(new Request("https://velaarturo.com/api/github/contributions?year=oops"), ctx)).status).toBe(400);
  });

  it("/dev tiene metadatos y canonical propios con respuesta 200", () => {
    const meta = metaForPath("/dev/", FALLBACK_ENVELOPE.data, "https://velaarturo.com");
    expect(meta.status).toBe(200);
    expect(meta.canonicalPath).toBe("/dev");
    expect(meta.noindex).toBe(false);
    expect(meta.title).toContain("Dev");
    expect(meta.structuredData).toMatchObject({ url: "https://velaarturo.com/dev", image: "https://velaarturo.com/assets/images/Me/Fototech.jpg" });
  });
});
