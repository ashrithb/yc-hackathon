import requests
import os
import time
from typing import Dict, Any, List, Optional
import json

class PostHogRawClient:
    """
    Raw PostHog client that returns unprocessed data exactly as PostHog provides it
    """
    
    def __init__(self, 
                 project_id: Optional[str] = None, 
                 project_api_key: Optional[str] = None,
                 personal_api_key: Optional[str] = None, 
                 api_host: Optional[str] = None):
        
        self.project_id = project_id or os.getenv('POSTHOG_PROJECT_ID')
        self.project_api_key = project_api_key or os.getenv('POSTHOG_PROJECT_API_KEY')
        self.personal_api_key = personal_api_key or os.getenv('POSTHOG_PERSONAL_API_KEY')
        self.api_host = api_host or os.getenv('POSTHOG_API_HOST', 'https://us.posthog.com')
        
        if not self.project_api_key:
            raise ValueError("PostHog project API key is required. Set POSTHOG_PROJECT_API_KEY environment variable.")
        
        # Determine API host for capture endpoints
        if 'eu.posthog.com' in self.api_host:
            self.capture_host = 'https://eu.i.posthog.com'
        else:
            self.capture_host = 'https://us.i.posthog.com'
        
        # Headers for different endpoints
        self.project_headers = {
            'Content-Type': 'application/json'
        }
        
        self.personal_headers = {
            'Authorization': f'Bearer {self.personal_api_key}',
            'Content-Type': 'application/json'
        } if self.personal_api_key else None
        
        # Rate limiting for query API
        self.last_request_time = 0
        self.requests_in_hour = []
        self.max_requests_per_hour = 120
        
        print(f"📊 PostHog Raw Client initialized:")
        print(f"   Project API Key: {'✅ Available' if self.project_api_key else '❌ Missing'}")
        print(f"   Personal API Key: {'✅ Available' if self.personal_api_key else '⚠️  Missing (query functionality disabled)'}")
        print(f"   API Host: {self.api_host}")
    
    def _check_rate_limit(self):
        """Check query API rate limits"""
        if not self.personal_api_key:
            return
            
        current_time = time.time()
        one_hour_ago = current_time - 3600
        self.requests_in_hour = [req_time for req_time in self.requests_in_hour if req_time > one_hour_ago]
        
        if len(self.requests_in_hour) >= self.max_requests_per_hour:
            sleep_time = self.requests_in_hour[0] + 3600 - current_time + 1
            if sleep_time > 0:
                print(f"Rate limit reached. Sleeping for {sleep_time:.2f} seconds...")
                time.sleep(sleep_time)
        
        time_since_last = current_time - self.last_request_time
        if time_since_last < 0.5:
            time.sleep(0.5 - time_since_last)
        
        self.requests_in_hour.append(current_time)
        self.last_request_time = current_time
    
    def raw_query(self, hogql_query: str) -> Dict[str, Any]:
        """
        Execute a raw HogQL query and return unprocessed PostHog response
        
        Args:
            hogql_query: Raw HogQL/SQL query string
            
        Returns:
            Raw PostHog API response as-is
        """
        if not self.personal_api_key:
            raise ValueError("Personal API key required for query operations.")
        
        self._check_rate_limit()
        
        url = f"{self.api_host}/api/projects/{self.project_id}/query/"
        payload = {
            "query": {
                "kind": "HogQLQuery",
                "query": hogql_query
            }
        }
        
        response = requests.post(url, headers=self.personal_headers, json=payload)
        response.raise_for_status()
        return response.json()
    
    def get_raw_events(self, 
                      distinct_id: Optional[str] = None, 
                      limit: int = 100,
                      days_back: int = 30) -> Dict[str, Any]:
        """
        Get raw events data exactly as stored in PostHog
        
        Args:
            distinct_id: Filter by specific user (optional)
            limit: Maximum number of events to return
            days_back: Number of days back to query
            
        Returns:
            Raw PostHog query response with all available event fields
        """
        # Build query with all available event fields
        query = f"""
        SELECT 
            uuid,
            event,
            properties,
            timestamp,
            distinct_id,
            elements_chain,
            created_at,
            $session_id,
            $window_id,
            person_id,
            $group_0,
            $group_1,
            $group_2,
            $group_3,
            $group_4,
            elements_chain_href,
            elements_chain_texts,
            elements_chain_ids,
            elements_chain_elements,
            event_person_id,
            event_issue_id,
            issue_id
        FROM events 
        WHERE timestamp >= today() - INTERVAL {days_back} DAY
        """
        
        if distinct_id:
            query += f" AND distinct_id = '{distinct_id}'"
            
        query += f"""
        ORDER BY timestamp DESC
        LIMIT {limit}
        """
        
        return self.raw_query(query)
    
    def get_user_behavior_data(self, 
                              distinct_id: str,
                              days_back: int = 30) -> Dict[str, Any]:
        """
        Get user behavior data: clicks, scrolls, time spent per page/section
        
        Args:
            distinct_id: User identifier
            days_back: Number of days back to query
            
        Returns:
            Raw PostHog query response with behavior analytics
        """
        query = f"""
        SELECT 
            distinct_id,
            event,
            properties,
            timestamp,
            $session_id,
            $window_id,
            JSONExtractString(properties, '$current_url') as page_url,
            JSONExtractString(properties, '$pathname') as page_path,
            JSONExtractString(properties, 'section') as section,
            JSONExtractString(properties, 'element_text') as element_text,
            JSONExtractString(properties, 'scroll_depth') as scroll_depth,
            JSONExtractString(properties, 'time_on_page') as time_on_page,
            JSONExtractString(properties, '$duration') as duration,
            elements_chain_texts,
            elements_chain_elements
        FROM events 
        WHERE timestamp >= today() - INTERVAL {days_back} DAY
            AND distinct_id = '{distinct_id}'
            AND (
                event = '$pageview' 
                OR event = '$autocapture' 
                OR event = 'scroll'
                OR event = 'click'
                OR event = 'time_spent'
                OR event LIKE '%click%'
                OR event LIKE '%scroll%'
                OR event LIKE '%page%'
            )
        ORDER BY timestamp ASC
        """
        
        return self.raw_query(query)
    
    def get_raw_users(self, 
                     limit: int = 100, 
                     days_back: int = 30) -> Dict[str, Any]:
        """
        Get list of distinct user IDs only
        
        Args:
            limit: Maximum number of users to return
            days_back: Number of days back to query
            
        Returns:
            Raw PostHog query response with just distinct_ids
        """
        query = f"""
        SELECT DISTINCT distinct_id
        FROM events 
        WHERE timestamp >= today() - INTERVAL {days_back} DAY
            AND distinct_id IS NOT NULL
            AND distinct_id != ''
        ORDER BY distinct_id
        LIMIT {limit}
        """
        
        return self.raw_query(query)
    
    def get_raw_event_types(self, days_back: int = 30) -> Dict[str, Any]:
        """Get all event types with counts"""
        query = f"""
        SELECT 
            event,
            count() as count,
            uniq(distinct_id) as unique_users,
            min(timestamp) as first_occurrence,
            max(timestamp) as last_occurrence
        FROM events 
        WHERE timestamp >= today() - INTERVAL {days_back} DAY
        GROUP BY event
        ORDER BY count DESC
        """
        
        return self.raw_query(query)
    
    def send_event(self, distinct_id: str, event: str, properties: Dict[str, Any] = None) -> Dict[str, Any]:
        """
        Send an event to PostHog using project API key
        
        Args:
            distinct_id: User identifier
            event: Event name
            properties: Event properties dictionary
            
        Returns:
            Success/failure response
        """
        url = f"{self.capture_host}/i/v0/e/"
        
        payload = {
            "api_key": self.project_api_key,
            "event": event,
            "distinct_id": distinct_id,
            "properties": properties or {},
            "timestamp": time.time()
        }
        
        try:
            response = requests.post(url, json=payload, headers=self.project_headers)
            response.raise_for_status()
            return {"success": True, "message": "Event sent successfully"}
        except requests.exceptions.RequestException as e:
            return {"success": False, "error": str(e)}
    
    def get_project_info(self) -> Dict[str, Any]:
        """Get basic project information"""
        if not self.personal_api_key:
            return {
                "project_id": self.project_id,
                "api_key_type": "project_only",
                "capabilities": ["send_events"],
                "limitations": "Cannot query data without personal API key"
            }
        
        try:
            url = f"{self.api_host}/api/projects/{self.project_id}/"
            response = requests.get(url, headers=self.personal_headers)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            return {"error": f"Failed to get project info: {str(e)}"}