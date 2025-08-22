'use client'; // needed if using client-side fetching

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
    <div>
      <h1>Barter App Feed</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Write something..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>

      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.content}</li>
        ))}
      </ul>
    </div>
  );
}
