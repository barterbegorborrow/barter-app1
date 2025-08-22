"use client";

import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/api/posts")
      .then(res => res.json())
      .then(setPosts);
  }, []);

  const addPost = async () => {
    if (!session) return;
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: session.user.email, content }),
    });
    const newPost = await res.json();
    setPosts([newPost[0], ...posts]);
    setContent("");
  };

  if (!session) {
    return <button onClick={() => signIn()}>Sign in</button>;
  }

  return (
    <div>
      <h1>Welcome, {session.user.name}</h1>
      <button onClick={() => signOut()}>Sign out</button>
      <div>
        <input value={content} onChange={e => setContent(e.target.value)} placeholder="Write a post" />
        <button onClick={addPost}>Post</button>
      </div>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.content} — {post.user_id}</li>
        ))}
      </ul>
    </div>
  );
}
