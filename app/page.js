'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');

  const fetchPosts = async () => {
    const res = await fetch('/api/posts');
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content) return;

    await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
    setContent('');
    fetchPosts();
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Barter Feed</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Write something..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ width: '300px', padding: '0.5rem' }}
        />
        <button type="submit" style={{ marginLeft: '0.5rem', padding: '0.5rem 1rem' }}>Post</button>
      </form>
      <div>
        {posts.length === 0 ? <p>No posts yet.</p> : posts.map((p) => (
          <div key={p.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid #ccc' }}>
            {p.content} <small style={{ color: '#888' }}>{new Date(p.created_at).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </main>
  );
}
