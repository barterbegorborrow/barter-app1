'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [session, setSession] = useState(null);
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    fetchPosts();
    return () => authListener.subscription.unsubscribe();
  }, []);

  async function fetchPosts() {
    const { data } = await fetch('/api/posts').then((res) => res.json());
    setPosts(data || []);
  }

  async function signIn() {
    const { error } = await supabase.auth.signInWithOtp({ email: prompt('Enter your email') });
    if (error) alert(error.message);
    else alert('Check your email for the login link!');
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!content) return;

    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    setContent('');
    fetchPosts();
  }

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Barter Feed</h1>
      {!session ? (
        <button onClick={signIn}>Sign In</button>
      ) : (
        <button onClick={signOut}>Sign Out</button>
      )}
      {session && (
        <form onSubmit={handleSubmit} style={{ margin: '1rem 0' }}>
          <input value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write something..." />
          <button type="submit">Post</button>
        </form>
      )}
      <div>
        {posts.length === 0 ? <p>No posts yet.</p> : posts.map((p) => (
          <div key={p.id}>
            {p.content} <small>{new Date(p.created_at).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </main>
  );
}
