import { GITHUB_USERNAME, type ContributionDay, type GitHubCalendar, type GitHubSummary } from "../src/lib/github";

const API = `https://api.github.com/users/${GITHUB_USERNAME}`;
const HEADERS = { Accept: "application/vnd.github+json", "User-Agent": "Porta-Dev", "X-GitHub-Api-Version": "2022-11-28" };

async function githubJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { headers: HEADERS, signal: AbortSignal.timeout(12_000) });
  if (!response.ok) throw new Error(`GitHub respondió ${response.status}`);
  return response.json() as Promise<T>;
}

async function summary(): Promise<GitHubSummary> {
  const profile = await githubJson<{ public_repos: number; followers: number; created_at: string }>(API);
  type Repo = { name: string; fork: boolean; language: string | null; stargazers_count: number };
  const repos: Repo[] = [];
  for (let page = 1; page <= Math.ceil(profile.public_repos / 100); page++) {
    repos.push(...await githubJson<Repo[]>(`${API}/repos?type=owner&per_page=100&page=${page}`));
  }
  const ownRepos = repos.filter((repo) => !repo.fork);
  const totals: Record<string, number> = {};
  const languages = await Promise.all(ownRepos.filter((repo) => repo.language).map((repo) =>
    githubJson<Record<string, number>>(`https://api.github.com/repos/${GITHUB_USERNAME}/${encodeURIComponent(repo.name)}/languages`)));
  for (const language of languages) {
    for (const [name, bytes] of Object.entries(language)) {
      if (!Number.isSafeInteger(bytes) || bytes < 0) throw new Error("Respuesta de lenguajes inválida");
      totals[name] = (totals[name] ?? 0) + bytes;
    }
  }
  return {
    publicRepos: profile.public_repos, followers: profile.followers,
    stars: ownRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0), createdAt: profile.created_at,
    languages: Object.entries(totals).map(([name, bytes]) => ({ name, bytes })).filter((language) => language.bytes > 0).sort((a, b) => b.bytes - a.bytes),
    fetchedAt: new Date().toISOString(),
  };
}

export function contributionRange(year: string | null, now = new Date()) {
  const today = now.toISOString().slice(0, 10);
  if (!year || year === "last") {
    const start = new Date(`${today}T00:00:00Z`);
    start.setUTCDate(start.getUTCDate() - 364);
    return { from: start.toISOString().slice(0, 10), to: today };
  }
  if (!/^\d{4}$/.test(year) || Number(year) < 2022 || Number(year) > now.getUTCFullYear()) return null;
  return { from: `${year}-01-01`, to: Number(year) === now.getUTCFullYear() ? today : `${year}-12-31` };
}

export function parseContributionCalendar(html: string, from: string, to: string): ContributionDay[] {
  const counts = new Map<string, number>();
  // GitHub publishes counts in tooltips; fail visibly if its calendar markup changes.
  for (const match of html.matchAll(/<tool-tip\b[^>]*\bfor="([^"]+)"[^>]*>([\s\S]*?)<\/tool-tip>/g)) {
    const label = match[2].trim();
    const count = label.match(/^([\d,]+) contributions?\b/);
    if (count) counts.set(match[1], Number(count[1].replaceAll(",", "")));
    else if (label.startsWith("No contributions")) counts.set(match[1], 0);
  }
  const days: ContributionDay[] = [];
  for (const match of html.matchAll(/<td\b([^>]*)>/g)) {
    const attributes = Object.fromEntries([...match[1].matchAll(/\b(data-date|data-level|id)="([^"]+)"/g)].map((attribute) => [attribute[1], attribute[2]]));
    const date = attributes["data-date"];
    if (!date || date < from || date > to) continue;
    const count = counts.get(attributes.id);
    const level = Number(attributes["data-level"]);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || count === undefined || !Number.isSafeInteger(count) || !Number.isInteger(level) || level < 0 || level > 4) throw new Error("Calendario de GitHub inválido");
    days.push({ date, count, level });
  }
  days.sort((a, b) => a.date.localeCompare(b.date));
  const expectedDays = (Date.parse(to) - Date.parse(from)) / 86_400_000 + 1;
  if (days.length !== expectedDays || new Set(days.map((day) => day.date)).size !== days.length) throw new Error("Calendario de GitHub incompleto");
  return days;
}

async function calendar(range: { from: string; to: string }, rolling: boolean): Promise<GitHubCalendar> {
  const query = rolling ? "" : `?from=${range.from}&to=${range.to}`;
  const response = await fetch(`https://github.com/users/${GITHUB_USERNAME}/contributions${query}`, {
    headers: { "User-Agent": "Porta-Dev", "Accept-Language": "en" }, signal: AbortSignal.timeout(12_000),
  });
  if (!response.ok) throw new Error(`Calendario de GitHub respondió ${response.status}`);
  return { ...range, days: parseContributionCalendar(await response.text(), range.from, range.to), fetchedAt: new Date().toISOString() };
}

export async function githubApi(request: Request, ctx: ExecutionContext) {
  const url = new URL(request.url);
  const isCalendar = url.pathname === "/api/github/contributions";
  const range = contributionRange(url.searchParams.get("year"));
  if (isCalendar && !range) return Response.json({ error: "Año inválido" }, { status: 400 });
  const cache = (caches as unknown as { default: Cache }).default;
  const key = new Request(`https://portfolio-github.invalid/${isCalendar ? `calendar/${range!.from}/${range!.to}` : "summary"}`);
  const backupKey = new Request(`${key.url}/backup`);
  const cached = await cache.match(key);
  if (cached) return cached;
  try {
    const data = isCalendar ? await calendar(range!, !url.searchParams.get("year") || url.searchParams.get("year") === "last") : await summary();
    const response = Response.json(data, { headers: { "cache-control": "public, max-age=3600", "x-content-type-options": "nosniff" } });
    const backup = Response.json(data, { headers: { "cache-control": "public, max-age=604800" } });
    ctx.waitUntil(Promise.all([cache.put(key, response.clone()), cache.put(backupKey, backup)]));
    return response;
  } catch {
    const backup = await cache.match(backupKey);
    if (backup) return Response.json({ ...await backup.json() as object, stale: true }, { headers: { "cache-control": "public, max-age=60" } });
    return Response.json({ error: "GitHub no está disponible. Puedes consultar el perfil directamente." }, { status: 503, headers: { "cache-control": "no-store" } });
  }
}
