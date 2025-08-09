# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an AI-Powered Dynamic Website Personalization system built for a YC Hackathon. The system demonstrates real-time website optimization using AI and user behavior analysis through cookies. The website adapts based on user patterns - pricing-focused users see pricing prominently, content explorers get detailed information, and quick browsers get simplified experiences.

## Architecture

The project consists of two main components:

### Frontend (React/Next.js)
- **Location**: `/frontend/`
- **Framework**: Next.js 15 with TypeScript using App Router
- **Styling**: Tailwind CSS with shadcn/ui components
- **Analytics**: PostHog integration with custom provider
- **External Integration**: Uses same-runtime script for dynamic personalization
- **Configuration**: Static export enabled (`output: 'export'`, `distDir: 'out'`)

### Backend (Python Flask)
- **Location**: `/backend/`
- **Framework**: Flask with Flask-CORS
- **AI Engine**: Mock AI optimization rules for demo purposes
- **External Clients**: MorphClient for AI code generation, FreestyleClient for deployment
- **Data Storage**: In-memory storage (for demo - replace with real DB in production)

## Development Commands

### Quick Start
```bash
./setup.sh && ./start-demo.sh
```

### Manual Development

**Backend**:
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py  # Runs on port 5000
```

**Frontend**:
```bash
cd frontend
npm install
npm run dev    # Runs on port 3000 with turbopack
```

**Frontend Commands**:
- **Build**: `npm run build`
- **Production**: `npm start`
- **Lint & TypeCheck**: `npm run lint` (runs TypeScript check + ESLint)
- **Format**: `npm run format` (uses Biome formatter)

## Key Technologies & Dependencies

- **Frontend**: React 18, Next.js 15, Tailwind CSS, PostHog, lucide-react
- **Backend**: Flask, Flask-CORS, requests, python-dotenv
- **Development Tools**: Biome (formatting/linting), ESLint, TypeScript
- **External Services**: Morph AI (code generation), Freestyle (deployment)

## User Personas & Optimization Logic

The system recognizes three user personas through behavioral analysis:

1. **Sarah (Pricing Explorer)**: 3+ visits + high pricing interest → pricing_focused variant
2. **Marcus (Content Explorer)**: Long sessions + deep exploration → content_heavy variant  
3. **Alex (Quick Browser)**: Short sessions + high bounce rate → simplified variant

## Project Structure

```
/backend/
├── app.py                 # Main Flask application
├── morph_client.py        # AI code generation client
├── freestyle_client.py    # Deployment platform client
└── requirements.txt

/frontend/
├── src/app/               # Next.js App Router pages
├── src/components/        # Reusable UI components
├── src/data/             # Static data (companies, testimonials, etc.)
├── src/hooks/            # Custom React hooks
├── src/lib/              # Utilities and configurations
└── src/types/            # TypeScript type definitions
```

## Configuration Notes

- **Frontend PostHog**: Requires `NEXT_PUBLIC_POSTHOG_KEY` environment variable (starts with 'phc_')
- **Backend PostHog**: Requires `POSTHOG_PROJECT_ID` and `POSTHOG_PERSONAL_API_KEY` for API access
- **Image Domains**: Configured for Unsplash and same-assets.com
- **Static Export**: Project builds to `out/` directory for static hosting
- **Biome**: Uses space indentation, accessibility rules disabled for flexibility
- **Development**: Backend runs on port 5000, frontend on port 3000

## PostHog API Integration

The backend includes a complete PostHog API integration for retrieving user analytics data:

### PostHog Client (`backend/posthog_client.py`)
- **Class**: `PostHogClient` with rate limiting and error handling
- **Authentication**: Uses personal API key with Query Read permissions
- **Rate Limiting**: Respects PostHog's 120 queries/hour limit

### Available Functions
- **`get_user_data_from_posthog(user_id, days_back=30)`**: Get all events and interactions for a specific user
- **`get_all_users_from_posthog(limit=100, offset=0, days_back=30)`**: Get all users with activity data
- **`get_user_summary_stats()`**: Get aggregate statistics across all users

### API Endpoints
- **`GET /api/posthog/user/<user_id>`**: Individual user data from PostHog
- **`GET /api/posthog/users`**: All users list with pagination
- **`GET /api/posthog/stats`**: Summary statistics
- **`GET /api/posthog/enhanced-profile/<user_id>`**: Combined local + PostHog data

### Configuration Required
Set these environment variables in `backend/.env`:
```bash
POSTHOG_PROJECT_ID=your_project_id
POSTHOG_PERSONAL_API_KEY=phx_your_personal_api_key
POSTHOG_API_HOST=https://us.posthog.com  # or https://eu.posthog.com
```

## Demo Features

The application includes:
- Real-time user behavior tracking via cookies
- AI-powered page variant selection
- Smooth transitions between personalized experiences
- Demo controls for simulating different user personas
- Analytics dashboard for optimization metrics
- PostHog integration for enhanced user analytics