# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `bun dev` (runs on 0.0.0.0 with turbopack)
- **Build**: `bun run build` 
- **Production server**: `bun start`
- **Lint & Typecheck**: `bun run lint` (runs TypeScript check and Next.js ESLint)
- **Format code**: `bun run format` (uses Biome formatter)

## Project Architecture

This is a Next.js 15 project with TypeScript using the App Router architecture:

### Core Structure
- **App Router**: Uses `src/app/` directory structure with `layout.tsx`, `page.tsx` files
- **Static Export**: Configured for static site generation (`output: 'export'`, `distDir: 'out'`)
- **Styling**: Uses Tailwind CSS with custom utilities and shadcn/ui components
- **Analytics**: Integrated PostHog analytics with provider pattern
- **External Integration**: Uses same-runtime script for dynamic content personalization

### Key Dependencies
- **UI Framework**: React 18, Next.js 15
- **Styling**: Tailwind CSS, class-variance-authority, tailwind-merge, lucide-react
- **Analytics**: PostHog for event tracking and user analytics
- **Development**: Biome for formatting/linting, ESLint for Next.js rules

### Configuration Notes
- **Image Optimization**: Disabled (`unoptimized: true`) for static export
- **Allowed Domains**: Configured for Unsplash and same-assets.com images
- **PostHog Setup**: Requires `NEXT_PUBLIC_POSTHOG_KEY` environment variable with 'phc_' prefix
- **Biome**: Configured with space indentation, disabled accessibility rules for flexibility
- **ESLint**: Relaxed rules for unused variables and Next.js image optimization

### Analytics Implementation
PostHog is initialized through `PostHogProvider` component that wraps the app and automatically tracks page views on route changes. The provider is implemented at the root layout level.

### Static Site Generation
The project is configured for static export with Next.js, suitable for deployment on static hosting platforms like Netlify. The build output goes to the `out` directory.