#!/usr/bin/env python3
"""
Setup script for AI Agents Git versioning with Freestyle
"""

import os
import sys
from pathlib import Path
from dotenv import load_dotenv
from freestyle_git_client import FreestyleGitClient

# Load environment variables from .env file
load_dotenv()

def setup_ai_agents_git():
    """Main setup function for AI agents Git infrastructure"""
    
    print("🚀 Setting up AI Agents Git Versioning with Freestyle...")
    print("=" * 60)
    
    # Load environment variables
    load_dotenv()
    
    # Check for required API key
    api_key = os.getenv('FREESTYLE_API_KEY')
    if not api_key:
        print("❌ Error: FREESTYLE_API_KEY not found in environment variables")
        print("📝 Please set your Freestyle API key:")
        print("   export FREESTYLE_API_KEY='your_api_key_here'")
        print("   Or add it to your .env file")
        return False
    
    try:
        # Initialize Freestyle Git client
        git_client = FreestyleGitClient(api_key)
        print("✅ Freestyle Git client initialized")
        
        # Set up Git versioning for your EXISTING backend-ours service
        ai_agents = [
            {
                "name": "backend-ours-service",
                "type": "personalization",
                "description": "Your existing PersonalizationService with Claude + Morph"
            }
        ]
        
        print(f"\n📦 Setting up {len(ai_agents)} AI agents...")
        
        # Set up multi-agent system
        setup_result = git_client.setup_multi_agent_system(ai_agents)
        
        if setup_result["success"]:
            print(f"✅ Successfully set up {len(setup_result['successful_agents'])} AI agents!")
            
            # Display results for each agent
            for agent_name in setup_result["successful_agents"]:
                agent_result = setup_result["results"][agent_name]
                print(f"\n🤖 Agent: {agent_name}")
                print(f"   Repository ID: {agent_result['repository']['id']}")
                print(f"   Git URL: {agent_result['repository']['git_url']}")
                print(f"   Identity ID: {agent_result['identity']['id']}")
                print(f"   Access Token: {agent_result['identity']['tokens'][0][:8]}...")
            
            # Save configuration for later use
            save_agent_config(setup_result)
            
            # Display setup commands
            print("\n📋 Git Setup Commands:")
            print("=" * 40)
            
            for agent_name in setup_result["successful_agents"]:
                agent_result = setup_result["results"][agent_name]
                repo_id = agent_result['repository']['id']
                token = agent_result['identity']['tokens'][0]
                
                print(f"\n# For {agent_name}:")
                for cmd in git_client.generate_git_setup_commands(repo_id, token):
                    print(cmd)
            
            print("\n🎉 AI Agents Git infrastructure setup complete!")
            print("📖 Next steps:")
            print("   1. Run the Git setup commands above")
            print("   2. Update your .env file with FREESTYLE_API_KEY")
            print("   3. Start your Flask app with webhook endpoints")
            print("   4. Begin committing AI agent code to repositories")
            
            return True
            
        else:
            print(f"❌ Setup failed for {len(setup_result['failed_agents'])} agents")
            for agent_name in setup_result["failed_agents"]:
                error = setup_result["results"][agent_name].get("error", "Unknown error")
                print(f"   {agent_name}: {error}")
            return False
            
    except Exception as e:
        print(f"❌ Setup failed: {str(e)}")
        return False

def save_agent_config(setup_result):
    """Save agent configuration to file"""
    config_file = Path(__file__).parent / "ai_agents_config.json"
    
    config = {
        "agents": {},
        "setup_timestamp": setup_result.get("timestamp", ""),
        "total_agents": setup_result["total_agents"]
    }
    
    for agent_name, result in setup_result["results"].items():
        if result["success"]:
            config["agents"][agent_name] = {
                "repository_id": result["repository"]["id"],
                "repository_url": result["repository"]["git_url"], 
                "identity_id": result["identity"]["id"],
                "access_token": result["identity"]["tokens"][0],
                "type": "ai_agent"
            }
    
    try:
        import json
        with open(config_file, 'w') as f:
            json.dump(config, f, indent=2)
        print(f"💾 Configuration saved to {config_file}")
    except Exception as e:
        print(f"⚠️  Warning: Could not save config file: {e}")

def create_sample_agent_code():
    """Create sample AI agent code files for demonstration"""
    
    agents_dir = Path(__file__).parent / "sample_agents"
    agents_dir.mkdir(exist_ok=True)
    
    # Personalization Agent
    personalization_code = '''#!/usr/bin/env python3
"""
Personalization AI Agent - Git Versioned
This agent generates personalized website variants based on user behavior
"""

import json
from typing import Dict, Any
import anthropic
from openai import OpenAI

class PersonalizationAgent:
    """AI Agent for website personalization with Git versioning"""
    
    def __init__(self, version: str = "1.0.0"):
        self.version = version
        self.claude = anthropic.Anthropic()
        self.morph = OpenAI(base_url="https://api.morphllm.com/v1")
    
    def generate_variant(self, user_data: Dict[str, Any]) -> Dict[str, Any]:
        """Generate personalized website variant"""
        
        # AI logic for personalization
        variant = self._analyze_user_behavior(user_data)
        code = self._generate_component_code(variant)
        
        return {
            "success": True,
            "variant": variant,
            "generated_code": code,
            "agent_version": self.version,
            "timestamp": "2024-01-15T10:30:00Z"
        }
    
    def _analyze_user_behavior(self, user_data: Dict[str, Any]) -> str:
        """Analyze user behavior to determine variant type"""
        # Implementation would use Claude for analysis
        return "pricing_focused"
    
    def _generate_component_code(self, variant_type: str) -> str:
        """Generate React component code using Morph"""
        # Implementation would use Morph for code generation
        return "// Generated React component..."

if __name__ == "__main__":
    agent = PersonalizationAgent()
    print(f"Personalization Agent v{agent.version} ready!")
'''
    
    # Code Generation Agent
    code_generation_code = '''#!/usr/bin/env python3
"""
Code Generation AI Agent - Git Versioned
This agent generates React components and handles code modifications
"""

from typing import Dict, Any, List

class CodeGenerationAgent:
    """AI Agent for code generation with Git versioning"""
    
    def __init__(self, version: str = "1.0.0"):
        self.version = version
        self.supported_frameworks = ["react", "nextjs", "vue"]
    
    def generate_component(self, spec: Dict[str, Any]) -> Dict[str, Any]:
        """Generate a new React component based on specifications"""
        
        component_name = spec.get("name", "NewComponent")
        props = spec.get("props", [])
        styling = spec.get("styling", "tailwind")
        
        code = self._build_component_code(component_name, props, styling)
        
        return {
            "success": True,
            "component_name": component_name,
            "code": code,
            "dependencies": self._get_dependencies(spec),
            "agent_version": self.version
        }
    
    def _build_component_code(self, name: str, props: List[str], styling: str) -> str:
        """Build the actual component code"""
        # Implementation would generate actual React code
        return f"// {name} component generated by AI agent v{self.version}"
    
    def _get_dependencies(self, spec: Dict[str, Any]) -> List[str]:
        """Determine required dependencies"""
        return ["react", "tailwindcss"]

if __name__ == "__main__":
    agent = CodeGenerationAgent()
    print(f"Code Generation Agent v{agent.version} ready!")
'''
    
    # Write sample agent files
    (agents_dir / "personalization_agent.py").write_text(personalization_code)
    (agents_dir / "code_generation_agent.py").write_text(code_generation_code)
    
    print(f"📁 Sample agent code created in {agents_dir}")

if __name__ == "__main__":
    print("🎯 AI Agents Git Versioning Setup")
    print("This script will set up Freestyle Git infrastructure for your AI agents")
    
    # Create sample agent code
    create_sample_agent_code()
    
    # Confirm setup
    response = input("\n❓ Do you want to proceed with Git infrastructure setup? (y/N): ")
    if response.lower() in ['y', 'yes']:
        success = setup_ai_agents_git()
        sys.exit(0 if success else 1)
    else:
        print("🚫 Setup cancelled")
        sys.exit(0)
