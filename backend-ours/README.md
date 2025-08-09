# backend-ours

Personalization API that reads PostHog analytics (via teammate's API), uses Claude Sonnet to decide UI edits, and Morph to apply code edits to Next.js app pages. Components are read-only context; PostHog analytics code is never modified.

## Setup

1. Create `.env` with:
```
ANTHROPIC_API_KEY=...
MORPH_API_KEY=...
FRIEND_POSTHOG_API_BASE=...
```

2. Install deps:
```
pip install -r requirements.txt
```

3. Run server:
```
uvicorn main:app --reload --host 0.0.0.0 --port 8080
```

## Endpoints
- `POST /personalize` → triggers Sonnet+Morph pipeline and commits changes
- `GET /health` → readiness probe 