# PostHog API Testing Guide

## 🚀 Quick Start

### 1. Start the Backend Server
```bash
cd backend
pip install -r requirements.txt  # If not already done
python3 app.py
```

The server will run on `http://localhost:3001` (note: your app.py uses port 3001, not 5000)

## 🧪 Test the APIs

### Method 1: Using curl (Terminal/Command Line)

#### Test 1: Get PostHog Configuration Info
```bash
curl -X GET "http://localhost:3001/api/posthog/info" \
  -H "Content-Type: application/json" | jq
```

#### Test 2: Send an Event to PostHog
```bash
curl -X POST "http://localhost:3001/api/posthog/send-event" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "test_user_123",
    "event": "api_test_event",
    "properties": {
      "source": "curl_test",
      "page": "/test",
      "button": "test_button"
    }
  }' | jq
```

#### Test 3: Get User Data
```bash
curl -X GET "http://localhost:3001/api/posthog/user/test_user_123?days_back=30" \
  -H "Content-Type: application/json" | jq
```

#### Test 4: Get All Users
```bash
curl -X GET "http://localhost:3001/api/posthog/users?limit=10&days_back=30" \
  -H "Content-Type: application/json" | jq
```

#### Test 5: Get Summary Stats
```bash
curl -X GET "http://localhost:3001/api/posthog/stats" \
  -H "Content-Type: application/json" | jq
```

#### Test 6: Get Enhanced User Profile
```bash
curl -X GET "http://localhost:3001/api/posthog/enhanced-profile/test_user_123" \
  -H "Content-Type: application/json" | jq
```

### Method 2: Using a REST Client (Postman/Insomnia)

**Base URL:** `http://localhost:3001`

**Collection of Endpoints:**

1. **GET** `/api/posthog/info`
2. **POST** `/api/posthog/send-event`
   - Body (JSON):
   ```json
   {
     "user_id": "test_user_123",
     "event": "button_click",
     "properties": {
       "button_name": "pricing",
       "page": "homepage"
     }
   }
   ```
3. **GET** `/api/posthog/user/test_user_123`
4. **GET** `/api/posthog/users`
5. **GET** `/api/posthog/stats`
6. **GET** `/api/posthog/enhanced-profile/test_user_123`

### Method 3: Using Your Browser

For GET requests, you can test directly in browser:

- http://localhost:3001/api/posthog/info
- http://localhost:3001/api/posthog/user/test_user_123
- http://localhost:3001/api/posthog/users
- http://localhost:3001/api/posthog/stats

## 🔍 What to Expect

### With Your Current Setup (Both Keys)
Since you have both project and personal API keys configured, you should see:

1. **Real PostHog data** when querying users and events
2. **Successful event sending** to PostHog
3. **Actual analytics** from your PostHog project

### Sample Responses

#### PostHog Info Response:
```json
{
  "api_key_type": "both",
  "capabilities": ["send_events", "query_events", "get_users"],
  "project_id": "205455"
}
```

#### Send Event Response:
```json
{
  "success": true,
  "message": "Event sent successfully"
}
```

#### User Data Response:
```json
{
  "user_id": "test_user_123",
  "events": [...],
  "summary": {
    "total_events": 5,
    "page_views": 3,
    "pricing_interest": 0.2,
    "content_interest": 0.1
  },
  "data_source": "posthog_query_api"
}
```

## 🐛 Troubleshooting

### Common Issues:

1. **"Connection refused"** - Backend server not running
   - Solution: `cd backend && python3 app.py`

2. **"PostHog client not configured"** - Environment variables missing
   - Solution: Check `.env` file has correct values

3. **"Module not found"** - Dependencies not installed
   - Solution: `pip install -r requirements.txt`

4. **"Rate limit reached"** - Too many requests
   - Solution: Wait 1 hour or use fewer requests

## 📊 Verification

After sending events, check your PostHog dashboard:
1. Go to https://app.posthog.com
2. Navigate to Events → Live events
3. Look for your test events appearing in real-time

## 🎯 Next Steps

Once you confirm the APIs work:
1. Integrate with your frontend
2. Add real user tracking
3. Use the analytics for your AI personalization system