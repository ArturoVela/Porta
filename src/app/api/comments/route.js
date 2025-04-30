import { insertComment, getCommentsBySlug } from '@/app/lib/comments';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  if (!slug) return new Response('Missing slug', { status: 400 });

  const comments = await getCommentsBySlug(slug);
  return Response.json(comments);
}

export async function POST(req) {
  const formData = await req.formData();
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  const slug = formData.get('slug');

  await insertComment({ name, email, message, slug });
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
