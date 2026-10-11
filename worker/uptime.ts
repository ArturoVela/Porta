import { summarizeUptime } from "../src/lib/uptime";

export async function uptimeApi(ctx: ExecutionContext) {
  const cache = (caches as unknown as { default: Cache }).default;
  const key = new Request("https://portfolio-uptime.invalid/summary");
  const cached = await cache.match(key);
  if (cached) return cached;
  try {
    const upstream = await fetch("https://status.velaarturo.com/api/status", { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(8_000) });
    if (!upstream.ok) throw new Error("Estado no disponible");
    const summary = summarizeUptime(await upstream.json());
    const response = Response.json(summary, { headers: { "cache-control": "public, max-age=60, s-maxage=300", "x-content-type-options": "nosniff" } });
    ctx.waitUntil(cache.put(key, response.clone()));
    return response;
  } catch {
    return Response.json({ error: "Estado no disponible" }, { status: 503, headers: { "cache-control": "no-store", "x-content-type-options": "nosniff" } });
  }
}
