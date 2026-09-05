import { createHash } from "node:crypto";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { neon } from "@neondatabase/serverless";

const publicationByLegacyPath = new Map([
  ["/blog/tesis-arroz-29-04-2025", "article-rice-visual-analysis"],
  ["/blog/tesis-arroz-22-04-2025", "article-rice-tcn"],
  ["/blog/discord-para-negocios", "article-discord-business"],
]);

function normalizePath(value) {
  try {
    const path = value.startsWith("http") ? new URL(value).pathname : value;
    return `/${path}`.replace(/\/{2,}/g, "/").replace(/\/$/, "").toLocaleLowerCase("es");
  } catch {
    return value.trim().replace(/\/$/, "").toLocaleLowerCase("es");
  }
}

function sqlValue(value) {
  return `'${String(value).replaceAll("'", "''")}'`;
}

function stableLegacyId(row) {
  if (row.id !== null && row.id !== undefined) return String(row.id);
  return createHash("sha256").update([row.slug, row.name, row.message, row.created_at].join("\u0000")).digest("hex");
}

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("Falta DATABASE_URL. Proporciónala solo durante la importación histórica.");

const envIndex = process.argv.indexOf("--env");
const targetEnvironment = envIndex >= 0 ? process.argv[envIndex + 1] : "staging";
if (!new Set(["staging", "production"]).has(targetEnvironment)) throw new Error("--env debe ser staging o production");
const dryRun = process.argv.includes("--dry-run");

const query = neon(databaseUrl);
const rows = await query`SELECT id, name, message, slug, created_at FROM comments ORDER BY created_at, id`;
const unknownPaths = new Set();
const statements = [];

for (const row of rows) {
  const legacyPath = normalizePath(String(row.slug ?? ""));
  const publicationId = publicationByLegacyPath.get(legacyPath);
  if (!publicationId) {
    unknownPaths.add(legacyPath || "(vacío)");
    continue;
  }
  const name = String(row.name ?? "").trim().replace(/\s+/g, " ");
  const message = String(row.message ?? "").trim();
  const createdDate = new Date(row.created_at);
  if (!name || name.length > 80 || !message || message.length > 2000 || Number.isNaN(createdDate.valueOf())) {
    throw new Error(`El comentario legacy ${stableLegacyId(row)} no cumple los límites; no se importó nada.`);
  }
  const createdAt = createdDate.toISOString();
  const legacyId = stableLegacyId(row);
  const id = `legacy-${createHash("sha256").update(legacyId).digest("hex").slice(0, 32)}`;
  statements.push(`INSERT OR IGNORE INTO comments (id, publication_id, author_name, body, created_at, hidden_at, legacy_id) VALUES (${sqlValue(id)}, ${sqlValue(publicationId)}, ${sqlValue(name)}, ${sqlValue(message)}, ${sqlValue(createdAt)}, NULL, ${sqlValue(legacyId)});`);
}

if (unknownPaths.size) throw new Error(`Hay slugs legacy sin mapeo: ${[...unknownPaths].sort().join(", ")}`);
console.log(`Comentarios listos para ${targetEnvironment}: ${statements.length}. El correo no se seleccionó ni se exportó.`);
if (dryRun || statements.length === 0) process.exit(0);

const temporaryDirectory = mkdtempSync(join(tmpdir(), "porta-comments-"));
const sqlFile = join(temporaryDirectory, "import.sql");
try {
  writeFileSync(sqlFile, `${statements.join("\n")}\nSELECT publication_id, COUNT(*) AS imported FROM comments WHERE legacy_id IS NOT NULL GROUP BY publication_id ORDER BY publication_id;\n`, { mode: 0o600 });
  const result = spawnSync("pnpm", ["exec", "wrangler", "d1", "execute", "DB", "--remote", "--env", targetEnvironment, "--file", sqlFile], { stdio: "inherit" });
  if (result.status !== 0) throw new Error(`Wrangler terminó con código ${result.status ?? "desconocido"}`);
} finally {
  rmSync(temporaryDirectory, { recursive: true, force: true });
}
