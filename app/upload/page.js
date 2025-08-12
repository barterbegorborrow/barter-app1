'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'

export default function UploadPage() {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [file, setFile] = useState(null)
  const [msg, setMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setMsg('Uploading...')
    try {
      // get current user
      const {
        data: { user }
      } = await supabase.auth.getUser()
      if (!user) {
        setMsg('You must be logged in to post.')
        return
      }

      // ensure profile exists (upsert)
      await supabase.from('profiles').upsert({
        id: user.id,
        username: user.email.split('@')[0] // quick default
      })

      let mediaUrl = null
      if (file) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${uuidv4()}.${fileExt}`
        const { data: uploadData, error: upErr } = await supabase.storage
          .from('public-media')
          .upload(fileName, file)
        if (upErr) throw upErr
        // public URL
        const { data: publicUrlData } = supabase.storage.from('public-media').getPublicUrl(fileName)
        mediaUrl = publicUrlData.publicUrl
      }

      const { error: insertErr } = await supabase.from('posts').insert({
        user_id: user.id,
        title,
        description: desc,
        media_url: mediaUrl
      })
      if (insertErr) throw insertErr

      setMsg('Uploaded!')
      setTitle(''); setDesc(''); setFile(null)
    } catch (err) {
      console.error(err)
      setMsg('Error: ' + err.message)
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>New Post</h2>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" required />
        <br />
        <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description" />
        <br />
        <input type="file" onChange={(e)=>setFile(e.target.files?.[0] || null)} />
        <br />
        <button type="submit">Post</button>
      </form>
      <p>{msg}</p>
    </div>
  )
}
