'use server'
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export async function createComment(formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  const slug = formData.get('slug');

  await sql`INSERT INTO comments (name, email, message, slug) VALUES (${name}, ${email}, ${message}, ${slug})`;
}

export async function getComments(slug) {
  return await sql`SELECT * FROM comments WHERE slug = ${slug} ORDER BY created_at DESC LIMIT 50`;
}
