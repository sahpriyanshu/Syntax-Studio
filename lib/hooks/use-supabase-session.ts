import { createBrowserClient } from '@supabase/ssr'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useSupabaseSession() {
  const router = useRouter()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        // If the user is logged in, refresh the page to update the session
        router.refresh()
      } else {
        // If the user is logged out, redirect to login
        router.push('/login')
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase])

  return supabase
}
