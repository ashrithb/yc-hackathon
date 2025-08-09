import requests
import os
import time
from typing import Dict, Any, List, Optional
from datetime import datetime, timedelta
import json

class PostHogHybridClient:
    """
    Hybrid PostHog client that works with both project keys and personal API keys
    
    - Project API Key (phc_*): Can send events, get basic project info
    - Personal API Key (phx_*): Can query events, get user data (requires Query Read permission)
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
        
        print(f"📊 PostHog Client initialized:")
        print(f"   Project API Key: {'✅ Available' if self.project_api_key else '❌ Missing'}")
        print(f"   Personal API Key: {'✅ Available' if self.personal_api_key else '⚠️  Missing (limited functionality)'}")
        print(f"   API Host: {self.api_host}")
    
    def _check_rate_limit(self):
        """Check query API rate limits (only for personal API key usage)"""
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
    
    def _make_query_request(self, query: str, kind: str = "HogQLQuery") -> Dict[str, Any]:
        """Make a query request using personal API key"""
        if not self.personal_api_key:
            raise ValueError("Personal API key required for query operations. Get one from PostHog settings.")
        
        self._check_rate_limit()
        
        url = f"{self.api_host}/api/projects/{self.project_id}/query/"
        payload = {
            "query": {
                "kind": kind,
                "query": query
            }
        }
        
        response = requests.post(url, headers=self.personal_headers, json=payload)
        response.raise_for_status()
        return response.json()
    
    def send_event(self, distinct_id: str, event: str, properties: Dict[str, Any] = None) -> Dict[str, Any]:
        """
        Send an event to PostHog using project API key
        This works with just the project key (phc_*)
        """
        url = f"{self.capture_host}/i/v0/e/"
        
        payload = {
            "api_key": self.project_api_key,
            "event": event,
            "distinct_id": distinct_id,
            "properties": properties or {},
            "timestamp": datetime.now().isoformat()
        }
        
        try:
            response = requests.post(url, json=payload, headers=self.project_headers)
            response.raise_for_status()
            return {"success": True, "message": "Event sent successfully"}
        except requests.exceptions.RequestException as e:
            return {"success": False, "error": str(e)}
    
    def get_project_info(self) -> Dict[str, Any]:
        """
        Get basic project information
        This might work with project key for some basic info
        """
        if not self.personal_api_key:
            return {
                "project_id": self.project_id,
                "api_key_type": "project",
                "limitations": "Cannot query user data without personal API key",
                "available_functions": ["send_event", "get_mock_user_data", "get_mock_users"]
            }
        
        try:
            url = f"{self.api_host}/api/projects/{self.project_id}/"
            response = requests.get(url, headers=self.personal_headers)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            return {"error": f"Failed to get project info: {str(e)}"}
    
    def get_user_data_from_posthog(self, user_id: str, days_back: int = 30) -> Dict[str, Any]:
        """
        Get user data from PostHog (requires personal API key)
        Falls back to mock data if personal key not available
        """
        if not self.personal_api_key:
            return self._get_empty_user_data(user_id)
        
        try:
            end_date = datetime.now()
            start_date = end_date - timedelta(days=days_back)
            
            # Query for user events - simplified query
            events_query = f"""
            SELECT 
                event,
                timestamp,
                properties,
                distinct_id
            FROM events 
            WHERE distinct_id = '{user_id}' 
                AND timestamp >= today() - INTERVAL {days_back} DAY
            ORDER BY timestamp DESC
            LIMIT 100
            """
            
            events_result = self._make_query_request(events_query)
            
            # Process the results similar to the original function
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
                    'pricing_interest': 0,
                    'content_interest': 0,
                    'pages_visited': set()
                },
                'data_source': 'posthog_query_api'
            }
            
            if 'results' in events_result and events_result['results']:
                events = events_result['results']
                user_data['events'] = events
                user_data['summary']['total_events'] = len(events)
                
                pricing_events = 0
                content_events = 0
                
                for event in events:
                    event_name = event[0] if len(event) > 0 else None
                    timestamp = event[1] if len(event) > 1 else None
                    properties = event[2] if len(event) > 2 else {}
                    distinct_id = event[3] if len(event) > 3 else None
                    
                    if event_name:
                        user_data['summary']['unique_event_types'].add(event_name)
                    
                    if timestamp:
                        if not user_data['summary']['first_seen'] or timestamp < user_data['summary']['first_seen']:
                            user_data['summary']['first_seen'] = timestamp
                        if not user_data['summary']['last_seen'] or timestamp > user_data['summary']['last_seen']:
                            user_data['summary']['last_seen'] = timestamp
                    
                    if event_name == '$pageview':
                        user_data['summary']['page_views'] += 1
                        if isinstance(properties, dict):
                            current_url = properties.get('$current_url', '')
                            if current_url:
                                user_data['summary']['pages_visited'].add(current_url)
                                if 'pricing' in current_url.lower():
                                    pricing_events += 1
                                if 'about' in current_url.lower() or 'blog' in current_url.lower():
                                    content_events += 1
                
                user_data['summary']['pricing_interest'] = min(1.0, pricing_events / max(user_data['summary']['page_views'], 1))
                user_data['summary']['content_interest'] = min(1.0, content_events / max(user_data['summary']['page_views'], 1))
                user_data['summary']['unique_event_types'] = list(user_data['summary']['unique_event_types'])
                user_data['summary']['pages_visited'] = list(user_data['summary']['pages_visited'])
            
            return user_data
            
        except Exception as e:
            print(f"Error querying PostHog: {e}")
            return self._get_empty_user_data(user_id, error=str(e))
    
    def get_all_users_from_posthog(self, limit: int = 100, offset: int = 0, days_back: int = 30) -> List[Dict[str, Any]]:
        """
        Get all users from PostHog (requires personal API key)
        Falls back to mock data if personal key not available
        """
        if not self.personal_api_key:
            return self._get_empty_users_list()
        
        try:
            # Simplified users query
            users_query = f"""
            SELECT DISTINCT
                distinct_id,
                min(timestamp) as first_seen,
                max(timestamp) as last_seen,
                count(*) as event_count,
                countIf(event = '$pageview') as page_views
            FROM events 
            WHERE timestamp >= today() - INTERVAL {days_back} DAY
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
                    if len(row) >= 5:
                        user_info = {
                            'distinct_id': row[0],
                            'first_seen': row[1],
                            'last_seen': row[2],
                            'event_count': row[3],
                            'page_views': row[4],
                            'activity_score': min(100, (row[3] * 2 + row[4] * 5)),
                            'data_source': 'posthog_query_api'
                        }
                        users.append(user_info)
            
            return users
            
        except Exception as e:
            print(f"Error querying PostHog users: {e}")
            return self._get_empty_users_list()
    
    def _get_empty_user_data(self, user_id: str, error: str = None) -> Dict[str, Any]:
        """Return empty user data structure when API is not available"""
        return {
            'user_id': user_id,
            'events': [],
            'person_properties': {},
            'summary': {
                'total_events': 0,
                'unique_event_types': [],
                'page_views': 0,
                'pricing_interest': 0,
                'content_interest': 0,
                'pages_visited': []
            },
            'data_source': 'unavailable',
            'message': 'No data available - personal API key required for PostHog queries',
            'error': error
        }
    
    def _get_empty_users_list(self) -> List[Dict[str, Any]]:
        """Return empty users list when API is not available"""
        return []
    
    def get_user_heatmaps_for_all_pages(self, user_id: str, days_back: int = 30) -> Dict[str, Any]:
        """
        Get heatmap data (click events, mouse movements, scroll depth) for all pages visited by a user
        Falls back to empty data if personal API key not available
        
        Args:
            user_id: The distinct_id of the user in PostHog
            days_back: Number of days back to retrieve data (default 30)
        
        Returns:
            Dictionary containing heatmap data organized by page URL
        """
        if not self.personal_api_key:
            return self._get_empty_heatmap_data(user_id)
        
        try:
            # Calculate date range
            end_date = datetime.now()
            start_date = end_date - timedelta(days=days_back)
            
            # Simplified query for debugging
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
                timestamp
            FROM events 
            WHERE distinct_id = '{user_id}' 
                AND timestamp >= today() - INTERVAL {days_back} DAY
            ORDER BY timestamp DESC
            LIMIT 100
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
                },
                'data_source': 'posthog_query_api'
            }
            
            if 'results' in result and result['results']:
                events = result['results']
                
                for event_data in events:
                    if len(event_data) >= 10:
                        page_url = event_data[0] or 'unknown'
                        page_path = event_data[1] or '/'
                        event_name = event_data[2] or 'unknown'
                        click_x = event_data[3]
                        click_y = event_data[4]
                        element_text = event_data[5]
                        element_tag = event_data[6]
                        element_classes = event_data[7]
                        scroll_depth = event_data[8]
                        timestamp = event_data[9]
                        
                        # Set viewport/screen data to None for now
                        viewport_height = None
                        viewport_width = None
                        screen_height = None
                        screen_width = None
                        
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
                        
                        # Create simplified interaction object with key element data
                        interaction = {
                            'click_x': click_x,
                            'click_y': click_y,
                            'element_text': element_text,
                            'element_tag': element_tag,
                            'element_classes': element_classes,
                            'timestamp': timestamp
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
                        
                        elif (event_name == '$autocapture' or 
                              event_name == 'button_clicked' or 
                              event_name == 'click_heatmap' or
                              'click' in event_name.lower()):
                            # Check if we have click coordinates
                            if click_x is not None and click_y is not None:
                                page_data['clicks'].append(interaction)
                                page_data['summary']['click_count'] += 1
                                heatmap_data['summary']['click_events'] += 1
                        
                        elif ('scroll' in event_name.lower()):
                            if scroll_depth is not None:
                                page_data['scrolls'].append(interaction)
                                page_data['summary']['scroll_count'] += 1
                                heatmap_data['summary']['scroll_events'] += 1
                
                # Calculate summary statistics for each page
                for page_url, page_data in heatmap_data['pages'].items():
                    # Calculate average scroll depth
                    if page_data['scrolls']:
                        try:
                            valid_scrolls = [s['scroll_depth'] for s in page_data['scrolls'] 
                                        if s['scroll_depth'] is not None]
                            if valid_scrolls:
                                page_data['summary']['avg_scroll_depth'] = sum(valid_scrolls) / len(valid_scrolls)
                        except:
                            page_data['summary']['avg_scroll_depth'] = 0
                        
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
            import traceback
            print(f"Error retrieving heatmap data from PostHog: {e}")
            print(f"Full traceback: {traceback.format_exc()}")
            return self._get_empty_heatmap_data(user_id, error=str(e))
    
    def _get_empty_heatmap_data(self, user_id: str, error: str = None) -> Dict[str, Any]:
        """Return empty heatmap data structure when API is not available"""
        return {
            'user_id': user_id,
            'date_range': {
                'start': (datetime.now() - timedelta(days=30)).strftime('%Y-%m-%d'),
                'end': datetime.now().strftime('%Y-%m-%d')
            },
            'pages': {},
            'summary': {
                'total_interactions': 0,
                'unique_pages': 0,
                'click_events': 0,
                'scroll_events': 0,
                'pageview_events': 0
            },
            'data_source': 'unavailable',
            'message': 'No heatmap data available - personal API key required for PostHog queries',
            'error': error
        }
    
    def delete_all_data(self) -> Dict[str, Any]:
        """
        Delete all PostHog data - Since PostHog doesn't support direct deletion via API,
        this will provide instructions on how to delete data through the PostHog dashboard
        """
        if not self.personal_api_key:
            return {
                'success': False,
                'error': 'Personal API key required for data operations',
                'message': 'Cannot access data without personal API key'
            }
        
        try:
            # Get count of events to show what would be deleted
            count_query = """
            SELECT count(*) as total_events,
                   count(DISTINCT event) as unique_events,
                   count(DISTINCT distinct_id) as unique_users,
                   min(timestamp) as oldest_event,
                   max(timestamp) as newest_event
            FROM events 
            """
            
            count_result = self._make_query_request(count_query)
            
            if 'results' in count_result and count_result['results']:
                row = count_result['results'][0]
                stats = {
                    'total_events': row[0] if len(row) > 0 else 0,
                    'unique_events': row[1] if len(row) > 1 else 0,
                    'unique_users': row[2] if len(row) > 2 else 0,
                    'oldest_event': row[3] if len(row) > 3 else None,
                    'newest_event': row[4] if len(row) > 4 else None
                }
            else:
                stats = {
                    'total_events': 0,
                    'unique_events': 0,
                    'unique_users': 0,
                    'oldest_event': None,
                    'newest_event': None
                }
            
            return {
                'success': False,
                'error': 'PostHog does not support bulk data deletion via API',
                'current_data_stats': stats,
                'deletion_options': {
                    'option_1': {
                        'method': 'PostHog Dashboard',
                        'description': 'Go to PostHog → Settings → Data → Delete Data',
                        'url': f'{self.api_host}/project/{self.project_id}/settings/data',
                        'note': 'This is the official way to delete data in PostHog'
                    },
                    'option_2': {
                        'method': 'Reset Project',
                        'description': 'Create a new PostHog project and update your API keys',
                        'url': f'{self.api_host}/project/new',
                        'note': 'This will give you a completely fresh start'
                    },
                    'option_3': {
                        'method': 'Wait for Data Retention',
                        'description': 'PostHog automatically deletes old data based on your plan',
                        'note': 'Check your plan\'s data retention period in Settings → Billing'
                    }
                },
                'alternative_solution': {
                    'method': 'Stop sending new data',
                    'description': 'Remove PostHog tracking from your frontend to prevent new data',
                    'implementation': 'Comment out or remove the PostHog initialization code'
                },
                'message': f'Your project currently has {stats["total_events"]} events from {stats["unique_users"]} users. Use the PostHog dashboard to delete this data.'
            }
            
        except Exception as e:
            return {
                'success': False,
                'error': f'Failed to get data statistics: {str(e)}',
                'message': 'Could not retrieve current data stats from PostHog'
            }