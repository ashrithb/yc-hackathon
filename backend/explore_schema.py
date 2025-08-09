#!/usr/bin/env python3
"""
Explore PostHog schema to understand all available fields
"""

import requests
import os
import json

# Load environment variables manually
POSTHOG_PROJECT_ID = "205455"
POSTHOG_PERSONAL_API_KEY = "phx_6moEUPppq5EiDLw896s5tvyBhRxJ0AQ1zmw4OyUP78wV2k5"
POSTHOG_API_HOST = "https://us.posthog.com"

def explore_events_schema():
    """Explore the events table schema"""
    print("🔍 Exploring PostHog Events Schema")
    print("=" * 50)
    
    headers = {
        'Authorization': f'Bearer {POSTHOG_PERSONAL_API_KEY}',
        'Content-Type': 'application/json'
    }
    
    # Query to get all available columns in events table
    schema_queries = [
        {
            "name": "Events table structure",
            "query": "SELECT * FROM events LIMIT 1"
        },
        {
            "name": "Sample event with all fields",
            "query": """
            SELECT 
                uuid,
                event,
                distinct_id,
                person_id,
                timestamp,
                properties,
                elements_chain,
                created_at,
                team_id,
                person_properties
            FROM events 
            WHERE timestamp >= today() - INTERVAL 1 DAY
            LIMIT 1
            """
        },
        {
            "name": "All distinct event types",
            "query": """
            SELECT DISTINCT event, count() as count
            FROM events 
            WHERE timestamp >= today() - INTERVAL 7 DAY
            GROUP BY event
            ORDER BY count DESC
            LIMIT 10
            """
        }
    ]
    
    for query_info in schema_queries:
        print(f"\n📊 {query_info['name']}")
        print("-" * 40)
        
        try:
            query_url = f"{POSTHOG_API_HOST}/api/projects/{POSTHOG_PROJECT_ID}/query/"
            payload = {
                "query": {
                    "kind": "HogQLQuery",
                    "query": query_info['query']
                }
            }
            
            response = requests.post(query_url, headers=headers, json=payload)
            
            if response.status_code == 200:
                data = response.json()
                
                # Show column names
                if 'columns' in data:
                    print(f"Columns: {data['columns']}")
                
                # Show results
                if 'results' in data and data['results']:
                    print(f"Sample data:")
                    for i, row in enumerate(data['results'][:2]):
                        print(f"  Row {i+1}: {row}")
                else:
                    print("No results found")
                    
            else:
                print(f"Error: {response.status_code} - {response.text}")
                
        except Exception as e:
            print(f"Error: {e}")

def explore_persons_schema():
    """Explore the persons table schema"""
    print("\n\n🔍 Exploring PostHog Persons Schema")  
    print("=" * 50)
    
    headers = {
        'Authorization': f'Bearer {POSTHOG_PERSONAL_API_KEY}',
        'Content-Type': 'application/json'
    }
    
    try:
        query_url = f"{POSTHOG_API_HOST}/api/projects/{POSTHOG_PROJECT_ID}/query/"
        payload = {
            "query": {
                "kind": "HogQLQuery", 
                "query": """
                SELECT 
                    id,
                    distinct_id,
                    properties,
                    created_at,
                    is_identified,
                    version
                FROM persons 
                LIMIT 2
                """
            }
        }
        
        response = requests.post(query_url, headers=headers, json=payload)
        
        if response.status_code == 200:
            data = response.json()
            
            if 'columns' in data:
                print(f"Columns: {data['columns']}")
            
            if 'results' in data and data['results']:
                print(f"Sample data:")
                for i, row in enumerate(data['results']):
                    print(f"  Row {i+1}: {row}")
            else:
                print("No results found")
        else:
            print(f"Error: {response.status_code} - {response.text}")
            
    except Exception as e:
        print(f"Error: {e}")

def main():
    print("🔍 PostHog Raw Schema Explorer")
    print("This will show you all available fields in PostHog tables")
    print("=" * 60)
    
    explore_events_schema()
    explore_persons_schema()
    
    print("\n✅ Schema exploration completed!")
    print("\nUse these field names in your raw data queries.")

if __name__ == "__main__":
    main()