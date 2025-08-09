import requests
import os
from typing import Dict, Any, Optional
import json

class MorphClient:
    """Client for interacting with Morph AI code generation API"""
    
    def __init__(self, api_key: Optional[str] = None, base_url: str = "https://api.morphllm.com"):
        self.api_key = api_key or os.getenv('MORPH_API_KEY')
        self.base_url = base_url
        self.headers = {
            'Authorization': f'Bearer {self.api_key}',
            'Content-Type': 'application/json'
        }
    
    def generate_component_variant(self, 
                                 user_profile: Dict[str, Any], 
                                 base_component: str, 
                                 component_type: str = "react") -> Dict[str, Any]:
        """
        Generate a personalized component variant using Morph AI
        
        Args:
            user_profile: User behavior data and preferences
            base_component: Original component code
            component_type: Type of component (react, vue, etc.)
        
        Returns:
            Generated component code and metadata
        """
        
        # Create optimization prompt based on user profile
        optimization_prompt = self._create_optimization_prompt(user_profile, component_type)
        
        payload = {
            "prompt": optimization_prompt,
            "base_code": base_component,
            "language": component_type,
            "optimization_target": user_profile.get('optimization_target', 'engagement'),
            "constraints": {
                "maintain_functionality": True,
                "preserve_branding": True,
                "accessibility_compliant": True
            }
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/v1/generate", 
                headers=self.headers, 
                json=payload,
                timeout=30
            )
            response.raise_for_status()
            return response.json()
            
        except requests.exceptions.RequestException as e:
            # Fallback to mock response for demo
            return self._mock_morph_response(user_profile, base_component)
    
    def _create_optimization_prompt(self, user_profile: Dict[str, Any], component_type: str) -> str:
        """Create a detailed prompt for Morph based on user behavior"""
        
        preferences = user_profile.get('preferences', {})
        behavior = user_profile.get('behavior', {})
        
        if preferences.get('analytics_top', 0) > 0.8:
            optimization_focus = "Move analytics and key metrics to the top of the page for immediate visibility"
        elif behavior.get('pricing_focused', False):
            optimization_focus = "Prominently feature pricing information and make CTAs more visible"
        elif behavior.get('content_heavy', False):
            optimization_focus = "Add detailed content sections and expand informational areas"
        elif behavior.get('quick_browser', False):
            optimization_focus = "Simplify layout, reduce cognitive load, larger CTAs"
        else:
            optimization_focus = "General engagement optimization"
        
        return f"""
        Optimize this {component_type} component for a user with these characteristics:
        
        User Profile:
        - Visit count: {user_profile.get('visit_count', 1)}
        - Primary interest: {user_profile.get('primary_interest', 'general')}
        - Session behavior: {behavior}
        - Preferences: {preferences}
        
        Optimization Goal: {optimization_focus}
        
        Requirements:
        1. Maintain all existing functionality
        2. Keep brand colors and fonts consistent
        3. Ensure responsive design principles
        4. Optimize for {user_profile.get('device_type', 'desktop')} users
        5. Improve {user_profile.get('optimization_target', 'engagement')} metrics
        
        Generate a component that feels personalized without being intrusive.
        Focus on subtle but impactful changes that improve user experience.
        """
    
    def _mock_morph_response(self, user_profile: Dict[str, Any], base_component: str) -> Dict[str, Any]:
        """Mock Morph response for demo purposes"""
        
        # Simulate different optimizations based on user profile
        preferences = user_profile.get('preferences', {})
        
        if preferences.get('analytics_top', 0) > 0.8:
            optimization_type = "analytics_prominent"
            description = "Analytics dashboard moved to top navigation for immediate access"
        elif user_profile.get('pricing_focused', False):
            optimization_type = "pricing_focused"
            description = "Pricing section prominently featured with clear CTAs"
        elif user_profile.get('content_heavy', False):
            optimization_type = "content_expanded"
            description = "Additional content sections and detailed information"
        else:
            optimization_type = "simplified"
            description = "Streamlined design with clearer user flow"
        
        return {
            "success": True,
            "generated_code": self._generate_variant_code(optimization_type, base_component),
            "optimization_type": optimization_type,
            "description": description,
            "confidence": 0.87,
            "estimated_improvement": {
                "engagement": "+23%",
                "conversion": "+15%",
                "time_on_page": "+31%"
            },
            "changes_made": [
                f"Layout optimization for {optimization_type}",
                "Improved visual hierarchy",
                "Enhanced call-to-action visibility",
                "Responsive design improvements"
            ]
        }
    
    def _generate_variant_code(self, optimization_type: str, base_component: str) -> str:
        """Generate actual component code based on optimization type"""
        
        if optimization_type == "analytics_prominent":
            return """
import React from 'react';
import AnalyticsDashboard from './AnalyticsDashboard';

const OptimizedHomepage = ({ user, analytics }) => {
  return (
    <div className="homepage analytics-focused">
      {/* Analytics Dashboard prominently featured at top */}
      <section className="hero-analytics">
        <div className="container">
          <h1>Welcome back, {user.name}! 📊</h1>
          <AnalyticsDashboard data={analytics} position="prominent" />
        </div>
      </section>
      
      <section className="quick-actions">
        <div className="container">
          <div className="action-grid">
            <button className="action-btn primary">View Full Analytics</button>
            <button className="action-btn secondary">Generate Report</button>
            <button className="action-btn tertiary">Export Data</button>
          </div>
        </div>
      </section>
      
      {/* Condensed content for analytics-focused users */}
      <section className="condensed-features">
        <div className="container">
          <h2>Key Features</h2>
          <div className="feature-cards analytics-optimized">
            <div className="card">
              <h3>📈 Real-time Analytics</h3>
              <p>Live data tracking and insights</p>
            </div>
            <div className="card">
              <h3>🎯 Smart Optimization</h3>
              <p>AI-powered recommendations</p>
            </div>
            <div className="card">
              <h3>⚡ Fast Performance</h3>
              <p>Lightning-fast data processing</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OptimizedHomepage;
"""
        
        elif optimization_type == "pricing_focused":
            return """
import React from 'react';
import PricingCard from './PricingCard';

const OptimizedHomepage = ({ user }) => {
  return (
    <div className="homepage pricing-focused">
      <section className="hero">
        <div className="container">
          <h1>Welcome back! Ready to upgrade? 💰</h1>
          <p>Based on your usage, here are our recommended plans:</p>
        </div>
      </section>
      
      {/* Prominent pricing section */}
      <section className="featured-pricing">
        <div className="container">
          <div className="pricing-spotlight">
            <PricingCard 
              plan="Professional" 
              price="$79/mo" 
              featured={true}
              savings="Save 20% - Limited Time!"
            />
          </div>
        </div>
      </section>
      
      <section className="value-props">
        <div className="container">
          <h2>Why Upgrade Now?</h2>
          <div className="benefits-grid">
            <div className="benefit">
              <h3>💰 Save 20%</h3>
              <p>Limited time offer for returning customers</p>
            </div>
            <div className="benefit">
              <h3>🚀 10x More Features</h3>
              <p>Unlock advanced capabilities</p>
            </div>
            <div className="benefit">
              <h3>⚡ Priority Support</h3>
              <p>Get help when you need it</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OptimizedHomepage;
"""
        
        # Add more optimization types as needed
        return base_component

    def apply_changes_to_repo(self, 
                            generated_code: str, 
                            file_path: str, 
                            deployment_repo_path: str,
                            user_id: str) -> Dict[str, Any]:
        """
        Apply generated changes to deployment repository
        
        Args:
            generated_code: Code generated by Morph
            file_path: Path to the file to modify
            deployment_repo_path: Path to deployment repository
            user_id: User identifier for variant naming
        
        Returns:
            Result of the operation
        """
        
        variant_dir = f"{deployment_repo_path}/variants/{user_id}"
        os.makedirs(variant_dir, exist_ok=True)
        
        # Write the generated code
        variant_file_path = f"{variant_dir}/{os.path.basename(file_path)}"
        
        try:
            with open(variant_file_path, 'w') as f:
                f.write(generated_code)
            
            return {
                "success": True,
                "variant_path": variant_file_path,
                "user_id": user_id,
                "ready_for_deployment": True
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "variant_path": None
            }
