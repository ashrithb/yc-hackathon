'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/posthog'

export const useHeatmapTracking = () => {
  useEffect(() => {
    const handleAllClicks = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      
      // Get click coordinates
      const clickX = event.clientX
      const clickY = event.clientY
      
      // Get viewport and screen information
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const screenWidth = window.screen.width
      const screenHeight = window.screen.height
      
      // Get element information
      const elementText = target.textContent?.trim().substring(0, 100) || ''
      const elementTag = target.tagName.toLowerCase()
      const elementClasses = target.className || ''
      const elementId = target.id || ''
      
      // Get element position relative to viewport
      const rect = target.getBoundingClientRect()
      const relativeX = clickX - rect.left
      const relativeY = clickY - rect.top
      
      // Track comprehensive click event for heatmap
      trackEvent('click_heatmap', {
        // PostHog standard properties for heatmaps
        $click_x: clickX,
        $click_y: clickY,
        $element_x: relativeX,
        $element_y: relativeY,
        $viewport_width: viewportWidth,
        $viewport_height: viewportHeight,
        $screen_width: screenWidth,
        $screen_height: screenHeight,
        $element_text: elementText,
        $element_tag_name: elementTag,
        $element_classes: elementClasses,
        $element_id: elementId,
        
        // Page context
        $current_url: window.location.href,
        $pathname: window.location.pathname,
        
        // Additional element data
        element_width: rect.width,
        element_height: rect.height,
        element_top: rect.top,
        element_left: rect.left,
        
        // Timestamp
        timestamp: new Date().toISOString(),
      })

      // Optional: Add scroll tracking
      const scrollX = window.scrollX
      const scrollY = window.scrollY
      const scrollPercentageX = (scrollX / (document.body.scrollWidth - viewportWidth)) * 100
      const scrollPercentageY = (scrollY / (document.body.scrollHeight - viewportHeight)) * 100

      // Track scroll position at time of click
      if (scrollY > 0) {
        trackEvent('scroll_position', {
          scroll_x: scrollX,
          scroll_y: scrollY,
          scroll_percentage_x: scrollPercentageX || 0,
          scroll_percentage_y: scrollPercentageY || 0,
          $scroll_depth_percentage: Math.min(100, scrollPercentageY),
          $viewport_width: viewportWidth,
          $viewport_height: viewportHeight,
          $current_url: window.location.href,
          timestamp: new Date().toISOString(),
        })
      }
    }

    const handleScroll = () => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      const documentHeight = document.body.scrollHeight
      const scrollPercentage = (scrollY / (documentHeight - viewportHeight)) * 100

      // Track scroll depth every 25% milestone
      const milestone = Math.floor(scrollPercentage / 25) * 25
      if (milestone > 0 && milestone <= 100) {
        trackEvent('scroll_depth', {
          $scroll_depth_percentage: milestone,
          scroll_y: scrollY,
          $viewport_width: window.innerWidth,
          $viewport_height: viewportHeight,
          $current_url: window.location.href,
          timestamp: new Date().toISOString(),
        })
      }
    }

    // Throttle scroll events to avoid too many calls
    let scrollTimeout: NodeJS.Timeout | null = null
    const throttledScroll = () => {
      if (scrollTimeout) return
      scrollTimeout = setTimeout(() => {
        handleScroll()
        scrollTimeout = null
      }, 500) // Track scroll every 500ms at most
    }

    // Add event listeners
    document.addEventListener('click', handleAllClicks, true)
    window.addEventListener('scroll', throttledScroll, { passive: true })

    // Cleanup
    return () => {
      document.removeEventListener('click', handleAllClicks, true)
      window.removeEventListener('scroll', throttledScroll)
      if (scrollTimeout) clearTimeout(scrollTimeout)
    }
  }, [])
}