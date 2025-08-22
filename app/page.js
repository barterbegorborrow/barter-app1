'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Home() {
  const [session, setSession] = useState(null)
  const [email, setEmail] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session))
    return () => subscription.unsubscribe()
  }, [])

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) alert(error.message)
    else alert('Check your email for a sign-in link!')
  }

  return (
    <main>
      {!session ? (
        <div>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
          <button onClick={signIn}>Sign In</button>
        </div>
      ) : (
        <p>Welcome! You are signed in.</p>
      )}
    </main>
  )
}
