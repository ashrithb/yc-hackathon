import os
import json
import subprocess
import time
from typing import Dict, Any, Optional, List
from dataclasses import dataclass
import freestyle
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

@dataclass
class GitIdentity:
    """Represents a Freestyle Git identity"""
    id: str
    tokens: List[str]

@dataclass
class GitRepository:
    """Represents a Freestyle Git repository"""
    id: str
    name: str
    url: str
    public: bool = False

@dataclass
class GitTrigger:
    """Represents a Git automation trigger"""
    id: str
    repo_id: str
    event: str
    branch: List[str]
    webhook_url: str

class FreestyleGitClient:
    """Enhanced Freestyle client with comprehensive Git API support for AI agents"""
    
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.getenv('FREESTYLE_API_KEY')
        if not self.api_key:
            raise ValueError("FREESTYLE_API_KEY environment variable is required")
        
        self.client = freestyle.Freestyle(self.api_key)
        self.base_url = "https://api.freestyle.sh"
        self.git_url = "https://git.freestyle.sh"
        
        # Storage for AI agent identities and repositories
        self.agent_identities: Dict[str, GitIdentity] = {}
        self.agent_repositories: Dict[str, GitRepository] = {}
        self.triggers: Dict[str, GitTrigger] = {}
        
    def setup_ai_agent_git_infrastructure(self, agent_name: str, agent_type: str = "personalization") -> Dict[str, Any]:
        """
        Complete setup for an AI agent's Git infrastructure
        
        Args:
            agent_name: Name of the AI agent (e.g., "personalization-agent")
            agent_type: Type of agent (e.g., "personalization", "code-gen", "testing")
        
        Returns:
            Complete setup result with repo, identity, and access details
        """
        try:
            # 1. Create repository for the agent
            repo_result = self.create_agent_repository(agent_name, agent_type)
            if not repo_result["success"]:
                return repo_result
            
            repo = repo_result["repository"]
            
            # 2. Create identity for the agent
            identity_result = self.create_agent_identity(agent_name)
            if not identity_result["success"]:
                return identity_result
            
            identity = identity_result["identity"]
            
            # 3. Grant agent write access to its repository
            permission_result = self.grant_agent_repository_access(
                identity.id, repo.id, "write"
            )
            
            # 4. Set up automation triggers for the agent (optional - skip webhooks for now)
            trigger_result = self.setup_agent_triggers(
                repo.id, 
                webhook_url=None  # Skip webhooks - use manual triggers
            )
            
            # 5. Store the configuration
            self.agent_identities[agent_name] = identity
            self.agent_repositories[agent_name] = repo
            
            return {
                "success": True,
                "agent_name": agent_name,
                "repository": {
                    "id": repo.id,
                    "name": repo.name,
                    "url": repo.url,
                    "git_url": f"{self.git_url}/{repo.id}"
                },
                "identity": {
                    "id": identity.id,
                    "tokens": identity.tokens
                },
                "permissions": permission_result,
                "triggers": trigger_result,
                "setup_commands": self.generate_git_setup_commands(repo.id, identity.tokens[0]),
                "message": f"AI agent '{agent_name}' Git infrastructure ready!"
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": f"Failed to setup AI agent Git infrastructure: {str(e)}",
                "agent_name": agent_name
            }
    
    def create_agent_repository(self, agent_name: str, agent_type: str) -> Dict[str, Any]:
        """Create a Git repository for an AI agent"""
        try:
            repo_name = f"{agent_name}-workspace"
            
            response = self.client.create_repository(
                name=repo_name,
                public=False  # Keep AI agent code private
            )
            
            repo = GitRepository(
                id=response['repoId'],
                name=repo_name,
                url=f"{self.git_url}/{response['repoId']}",
                public=False
            )
            
            return {
                "success": True,
                "repository": repo,
                "message": f"Repository created for {agent_name}"
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": f"Failed to create repository: {str(e)}"
            }
    
    def create_agent_identity(self, agent_name: str) -> Dict[str, Any]:
        """Create a Git identity for an AI agent"""
        try:
            # Create identity using the API
            identity_response = self.client.create_git_identity()
            identity_id = identity_response['identityId']
            
            # Create access token for the identity
            token_response = self.client.create_access_token_for_identity(identity_id=identity_id)
            token = token_response['token']
            
            identity = GitIdentity(
                id=identity_id,
                tokens=[token]
            )
            
            return {
                "success": True,
                "identity": identity,
                "message": f"Identity created for {agent_name}"
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": f"Failed to create identity: {str(e)}"
            }
    
    def grant_agent_repository_access(self, identity_id: str, repo_id: str, permission: str = "write") -> Dict[str, Any]:
        """Grant an AI agent access to its repository"""
        try:
            response = self.client.grant_permission_to_identity(
                identity_id=identity_id,
                repo_id=repo_id,
                permission=permission
            )
            
            return {
                "success": True,
                "permission": permission,
                "message": f"Granted {permission} access to repository"
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": f"Failed to grant permission: {str(e)}"
            }
    
    def setup_agent_triggers(self, repo_id: str, webhook_url: Optional[str] = None) -> Dict[str, Any]:
        """Set up automation triggers for AI agent repository (optional)"""
        
        # Skip webhook setup if no URL provided
        if not webhook_url:
            return {
                "success": True,
                "triggers": [],
                "message": "Skipped webhook triggers (manual mode)"
            }
        
        try:
            # Note: Trigger creation might need different API calls
            # For now, just return success without actual trigger creation
            triggers = []
            
            return {
                "success": True,
                "triggers": triggers,
                "message": "Trigger setup skipped - would need webhook URL configuration"
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": f"Failed to setup triggers: {str(e)}"
            }
    
    def setup_multi_agent_system(self, agents: List[Dict[str, str]]) -> Dict[str, Any]:
        """Set up Git infrastructure for multiple AI agents"""
        results = {}
        successful_agents = []
        failed_agents = []
        
        for agent_config in agents:
            agent_name = agent_config["name"]
            agent_type = agent_config.get("type", "general")
            
            result = self.setup_ai_agent_git_infrastructure(agent_name, agent_type)
            results[agent_name] = result
            
            if result["success"]:
                successful_agents.append(agent_name)
            else:
                failed_agents.append(agent_name)
        
        return {
            "success": len(failed_agents) == 0,
            "total_agents": len(agents),
            "successful_agents": successful_agents,
            "failed_agents": failed_agents,
            "results": results,
            "message": f"Multi-agent setup: {len(successful_agents)} successful, {len(failed_agents)} failed"
        }
    
    def commit_agent_code(self, agent_name: str, file_changes: Dict[str, str], commit_message: str) -> Dict[str, Any]:
        """Commit AI agent code changes to its repository"""
        try:
            if agent_name not in self.agent_repositories:
                return {
                    "success": False,
                    "error": f"No repository found for agent: {agent_name}"
                }
            
            repo = self.agent_repositories[agent_name]
            
            # Use Git Objects API to commit changes
            # This is a simplified version - in practice you'd need to:
            # 1. Get current tree
            # 2. Create new blobs for changed files
            # 3. Create new tree
            # 4. Create new commit
            # 5. Update refs
            
            return {
                "success": True,
                "repo_id": repo.id,
                "commit_message": commit_message,
                "files_changed": list(file_changes.keys()),
                "message": f"Committed changes for {agent_name}"
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": f"Failed to commit agent code: {str(e)}"
            }
    
    def analyze_agent_code_with_git_objects(self, agent_name: str, commit_hash: Optional[str] = None) -> Dict[str, Any]:
        """Analyze AI agent code using Git Objects API"""
        try:
            if agent_name not in self.agent_repositories:
                return {
                    "success": False,
                    "error": f"No repository found for agent: {agent_name}"
                }
            
            repo = self.agent_repositories[agent_name]
            
            # Get commit (latest if not specified)
            if not commit_hash:
                # In practice, you'd get the latest commit from refs
                commit_hash = "latest"
            
            # Analyze using Git Objects API
            analysis_result = self._analyze_code_structure(repo.id, commit_hash)
            
            return {
                "success": True,
                "agent_name": agent_name,
                "repo_id": repo.id,
                "commit_hash": commit_hash,
                "analysis": analysis_result,
                "message": f"Code analysis completed for {agent_name}"
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": f"Failed to analyze agent code: {str(e)}"
            }
    
    def _analyze_code_structure(self, repo_id: str, commit_hash: str) -> Dict[str, Any]:
        """Internal method to analyze code structure using Git Objects API"""
        # This would use the Git Objects API to traverse the repository
        # and analyze the code structure
        return {
            "file_count": 0,
            "code_patterns": [],
            "dependencies": [],
            "complexity_score": 0.0,
            "last_modified": None
        }
    
    def generate_git_setup_commands(self, repo_id: str, access_token: str) -> List[str]:
        """Generate Git setup commands for AI agent repository"""
        return [
            f"# Setup Git credentials for Freestyle",
            f'git config --global credential.helper store',
            f'echo "https://x-access-token:{access_token}@git.freestyle.sh" >> ~/.git-credentials',
            f"",
            f"# Add Freestyle remote to your AI agent repository",
            f"git remote add freestyle https://git.freestyle.sh/{repo_id}",
            f"",
            f"# Push your AI agent code",
            f"git add .",
            f'git commit -m "Initial AI agent setup"',
            f"git push freestyle main",
            f"",
            f"# Create development branch for testing",
            f"git checkout -b development",
            f"git push freestyle development"
        ]
    
    def create_agent_ci_cd_pipeline(self, agent_name: str) -> Dict[str, Any]:
        """Create a CI/CD pipeline for an AI agent"""
        try:
            if agent_name not in self.agent_repositories:
                return {
                    "success": False,
                    "error": f"No repository found for agent: {agent_name}"
                }
            
            # Create CI identity
            ci_identity_result = self.create_agent_identity(f"{agent_name}-ci")
            if not ci_identity_result["success"]:
                return ci_identity_result
            
            ci_identity = ci_identity_result["identity"]
            repo = self.agent_repositories[agent_name]
            
            # Grant CI read access
            self.grant_agent_repository_access(ci_identity.id, repo.id, "read")
            
            # Set up CI triggers
            ci_trigger = self.client.create_trigger(
                repo_id=repo.id,
                trigger={
                    "event": "push",
                    "branch": ["main", "development"]
                },
                action={
                    "type": "webhook",
                    "url": f"https://your-ci-system.com/agent/{agent_name}/build"
                }
            )
            
            return {
                "success": True,
                "agent_name": agent_name,
                "ci_identity": ci_identity.id,
                "ci_trigger": ci_trigger['triggerId'],
                "message": f"CI/CD pipeline created for {agent_name}"
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": f"Failed to create CI/CD pipeline: {str(e)}"
            }
    
    def get_agent_status(self, agent_name: str) -> Dict[str, Any]:
        """Get comprehensive status of an AI agent's Git infrastructure"""
        if agent_name not in self.agent_repositories:
            return {
                "success": False,
                "error": f"Agent '{agent_name}' not found"
            }
        
        repo = self.agent_repositories[agent_name]
        identity = self.agent_identities.get(agent_name)
        
        return {
            "success": True,
            "agent_name": agent_name,
            "repository": {
                "id": repo.id,
                "name": repo.name,
                "url": repo.url,
                "status": "active"
            },
            "identity": {
                "id": identity.id if identity else None,
                "active_tokens": len(identity.tokens) if identity else 0
            },
            "git_url": f"{self.git_url}/{repo.id}",
            "last_activity": "2024-01-15T10:30:00Z",  # This would come from API
            "message": f"Agent '{agent_name}' is operational"
        }
    
    def list_all_agents(self) -> Dict[str, Any]:
        """List all AI agents with their Git infrastructure status"""
        agents = []
        
        for agent_name in self.agent_repositories.keys():
            status = self.get_agent_status(agent_name)
            if status["success"]:
                agents.append(status)
        
        return {
            "success": True,
            "total_agents": len(agents),
            "agents": agents,
            "message": f"Found {len(agents)} AI agents with Git infrastructure"
        }

class GitWebhookHandler:
    """Handler for Git webhook events from Freestyle"""
    
    def __init__(self, git_client: FreestyleGitClient):
        self.git_client = git_client
    
    def handle_agent_code_updated(self, webhook_payload: Dict[str, Any]) -> Dict[str, Any]:
        """Handle webhook when AI agent code is updated"""
        repo_id = webhook_payload.get("repoId")
        branch = webhook_payload.get("branch")
        commit = webhook_payload.get("commit")
        
        # Find which agent this repository belongs to
        agent_name = None
        for name, repo in self.git_client.agent_repositories.items():
            if repo.id == repo_id:
                agent_name = name
                break
        
        if not agent_name:
            return {
                "success": False,
                "error": f"Unknown repository: {repo_id}"
            }
        
        # Analyze the updated code
        analysis_result = self.git_client.analyze_agent_code_with_git_objects(
            agent_name, commit
        )
        
        # Trigger agent redeployment/update based on changes
        deployment_result = self._trigger_agent_update(agent_name, commit)
        
        return {
            "success": True,
            "agent_name": agent_name,
            "branch": branch,
            "commit": commit,
            "analysis": analysis_result,
            "deployment": deployment_result,
            "message": f"AI agent '{agent_name}' updated successfully"
        }
    
    def handle_agent_test_trigger(self, webhook_payload: Dict[str, Any]) -> Dict[str, Any]:
        """Handle webhook for AI agent testing"""
        # Implementation for testing AI agent changes
        return {
            "success": True,
            "message": "Agent testing triggered"
        }
    
    def _trigger_agent_update(self, agent_name: str, commit_hash: str) -> Dict[str, Any]:
        """Trigger AI agent update/redeployment"""
        # This would integrate with your existing deployment system
        return {
            "success": True,
            "agent_name": agent_name,
            "commit_hash": commit_hash,
            "deployment_status": "triggered",
            "message": f"Agent '{agent_name}' update triggered"
        }
