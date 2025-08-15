'use client'
import { supabase } from '@/lib/supabase'
import { useEffect } from 'react'

export default function HomePage() {
  useEffect(() => {
    const testConnection = async () => {
      const { data, error } = await supabase.from('user').select()
      console.log({ data, error })
    }
    testConnection()
  }, [])

  return <h1>Supabase Test</h1>
}
