import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import type { EmailClassification } from '@/lib/types'

interface State {
  data: EmailClassification[]
  loading: boolean
  error: string | null
  isLive: boolean
}

export function useEmailClassifications() {
  const [state, setState] = useState<State>({
    data: [],
    loading: true,
    error: null,
    isLive: false,
  })

  useEffect(() => {
    let isMounted = true

    async function loadInitial() {
      const { data, error } = await supabase
        .from('email_classifications')
        .select('*')
        .order('processed_at', { ascending: false })

      if (!isMounted) return

      if (error) {
        setState((s) => ({ ...s, loading: false, error: error.message }))
        return
      }

      setState((s) => ({
        ...s,
        data: (data ?? []) as EmailClassification[],
        loading: false,
        error: null,
      }))
    }

    loadInitial()

    const channel = supabase
      .channel('email_classifications-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'email_classifications' },
        (payload) => {
          const row = payload.new as EmailClassification
          setState((s) =>
            s.data.some((existing) => existing.id === row.id)
              ? s
              : { ...s, data: [row, ...s.data] },
          )
        },
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'email_classifications' },
        (payload) => {
          const row = payload.new as EmailClassification
          setState((s) => ({
            ...s,
            data: s.data.map((existing) => (existing.id === row.id ? row : existing)),
          }))
        },
      )
      .subscribe((status) => {
        if (!isMounted) return
        setState((s) => ({ ...s, isLive: status === 'SUBSCRIBED' }))
      })

    return () => {
      isMounted = false
      supabase.removeChannel(channel)
    }
  }, [])

  return state
}
