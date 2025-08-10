#!/usr/bin/env python3
"""
Test Freestyle SDK with your existing setup
"""

import os
from dotenv import load_dotenv
import json

# Load environment variables
load_dotenv()

def test_freestyle_sdk():
    """Test Freestyle SDK directly"""
    
    api_key = os.getenv('FREESTYLE_API_KEY')
    if not api_key:
        print("❌ No FREESTYLE_API_KEY found")
        return False
    
    print(f"✅ API key found: {api_key[:8]}...")
    
    try:
        import freestyle
        print("✅ Freestyle SDK imported successfully")
        
        # Create client
        client = freestyle.Freestyle(api_key)
        print("✅ Freestyle client created")
        
        # Test 1: List existing repositories
        print("\n🔍 Listing repositories...")
        repos = client.list_repositories()
        print(f"✅ Found {len(repos)} repositories")
        for repo in repos:
            print(f"   - {repo.get('name', 'Unnamed')} (ID: {repo.get('repoId', 'N/A')})")
        
        # Test 2: List Git identities
        print("\n👤 Listing Git identities...")
        identities = client.list_git_identities()
        print(f"✅ Found {len(identities)} identities")
        for identity in identities:
            print(f"   - Identity ID: {identity.get('identityId', 'N/A')}")
        
        # Test 3: Create a repository for your AI agent
        print("\n📦 Creating repository for backend-ours service...")
        
        repo_result = client.create_repository(
            name="backend-ours-personalization-service",
            public=False
        )
        
        print(f"✅ Repository created!")
        print(f"   Repository ID: {repo_result.get('repoId')}")
        print(f"   Git URL: https://git.freestyle.sh/{repo_result.get('repoId')}")
        
        return {
            "success": True,
            "repo_id": repo_result.get('repoId'),
            "git_url": f"https://git.freestyle.sh/{repo_result.get('repoId')}",
            "existing_repos": repos,
            "identities": identities
        }
        
    except Exception as e:
        print(f"❌ Error: {e}")
        print(f"Error type: {type(e)}")
        return False

def setup_git_versioning():
    """Set up Git versioning for your PersonalizationService"""
    
    print("🚀 Setting up Git versioning for your AI service...")
    print("=" * 60)
    
    result = test_freestyle_sdk()
    
    if result and result != False:
        print("\n🎉 SUCCESS! Git versioning is ready!")
        
        repo_id = result["repo_id"]
        git_url = result["git_url"]
        
        print(f"\n📋 Your Git Setup:")
        print(f"   Repository ID: {repo_id}")
        print(f"   Git URL: {git_url}")
        print(f"   Identity ID: 49f6aada-0aa8-40c6-a564-48a314e3c14b")
        print(f"   GitHub App: Git Freestyle Sync (1756397)")
        
        print(f"\n🔧 Git Commands to use:")
        print(f"   # Add Freestyle as remote")
        print(f"   git remote add freestyle {git_url}")
        print(f"   ")
        print(f"   # Push your backend-ours code")
        print(f"   git add backend-ours/")
        print(f"   git commit -m 'Add PersonalizationService with Claude + Morph'")
        print(f"   git push freestyle main")
        
        print(f"\n🌿 For user-specific branches:")
        print(f"   git checkout -b user-{{user_id}}-personalized")
        print(f"   # Make user-specific changes")
        print(f"   git commit -m 'Personalization for user {{user_id}}'")
        print(f"   git push freestyle user-{{user_id}}-personalized")
        
        return result
    else:
        print("\n❌ Git versioning setup failed")
        return False

if __name__ == "__main__":
    setup_git_versioning()
