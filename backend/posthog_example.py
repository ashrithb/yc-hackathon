#!/usr/bin/env python3
"""
Example usage of PostHog API integration functions
"""

import os
from dotenv import load_dotenv
from posthog_client import PostHogClient

# Load environment variables
load_dotenv()

def main():
    """Demo the PostHog client functions"""
    
    print("🔍 PostHog API Integration Demo")
    print("=" * 50)
    
    try:
        # Initialize PostHog client
        client = PostHogClient()
        print("✅ PostHog client initialized successfully")
        
        # Example 1: Get all users
        print("\n1️⃣  Getting all users from PostHog...")
        users = client.get_all_users_from_posthog(limit=10, days_back=30)
        print(f"Found {len(users)} users in the last 30 days")
        
        for i, user in enumerate(users[:3]):  # Show first 3 users
            print(f"   User {i+1}: {user['distinct_id']} - {user['event_count']} events, {user['page_views']} page views")
        
        # Example 2: Get specific user data (using first user if available)
        if users:
            user_id = users[0]['distinct_id']
            print(f"\n2️⃣  Getting detailed data for user: {user_id}")
            user_data = client.get_user_data_from_posthog(user_id, days_back=30)
            
            print(f"   Total events: {user_data['summary'].get('total_events', 0)}")
            print(f"   Page views: {user_data['summary'].get('page_views', 0)}")
            print(f"   Unique event types: {len(user_data['summary'].get('unique_event_types', []))}")
            print(f"   Pricing interest: {user_data['summary'].get('pricing_interest', 0):.2%}")
            print(f"   Content interest: {user_data['summary'].get('content_interest', 0):.2%}")
            
            # Show recent events
            if user_data.get('events'):
                print(f"   Recent events ({len(user_data['events'][:5])}):")
                for event in user_data['events'][:5]:
                    event_name = event[0] if len(event) > 0 else 'Unknown'
                    timestamp = event[1] if len(event) > 1 else 'Unknown'
                    print(f"     - {event_name} at {timestamp}")
        
        # Example 3: Get summary statistics
        print("\n3️⃣  Getting summary statistics...")
        stats = client.get_user_summary_stats()
        if stats and not stats.get('error'):
            print(f"   Total users: {stats.get('total_users', 0)}")
            print(f"   Total events: {stats.get('total_events', 0)}")
            print(f"   Total page views: {stats.get('total_page_views', 0)}")
            print(f"   Average activity hour: {stats.get('avg_activity_hour', 0):.1f}")
        
        print("\n✅ Demo completed successfully!")
        
    except ValueError as e:
        print(f"❌ Configuration Error: {e}")
        print("\nTo fix this:")
        print("1. Set POSTHOG_PROJECT_ID in your .env file")
        print("2. Set POSTHOG_PERSONAL_API_KEY in your .env file")
        print("3. Get your personal API key from PostHog settings with 'Query Read' permission")
        
    except Exception as e:
        print(f"❌ Unexpected Error: {e}")

def demo_api_endpoints():
    """Demo how to call the API endpoints"""
    
    print("\n🌐 API Endpoints Demo")
    print("=" * 50)
    print("You can test these endpoints with curl or Postman:")
    print()
    
    base_url = "http://localhost:3001"
    
    print("1️⃣  Get all users:")
    print(f"   GET {base_url}/api/posthog/users?limit=10&days_back=30")
    print()
    
    print("2️⃣  Get specific user data:")
    print(f"   GET {base_url}/api/posthog/user/user_123456789?days_back=30")
    print()
    
    print("3️⃣  Get summary statistics:")
    print(f"   GET {base_url}/api/posthog/stats")
    print()
    
    print("4️⃣  Get enhanced user profile:")
    print(f"   GET {base_url}/api/posthog/enhanced-profile/user_123456789")
    print()

if __name__ == "__main__":
    main()
    demo_api_endpoints()