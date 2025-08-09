#!/bin/bash

echo "🏭 Setting up PRODUCTION Dynamic Website Personalization System"
echo "This will set up the real Morph + Freestyle integration"

# Check environment variables
check_env_vars() {
    echo "🔍 Checking environment variables..."
    
    if [ -z "$MORPH_API_KEY" ]; then
        echo "⚠️  MORPH_API_KEY not set. Please set it:"
        echo "export MORPH_API_KEY='your-morph-api-key'"
    fi
    
    if [ -z "$FREESTYLE_API_KEY" ]; then
        echo "⚠️  FREESTYLE_API_KEY not set. Please set it:"
        echo "export FREESTYLE_API_KEY='your-freestyle-api-key'"
    fi
    
    if [ -z "$MORPH_API_KEY" ] || [ -z "$FREESTYLE_API_KEY" ]; then
        echo "❌ Missing required API keys. Please set them and run again."
        echo ""
        echo "For demo without real APIs, use: ./setup.sh"
        exit 1
    fi
    
    echo "✅ API keys configured"
}

# Setup repository structure
setup_repos() {
    echo "📁 Setting up repository structure..."
    
    # Create main deployment repo
    mkdir -p deployment-repo
    cd deployment-repo
    
    if [ ! -d ".git" ]; then
        git init
        echo "# Deployment Repository for Personalized Variants" > README.md
        git add README.md
        git commit -m "Initial commit: deployment repo"
    fi
    
    # Create directories
    mkdir -p variants
    mkdir -p original-website
    mkdir -p generated-components
    
    # Create example original website structure if not exists
    if [ ! -d "original-website/src" ]; then
        echo "🌱 Creating example original website structure..."
        
        mkdir -p original-website/src/components
        mkdir -p original-website/src/styles
        mkdir -p original-website/public
        
        # Create package.json for original website
        cat > original-website/package.json << EOF
{
  "name": "original-website",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
EOF

        # Create base homepage component
        cat > original-website/src/components/Homepage.jsx << EOF
import React from 'react';
import './Homepage.css';

const Homepage = () => {
  return (
    <div className="homepage">
      <section className="hero">
        <div className="container">
          <h1>Welcome to TechFlow</h1>
          <p>The most innovative SaaS platform for modern businesses. Streamline your workflow and boost productivity.</p>
          <button className="cta-button">Get Started Free</button>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why Choose TechFlow?</h2>
          <div className="feature-grid">
            <div className="feature">
              <h3>🚀 Fast Performance</h3>
              <p>Lightning-fast processing with 99.9% uptime guarantee. Your business never stops.</p>
            </div>
            <div className="feature">
              <h3>🔒 Secure & Compliant</h3>
              <p>Enterprise-grade security with SOC 2 compliance and advanced encryption.</p>
            </div>
            <div className="feature">
              <h3>📊 Advanced Analytics</h3>
              <p>Real-time insights and detailed reports to drive your business decisions.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pricing">
        <div className="container">
          <h2>Simple Pricing</h2>
          <div className="pricing-grid">
            <div className="pricing-card">
              <h3>Starter</h3>
              <div className="price">$29/mo</div>
              <ul>
                <li>✓ Up to 1,000 users</li>
                <li>✓ Basic analytics</li>
                <li>✓ Email support</li>
              </ul>
            </div>
            <div className="pricing-card featured">
              <h3>Professional</h3>
              <div className="price">$79/mo</div>
              <ul>
                <li>✓ Up to 10,000 users</li>
                <li>✓ Advanced analytics</li>
                <li>✓ Priority support</li>
                <li>✓ Custom integrations</li>
              </ul>
            </div>
            <div className="pricing-card">
              <h3>Enterprise</h3>
              <div className="price">Custom</div>
              <ul>
                <li>✓ Unlimited users</li>
                <li>✓ White-label solution</li>
                <li>✓ Dedicated support</li>
                <li>✓ Custom development</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
EOF

        # Create basic CSS
        cat > original-website/src/components/Homepage.css << EOF
.homepage {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.cta-button {
  background: #fff;
  color: #667eea;
  padding: 15px 30px;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
}

.features {
  padding: 60px 0;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin-top: 40px;
}

.feature {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.pricing {
  padding: 60px 0;
  background: #f8fafc;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.pricing-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
}

.pricing-card.featured {
  border: 2px solid #667eea;
  transform: scale(1.05);
}

.price {
  font-size: 2rem;
  font-weight: bold;
  color: #667eea;
  margin: 1rem 0;
}
EOF
    fi
    
    cd ..
    echo "✅ Repository structure created"
}

# Setup backend with production dependencies
setup_backend() {
    echo "🐍 Setting up production backend..."
    
    cd backend
    
    # Add production dependencies
    cat >> requirements.txt << EOF
requests==2.31.0
python-dotenv==1.0.0
gitpython==3.1.40
EOF
    
    # Create virtual environment and install
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    
    # Create environment file
    cat > .env << EOF
MORPH_API_KEY=$MORPH_API_KEY
FREESTYLE_API_KEY=$FREESTYLE_API_KEY
MAIN_REPO_PATH=../deployment-repo
ORIGINAL_REPO_PATH=../deployment-repo/original-website
FLASK_ENV=production
EOF
    
    cd ..
    echo "✅ Production backend configured"
}

# Setup monitoring and logging
setup_monitoring() {
    echo "📊 Setting up monitoring and logging..."
    
    mkdir -p logs
    mkdir -p monitoring
    
    # Create log configuration
    cat > backend/logging_config.py << EOF
import logging
import os
from datetime import datetime

def setup_logging():
    log_dir = "../logs"
    os.makedirs(log_dir, exist_ok=True)
    
    log_filename = f"{log_dir}/personalization_{datetime.now().strftime('%Y%m%d')}.log"
    
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler(log_filename),
            logging.StreamHandler()
        ]
    )
    
    return logging.getLogger(__name__)
EOF
    
    echo "✅ Monitoring configured"
}

# Create production startup script
create_production_script() {
    echo "🚀 Creating production startup script..."
    
    cat > start-production.sh << EOF
#!/bin/bash

echo "🏭 Starting PRODUCTION Dynamic Personalization System"

# Check API keys
if [ -z "\$MORPH_API_KEY" ] || [ -z "\$FREESTYLE_API_KEY" ]; then
    echo "❌ Missing API keys. Please run setup-production.sh first."
    exit 1
fi

# Start backend
echo "🐍 Starting production backend..."
cd backend
source venv/bin/activate
export FLASK_ENV=production
python app.py &
BACKEND_PID=\$!

echo "✅ Production system started!"
echo "📡 Backend running on: http://localhost:5000"
echo "🔗 API endpoints:"
echo "  - POST /api/track - Track user behavior"
echo "  - GET  /api/optimize - Get AI optimization (triggers Morph)"
echo "  - POST /api/generate-variant - Manual variant generation"
echo "  - GET  /api/analytics - View analytics dashboard"
echo ""
echo "🎬 Real-time flow:"
echo "1. User behavior tracked → Analytics processed"
echo "2. Morph generates personalized code → Variant created"  
echo "3. Freestyle deploys variant → User sees optimized site"
echo ""
echo "Press Ctrl+C to stop"

trap "echo '🛑 Stopping production system...'; kill \$BACKEND_PID 2>/dev/null; exit" INT
wait
EOF

    chmod +x start-production.sh
    echo "✅ Production script created"
}

# Main setup flow
main() {
    check_env_vars
    setup_repos
    setup_backend
    setup_monitoring
    create_production_script
    
    echo ""
    echo "🎉 PRODUCTION SETUP COMPLETE!"
    echo ""
    echo "📋 What was created:"
    echo "  - deployment-repo/ (main repo with variants)"
    echo "  - deployment-repo/original-website/ (base website)"
    echo "  - deployment-repo/variants/ (generated user variants)"
    echo "  - Production backend with Morph + Freestyle integration"
    echo "  - Monitoring and logging setup"
    echo ""
    echo "🚀 To start the production system:"
    echo "  ./start-production.sh"
    echo ""
    echo "🔄 Real-time flow:"
    echo "  User visits → Analytics → Morph generates → Freestyle deploys → User sees optimized site"
    echo ""
    echo "⚡ This will create REAL personalized deployments using Morph AI and Freestyle!"
}

main
