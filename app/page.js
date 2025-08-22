'use client';

import { useState } from 'react';

export default function Page() {
  const [posts, setPosts] = useState([
    { id: 1, user: 'Alice', content: 'Selling a bike!' },
    { id: 2, user: 'Bob', content: 'Looking for a laptop.' },
  ]);

  const [newPost, setNewPost] = useState('');

  const handlePost = () => {
    if (newPost.trim() === '') return;
    setPosts([{ id: Date.now(), user: 'You', content: newPost }, ...posts]);
    setNewPost('');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h1>Welcome to Barter App!</h1>

      <div style={{ margin: '1rem 0' }}>
        <button style={{ marginRight: '1rem' }}>Sign In</button>
        <button>Join</button>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Share something..."
          style={{ width: '70%', padding: '0.5rem', marginRight: '0.5rem' }}
        />
        <button onClick={handlePost}>Post</button>
      </div>

      <div>
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              border: '1px solid #ccc',
              padding: '1rem',
              marginBottom: '1rem',
              borderRadius: '8px',
            }}
          >
            <strong>{post.user}</strong>: {post.content}
          </div>
        ))}
      </div>
    </div>
  );
}
