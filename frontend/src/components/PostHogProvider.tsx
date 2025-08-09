'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { initPostHog, trackPageView } from '@/lib/posthog'
import { useButtonClickTracking } from '@/hooks/useButtonClickTracking'
import { useHeatmapTracking } from '@/hooks/useHeatmapTracking'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Initialize PostHog
  useEffect(() => {
    initPostHog()
  }, [])

  // Track page views on route changes
  useEffect(() => {
    if (pathname) {
      trackPageView(pathname)
    }
  }, [pathname])

  // Enable automatic button click tracking
  useButtonClickTracking()
  
  // Enable comprehensive heatmap tracking
  useHeatmapTracking()

  return <>{children}</>
}
