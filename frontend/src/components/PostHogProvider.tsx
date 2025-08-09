'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { initPostHog, trackPageView } from '@/lib/posthog'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    initPostHog()
  }, [])

  useEffect(() => {
    // Track page views on route changes
    if (pathname) {
      trackPageView(pathname)
    }
  }, [pathname])

  return <>{children}</>
}
