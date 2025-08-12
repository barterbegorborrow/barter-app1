'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  async function handleLogin(e) {
    e.preventDefault()
    setMessage('')
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) setMessage(error.message)
    else setMessage('Check your email for login link (or magic link).')
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Sign in / Sign up</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: 8, width: 320 }}
          required
        />
        <button style={{ marginLeft: 8, padding: '8px 12px' }} type="submit">Send login link</button>
      </form>
      <p>{message}</p>
    </div>
  )
}
