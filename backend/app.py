from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import json
import time
from datetime import datetime
import os
import asyncio
from dotenv import load_dotenv
from morph_client import MorphClient
from freestyle_client import FreestyleClient, GitManager
from posthog_hybrid_client import PostHogHybridClient

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize clients
morph_client = MorphClient()
freestyle_client = FreestyleClient()
git_manager = GitManager(
    main_repo_path=os.getenv('MAIN_REPO_PATH', './deployment-repo'),
    original_repo_path=os.getenv('ORIGINAL_REPO_PATH', './original-website')
)

# Initialize PostHog hybrid client (works with project or personal API keys)
posthog_client = None
try:
    posthog_client = PostHogHybridClient()
    print("✅ PostHog hybrid client initialized successfully")
except ValueError as e:
    print(f"⚠️  PostHog client initialization failed: {e}")
    print("   PostHog API endpoints will return mock data.")

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
        # Trigger real-time Morph code generation
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
            "deployment_status": "generating"
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
    """Trigger real-time Morph code generation and Freestyle deployment"""
    
    try:
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
            "morph_result": morph_result,
            "deployment": deploy_result,
            "personalized_url": deploy_result.get("url"),
            "generation_time": "2.3s",
            "status": "live"
        }
        
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "user_id": user_id
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

# PostHog API Endpoints
@app.route('/api/posthog/send-event', methods=['POST'])
def send_posthog_event():
    """Send an event to PostHog using project API key"""
    if not posthog_client:
        return jsonify({
            "error": "PostHog client not configured"
        }), 500
    
    try:
        data = request.json
        user_id = data.get('user_id') or get_user_id(request)
        event_name = data.get('event')
        properties = data.get('properties', {})
        
        if not event_name:
            return jsonify({"error": "Event name is required"}), 400
        
        result = posthog_client.send_event(user_id, event_name, properties)
        return jsonify(result)
        
    except Exception as e:
        return jsonify({
            "error": f"Failed to send event to PostHog: {str(e)}"
        }), 500

@app.route('/api/posthog/info', methods=['GET'])
def get_posthog_info():
    """Get PostHog configuration and capabilities"""
    if not posthog_client:
        return jsonify({
            "error": "PostHog client not configured"
        })
    
    return jsonify(posthog_client.get_project_info())

@app.route('/api/posthog/user/<user_id>', methods=['GET'])
def get_posthog_user_data(user_id):
    """Get all user interaction data from PostHog"""
    if not posthog_client:
        # Return error if PostHog client is not available
        return jsonify({
            "error": "PostHog client not configured. Please set POSTHOG_PROJECT_ID and POSTHOG_PERSONAL_API_KEY"
        }), 500
    
    try:
        days_back = request.args.get('days_back', 30, type=int)
        user_data = posthog_client.get_user_data_from_posthog(user_id, days_back)
        return jsonify(user_data)
    except Exception as e:
        return jsonify({
            "error": f"Failed to fetch user data from PostHog: {str(e)}",
            "user_id": user_id
        }), 500

@app.route('/api/posthog/users', methods=['GET'])
def get_posthog_all_users():
    """Get all users from PostHog"""
    if not posthog_client:
        # Return error if PostHog client is not available
        return jsonify({
            "error": "PostHog client not configured. Please set POSTHOG_PROJECT_ID and POSTHOG_PERSONAL_API_KEY"
        }), 500
    
    try:
        limit = request.args.get('limit', 100, type=int)
        offset = request.args.get('offset', 0, type=int)
        days_back = request.args.get('days_back', 30, type=int)
        
        users = posthog_client.get_all_users_from_posthog(limit, offset, days_back)
        return jsonify({
            "users": users,
            "total": len(users),
            "limit": limit,
            "offset": offset,
            "days_back": days_back
        })
    except Exception as e:
        return jsonify({
            "error": f"Failed to fetch users from PostHog: {str(e)}"
        }), 500

@app.route('/api/posthog/stats', methods=['GET'])
def get_posthog_stats():
    """Get summary statistics from PostHog"""
    if not posthog_client:
        return jsonify({
            "error": "PostHog client not configured. Please set POSTHOG_PROJECT_ID and POSTHOG_PERSONAL_API_KEY"
        })
    
    try:
        stats = posthog_client.get_user_summary_stats()
        return jsonify(stats)
    except Exception as e:
        return jsonify({
            "error": f"Failed to fetch stats from PostHog: {str(e)}"
        }), 500

@app.route('/api/posthog/enhanced-profile/<user_id>', methods=['GET'])
def get_enhanced_user_profile(user_id):
    """Get user profile enhanced with PostHog data"""
    # Get local user data
    local_data = user_data.get(user_id, {})
    
    # Get PostHog data if available
    posthog_data = {}
    if posthog_client:
        try:
            posthog_data = posthog_client.get_user_data_from_posthog(user_id, 30)
        except Exception as e:
            posthog_data = {"error": str(e)}
    
    # Merge and enhance the data
    enhanced_profile = {
        "user_id": user_id,
        "local_data": local_data,
        "posthog_data": posthog_data,
        "enhanced_metrics": {}
    }
    
    # Calculate enhanced metrics if both data sources are available
    if local_data and posthog_data.get("summary"):
        ph_summary = posthog_data["summary"]
        enhanced_profile["enhanced_metrics"] = {
            "total_events_all_sources": local_data.get("page_depth", 0) + ph_summary.get("total_events", 0),
            "consistency_score": calculate_consistency_score(local_data, ph_summary),
            "engagement_trend": calculate_engagement_trend(local_data, ph_summary),
            "optimization_confidence": calculate_optimization_confidence(local_data, ph_summary)
        }
    
    return jsonify(enhanced_profile)

@app.route('/api/posthog/heatmaps/<user_id>', methods=['GET'])
def get_user_heatmaps(user_id):
    """Get heatmap data for all pages visited by a user"""
    if not posthog_client:
        return jsonify({
            "error": "PostHog client not configured. Please set POSTHOG_PROJECT_ID and POSTHOG_PERSONAL_API_KEY"
        }), 500
    
    try:
        days_back = request.args.get('days_back', 30, type=int)
        heatmap_data = posthog_client.get_user_heatmaps_for_all_pages(user_id, days_back)
        return jsonify(heatmap_data)
    except Exception as e:
        return jsonify({
            "error": f"Failed to fetch heatmap data from PostHog: {str(e)}",
            "user_id": user_id
        }), 500

@app.route('/api/posthog/delete-all-data', methods=['DELETE'])
def delete_all_posthog_data():
    """Delete all PostHog data - WARNING: This will permanently delete ALL events in your PostHog project"""
    if not posthog_client:
        return jsonify({
            "error": "PostHog client not configured. Please set POSTHOG_PROJECT_ID and POSTHOG_PERSONAL_API_KEY"
        }), 500
    
    # Safety check - require confirmation parameter
    confirmation = request.args.get('confirm')
    if confirmation != 'DELETE_ALL_DATA':
        return jsonify({
            "error": "This operation requires confirmation. Add ?confirm=DELETE_ALL_DATA to proceed.",
            "warning": "This will PERMANENTLY delete ALL PostHog data in your project!",
            "usage": "DELETE /api/posthog/delete-all-data?confirm=DELETE_ALL_DATA"
        }), 400
    
    try:
        result = posthog_client.delete_all_data()
        return jsonify(result)
    except Exception as e:
        return jsonify({
            "error": f"Failed to delete PostHog data: {str(e)}"
        }), 500

def calculate_consistency_score(local_data, posthog_data):
    """Calculate consistency between local and PostHog data"""
    # Simple consistency scoring based on page views and interests
    local_pages = local_data.get("page_depth", 0)
    ph_pages = posthog_data.get("page_views", 0)
    
    if local_pages == 0 and ph_pages == 0:
        return 1.0
    
    if local_pages == 0 or ph_pages == 0:
        return 0.5
    
    consistency = 1.0 - abs(local_pages - ph_pages) / max(local_pages, ph_pages)
    return max(0.0, min(1.0, consistency))

def calculate_engagement_trend(local_data, posthog_data):
    """Calculate engagement trend direction"""
    local_avg_time = local_data.get("avg_session_time", 0)
    local_visits = local_data.get("visit_count", 0)
    
    # Simple trend calculation - in real implementation, you'd compare time periods
    engagement_score = (local_avg_time * 0.7) + (local_visits * 0.3)
    
    if engagement_score > 100:
        return "increasing"
    elif engagement_score > 50:
        return "stable"
    else:
        return "declining"

def calculate_optimization_confidence(local_data, posthog_data):
    """Calculate confidence level for optimization recommendations"""
    data_points = 0
    
    if local_data.get("visit_count", 0) > 0:
        data_points += local_data["visit_count"]
    if posthog_data.get("total_events", 0) > 0:
        data_points += min(10, posthog_data["total_events"] // 5)  # Cap contribution
    
    # Convert to confidence percentage
    confidence = min(95, data_points * 10)  # Max 95% confidence
    return confidence

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
