#!/usr/bin/env python3
"""
Direct API test for Freestyle Git - bypassing the SDK
"""

import os
import requests
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def test_freestyle_api():
    """Test Freestyle API directly without SDK"""
    
    api_key = os.getenv('FREESTYLE_API_KEY')
    if not api_key:
        print("❌ No FREESTYLE_API_KEY found in environment")
        return False
    
    print(f"✅ API key found: {api_key[:8]}...")
    
    # Test API connection
    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json'
    }
    
    base_url = "https://api.freestyle.sh"
    
    try:
        # Test different API endpoints to find the correct one
        endpoints_to_try = [
            "/git/v1/repositories",
            "/v1/git/repositories", 
            "/repositories",
            "/v1/repositories"
        ]
        
        for endpoint in endpoints_to_try:
            print(f"\n🔍 Testing endpoint: {endpoint}")
            response = requests.get(f"{base_url}{endpoint}", headers=headers, verify=False)
            print(f"Status: {response.status_code}")
            
            if response.status_code == 200:
                repos = response.json()
                print(f"✅ Successfully connected! Found repositories at {endpoint}")
                print(f"Response: {json.dumps(repos, indent=2)[:300]}...")
                return True
            elif response.status_code == 401:
                print("❌ Authentication failed - check your API key")
                return False
            elif response.status_code != 404:
                print(f"Response: {response.text[:200]}")
        
        print("❌ Could not find working API endpoint")
        return False
            
    except Exception as e:
        print(f"❌ Connection error: {e}")
        return False

def create_repository_direct():
    """Create a repository using direct API calls"""
    
    api_key = os.getenv('FREESTYLE_API_KEY')
    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json'
    }
    
    base_url = "https://api.freestyle.sh"
    
    try:
        # Create a test repository
        print("\n📦 Creating test repository...")
        
        repo_data = {
            "name": "test-ai-agent-repo",
            "public": False
        }
        
        response = requests.post(
            f"{base_url}/git/v1/repositories", 
            headers=headers, 
            json=repo_data,
            verify=False
        )
        
        print(f"Status: {response.status_code}")
        
        if response.status_code == 201:
            repo = response.json()
            print(f"✅ Repository created!")
            print(f"Repository ID: {repo.get('repoId')}")
            print(f"Git URL: https://git.freestyle.sh/{repo.get('repoId')}")
            return repo
        else:
            print(f"❌ Failed to create repository: {response.status_code}")
            print(f"Response: {response.text}")
            return None
            
    except Exception as e:
        print(f"❌ Error creating repository: {e}")
        return None

if __name__ == "__main__":
    print("🚀 Testing Freestyle Git API directly...")
    print("=" * 50)
    
    # Test API connection
    if test_freestyle_api():
        # Try creating a repository
        repo = create_repository_direct()
        
        if repo:
            print("\n🎉 Success! Git versioning is working!")
            print("\nNext steps:")
            print("1. Use the repository ID for your AI agents")
            print("2. Create Git identities and access tokens")
            print("3. Set up Git commands to push code")
        else:
            print("\n⚠️  API connection works but repository creation failed")
    else:
        print("\n❌ API connection failed - check your setup")
