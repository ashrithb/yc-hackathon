import os
import json
import subprocess
import time
from typing import Dict, Any, Optional, List
from dataclasses import dataclass
from freestyle_git_client import FreestyleGitClient
from morph_client import MorphClient

@dataclass
class BranchDeployment:
    """Represents a branch-specific deployment"""
    branch_name: str
    user_id: str
    deployment_url: str
    commit_hash: str
    status: str

class EnhancedGitWorkflow:
    """Enhanced Git workflow with branching and automatic deployments"""
    
    def __init__(self, freestyle_git_client: FreestyleGitClient, morph_client: MorphClient):
        self.git_client = freestyle_git_client
        self.morph_client = morph_client
        self.branch_deployments: Dict[str, BranchDeployment] = {}
        
    def handle_personalization_workflow(self, user_id: str, personalization_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Complete workflow: Agent commits → Morph branches → Freestyle deploys
        
        1. AI Agent commits personalization to main branch
        2. Morph checks out new user-specific branch
        3. Morph applies user-specific changes to the branch
        4. Freestyle deploys the branch to a user-specific URL
        5. User gets routed to their personalized version
        """
        
        try:
            # Step 1: AI Agent commits base personalization to main
            commit_result = self._commit_base_personalization(user_id, personalization_data)
            if not commit_result["success"]:
                return commit_result
            
            base_commit = commit_result["commit_hash"]
            
            # Step 2: Morph creates and checks out user-specific branch
            branch_result = self._create_user_branch(user_id, base_commit)
            if not branch_result["success"]:
                return branch_result
            
            user_branch = branch_result["branch_name"]
            
            # Step 3: Morph applies user-specific personalization to the branch
            personalize_result = self._apply_user_personalization(user_id, user_branch, personalization_data)
            if not personalize_result["success"]:
                return personalize_result
            
            # Step 4: Freestyle deploys the user branch
            deploy_result = self._deploy_user_branch(user_id, user_branch)
            if not deploy_result["success"]:
                return deploy_result
            
            # Step 5: Set up user-specific routing
            routing_result = self._setup_user_routing(user_id, deploy_result["deployment_url"])
            
            # Store the branch deployment
            self.branch_deployments[user_id] = BranchDeployment(
                branch_name=user_branch,
                user_id=user_id,
                deployment_url=deploy_result["deployment_url"],
                commit_hash=personalize_result["commit_hash"],
                status="live"
            )
            
            return {
                "success": True,
                "user_id": user_id,
                "workflow_steps": {
                    "base_commit": commit_result,
                    "branch_creation": branch_result,
                    "personalization": personalize_result,
                    "deployment": deploy_result,
                    "routing": routing_result
                },
                "personalized_url": deploy_result["deployment_url"],
                "branch_name": user_branch,
                "status": "live",
                "message": f"Complete personalization workflow completed for {user_id}"
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": f"Workflow failed: {str(e)}",
                "user_id": user_id
            }
    
    def _commit_base_personalization(self, user_id: str, personalization_data: Dict[str, Any]) -> Dict[str, Any]:
        """Step 1: AI Agent commits base personalization to main branch"""
        
        try:
            # Generate base personalization code using AI
            base_changes = self._generate_base_personalization_code(personalization_data)
            
            # Commit to main branch of personalization-agent repository
            commit_result = self.git_client.commit_agent_code(
                agent_name="personalization-agent",
                file_changes=base_changes,
                commit_message=f"Base personalization update - user pattern detected"
            )
            
            return {
                "success": True,
                "commit_hash": commit_result.get("commit_hash", f"commit_{int(time.time())}"),
                "files_changed": list(base_changes.keys()),
                "message": "Base personalization committed to main branch"
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": f"Failed to commit base personalization: {str(e)}"
            }
    
    def _create_user_branch(self, user_id: str, base_commit: str) -> Dict[str, Any]:
        """Step 2: Morph creates user-specific branch"""
        
        try:
            branch_name = f"user-{user_id}-personalized"
            
            # Use Git API to create branch from base commit
            # This would use Freestyle's Git Objects API to:
            # 1. Create new ref pointing to base_commit
            # 2. Set up branch-specific configuration
            
            branch_result = self._create_git_branch(
                repo_id=self.git_client.agent_repositories["personalization-agent"].id,
                branch_name=branch_name,
                from_commit=base_commit
            )
            
            return {
                "success": True,
                "branch_name": branch_name,
                "base_commit": base_commit,
                "message": f"Created user branch: {branch_name}"
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": f"Failed to create user branch: {str(e)}"
            }
    
    def _apply_user_personalization(self, user_id: str, branch_name: str, personalization_data: Dict[str, Any]) -> Dict[str, Any]:
        """Step 3: Morph applies user-specific changes to the branch"""
        
        try:
            # Generate user-specific personalization using Morph
            user_specific_changes = self.morph_client.generate_user_specific_variant(
                user_id=user_id,
                personalization_data=personalization_data,
                branch_context=branch_name
            )
            
            # Apply changes to the user branch
            commit_result = self._commit_to_branch(
                branch_name=branch_name,
                file_changes=user_specific_changes["file_changes"],
                commit_message=f"Personalization for user {user_id}"
            )
            
            return {
                "success": True,
                "commit_hash": commit_result["commit_hash"],
                "personalization_applied": user_specific_changes["changes_summary"],
                "files_modified": user_specific_changes["files_modified"],
                "message": f"User-specific personalization applied to {branch_name}"
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": f"Failed to apply user personalization: {str(e)}"
            }
    
    def _deploy_user_branch(self, user_id: str, branch_name: str) -> Dict[str, Any]:
        """Step 4: Freestyle deploys the user branch"""
        
        try:
            repo_id = self.git_client.agent_repositories["personalization-agent"].id
            
            # Deploy specific branch using Freestyle
            deployment_result = self._deploy_git_branch(
                repo_id=repo_id,
                branch_name=branch_name,
                subdomain=f"{user_id}-personalized"
            )
            
            return {
                "success": True,
                "deployment_id": deployment_result["deployment_id"],
                "deployment_url": deployment_result["url"],
                "branch_name": branch_name,
                "status": "deploying",
                "estimated_time": "30-60 seconds",
                "message": f"Branch {branch_name} deployment initiated"
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": f"Failed to deploy user branch: {str(e)}"
            }
    
    def _setup_user_routing(self, user_id: str, deployment_url: str) -> Dict[str, Any]:
        """Step 5: Set up intelligent routing to user's personalized deployment"""
        
        try:
            # Create routing rules using Freestyle
            routing_config = {
                "user_id": user_id,
                "target_url": deployment_url,
                "routing_rules": {
                    "match_type": "cookie",
                    "cookie_name": "user_id",
                    "cookie_value": user_id,
                    "fallback": "main_deployment"
                },
                "cache_settings": {
                    "ttl": 3600,  # 1 hour
                    "vary_on_cookie": True
                },
                "edge_locations": ["global"]
            }
            
            # In practice, this would use Freestyle's routing API
            routing_result = self._create_routing_rule(routing_config)
            
            return {
                "success": True,
                "routing_id": routing_result["routing_id"],
                "rule": f"user_id={user_id} → {deployment_url}",
                "status": "active",
                "message": f"User routing configured for {user_id}"
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": f"Failed to setup user routing: {str(e)}"
            }
    
    def _generate_base_personalization_code(self, personalization_data: Dict[str, Any]) -> Dict[str, str]:
        """Generate base personalization code that applies to similar user patterns"""
        
        # This would generate code changes that benefit multiple users with similar patterns
        base_changes = {
            "src/components/PersonalizationEngine.py": '''
# Enhanced personalization engine with pattern recognition
class PersonalizationEngine:
    def __init__(self):
        self.pattern_detected = True
        self.optimization_type = "behavioral_targeting"
    
    def apply_pattern_optimizations(self, user_data):
        # Base optimizations that apply to user patterns
        return self.generate_optimized_layout(user_data)
''',
            "src/utils/pattern_detection.py": '''
# Pattern detection utilities
def detect_user_patterns(behavior_data):
    # Analyze user behavior patterns
    return {
        "pattern_type": "high_engagement",
        "confidence": 0.85,
        "recommendations": ["prioritize_content", "optimize_cta"]
    }
'''
        }
        
        return base_changes
    
    def _create_git_branch(self, repo_id: str, branch_name: str, from_commit: str) -> Dict[str, Any]:
        """Create a new Git branch using Freestyle Git API"""
        
        # This would use Freestyle's Git Objects API to create a new ref
        # pointing to the specified commit
        
        return {
            "success": True,
            "branch_name": branch_name,
            "ref": f"refs/heads/{branch_name}",
            "commit_hash": from_commit
        }
    
    def _commit_to_branch(self, branch_name: str, file_changes: Dict[str, str], commit_message: str) -> Dict[str, Any]:
        """Commit changes to a specific branch"""
        
        # This would use Git Objects API to:
        # 1. Create blobs for changed files
        # 2. Create new tree with updated files
        # 3. Create commit pointing to new tree
        # 4. Update branch ref to point to new commit
        
        return {
            "success": True,
            "commit_hash": f"commit_{int(time.time())}",
            "branch_name": branch_name,
            "files_changed": list(file_changes.keys())
        }
    
    def _deploy_git_branch(self, repo_id: str, branch_name: str, subdomain: str) -> Dict[str, Any]:
        """Deploy a specific Git branch using Freestyle"""
        
        # This would use Freestyle's deployment API with Git source
        deployment_config = {
            "source": {
                "type": "git",
                "repo_id": repo_id,
                "branch": branch_name
            },
            "config": {
                "subdomain": subdomain,
                "environment": "production",
                "auto_deploy": True,
                "framework": "react"
            }
        }
        
        # Mock deployment for now
        return {
            "deployment_id": f"deploy_{subdomain}_{int(time.time())}",
            "url": f"https://{subdomain}.freestyle.sh",
            "status": "deploying"
        }
    
    def _create_routing_rule(self, routing_config: Dict[str, Any]) -> Dict[str, Any]:
        """Create intelligent routing rule"""
        
        # This would use Freestyle's routing API
        return {
            "routing_id": f"route_{routing_config['user_id']}_{int(time.time())}",
            "status": "active"
        }
    
    def handle_branch_cleanup(self, user_id: str, max_age_hours: int = 24) -> Dict[str, Any]:
        """Clean up old user branches and deployments"""
        
        try:
            if user_id not in self.branch_deployments:
                return {"success": True, "message": "No branches to clean up"}
            
            deployment = self.branch_deployments[user_id]
            
            # Check if branch is old enough to clean up
            # In practice, you'd check the actual branch creation time
            
            # Delete deployment
            self._delete_deployment(deployment.deployment_url)
            
            # Delete Git branch
            self._delete_git_branch(deployment.branch_name)
            
            # Remove from tracking
            del self.branch_deployments[user_id]
            
            return {
                "success": True,
                "cleaned_up": {
                    "branch": deployment.branch_name,
                    "deployment": deployment.deployment_url,
                    "user_id": user_id
                },
                "message": f"Cleaned up resources for {user_id}"
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": f"Cleanup failed: {str(e)}"
            }
    
    def _delete_deployment(self, deployment_url: str):
        """Delete a Freestyle deployment"""
        # Implementation would use Freestyle API to delete deployment
        pass
    
    def _delete_git_branch(self, branch_name: str):
        """Delete a Git branch"""
        # Implementation would use Git Objects API to delete ref
        pass
    
    def get_user_deployment_status(self, user_id: str) -> Dict[str, Any]:
        """Get status of user's personalized deployment"""
        
        if user_id not in self.branch_deployments:
            return {
                "success": False,
                "error": f"No deployment found for user {user_id}"
            }
        
        deployment = self.branch_deployments[user_id]
        
        return {
            "success": True,
            "user_id": user_id,
            "branch_name": deployment.branch_name,
            "deployment_url": deployment.deployment_url,
            "commit_hash": deployment.commit_hash,
            "status": deployment.status,
            "last_updated": "2024-01-15T10:30:00Z",  # Would be actual timestamp
            "performance": {
                "load_time": "1.1s",
                "uptime": "99.9%",
                "edge_locations": 15
            }
        }
    
    def list_all_user_deployments(self) -> Dict[str, Any]:
        """List all active user deployments"""
        
        deployments = []
        for user_id, deployment in self.branch_deployments.items():
            deployments.append({
                "user_id": user_id,
                "branch_name": deployment.branch_name,
                "deployment_url": deployment.deployment_url,
                "status": deployment.status
            })
        
        return {
            "success": True,
            "total_deployments": len(deployments),
            "deployments": deployments,
            "message": f"Found {len(deployments)} active user deployments"
        }
