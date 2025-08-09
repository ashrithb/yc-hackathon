import requests
import os
import time
from typing import Dict, Any, List, Optional
from datetime import datetime, timedelta
import json

class PostHogClient:
    """Client for interacting with PostHog API to retrieve user data and events"""
    
    def __init__(self, project_id: Optional[str] = None, personal_api_key: Optional[str] = None, api_host: Optional[str] = None):
        self.project_id = project_id or os.getenv('POSTHOG_PROJECT_ID')
        self.personal_api_key = personal_api_key or os.getenv('POSTHOG_PERSONAL_API_KEY')
        self.api_host = api_host or os.getenv('POSTHOG_API_HOST', 'https://us.posthog.com')
        
        if not self.project_id:
            raise ValueError("PostHog project ID is required. Set POSTHOG_PROJECT_ID environment variable.")
        if not self.personal_api_key:
            raise ValueError("PostHog personal API key is required. Set POSTHOG_PERSONAL_API_KEY environment variable.")
        
        self.headers = {
            'Authorization': f'Bearer {self.personal_api_key}',
            'Content-Type': 'application/json'
        }
        
        # Rate limiting tracking
        self.last_request_time = 0
        self.requests_in_hour = []
        self.max_requests_per_hour = 120  # PostHog query API limit
    
    def _check_rate_limit(self):
        """Check if we're hitting rate limits and wait if necessary"""
        current_time = time.time()
        
        # Remove requests older than 1 hour
        one_hour_ago = current_time - 3600
        self.requests_in_hour = [req_time for req_time in self.requests_in_hour if req_time > one_hour_ago]
        
        # Check if we're at the limit
        if len(self.requests_in_hour) >= self.max_requests_per_hour:
            sleep_time = self.requests_in_hour[0] + 3600 - current_time + 1
            if sleep_time > 0:
                print(f"Rate limit reached. Sleeping for {sleep_time:.2f} seconds...")
                time.sleep(sleep_time)
        
        # Add minimum delay between requests
        time_since_last = current_time - self.last_request_time
        if time_since_last < 0.5:  # Minimum 0.5 seconds between requests
            time.sleep(0.5 - time_since_last)
        
        self.requests_in_hour.append(current_time)
        self.last_request_time = current_time
    
    def _make_query_request(self, query: str, kind: str = "HogQLQuery") -> Dict[str, Any]:
        """Make a query request to PostHog API with rate limiting"""
        self._check_rate_limit()
        
        url = f"{self.api_host}/api/projects/{self.project_id}/query/"
        payload = {
            "query": {
                "kind": kind,
                "query": query
            }
        }
        
        try:
            response = requests.post(url, headers=self.headers, json=payload)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"PostHog API request failed: {e}")
            if hasattr(e, 'response') and e.response is not None:
                print(f"Response status: {e.response.status_code}")
                print(f"Response text: {e.response.text}")
            raise
    
    def get_user_data_from_posthog(self, user_id: str, days_back: int = 30) -> Dict[str, Any]:
        """
        Retrieve all interaction data for a specific user from PostHog
        
        Args:
            user_id: The distinct_id of the user in PostHog
            days_back: Number of days back to retrieve data (default 30)
        
        Returns:
            Dictionary containing user's events, properties, and derived metrics
        """
        try:
            # Calculate date range
            end_date = datetime.now()
            start_date = end_date - timedelta(days=days_back)
            
            # Query to get all events for the user
            events_query = f"""
            SELECT 
                event,
                timestamp,
                properties,
                distinct_id,
                person_id,
                uuid
            FROM events 
            WHERE distinct_id = '{user_id}' 
                AND timestamp >= '{start_date.strftime('%Y-%m-%d')}'
                AND timestamp <= '{end_date.strftime('%Y-%m-%d')}'
            ORDER BY timestamp DESC
            LIMIT 1000
            """
            
            events_result = self._make_query_request(events_query)
            
            # Query to get person properties
            person_query = f"""
            SELECT 
                distinct_id,
                properties,
                created_at,
                is_identified
            FROM persons 
            WHERE distinct_id = '{user_id}'
            LIMIT 1
            """
            
            person_result = self._make_query_request(person_query)
            
            # Process and structure the data
            user_data = {
                'user_id': user_id,
                'events': [],
                'person_properties': {},
                'summary': {
                    'total_events': 0,
                    'unique_event_types': set(),
                    'first_seen': None,
                    'last_seen': None,
                    'page_views': 0,
                    'session_count': 0,
                    'total_session_time': 0,
                    'avg_session_time': 0,
                    'pages_visited': set(),
                    'pricing_interest': 0,
                    'content_interest': 0
                }
            }
            
            # Process events
            if 'results' in events_result and events_result['results']:
                events = events_result['results']
                user_data['events'] = events
                user_data['summary']['total_events'] = len(events)
                
                session_starts = 0
                pricing_events = 0
                content_events = 0
                
                for event in events:
                    event_name = event[0] if len(event) > 0 else None
                    timestamp = event[1] if len(event) > 1 else None
                    properties = event[2] if len(event) > 2 else {}
                    
                    if event_name:
                        user_data['summary']['unique_event_types'].add(event_name)
                    
                    if timestamp:
                        if not user_data['summary']['first_seen'] or timestamp < user_data['summary']['first_seen']:
                            user_data['summary']['first_seen'] = timestamp
                        if not user_data['summary']['last_seen'] or timestamp > user_data['summary']['last_seen']:
                            user_data['summary']['last_seen'] = timestamp
                    
                    # Track page views and interests
                    if event_name == '$pageview':
                        user_data['summary']['page_views'] += 1
                        if isinstance(properties, dict):
                            current_url = properties.get('$current_url', '')
                            if current_url:
                                user_data['summary']['pages_visited'].add(current_url)
                                # Calculate interest scores
                                if 'pricing' in current_url.lower() or 'price' in current_url.lower():
                                    pricing_events += 1
                                if 'about' in current_url.lower() or 'blog' in current_url.lower() or 'docs' in current_url.lower():
                                    content_events += 1
                    
                    # Count session starts
                    if event_name == '$session_start' or (isinstance(properties, dict) and properties.get('$session_start')):
                        session_starts += 1
                
                # Calculate derived metrics
                user_data['summary']['session_count'] = max(session_starts, 1)
                user_data['summary']['pricing_interest'] = min(1.0, pricing_events / max(user_data['summary']['page_views'], 1))
                user_data['summary']['content_interest'] = min(1.0, content_events / max(user_data['summary']['page_views'], 1))
                user_data['summary']['unique_event_types'] = list(user_data['summary']['unique_event_types'])
                user_data['summary']['pages_visited'] = list(user_data['summary']['pages_visited'])
            
            # Process person properties
            if 'results' in person_result and person_result['results']:
                person_data = person_result['results'][0] if person_result['results'] else []
                if len(person_data) > 1:
                    user_data['person_properties'] = person_data[1] if person_data[1] else {}
            
            return user_data
            
        except Exception as e:
            print(f"Error retrieving user data from PostHog: {e}")
            return {
                'user_id': user_id,
                'events': [],
                'person_properties': {},
                'summary': {},
                'error': str(e)
            }
    
    def get_all_users_from_posthog(self, limit: int = 100, offset: int = 0, days_back: int = 30) -> List[Dict[str, Any]]:
        """
        Retrieve all users from PostHog
        
        Args:
            limit: Maximum number of users to return
            offset: Number of users to skip (for pagination)
            days_back: Only include users active in the last N days
        
        Returns:
            List of user dictionaries with basic info and activity data
        """
        try:
            # Calculate date range for active users
            end_date = datetime.now()
            start_date = end_date - timedelta(days=days_back)
            
            # Query to get all active users with their basic info
            users_query = f"""
            SELECT DISTINCT
                distinct_id,
                any(properties) as person_properties,
                min(timestamp) as first_seen,
                max(timestamp) as last_seen,
                count(*) as event_count,
                countIf(event = '$pageview') as page_views
            FROM events 
            WHERE timestamp >= '{start_date.strftime('%Y-%m-%d')}'
                AND timestamp <= '{end_date.strftime('%Y-%m-%d')}'
                AND distinct_id IS NOT NULL
                AND distinct_id != ''
            GROUP BY distinct_id
            ORDER BY last_seen DESC
            LIMIT {limit}
            OFFSET {offset}
            """
            
            result = self._make_query_request(users_query)
            
            users = []
            if 'results' in result and result['results']:
                for row in result['results']:
                    if len(row) >= 6:
                        user_info = {
                            'distinct_id': row[0],
                            'person_properties': row[1] if row[1] else {},
                            'first_seen': row[2],
                            'last_seen': row[3],
                            'event_count': row[4],
                            'page_views': row[5],
                            'activity_score': min(100, (row[4] * 2 + row[5] * 5))  # Simple activity scoring
                        }
                        users.append(user_info)
            
            return users
            
        except Exception as e:
            print(f"Error retrieving users from PostHog: {e}")
            return []
    
    def get_user_summary_stats(self) -> Dict[str, Any]:
        """Get summary statistics about all users"""
        try:
            stats_query = """
            SELECT 
                count(DISTINCT distinct_id) as total_users,
                count(*) as total_events,
                countIf(event = '$pageview') as total_page_views,
                avg(toHour(timestamp)) as avg_activity_hour
            FROM events 
            WHERE timestamp >= today() - INTERVAL 30 DAY
                AND distinct_id IS NOT NULL
                AND distinct_id != ''
            """
            
            result = self._make_query_request(stats_query)
            
            if 'results' in result and result['results'] and len(result['results'][0]) >= 4:
                row = result['results'][0]
                return {
                    'total_users': row[0],
                    'total_events': row[1],
                    'total_page_views': row[2],
                    'avg_activity_hour': row[3]
                }
            
            return {}
            
        except Exception as e:
            print(f"Error retrieving user summary stats: {e}")
            return {'error': str(e)}
    
    def get_user_heatmaps_for_all_pages(self, user_id: str, days_back: int = 30) -> Dict[str, Any]:
        """
        Get heatmap data (click events, mouse movements, scroll depth) for all pages visited by a user
        
        Args:
            user_id: The distinct_id of the user in PostHog
            days_back: Number of days back to retrieve data (default 30)
        
        Returns:
            Dictionary containing heatmap data organized by page URL
        """
        try:
            # Calculate date range
            end_date = datetime.now()
            start_date = end_date - timedelta(days=days_back)
            
            # Query to get all interaction events for the user grouped by page
            heatmap_query = f"""
            SELECT 
                properties.$current_url as page_url,
                properties.$pathname as page_path,
                event,
                properties.$click_x as click_x,
                properties.$click_y as click_y,
                properties.$element_text as element_text,
                properties.$element_tag_name as element_tag,
                properties.$element_classes as element_classes,
                properties.$scroll_depth_percentage as scroll_depth,
                properties.$viewport_height as viewport_height,
                properties.$viewport_width as viewport_width,
                properties.$screen_height as screen_height,
                properties.$screen_width as screen_width,
                timestamp,
                properties
            FROM events 
            WHERE distinct_id = '{user_id}' 
                AND timestamp >= '{start_date.strftime('%Y-%m-%d')}'
                AND timestamp <= '{end_date.strftime('%Y-%m-%d')}'
                AND (
                    event = '$pageview' 
                    OR event = '$autocapture' 
                    OR event = 'click'
                    OR event = 'scroll'
                    OR event LIKE '%click%'
                    OR event LIKE '%scroll%'
                    OR event LIKE '%mouse%'
                    OR event LIKE '%hover%'
                    OR properties.$event_type = 'click'
                    OR properties.$event_type = 'scroll'
                )
            ORDER BY timestamp DESC
            LIMIT 5000
            """
            
            result = self._make_query_request(heatmap_query)
            
            # Process and structure the heatmap data
            heatmap_data = {
                'user_id': user_id,
                'date_range': {
                    'start': start_date.strftime('%Y-%m-%d'),
                    'end': end_date.strftime('%Y-%m-%d')
                },
                'pages': {},
                'summary': {
                    'total_interactions': 0,
                    'unique_pages': 0,
                    'click_events': 0,
                    'scroll_events': 0,
                    'pageview_events': 0
                }
            }
            
            if 'results' in result and result['results']:
                events = result['results']
                
                for event_data in events:
                    if len(event_data) >= 14:
                        page_url = event_data[0] or 'unknown'
                        page_path = event_data[1] or '/'
                        event_name = event_data[2] or 'unknown'
                        click_x = event_data[3]
                        click_y = event_data[4]
                        element_text = event_data[5]
                        element_tag = event_data[6]
                        element_classes = event_data[7]
                        scroll_depth = event_data[8]
                        viewport_height = event_data[9]
                        viewport_width = event_data[10]
                        screen_height = event_data[11]
                        screen_width = event_data[12]
                        timestamp = event_data[13]
                        properties = event_data[14] or {}
                        
                        # Initialize page data if not exists
                        if page_url not in heatmap_data['pages']:
                            heatmap_data['pages'][page_url] = {
                                'page_url': page_url,
                                'page_path': page_path,
                                'interactions': [],
                                'clicks': [],
                                'scrolls': [],
                                'pageviews': [],
                                'viewport_data': [],
                                'summary': {
                                    'total_interactions': 0,
                                    'click_count': 0,
                                    'scroll_count': 0,
                                    'pageview_count': 0,
                                    'avg_scroll_depth': 0,
                                    'time_spent': 0
                                }
                            }
                        
                        page_data = heatmap_data['pages'][page_url]
                        
                        # Create interaction object
                        interaction = {
                            'event': event_name,
                            'timestamp': timestamp,
                            'click_x': click_x,
                            'click_y': click_y,
                            'element_text': element_text,
                            'element_tag': element_tag,
                            'element_classes': element_classes,
                            'scroll_depth': scroll_depth,
                            'viewport_height': viewport_height,
                            'viewport_width': viewport_width,
                            'screen_height': screen_height,
                            'screen_width': screen_width,
                            'properties': properties
                        }
                        
                        page_data['interactions'].append(interaction)
                        page_data['summary']['total_interactions'] += 1
                        heatmap_data['summary']['total_interactions'] += 1
                        
                        # Categorize events
                        if event_name == '$pageview':
                            page_data['pageviews'].append(interaction)
                            page_data['summary']['pageview_count'] += 1
                            heatmap_data['summary']['pageview_events'] += 1
                            
                            # Store viewport data for heatmap rendering
                            if viewport_height and viewport_width:
                                page_data['viewport_data'].append({
                                    'height': viewport_height,
                                    'width': viewport_width,
                                    'screen_height': screen_height,
                                    'screen_width': screen_width,
                                    'timestamp': timestamp
                                })
                        
                        elif (event_name == '$autocapture' or 'click' in event_name.lower() or 
                              (isinstance(properties, dict) and properties.get('$event_type') == 'click')):
                            if click_x is not None and click_y is not None:
                                page_data['clicks'].append(interaction)
                                page_data['summary']['click_count'] += 1
                                heatmap_data['summary']['click_events'] += 1
                        
                        elif ('scroll' in event_name.lower() or 
                              (isinstance(properties, dict) and properties.get('$event_type') == 'scroll')):
                            if scroll_depth is not None:
                                page_data['scrolls'].append(interaction)
                                page_data['summary']['scroll_count'] += 1
                                heatmap_data['summary']['scroll_events'] += 1
                
                # Calculate summary statistics for each page
                for page_url, page_data in heatmap_data['pages'].items():
                    # Calculate average scroll depth
                    if page_data['scrolls']:
                        valid_scrolls = [s['scroll_depth'] for s in page_data['scrolls'] 
                                       if s['scroll_depth'] is not None]
                        if valid_scrolls:
                            page_data['summary']['avg_scroll_depth'] = sum(valid_scrolls) / len(valid_scrolls)
                    
                    # Estimate time spent on page (difference between first and last interaction)
                    if len(page_data['interactions']) > 1:
                        timestamps = [i['timestamp'] for i in page_data['interactions'] if i['timestamp']]
                        if timestamps:
                            timestamps.sort()
                            try:
                                first_time = datetime.fromisoformat(timestamps[0].replace('Z', '+00:00'))
                                last_time = datetime.fromisoformat(timestamps[-1].replace('Z', '+00:00'))
                                time_diff = (last_time - first_time).total_seconds()
                                page_data['summary']['time_spent'] = max(0, time_diff)
                            except:
                                page_data['summary']['time_spent'] = 0
                
                heatmap_data['summary']['unique_pages'] = len(heatmap_data['pages'])
            
            return heatmap_data
            
        except Exception as e:
            print(f"Error retrieving heatmap data from PostHog: {e}")
            return {
                'user_id': user_id,
                'pages': {},
                'summary': {},
                'error': str(e)
            }