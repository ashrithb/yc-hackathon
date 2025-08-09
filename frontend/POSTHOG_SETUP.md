# PostHog Analytics Setup Guide

## Current Status
✅ PostHog has been integrated into your Y Combinator website clone
⚠️ **API Key Issue**: The provided key appears to be a personal API key, but PostHog requires a **project API key**

## How to Get the Correct API Key

1. **Log into PostHog**: Go to [app.posthog.com](https://app.posthog.com)
2. **Navigate to Project Settings**: Click on your project → Settings
3. **Find Project API Key**: Look for "Project API Key" (starts with `phc_`)
4. **Copy the Project Key**: This is different from your personal API key

## Updating the API Key

Replace the API key in `src/lib/posthog.ts`:

```typescript
posthog.init('YOUR_PROJECT_API_KEY_HERE', {
  // ... config options
})
```

## What's Already Tracked

### 📊 **Page Analytics**
- Page views and engagement time
- Scroll depth tracking
- User journey between pages

### 🎯 **User Actions**
- **Application Submissions**: Track complete application form data
- **Job Applications**: Track which jobs users apply to
- **Co-founder Connections**: Track networking attempts
- **SAFE Downloads**: Track document downloads
- **Company Logo Clicks**: Track interest in specific companies
- **Newsletter Signups**: Track subscription attempts

### 📈 **Form Analytics**
- Form completion rates
- Field-by-field completion tracking
- Submission success/failure rates

### 🔍 **Search Tracking**
- Search queries and results
- Popular search terms
- Search success rates

## Key Events Being Tracked

| Event Name | Description | Properties |
|------------|-------------|------------|
| `application_submitted` | YC application completed | company_name, batch, form_completion_rate |
| `job_application_clicked` | User applied to a job | company, role, location, salary |
| `cofounder_connect_clicked` | Co-founder connection attempt | profile_name, skills, location |
| `safe_document_downloaded` | SAFE document download | document_title, file_size |
| `company_logo_clicked` | Company logo interaction | company |
| `newsletter_subscribe_clicked` | Newsletter signup | page |
| `page_engagement` | Page interaction metrics | time_spent, scroll_depth |

## Benefits of This Setup

1. **User Journey Insights**: See how users navigate through your YC clone
2. **Conversion Tracking**: Track application and signup conversion rates
3. **Content Performance**: See which companies and resources are most popular
4. **Form Optimization**: Identify where users drop off in forms
5. **Engagement Metrics**: Understand which pages keep users engaged longest

## Privacy & Compliance

- Email masking disabled for form analytics
- Password fields are masked for security
- Session recordings enabled for UX insights
- Autocapture enabled for comprehensive tracking

Once you update the API key, you'll start seeing rich analytics data in your PostHog dashboard!
