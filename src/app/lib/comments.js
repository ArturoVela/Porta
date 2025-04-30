import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

// Inserta un comentario
export async function insertComment({ name, email, message, slug }) {
  await sql`INSERT INTO comments (name, email, message, slug) VALUES (${name}, ${email}, ${message}, ${slug})`;
}

// Obtiene comentarios por slug
export async function getCommentsBySlug(slug) {
  return await sql`SELECT * FROM comments WHERE slug = ${slug} ORDER BY created_at DESC LIMIT 50`;
}
