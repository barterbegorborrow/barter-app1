"use client";

import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");

  // Fetch posts from API
  useEffect(() => {
    fetch("/api/posts")
      .then(res => res.json())
      .then(setPosts)
      .catch(console.error);
  }, []);

  // Add new post
  const addPost = async () => {
    if (!session || !content) return;
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
    return (
      <div style={{ padding: "2rem" }}>
        <h1>Welcome to Barter App</h1>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome, {session.user.name}</h1>
      <button onClick={() => signOut()}>Sign out</button>

      <div style={{ marginTop: "1rem" }}>
        <input
          type="text"
          value={content}
          placeholder="Write a post"
          onChange={e => setContent(e.target.value)}
          style={{ width: "70%", marginRight: "0.5rem" }}
        />
        <button onClick={addPost}>Pos
