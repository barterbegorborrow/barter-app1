import { NextResponse } from 'next/server';

let posts = []; // temporary in-memory storage

export async function GET() {
  return NextResponse.json(posts);
}

export async function POST(request) {
  const body = await request.json();
  if (!body.content) return NextResponse.json({ error: 'Content required' }, { status: 400 });

  const newPost = { id: Date.now(), content: body.content };
  posts.push(newPost);
  return NextResponse.json(newPost);
}
