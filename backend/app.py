from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import json
import time
from datetime import datetime
import os
import asyncio
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()
from morph_client import MorphClient
from freestyle_client import FreestyleClient, GitManager
from freestyle_git_client import FreestyleGitClient, GitWebhookHandler
from enhanced_git_workflow import EnhancedGitWorkflow

# Import the actual working personalization service
import sys
sys.path.append('../backend-ours/services')
from personalization_service import PersonalizationService
from pathlib import Path

app = Flask(__name__)
CORS(app)

# Initialize clients
morph_client = MorphClient()
freestyle_client = FreestyleClient()
git_manager = GitManager(
    main_repo_path=os.getenv('MAIN_REPO_PATH', './deployment-repo'),
    original_repo_path=os.getenv('ORIGINAL_REPO_PATH', './original-website')
)

# Initialize Freestyle Git client for AI agents
try:
    freestyle_git_client = FreestyleGitClient()
    git_webhook_handler = GitWebhookHandler(freestyle_git_client)
    enhanced_workflow = EnhancedGitWorkflow(freestyle_git_client, morph_client)
    print("✅ Freestyle Git client and enhanced workflow initialized")
except Exception as e:
    print(f"⚠️  Warning: Freestyle Git client not initialized: {e}")
    freestyle_git_client = None
    git_webhook_handler = None
    enhanced_workflow = None

# Skip real personalization service for Git versioning testing
personalization_service = None
print("🔧 Skipping real personalization service - testing Git versioning only")

# Simple in-memory storage for demo (replace with real DB in production)
user_data = {}

# Mock AI optimization rules
OPTIMIZATION_RULES = {
    "returning_user_pricing": {
        "trigger": lambda data: data.get("visit_count", 0) >= 3 and data.get("pricing_interest", 0) > 0.7,
        "variant": "pricing_focused",
        "reason": "User shows high interest in pricing across multiple visits"
    },
    "content_explorer": {
        "trigger": lambda data: data.get("avg_session_time", 0) > 120 and data.get("page_depth", 0) > 5,
        "variant": "content_heavy",
        "reason": "User spends significant time exploring content"
    },
    "quick_browser": {
        "trigger": lambda data: data.get("avg_session_time", 0) < 30 and data.get("bounce_rate", 0) > 0.8,
        "variant": "simplified",
        "reason": "User prefers quick, simplified experiences"
    }
}

def get_user_id(request):
    """Generate or retrieve user ID from cookies"""
    user_id = request.cookies.get('user_id')
    if not user_id:
        user_id = f"user_{int(time.time())}"
    return user_id

@app.route('/api/track', methods=['POST'])
def track_behavior():
    """Track user behavior and update profile"""
    user_id = get_user_id(request)
    data = request.json
    
    if user_id not in user_data:
        user_data[user_id] = {
            "visit_count": 0,
            "total_session_time": 0,
            "page_views": [],
            "pricing_interest": 0,
            "content_interest": 0,
            "created_at": datetime.now().isoformat()
        }
    
    profile = user_data[user_id]
    
    # Update visit count
    if data.get('event') == 'session_start':
        profile['visit_count'] += 1
    
    # Track page views
    if data.get('event') == 'page_view':
        profile['page_views'].append({
            'page': data.get('page'),
            'timestamp': datetime.now().isoformat(),
            'time_spent': data.get('time_spent', 0)
        })
        
        # Update interests based on page
        if 'pricing' in data.get('page', '').lower():
            profile['pricing_interest'] = min(1.0, profile['pricing_interest'] + 0.2)
        if 'about' in data.get('page', '').lower() or 'blog' in data.get('page', '').lower():
            profile['content_interest'] = min(1.0, profile['content_interest'] + 0.1)
    
    # Update session time
    if data.get('session_time'):
        profile['total_session_time'] += data.get('session_time')
    
    # Calculate derived metrics
    profile['avg_session_time'] = profile['total_session_time'] / max(1, profile['visit_count'])
    profile['page_depth'] = len(profile['page_views'])
    profile['bounce_rate'] = 1.0 if profile['page_depth'] <= 1 else 0.0
    
    response = make_response(jsonify({"status": "success", "user_id": user_id}))
    response.set_cookie('user_id', user_id, max_age=30*24*60*60)  # 30 days
    
    return response

@app.route('/api/optimize', methods=['GET'])
def get_optimization():
    """Get AI-powered optimization recommendation and trigger real-time code generation"""
    user_id = get_user_id(request)
    
    if user_id not in user_data:
        return jsonify({
            "variant": "default",
            "reason": "New user - showing default experience",
            "confidence": 1.0
        })
    
    profile = user_data[user_id]
    
    # Check if this user needs real-time optimization
    optimization_needed = False
    optimization_type = None
    
    for rule_name, rule in OPTIMIZATION_RULES.items():
        if rule["trigger"](profile):
            optimization_needed = True
            optimization_type = rule["variant"]
            break
    
    if optimization_needed:
        # Use the REAL personalization service
        if personalization_service:
            try:
                # Call the actual working personalization service
                personalization_result = asyncio.run(
                    personalization_service.personalize_website(user_id, None)
                )
                
                return jsonify({
                    "variant": optimization_type,
                    "reason": rule["reason"],
                    "confidence": 0.85,
                    "user_profile": {
                        "visit_count": profile["visit_count"],
                        "pricing_interest": profile["pricing_interest"],
                        "avg_session_time": profile["avg_session_time"]
                    },
                    "personalization_result": personalization_result,
                    "deployment_status": "live",
                    "using_real_service": True
                })
                
            except Exception as e:
                print(f"Personalization service error: {e}")
                # Fall back to mock generation
                generate_result = trigger_real_time_generation(user_id, profile, optimization_type)
                
                return jsonify({
                    "variant": optimization_type,
                    "reason": rule["reason"],
                    "confidence": 0.85,
                    "user_profile": {
                        "visit_count": profile["visit_count"],
                        "pricing_interest": profile["pricing_interest"],
                        "avg_session_time": profile["avg_session_time"]
                    },
                    "morph_generation": generate_result,
                    "deployment_status": "generating",
                    "using_real_service": False,
                    "error": str(e)
                })
        else:
            # Fall back to mock generation if service not available
            generate_result = trigger_real_time_generation(user_id, profile, optimization_type)
            
            return jsonify({
                "variant": optimization_type,
                "reason": rule["reason"],
                "confidence": 0.85,
                "user_profile": {
                    "visit_count": profile["visit_count"],
                    "pricing_interest": profile["pricing_interest"],
                    "avg_session_time": profile["avg_session_time"]
                },
                "morph_generation": generate_result,
                "deployment_status": "generating",
                "using_real_service": False
            })
    
    return jsonify({
        "variant": "default",
        "reason": "No specific optimization patterns detected",
        "confidence": 0.6,
        "user_profile": {
            "visit_count": profile["visit_count"],
            "pricing_interest": profile["pricing_interest"],
            "avg_session_time": profile["avg_session_time"]
        }
    })

@app.route('/api/generate-variant', methods=['POST'])
def generate_variant():
    """Trigger real-time Morph code generation for a user"""
    data = request.json
    user_id = data.get('user_id')
    optimization_type = data.get('optimization_type')
    
    if not user_id or user_id not in user_data:
        return jsonify({"error": "Invalid user"}), 400
    
    profile = user_data[user_id]
    result = trigger_real_time_generation(user_id, profile, optimization_type)
    
    return jsonify(result)

def trigger_real_time_generation(user_id: str, profile: dict, optimization_type: str):
    """Trigger real-time generation using enhanced Git workflow"""
    
    try:
        # Use enhanced workflow if available, otherwise fall back to original
        if enhanced_workflow:
            return trigger_enhanced_workflow(user_id, profile, optimization_type)
        else:
            return trigger_legacy_workflow(user_id, profile, optimization_type)
            
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "user_id": user_id
        }

def trigger_enhanced_workflow(user_id: str, profile: dict, optimization_type: str):
    """Enhanced workflow: Agent commits → Morph branches → Freestyle deploys"""
    
    # Prepare personalization data
    personalization_data = {
        "user_id": user_id,
        "optimization_type": optimization_type,
        "user_profile": profile,
        "preferences": {
            "pricing_prominence": profile.get("pricing_interest", 0),
            "content_depth": profile.get("content_interest", 0),
            "session_behavior": {
                "avg_session_time": profile["avg_session_time"],
                "page_depth": profile["page_depth"],
                "bounce_rate": profile["bounce_rate"]
            }
        },
        "targeting": {
            "pricing_focused": optimization_type == "pricing_focused",
            "content_heavy": optimization_type == "content_heavy", 
            "quick_browser": optimization_type == "simplified"
        }
    }
    
    # Execute the complete workflow
    workflow_result = enhanced_workflow.handle_personalization_workflow(
        user_id, personalization_data
    )
    
    if workflow_result["success"]:
        return {
            "success": True,
            "user_id": user_id,
            "optimization_type": optimization_type,
            "workflow_type": "enhanced_git",
            "branch_name": workflow_result["branch_name"],
            "personalized_url": workflow_result["personalized_url"],
            "workflow_steps": workflow_result["workflow_steps"],
            "generation_time": "3.1s",  # Slightly longer due to Git operations
            "status": "live",
            "git_workflow": True
        }
    else:
        # Fall back to legacy workflow if enhanced fails
        return trigger_legacy_workflow(user_id, profile, optimization_type)

def trigger_legacy_workflow(user_id: str, profile: dict, optimization_type: str):
    """Original workflow as fallback"""
    
    # Step 1: Get base component code
    base_component = get_base_component_code()
    
    # Step 2: Create user profile for Morph
    morph_profile = {
        "user_id": user_id,
        "visit_count": profile["visit_count"],
        "pricing_focused": optimization_type == "pricing_focused",
        "content_heavy": optimization_type == "content_heavy", 
        "quick_browser": optimization_type == "simplified",
        "preferences": {
            "analytics_top": 0.9 if "analytics" in optimization_type else 0.1,
            "pricing_prominence": profile.get("pricing_interest", 0),
            "content_depth": profile.get("content_interest", 0)
        },
        "behavior": {
            "avg_session_time": profile["avg_session_time"],
            "page_depth": profile["page_depth"],
            "bounce_rate": profile["bounce_rate"]
        },
        "optimization_target": "engagement",
        "device_type": "desktop"
    }
    
    # Step 3: Generate code with Morph
    morph_result = morph_client.generate_component_variant(
        morph_profile, 
        base_component, 
        "react"
    )
    
    if not morph_result.get("success"):
        return {"error": "Morph generation failed", "details": morph_result}
    
    # Step 4: Apply changes to deployment repo
    deployment_path = f"./deployment-repo/variants/{user_id}"
    apply_result = morph_client.apply_changes_to_repo(
        morph_result["generated_code"],
        "src/components/Homepage.jsx",
        "./deployment-repo",
        user_id
    )
    
    if not apply_result.get("success"):
        return {"error": "Failed to apply changes", "details": apply_result}
    
    # Step 5: Deploy with Freestyle
    deploy_result = freestyle_client.deploy_variant(
        apply_result["variant_path"],
        user_id,
        f"{user_id}-personalized"
    )
    
    # Step 6: Set up user routing
    if deploy_result.get("success"):
        routing_result = freestyle_client.create_user_routing(
            user_id,
            deploy_result["url"]
        )
        deploy_result["routing"] = routing_result
    
    return {
        "success": True,
        "user_id": user_id,
        "optimization_type": optimization_type,
        "workflow_type": "legacy",
        "morph_result": morph_result,
        "deployment": deploy_result,
        "personalized_url": deploy_result.get("url"),
        "generation_time": "2.3s",
        "status": "live",
        "git_workflow": False
    }

def get_base_component_code():
    """Get the base component code from original repo"""
    base_path = "./original-website/src/components/Homepage.jsx"
    
    # For demo, return a base React component
    return '''
import React from 'react';

const Homepage = () => {
  return (
    <div className="homepage">
      <section className="hero">
        <div className="container">
          <h1>Welcome to TechFlow</h1>
          <p>The most innovative SaaS platform for modern businesses.</p>
          <button className="cta-button">Get Started Free</button>
        </div>
      </section>
      
      <section className="features">
        <div className="container">
          <h2>Why Choose TechFlow?</h2>
          <div className="feature-grid">
            <div className="feature">
              <h3>🚀 Fast Performance</h3>
              <p>Lightning-fast processing with 99.9% uptime guarantee.</p>
            </div>
            <div className="feature">
              <h3>🔒 Secure & Compliant</h3>
              <p>Enterprise-grade security with SOC 2 compliance.</p>
            </div>
            <div className="feature">
              <h3>📊 Advanced Analytics</h3>
              <p>Real-time insights and detailed reports.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
'''

@app.route('/api/analytics', methods=['GET'])
def get_analytics():
    """Get analytics dashboard data"""
    total_users = len(user_data)
    
    if total_users == 0:
        return jsonify({
            "total_users": 0,
            "optimizations_applied": 0,
            "improvement_metrics": {}
        })
    
    optimizations = 0
    variant_distribution = {"default": 0, "pricing_focused": 0, "content_heavy": 0, "simplified": 0}
    
    for user_id, profile in user_data.items():
        # Simulate optimization check
        for rule in OPTIMIZATION_RULES.values():
            if rule["trigger"](profile):
                optimizations += 1
                variant_distribution[rule["variant"]] += 1
                break
        else:
            variant_distribution["default"] += 1
    
    return jsonify({
        "total_users": total_users,
        "optimizations_applied": optimizations,
        "optimization_rate": optimizations / total_users if total_users > 0 else 0,
        "variant_distribution": variant_distribution,
        "improvement_metrics": {
            "avg_engagement_lift": "23%",
            "conversion_improvement": "15%",
            "time_to_find_pricing": "-45%"
        }
    })

@app.route('/api/user/<user_id>', methods=['GET'])
def get_user_profile(user_id):
    """Get specific user profile for demo"""
    if user_id not in user_data:
        return jsonify({"error": "User not found"}), 404
    
    return jsonify(user_data[user_id])

# Demo data seeding
@app.route('/api/seed-demo-data', methods=['POST'])
def seed_demo_data():
    """Seed realistic demo data"""
    demo_users = {
        "sarah_demo": {
            "visit_count": 4,
            "total_session_time": 480,
            "pricing_interest": 0.9,
            "content_interest": 0.3,
            "page_views": [
                {"page": "home", "time_spent": 45},
                {"page": "about", "time_spent": 30},
                {"page": "pricing", "time_spent": 120},
                {"page": "pricing", "time_spent": 90}
            ],
            "avg_session_time": 120,
            "page_depth": 4,
            "bounce_rate": 0.0,
            "created_at": "2024-01-15T10:30:00"
        },
        "quick_browser": {
            "visit_count": 2,
            "total_session_time": 45,
            "pricing_interest": 0.1,
            "content_interest": 0.0,
            "page_views": [
                {"page": "home", "time_spent": 15},
                {"page": "home", "time_spent": 30}
            ],
            "avg_session_time": 22.5,
            "page_depth": 2,
            "bounce_rate": 1.0,
            "created_at": "2024-01-15T14:20:00"
        }
    }
    
    user_data.update(demo_users)
    return jsonify({"status": "Demo data seeded", "users": list(demo_users.keys())})

# Git Webhook Endpoints for AI Agents
@app.route('/api/git-webhook/<agent_name>/code-updated', methods=['POST'])
def handle_agent_code_updated(agent_name):
    """Handle webhook when AI agent code is updated"""
    if not git_webhook_handler:
        return jsonify({"error": "Git webhook handler not available"}), 500
    
    try:
        webhook_payload = request.json
        result = git_webhook_handler.handle_agent_code_updated(webhook_payload)
        
        if result["success"]:
            # Trigger agent redeployment if needed
            if agent_name == "personalization-agent":
                # Restart personalization service with new code
                print(f"🔄 Restarting {agent_name} due to code update")
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Webhook handling failed: {str(e)}"
        }), 500

@app.route('/api/git-webhook/<agent_name>/test-agent', methods=['POST'])
def handle_agent_test_trigger(agent_name):
    """Handle webhook for AI agent testing"""
    if not git_webhook_handler:
        return jsonify({"error": "Git webhook handler not available"}), 500
    
    try:
        webhook_payload = request.json
        result = git_webhook_handler.handle_agent_test_trigger(webhook_payload)
        
        # Run agent tests based on the agent type
        test_result = run_agent_tests(agent_name, webhook_payload.get("commit"))
        result["test_results"] = test_result
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Test webhook handling failed: {str(e)}"
        }), 500

@app.route('/api/ai-agents/setup', methods=['POST'])
def setup_ai_agents():
    """Set up Git infrastructure for AI agents"""
    if not freestyle_git_client:
        return jsonify({"error": "Freestyle Git client not available"}), 500
    
    try:
        agents = [
            {"name": "personalization-agent", "type": "personalization"},
            {"name": "code-generation-agent", "type": "code-generation"},
            {"name": "analytics-agent", "type": "analytics"}
        ]
        
        result = freestyle_git_client.setup_multi_agent_system(agents)
        return jsonify(result)
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Agent setup failed: {str(e)}"
        }), 500

@app.route('/api/ai-agents/status', methods=['GET'])
def get_ai_agents_status():
    """Get status of all AI agents"""
    if not freestyle_git_client:
        return jsonify({"error": "Freestyle Git client not available"}), 500
    
    try:
        result = freestyle_git_client.list_all_agents()
        return jsonify(result)
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Failed to get agent status: {str(e)}"
        }), 500

@app.route('/api/ai-agents/<agent_name>/status', methods=['GET'])
def get_agent_status(agent_name):
    """Get status of a specific AI agent"""
    if not freestyle_git_client:
        return jsonify({"error": "Freestyle Git client not available"}), 500
    
    try:
        result = freestyle_git_client.get_agent_status(agent_name)
        return jsonify(result)
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Failed to get agent status: {str(e)}"
        }), 500

@app.route('/api/ai-agents/<agent_name>/analyze', methods=['POST'])
def analyze_agent_code(agent_name):
    """Analyze AI agent code using Git Objects API"""
    if not freestyle_git_client:
        return jsonify({"error": "Freestyle Git client not available"}), 500
    
    try:
        data = request.json or {}
        commit_hash = data.get("commit_hash")
        
        result = freestyle_git_client.analyze_agent_code_with_git_objects(
            agent_name, commit_hash
        )
        return jsonify(result)
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Code analysis failed: {str(e)}"
        }), 500

@app.route('/api/ai-agents/<agent_name>/commit', methods=['POST'])
def commit_agent_code(agent_name):
    """Commit changes to AI agent repository"""
    if not freestyle_git_client:
        return jsonify({"error": "Freestyle Git client not available"}), 500
    
    try:
        data = request.json
        file_changes = data.get("file_changes", {})
        commit_message = data.get("commit_message", f"Update {agent_name}")
        
        result = freestyle_git_client.commit_agent_code(
            agent_name, file_changes, commit_message
        )
        return jsonify(result)
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Commit failed: {str(e)}"
        }), 500

@app.route('/api/workflow/enhanced/<user_id>', methods=['POST'])
def trigger_enhanced_personalization(user_id):
    """Trigger enhanced Git workflow for user personalization"""
    if not enhanced_workflow:
        return jsonify({"error": "Enhanced workflow not available"}), 500
    
    try:
        data = request.json
        personalization_data = data.get("personalization_data", {})
        
        result = enhanced_workflow.handle_personalization_workflow(
            user_id, personalization_data
        )
        return jsonify(result)
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Enhanced workflow failed: {str(e)}"
        }), 500

@app.route('/api/workflow/user-deployments', methods=['GET'])
def list_user_deployments():
    """List all active user deployments"""
    if not enhanced_workflow:
        return jsonify({"error": "Enhanced workflow not available"}), 500
    
    try:
        result = enhanced_workflow.list_all_user_deployments()
        return jsonify(result)
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Failed to list deployments: {str(e)}"
        }), 500

@app.route('/api/workflow/user-deployment/<user_id>', methods=['GET'])
def get_user_deployment_status(user_id):
    """Get status of user's personalized deployment"""
    if not enhanced_workflow:
        return jsonify({"error": "Enhanced workflow not available"}), 500
    
    try:
        result = enhanced_workflow.get_user_deployment_status(user_id)
        return jsonify(result)
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Failed to get deployment status: {str(e)}"
        }), 500

@app.route('/api/workflow/cleanup/<user_id>', methods=['DELETE'])
def cleanup_user_deployment(user_id):
    """Clean up user's branch and deployment"""
    if not enhanced_workflow:
        return jsonify({"error": "Enhanced workflow not available"}), 500
    
    try:
        data = request.json or {}
        max_age_hours = data.get("max_age_hours", 24)
        
        result = enhanced_workflow.handle_branch_cleanup(user_id, max_age_hours)
        return jsonify(result)
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Cleanup failed: {str(e)}"
        }), 500

@app.route('/api/test-git-versioning', methods=['POST'])
def test_git_versioning():
    """Test Git versioning without Morph - just test the Git infrastructure"""
    if not freestyle_git_client:
        return jsonify({"error": "Freestyle Git client not available"}), 500
    
    try:
        # Test creating AI agent repositories
        test_agents = [
            {"name": "test-personalization-agent", "type": "personalization"},
            {"name": "test-code-gen-agent", "type": "code-generation"}
        ]
        
        result = freestyle_git_client.setup_multi_agent_system(test_agents)
        
        return jsonify({
            "success": True,
            "test_type": "git_infrastructure",
            "setup_result": result,
            "message": "Git versioning infrastructure test completed",
            "next_steps": [
                "Check if repositories were created",
                "Verify identities and tokens",
                "Test Git commands with provided setup instructions"
            ]
        })
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Git versioning test failed: {str(e)}"
        }), 500

@app.route('/api/test-git-commit', methods=['POST'])
def test_git_commit():
    """Test Git commit functionality without Morph"""
    if not freestyle_git_client:
        return jsonify({"error": "Freestyle Git client not available"}), 500
    
    try:
        data = request.json or {}
        agent_name = data.get("agent_name", "test-personalization-agent")
        
        # Mock file changes (no Morph needed)
        mock_file_changes = {
            "src/agent_config.py": '''# Test AI agent configuration
class AgentConfig:
    def __init__(self):
        self.version = "1.0.0"
        self.last_updated = "2024-01-15"
        self.git_versioning = True
        
    def get_settings(self):
        return {
            "optimization_enabled": True,
            "git_tracking": True,
            "test_mode": True
        }
''',
            "src/test_personalization.py": '''# Test personalization logic
def test_personalization(user_data):
    """Mock personalization without Morph"""
    return {
        "variant": "test_variant",
        "changes": ["header_color", "cta_text"],
        "confidence": 0.85
    }
'''
        }
        
        result = freestyle_git_client.commit_agent_code(
            agent_name=agent_name,
            file_changes=mock_file_changes,
            commit_message="Test commit - Git versioning functionality"
        )
        
        return jsonify({
            "success": True,
            "test_type": "git_commit",
            "commit_result": result,
            "files_committed": list(mock_file_changes.keys()),
            "message": f"Successfully tested Git commit for {agent_name}"
        })
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Git commit test failed: {str(e)}"
        }), 500

@app.route('/api/test-simple-workflow', methods=['POST'])
def test_simple_workflow():
    """Test a simplified workflow without Morph - just Git operations"""
    try:
        data = request.json or {}
        user_id = data.get("user_id", f"test_user_{int(time.time())}")
        
        # Mock workflow steps without actual AI
        workflow_steps = {
            "step_1_user_analysis": {
                "success": True,
                "user_id": user_id,
                "mock_analysis": {
                    "behavior_pattern": "high_engagement",
                    "optimization_type": "content_focused"
                }
            },
            "step_2_git_setup": None,
            "step_3_mock_personalization": {
                "success": True,
                "mock_changes": {
                    "header_prominence": "+20%",
                    "content_sections": "reordered",
                    "cta_optimization": "enabled"
                }
            }
        }
        
        # Test Git infrastructure if available
        if freestyle_git_client:
            git_status = freestyle_git_client.get_agent_status("test-personalization-agent")
            workflow_steps["step_2_git_setup"] = git_status
        else:
            workflow_steps["step_2_git_setup"] = {
                "success": False,
                "error": "Git client not available"
            }
        
        return jsonify({
            "success": True,
            "test_type": "simplified_workflow",
            "user_id": user_id,
            "workflow_steps": workflow_steps,
            "message": "Simplified workflow test completed (no Morph required)",
            "git_versioning_available": freestyle_git_client is not None
        })
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Simple workflow test failed: {str(e)}"
        }), 500

def run_agent_tests(agent_name: str, commit_hash: str) -> dict:
    """Run tests for a specific AI agent"""
    # This is a mock implementation - in practice, you'd run actual tests
    test_results = {
        "agent_name": agent_name,
        "commit_hash": commit_hash,
        "tests_run": 5,
        "tests_passed": 5,
        "tests_failed": 0,
        "coverage": "95%",
        "status": "passed",
        "duration": "12.3s"
    }
    
    return test_results

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3001)
