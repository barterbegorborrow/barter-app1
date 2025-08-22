'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabaseClient' // make sure this file exists

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignIn = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    setLoading(false)
    if (error) {
      alert(error.message)
    } else {
      alert('Signed in successfully!')
    }
  }

  const handleSignUp = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    setLoading(false)
    if (error) {
      alert(error.message)
    } else {
      alert('Check your email for a confirmation link!')
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', margin: '50px auto' }}>
      <h1>Barter App</h1>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn} disabled={loading}>
        {loading ? 'Loading...' : 'Sign In'}
      </button>
      <button onClick={handleSignUp} disabled={loading}>
        {loading ? 'Loading...' : 'Join (Sign Up)'}
      </button>
    </div>
  )
}
