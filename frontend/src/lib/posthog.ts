import posthog from 'posthog-js'

export const initPostHog = () => {
  if (typeof window !== 'undefined') {
    // IMPORTANT: You need to get your PROJECT API key from PostHog (starts with 'phc_')
    // Go to: app.posthog.com → Your Project → Settings → Project API Key

    // Temporarily using a placeholder - REPLACE THIS with your actual project key
    const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || 'phc_YOUR_PROJECT_KEY_HERE'

    // Check if we have a valid project key
    if (!POSTHOG_KEY.startsWith('phc_')) {
      console.error('⚠️ PostHog Error: Invalid API key! You need a PROJECT API key (starts with "phc_"), not a personal API key (starts with "phx_")')
      console.log('📝 To fix this:')
      console.log('1. Go to https://app.posthog.com')
      console.log('2. Click on your project')
      console.log('3. Go to Settings → Project API Keys')
      console.log('4. Copy the key that starts with "phc_"')
      console.log('5. Replace it in src/lib/posthog.ts or set NEXT_PUBLIC_POSTHOG_KEY environment variable')
      return
    }

    try {
      posthog.init(POSTHOG_KEY, {
        api_host: 'https://app.posthog.com',
        capture_pageview: true,
        capture_pageleave: true,
        autocapture: {
          // Enable enhanced autocapture with heatmap data
          css_selector_allowlist: ['[class*="button"]', 'button', 'a', '[role="button"]'],
          element_allowlist: ['button', 'a', 'input', 'select', 'textarea', 'label'],
          capture_attributes: ['class', 'id', 'href', 'type', 'name', 'role', 'aria-label'],
        },
        session_recording: {
          maskAllInputs: false,
          maskInputOptions: {
            password: true,
            email: false,
          },
        },
        // Enhanced properties for heatmaps
        property_blacklist: [], // Don't blacklist any properties
        capture_performance: true,
        debug: false, // Set to true if you need to debug
        loaded: (posthog) => {
          console.log('✅ PostHog loaded successfully!')
          console.log('📊 Project ID:', posthog.get_property('$project_id'))
          
          // Set user properties that are useful for heatmap analysis
          posthog.register({
            $initial_viewport_width: window.innerWidth,
            $initial_viewport_height: window.innerHeight,
            $initial_screen_width: window.screen.width,
            $initial_screen_height: window.screen.height,
            $user_agent: navigator.userAgent,
          })
        },
        on_xhr_error: (err) => {
          console.error('❌ PostHog XHR error:', err)
        }
      })
    } catch (error) {
      console.error('❌ PostHog initialization failed:', error)
    }
  }
}

export { posthog }

export const trackEvent = (event: string, properties?: Record<string, unknown>) => {
  if (typeof window !== 'undefined') {
    try {
      posthog.capture(event, properties)
    } catch (error) {
      console.warn('PostHog tracking error:', error)
    }
  }
}

export const identifyUser = (userId: string, properties?: Record<string, unknown>) => {
  if (typeof window !== 'undefined') {
    try {
      posthog.identify(userId, properties)
    } catch (error) {
      console.warn('PostHog identify error:', error)
    }
  }
}

export const trackPageView = (pageName: string) => {
  if (typeof window !== 'undefined') {
    try {
      posthog.capture('$pageview', { page: pageName })
    } catch (error) {
      console.warn('PostHog page view error:', error)
    }
  }
}
