'use server'
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export async function createComment(formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  await sql`INSERT INTO comments (name, email, message) VALUES (${name}, ${email}, ${message})`;
}

export async function getComments() {
  return await sql`SELECT * FROM comments ORDER BY created_at DESC LIMIT 10`;
}
