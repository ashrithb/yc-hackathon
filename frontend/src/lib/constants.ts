export const COLORS = {
  primary: '#c6542c',
  primaryHover: '#b54928',
  background: '#f6f6f2',
  white: '#ffffff',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827'
  }
} as const;

export const SPACING = {
  section: 'py-16',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
} as const;

export const TYPOGRAPHY = {
  h1: 'text-6xl font-bold',
  h2: 'text-4xl font-bold',
  h3: 'text-3xl font-bold',
  h4: 'text-2xl font-bold',
  h5: 'text-xl font-bold',
  body: 'text-gray-700',
  bodyLarge: 'text-xl text-gray-700'
} as const;

export const ROUTES = {
  home: '/',
  about: '/about',
  companies: '/companies',
  jobs: '/jobs',
  cofounder: '/cofounder',
  library: '/library',
  safe: '/safe',
  resources: '/resources',
  apply: '/apply'
} as const;