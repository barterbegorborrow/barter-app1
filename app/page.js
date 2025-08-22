'use client';

import { useState, useEffect } from 'react';

// Mock storage for posts
let mockPosts = [
  { id: 1, user: 'Alice', content: 'Welcome to Barter!' },
  { id: 2, user: 'Bob', content: 'Hello world!' },
];

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [user, setUser] = useState('');

  // Load posts on component mount
  useEffect(() => {
    setPosts(mockPosts);
  }, []);

  const handlePost = () => {
    if (!user || !content) return alert('Enter username and content!');
    const newPost = { id: Date.now(), user, content };
    mockPosts = [newPost, ...mockPosts];
    setPosts(mockPosts);
    setContent('');
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Barter App Feed</h1>

      <div style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Your name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          type="text"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ marginRight: '0.5rem',
