#!/usr/bin/env python3
"""
Debug PostHog API issues step by step
"""

import requests
import os
import json
from datetime import datetime, timedelta

# Load environment variables manually
POSTHOG_PROJECT_ID = "205455"
POSTHOG_PROJECT_API_KEY = "phc_9Wabz0iIQK6q8JqhFY1uS8CeLTXmvclYRDuZUcvWGMD"
POSTHOG_PERSONAL_API_KEY = "phx_6moEUPppq5EiDLw896s5tvyBhRxJ0AQ1zmw4OyUP78wV2k5"
POSTHOG_API_HOST = "https://us.posthog.com"

def test_project_access():
    """Test if we can access the project with personal API key"""
    print("🔍 Testing PostHog API Access")
    print("=" * 50)
    
    headers = {
        'Authorization': f'Bearer {POSTHOG_PERSONAL_API_KEY}',
        'Content-Type': 'application/json'
    }
    
    # Test 1: Get project info
    print("1️⃣  Testing project access...")
    try:
        url = f"{POSTHOG_API_HOST}/api/projects/{POSTHOG_PROJECT_ID}/"
        print(f"   URL: {url}")
        response = requests.get(url, headers=headers)
        print(f"   Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   ✅ Project access successful")
            print(f"   Project name: {data.get('name', 'Unknown')}")
            print(f"   Project ID: {data.get('id', 'Unknown')}")
        else:
            print(f"   ❌ Project access failed: {response.text}")
            return False
    except Exception as e:
        print(f"   ❌ Error accessing project: {e}")
        return False
    
    # Test 2: Test a simple query
    print("\n2️⃣  Testing simple query...")
    try:
        query_url = f"{POSTHOG_API_HOST}/api/projects/{POSTHOG_PROJECT_ID}/query/"
        simple_query = {
            "query": {
                "kind": "HogQLQuery",
                "query": "SELECT count() as total_events FROM events WHERE timestamp >= today() - INTERVAL 7 DAY LIMIT 1"
            }
        }
        
        print(f"   URL: {query_url}")
        print(f"   Query: {simple_query}")
        
        response = requests.post(query_url, headers=headers, json=simple_query)
        print(f"   Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   ✅ Query successful")
            print(f"   Response: {json.dumps(data, indent=2)}")
        else:
            print(f"   ❌ Query failed: {response.text}")
            try:
                error_data = response.json()
                print(f"   Error details: {json.dumps(error_data, indent=2)}")
            except:
                pass
            return False
    except Exception as e:
        print(f"   ❌ Query error: {e}")
        return False
    
    # Test 3: Test events query
    print("\n3️⃣  Testing events query...")
    try:
        events_query = {
            "query": {
                "kind": "HogQLQuery", 
                "query": "SELECT event, timestamp, distinct_id FROM events WHERE timestamp >= today() - INTERVAL 7 DAY LIMIT 5"
            }
        }
        
        response = requests.post(query_url, headers=headers, json=events_query)
        print(f"   Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   ✅ Events query successful")
            if 'results' in data and data['results']:
                print(f"   Found {len(data['results'])} events")
                for i, event in enumerate(data['results'][:3]):
                    print(f"     Event {i+1}: {event}")
            else:
                print("   No events found")
        else:
            print(f"   ❌ Events query failed: {response.text}")
            
    except Exception as e:
        print(f"   ❌ Events query error: {e}")
    
    return True

def test_send_event():
    """Test sending an event"""
    print("\n4️⃣  Testing event sending...")
    
    capture_url = "https://us.i.posthog.com/i/v0/e/"
    event_data = {
        "api_key": POSTHOG_PROJECT_API_KEY,
        "event": "debug_test_event",
        "distinct_id": "debug_user_123",
        "properties": {
            "test": True,
            "source": "debug_script",
            "timestamp": datetime.now().isoformat()
        },
        "timestamp": datetime.now().isoformat()
    }
    
    try:
        print(f"   URL: {capture_url}")
        response = requests.post(capture_url, json=event_data)
        print(f"   Status: {response.status_code}")
        
        if response.status_code == 200:
            print("   ✅ Event sent successfully")
        else:
            print(f"   ❌ Event sending failed: {response.text}")
            
    except Exception as e:
        print(f"   ❌ Event sending error: {e}")

def main():
    print("🐛 PostHog Debug Script")
    print("Testing your PostHog configuration...")
    
    if test_project_access():
        test_send_event()
        print("\n✅ Debug completed. Check the results above.")
    else:
        print("\n❌ Could not access PostHog. Check your API keys.")

if __name__ == "__main__":
    main()