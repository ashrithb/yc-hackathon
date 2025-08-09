'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/posthog'

export const useButtonClickTracking = () => {
  useEffect(() => {
    const handleButtonClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      
      // Check if the clicked element is a button or has button-like behavior
      const isButton = target.tagName === 'BUTTON' || 
                      target.role === 'button' || 
                      target.getAttribute('data-button') === 'true' ||
                      target.closest('button') !== null ||
                      target.closest('[role="button"]') !== null ||
                      target.closest('a') !== null // Include links as clickable elements

      if (isButton) {
        // Get the actual button/clickable element
        const buttonElement = target.closest('button') || 
                            target.closest('[role="button"]') || 
                            target.closest('a') || 
                            target

        // Extract useful information about the button
        const buttonText = buttonElement?.textContent?.trim() || 
                          buttonElement?.getAttribute('aria-label') || 
                          buttonElement?.getAttribute('title') || 
                          'Unknown button'

        const buttonId = buttonElement?.getAttribute('id') || undefined
        const buttonClass = buttonElement?.getAttribute('class') || undefined
        const buttonType = buttonElement?.getAttribute('type') || undefined
        const href = buttonElement?.getAttribute('href') || undefined
        const dataAttributes: Record<string, string> = {}
        
        // Collect data-* attributes
        if (buttonElement) {
          Array.from(buttonElement.attributes).forEach(attr => {
            if (attr.name.startsWith('data-')) {
              dataAttributes[attr.name] = attr.value
            }
          })
        }

        // Get click coordinates for heatmap
        const rect = buttonElement?.getBoundingClientRect()
        const clickX = event.clientX
        const clickY = event.clientY
        
        // Calculate relative click position within the element
        const relativeX = rect ? clickX - rect.left : clickX
        const relativeY = rect ? clickY - rect.top : clickY

        // Get viewport and screen information
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight
        const screenWidth = window.screen.width
        const screenHeight = window.screen.height

        // Track the button click event with enhanced heatmap data
        trackEvent('button_clicked', {
          button_text: buttonText,
          button_id: buttonId,
          button_class: buttonClass,
          button_type: buttonType,
          button_href: href,
          button_tag: buttonElement?.tagName.toLowerCase(),
          page_url: window.location.pathname,
          page_title: document.title,
          timestamp: new Date().toISOString(),
          // Heatmap data
          $click_x: clickX,
          $click_y: clickY,
          $element_x: relativeX,
          $element_y: relativeY,
          $viewport_width: viewportWidth,
          $viewport_height: viewportHeight,
          $screen_width: screenWidth,
          $screen_height: screenHeight,
          $element_text: buttonText,
          $element_tag_name: buttonElement?.tagName.toLowerCase(),
          $element_classes: buttonClass,
          ...dataAttributes
        })

        console.log('🖱️ Button clicked:', buttonText, { 
          clickX, clickY, relativeX, relativeY, 
          buttonId, buttonClass, href 
        })
      }
    }

    // Add event listener to document to catch all clicks
    document.addEventListener('click', handleButtonClick, true)

    // Cleanup
    return () => {
      document.removeEventListener('click', handleButtonClick, true)
    }
  }, [])
}