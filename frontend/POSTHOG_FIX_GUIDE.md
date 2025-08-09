# 🔧 PostHog Integration Fix Guide

## ❌ Current Issue
Your PostHog data isn't showing because you're using a **personal API key** (`phx_...`) instead of a **project API key** (`phc_...`).

## ✅ How to Fix It

### Step 1: Get Your Project API Key

1. **Log into PostHog**: Go to [app.posthog.com](https://app.posthog.com)
2. **Select Your Project**: Click on your project from the dashboard
3. **Navigate to Settings**:
   - Click the gear icon (⚙️) or "Settings" in the left sidebar
   - Then click "Project" or "Project settings"
4. **Find Project API Keys**:
   - Look for "Project API Keys" section
   - You'll see a key that starts with `phc_` (NOT `phx_`)
   - Click the copy button to copy it

### Step 2: Update Your Configuration

#### Option A: Using Environment Variable (Recommended)
1. Open the file `yc-clone/.env.local`
2. Replace `phc_YOUR_PROJECT_KEY_HERE` with your actual project key:
   ```
   NEXT_PUBLIC_POSTHOG_KEY=phc_your_actual_key_here
   ```

#### Option B: Direct Update
1. Open `yc-clone/src/lib/posthog.ts`
2. Replace the placeholder key on line 8 with your actual key

### Step 3: Restart Your Dev Server
```bash
# Stop the server (Ctrl+C) then restart:
cd yc-clone
bun run dev
```

### Step 4: Verify It's Working

1. **Open Browser DevTools** (F12 or right-click → Inspect)
2. **Go to Console tab**
3. **Navigate to your site**
4. **Look for these messages**:
   - ✅ "PostHog loaded successfully!"
   - 📊 "Project ID: [some number]"

5. **Check Network tab**:
   - Filter by "posthog"
   - You should see requests to `app.posthog.com/e/` (events)
   - Status should be 200 OK

### Step 5: Verify in PostHog Dashboard

1. Go to [app.posthog.com](https://app.posthog.com)
2. Click on your project
3. Navigate to "Activity" or "Live Events"
4. You should see events coming in real-time:
   - `$pageview` events
   - `page_entered` events
   - Button clicks and other interactions

## 🔍 Debugging Checklist

If data still isn't showing:

### ✅ Check the Console
```javascript
// Open browser console and type:
posthog
// Should return the PostHog object

posthog.get_distinct_id()
// Should return a unique ID

posthog.get_property('$project_id')
// Should return your project ID
```

### ✅ Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Invalid API key" error | Make sure you're using a PROJECT key (`phc_...`) not personal key (`phx_...`) |
| No network requests | Check if ad blockers are blocking PostHog |
| 401/403 errors | Your API key might be invalid or expired |
| Events not showing | Wait 1-2 minutes - there can be a slight delay |
| "PostHog not defined" | Make sure the page has fully loaded |

### ✅ Test Events

After fixing the API key, test these actions to generate events:

1. **Page Views**: Navigate between pages
2. **Form Submission**: Go to `/apply` and submit the form
3. **Job Applications**: Click "Apply" on job listings at `/jobs`
4. **Document Downloads**: Download SAFE documents at `/safe`
5. **Newsletter Signup**: Subscribe to newsletter in footer

## 📊 What You'll See in PostHog

Once working, you'll see:

- **Real-time Events**: Live feed of user actions
- **User Paths**: How users navigate your site
- **Session Recordings**: Watch user sessions
- **Custom Events**:
  - `application_submitted`
  - `job_application_clicked`
  - `safe_document_downloaded`
  - `company_logo_clicked`
  - `page_engagement` (with time spent & scroll depth)

## 🆘 Still Not Working?

1. **Clear Browser Cache**: Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
2. **Try Incognito Mode**: Rules out extension conflicts
3. **Check PostHog Status**: Visit [status.posthog.com](https://status.posthog.com)
4. **Contact Support**: PostHog has excellent support at [posthog.com/support](https://posthog.com/support)

## 📝 Notes

- The current implementation has **debug mode enabled** (you'll see logs in console)
- Once working, set `debug: false` in `src/lib/posthog.ts` for production
- Your site is already tracking extensive analytics - you just need the right API key!
