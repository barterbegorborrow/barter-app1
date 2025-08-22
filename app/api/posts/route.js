let posts = []; // in-memory store

export async function GET() {
  return new Response(JSON.stringify(posts), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(req) {
  const { content } = await req.json();
  const newPost = { id: Date.now(), content };
  posts.push(newPost);
  return new Response(JSON.stringify(newPost), {
    headers: { 'Content-Type': 'application/json' },
  });
}
