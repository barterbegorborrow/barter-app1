'use client';

import { useEffect, useState } from 'react';

export default function Page() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');

  // Fetch posts from API
  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  // Submit new post
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content) return;
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    const newPost = await res.json();
    setPosts([...posts, newPost]);
    setContent('');
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '2rem' }}>
      <h1>Barter App Feed</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Write something..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ width: '80%', padding: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem', marginLeft: '0.5rem' }}>
          Post
        </button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {posts.map(post => (
          <li key={post.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid #ccc' }}>
            {post.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
