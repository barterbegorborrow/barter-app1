'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Feed() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      console.error(error)
      return
    }
    setPosts(data || [])
  }

  return (
    <div>
      {posts.length === 0 && <p>No posts yet.</p>}
      {posts.map((p) => (
        <div key={p.id} style={{ border: '1px solid #ddd', padding: 12, marginBottom: 12 }}>
          <h3>{p.title || '(no title)'}</h3>
          <p>{p.description}</p>
          {p.media_url && <img src={p.media_url} alt={p.title} style={{ maxWidth: 320 }} />}
          <small>Posted: {new Date(p.created_at).toLocaleString()}</small>
        </div>
      ))}
    </div>
  )
}
