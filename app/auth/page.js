'use client'

import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export default function Home() {
  const [data, setData] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from('users').select('*')
      if (error) console.log(error)
      else setData(data)
    }
    fetchData()
  }, [])

  return (
    <div>
      <h1>Supabase Test</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
