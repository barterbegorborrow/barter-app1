'use client'

import { supabase } from '@/lib/supabase'
import { useState } from 'react'

export default function AuthPage() {
  const [email, setEmail] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) alert(error.message)
    else alert('Check your email for the login link!')
  }

  return (
    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '300px' }}>
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ padding: '8px' }}
      />
      <button type="submit" style={{ padding: '8px', cursor: 'pointer' }}>Sign In</button>
    </form>
  )
}
