#!/usr/bin/env python3
"""
Test what functionality is available with PostHog project API key
"""

import os
from dotenv import load_dotenv
from posthog_hybrid_client import PostHogHybridClient

load_dotenv()

def main():
    print("🔍 PostHog Project Key Testing")
    print("=" * 50)
    
    try:
        # Initialize client
        client = PostHogHybridClient()
        
        # Test 1: Get project info
        print("\n1️⃣  Testing project info...")
        info = client.get_project_info()
        print(f"   Project ID: {info.get('project_id', 'Unknown')}")
        print(f"   API Key Type: {info.get('api_key_type', 'Unknown')}")
        
        if info.get('limitations'):
            print(f"   Limitations: {info['limitations']}")
        if info.get('available_functions'):
            print(f"   Available functions: {', '.join(info['available_functions'])}")
        
        # Test 2: Send a test event
        print("\n2️⃣  Testing event sending...")
        test_user_id = "test_user_123"
        result = client.send_event(
            distinct_id=test_user_id,
            event="test_project_key_event",
            properties={
                "test": True,
                "source": "project_key_test",
                "timestamp": "2024-01-15T10:30:00Z"
            }
        )
        
        if result.get('success'):
            print("   ✅ Successfully sent event to PostHog!")
        else:
            print(f"   ❌ Failed to send event: {result.get('error')}")
        
        # Test 3: Try to get user data (will use mock if no personal key)
        print("\n3️⃣  Testing user data retrieval...")
        user_data = client.get_user_data_from_posthog(test_user_id)
        
        if user_data.get('data_source') == 'mock':
            print("   ⚠️  Returning mock data (personal API key needed for real data)")
            print(f"   Message: {user_data.get('message', 'No message')}")
        else:
            print("   ✅ Retrieved real user data from PostHog")
            print(f"   Total events: {user_data['summary']['total_events']}")
        
        # Test 4: Try to get all users (will use mock if no personal key)
        print("\n4️⃣  Testing users list...")
        users = client.get_all_users_from_posthog()
        
        if users and users[0].get('data_source') == 'mock':
            print(f"   ⚠️  Returning {len(users)} mock users (personal API key needed for real data)")
        else:
            print(f"   ✅ Retrieved {len(users)} real users from PostHog")
        
        # Summary
        print("\n📊 Summary:")
        print("=" * 30)
        if client.personal_api_key:
            print("✅ Full functionality available (project + personal API keys)")
            print("   • Can send events to PostHog")
            print("   • Can query user events and data")
            print("   • Can get user lists and analytics")
        else:
            print("⚠️  Limited functionality (project API key only)")
            print("   • ✅ Can send events to PostHog")
            print("   • ❌ Cannot query user events (returns mock data)")
            print("   • ❌ Cannot get real user analytics")
            print("\n🎯 To get full functionality:")
            print("   1. Go to https://app.posthog.com")
            print("   2. Click your avatar → Settings")
            print("   3. Go to 'Personal API Keys' tab")
            print("   4. Create key with 'Query Read' permission")
            print("   5. Add to POSTHOG_PERSONAL_API_KEY in .env file")
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    main()