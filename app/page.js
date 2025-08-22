"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setSession(session);
      }
    );

    fetchPosts();

    return () => listener.subscription.unsubscribe();
  }, []);

  async function signUp() {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert("Check your email for confirmation!");
  }

  async function signIn() {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  }

  async function signOut() {
    await supabase.auth.signOut();
    setSession(null);
  }

  async function fetchPosts() {
    const { data, error } = await supabase.from("posts").select("*").order("id", { ascending: false });
    if (error) console.log(error);
    else setPosts(data);
  }

  async function createPost() {
    if (!newPost) return;
    const { error } = await supabase.from("posts").insert([{ content: newPost }]);
    if (error) alert(error.message);
    else {
      setNewPost("");
      fetchPosts();
    }
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      {!session ? (
        <div>
          <h1>Welcome to Barter App</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={signUp}>Sign Up</button>
          <button onClick={signIn}>Sign In</button>
        </div>
      ) : (
        <div>
          <h1>Feed</h1>
          <button onClick={signOut}>Sign Out</button>
          <div style={{ marginTop: "1rem" }}>
            <input
              type="text"
              placeholder="Write a post..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
            <button onClick={createPost}>Post</button>
          </div>
          <ul style={{ marginTop: "1rem" }}>
            {posts.map((post) => (
              <li key={post.id}>{post.content}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
