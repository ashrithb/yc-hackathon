'use client'

import { useEffect, useRef } from 'react'
import { trackEvent } from '@/lib/posthog'

export const usePageTracking = (pageName: string) => {
  const startTime = useRef<number>(Date.now())
  const scrollDepth = useRef<number>(0)

  useEffect(() => {
    const pageStartTime = startTime.current

    const handleScroll = () => {
      const winHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight
      const scrollTop = window.pageYOffset
      const trackLength = docHeight - winHeight
      const pctScrolled = Math.floor(scrollTop / trackLength * 100)

      if (pctScrolled > scrollDepth.current) {
        scrollDepth.current = pctScrolled
      }
    }

    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - pageStartTime) / 1000)
      trackEvent('page_engagement', {
        page: pageName,
        time_spent_seconds: timeSpent,
        max_scroll_depth: scrollDepth.current
      })
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('beforeunload', handleBeforeUnload)

    // Track page entry
    trackEvent('page_entered', { page: pageName })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('beforeunload', handleBeforeUnload)

      // Track page exit
      const timeSpent = Math.round((Date.now() - pageStartTime) / 1000)
      trackEvent('page_exited', {
        page: pageName,
        time_spent_seconds: timeSpent,
        max_scroll_depth: scrollDepth.current
      })
    }
  }, [pageName])
}

export const trackButtonClick = (buttonName: string, additionalProps?: Record<string, unknown>) => {
  trackEvent('button_clicked', {
    button_name: buttonName,
    ...additionalProps
  })
}

export const trackLinkClick = (linkName: string, destination: string, additionalProps?: Record<string, unknown>) => {
  trackEvent('link_clicked', {
    link_name: linkName,
    destination,
    ...additionalProps
  })
}

export const trackSearchQuery = (query: string, page: string, results?: number) => {
  trackEvent('search_performed', {
    query,
    page,
    results_count: results,
    query_length: query.length
  })
}
