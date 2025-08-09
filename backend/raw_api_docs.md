# 📊 PostHog Raw Data API Documentation

**Server**: `http://localhost:5002`

This API returns **100% raw, unprocessed PostHog data** exactly as stored in their database.

## 🚀 Available Endpoints

### 1. **GET /api/posthog/raw/events** - Raw Events Data

Returns complete PostHog events with all available fields.

**Query Parameters:**
- `distinct_id` (optional) - Filter by specific user
- `limit` (default: 100) - Max events to return  
- `days_back` (default: 30) - Days back to query

**Example:**
```bash
curl "http://localhost:5002/api/posthog/raw/events?limit=5&distinct_id=user_123"
```

**Raw PostHog Response Includes:**
- All event metadata (cache info, query execution details)
- Raw ClickHouse SQL query used
- Complete event data with **22 fields**:
  - `uuid`, `event`, `properties`, `timestamp`, `distinct_id`
  - `elements_chain`, `created_at`, `$session_id`, `$window_id`
  - `person_id`, `$group_0-4`, element chains, person data
- Query performance timings
- Data type information

### 2. **GET /api/posthog/raw/users** - Raw Users Data

Returns user aggregations from events table.

**Query Parameters:**
- `limit` (default: 100) - Max users to return
- `days_back` (default: 30) - Days back to query

**Example:**
```bash
curl "http://localhost:5002/api/posthog/raw/users?limit=10"
```

**Raw User Data Fields:**
- `distinct_id` - User identifier
- `first_seen` / `last_seen` - Activity timestamps
- `event_count` - Total events for user
- `unique_events` - Number of unique event types
- `pageviews` - Count of $pageview events
- `autocapture_events` - Count of $autocapture events
- `person_id` - PostHog person UUID

### 3. **GET /api/posthog/raw/event-types** - Event Types Analysis

Get all event types with counts and metadata.

**Query Parameters:**
- `days_back` (default: 30) - Days back to analyze

**Example:**
```bash
curl "http://localhost:5002/api/posthog/raw/event-types?days_back=7"
```

### 4. **POST /api/posthog/raw/query** - Execute Any HogQL Query

Execute custom HogQL queries directly against PostHog.

**Body:**
```json
{
  "query": "SELECT event, count() FROM events WHERE timestamp >= today() - INTERVAL 1 DAY GROUP BY event"
}
```

**Example:**
```bash
curl -X POST "http://localhost:5002/api/posthog/raw/query" \
  -H "Content-Type: application/json" \
  -d '{"query": "SELECT DISTINCT event FROM events LIMIT 10"}'
```

### 5. **POST /api/posthog/send-event** - Send Event

Send new events to PostHog.

**Body:**
```json
{
  "distinct_id": "user_123",
  "event": "button_clicked", 
  "properties": {"page": "homepage", "button": "cta"}
}
```

### 6. **GET /api/posthog/info** - Project Info

Get PostHog project information and API capabilities.

### 7. **GET /health** - Health Check

Server status and available endpoints list.

## 🔍 Raw Data Structure

### Events Response Format:
```json
{
  "cache_key": "cache_abc123...",
  "clickhouse": "SELECT uuid, event, properties...",  // Raw SQL
  "columns": ["uuid", "event", "properties", ...],    // Field names
  "results": [
    [
      "uuid-value",
      "event-name", 
      "{json-properties}",
      "2025-08-09T20:52:11.968000Z",
      "user-distinct-id",
      // ... 17 more fields
    ]
  ],
  "types": [["uuid", "UUID"], ["event", "String"], ...], // Data types
  "timings": [/* Query performance data */],
  "timezone": "UTC",
  "modifiers": {/* PostHog query modifiers */}
}
```

### Available Event Fields (22 total):
1. `uuid` - Unique event identifier
2. `event` - Event name (e.g., "$pageview", "$autocapture")
3. `properties` - JSON string of event properties
4. `timestamp` - Event timestamp
5. `distinct_id` - User identifier
6. `elements_chain` - DOM element chain (for autocapture)
7. `created_at` - When event was stored in PostHog
8. `$session_id` - Session identifier
9. `$window_id` - Browser window identifier
10. `person_id` - PostHog person UUID
11. `$group_0-4` - Group identifiers (for group analytics)
12. `elements_chain_href` - Links in element chain
13. `elements_chain_texts` - Text content in elements
14. `elements_chain_ids` - Element IDs
15. `elements_chain_elements` - Element types
16. `event_person_id` - Person ID at event time
17. `event_issue_id` - Error tracking issue ID
18. `issue_id` - Current issue ID (with overrides)

## 🎯 Key Features

- **Zero Processing**: Data returned exactly as PostHog stores it
- **Complete Metadata**: Includes query execution details, caching, performance
- **Full Schema Access**: All 22 event fields available
- **Raw JSON Properties**: Event properties as JSON strings (not parsed)
- **HogQL Support**: Execute any custom query
- **Rate Limited**: Respects PostHog's 120 queries/hour limit
- **Type Information**: Data types for all fields included

## 📈 Use Cases

1. **Data Analysis**: Get complete raw data for advanced analytics
2. **Custom Queries**: Execute specific HogQL queries for complex analysis  
3. **Event Inspection**: See exact event structure and metadata
4. **Integration**: Build custom tools with full PostHog data access
5. **Debugging**: Understand exact data structure and query performance

## ⚡ Performance Notes

- Responses include query execution timings
- ClickHouse SQL queries are shown for transparency  
- Caching information included in response
- Rate limiting automatically handled
- Large datasets may take longer to process