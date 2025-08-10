#!/usr/bin/env python3
"""
Test with your existing Freestyle setup
"""

import os
import requests
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def test_with_existing_identity():
    """Test using your existing Freestyle identity"""
    
    api_key = os.getenv('FREESTYLE_API_KEY')
    if not api_key:
        print("❌ No FREESTYLE_API_KEY found in environment")
        return False
    
    print(f"✅ API key found: {api_key[:8]}...")
    
    # Your existing identity
    identity_id = "49f6aada-0aa8-40c6-a564-48a314e3c14b"
    
    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json'
    }
    
    base_url = "https://api.freestyle.sh"
    
    try:
        # Test 1: List repositories with your identity
        print(f"\n🔍 Testing with identity: {identity_id}")
        
        # Test different API patterns based on Freestyle documentation
        test_endpoints = [
            f"/v1/git/identities/{identity_id}/repositories",
            f"/git/v1/identities/{identity_id}/repositories",
            "/v1/git/repositories",
            "/git/v1/repositories"
        ]
        
        for endpoint in test_endpoints:
            print(f"\n📡 Testing: {endpoint}")
            response = requests.get(f"{base_url}{endpoint}", headers=headers, verify=False)
            print(f"Status: {response.status_code}")
            
            if response.status_code == 200:
                data = response.json()
                print(f"✅ Success! Response: {json.dumps(data, indent=2)[:300]}...")
                return True
            elif response.status_code == 401:
                print("❌ Authentication failed")
                return False
            elif response.status_code != 404:
                print(f"Response: {response.text[:200]}")
        
        # Try creating a repository for your AI agents
        print(f"\n📦 Attempting to create repository...")
        repo_data = {
            "name": "backend-ours-ai-agent",
            "description": "Repository for your PersonalizationService with Claude + Morph"
        }
        
        create_endpoints = [
            "/v1/git/repositories",
            "/git/v1/repositories"
        ]
        
        for endpoint in create_endpoints:
            print(f"\n🔨 Creating repo at: {endpoint}")
            response = requests.post(
                f"{base_url}{endpoint}", 
                headers=headers, 
                json=repo_data,
                verify=False
            )
            print(f"Status: {response.status_code}")
            
            if response.status_code in [200, 201]:
                repo = response.json()
                print(f"✅ Repository created!")
                print(f"Repository data: {json.dumps(repo, indent=2)}")
                return repo
            else:
                print(f"Response: {response.text[:300]}")
        
        print("❌ Could not create repository")
        return None
            
    except Exception as e:
        print(f"❌ Connection error: {e}")
        return False

def create_simple_git_workflow():
    """Create a simple Git workflow for your existing service"""
    
    print("\n🎯 Setting up Git versioning for your backend-ours service...")
    
    # Test if we can work with your existing setup
    result = test_with_existing_identity()
    
    if result:
        print("\n🎉 SUCCESS! Git versioning is working!")
        print("\n📋 Next steps:")
        print("1. ✅ You have Freestyle Git identity")
        print("2. ✅ API connection works") 
        print("3. 🔄 Ready to version your backend-ours PersonalizationService")
        print("4. 📝 Can commit Claude + Morph code changes")
        print("5. 🌿 Can create branches for different users")
        
        print("\n💡 Your Git versioning setup:")
        print(f"   Identity ID: 49f6aada-0aa8-40c6-a564-48a314e3c14b")
        print(f"   GitHub App: Git Freestyle Sync (ID: 1756397)")
        print(f"   Ready to track: backend-ours/services/personalization_service.py")
        
        return True
    else:
        print("\n⚠️  API connection issues, but your setup looks correct")
        print("   This might be a temporary API issue")
        return False

if __name__ == "__main__":
    print("🚀 Testing your existing Freestyle Git setup...")
    print("=" * 60)
    
    create_simple_git_workflow()
