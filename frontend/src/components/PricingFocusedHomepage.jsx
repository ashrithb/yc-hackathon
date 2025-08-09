import React from 'react';
import { motion } from 'framer-motion';

const PricingFocusedHomepage = ({ onPageView, optimization }) => {
  React.useEffect(() => {
    onPageView && onPageView('home-pricing-focused');
  }, [onPageView]);

  return (
    <div className="homepage">
      <section className="hero">
        <div className="container">
          <h1>Welcome Back! 👋</h1>
          <p>Ready to see our pricing? We've made it easier to find exactly what you need.</p>
          <button className="cta-button">View Pricing Below ⬇️</button>
        </div>
      </section>

      {/* Prominently Featured Pricing Section */}
      <motion.section 
        className="section"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{ background: '#fff' }}
      >
        <div className="container">
          <div className="pricing pricing-prominent">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
              🎯 Perfect Plans for You
            </h2>
            <p style={{ textAlign: 'center', fontSize: '1.1rem', marginBottom: '3rem', color: '#666' }}>
              Based on your interests, here are our most popular options:
            </p>
            
            <div className="pricing-grid">
              <motion.div 
                className="pricing-card"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <h3>Starter</h3>
                <div className="price">$29/mo</div>
                <p style={{ color: '#48bb78', fontWeight: 'bold', marginBottom: '1rem' }}>
                  Perfect for small teams
                </p>
                <ul style={{ textAlign: 'left', color: '#4a5568' }}>
                  <li>✓ Up to 1,000 users</li>
                  <li>✓ Basic analytics</li>
                  <li>✓ Email support</li>
                  <li>✓ 30-day free trial</li>
                </ul>
                <button style={{ 
                  background: '#48bb78', 
                  color: 'white', 
                  border: 'none', 
                  padding: '10px 20px', 
                  borderRadius: '5px',
                  marginTop: '1rem',
                  cursor: 'pointer'
                }}>
                  Start Free Trial
                </button>
              </motion.div>
              
              <motion.div 
                className="pricing-card featured"
                style={{ 
                  border: '3px solid #667eea',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  transform: 'scale(1.1)'
                }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div style={{ background: '#fff', color: '#667eea', padding: '5px 15px', borderRadius: '20px', display: 'inline-block', marginBottom: '1rem', fontSize: '0.9rem', fontWeight: 'bold' }}>
                  🔥 MOST POPULAR
                </div>
                <h3 style={{ color: 'white' }}>Professional</h3>
                <div className="price" style={{ color: 'white' }}>$79/mo</div>
                <p style={{ color: '#e2e8f0', fontWeight: 'bold', marginBottom: '1rem' }}>
                  Recommended for you!
                </p>
                <ul style={{ textAlign: 'left', color: '#e2e8f0' }}>
                  <li>✓ Up to 10,000 users</li>
                  <li>✓ Advanced analytics</li>
                  <li>✓ Priority support</li>
                  <li>✓ Custom integrations</li>
                  <li>✓ Advanced security</li>
                </ul>
                <button style={{ 
                  background: '#fff', 
                  color: '#667eea', 
                  border: 'none', 
                  padding: '12px 24px', 
                  borderRadius: '5px',
                  marginTop: '1rem',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}>
                  Choose Professional
                </button>
              </motion.div>
              
              <motion.div 
                className="pricing-card"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <h3>Enterprise</h3>
                <div className="price">Custom</div>
                <p style={{ color: '#805ad5', fontWeight: 'bold', marginBottom: '1rem' }}>
                  For large organizations
                </p>
                <ul style={{ textAlign: 'left', color: '#4a5568' }}>
                  <li>✓ Unlimited users</li>
                  <li>✓ White-label solution</li>
                  <li>✓ Dedicated support</li>
                  <li>✓ Custom development</li>
                  <li>✓ SLA guarantees</li>
                </ul>
                <button style={{ 
                  background: '#805ad5', 
                  color: 'white', 
                  border: 'none', 
                  padding: '10px 20px', 
                  borderRadius: '5px',
                  marginTop: '1rem',
                  cursor: 'pointer'
                }}>
                  Contact Sales
                </button>
              </motion.div>
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem', background: '#f7fafc', borderRadius: '10px' }}>
              <h3 style={{ color: '#2d3748', marginBottom: '1rem' }}>💰 Special Offer Just for You!</h3>
              <p style={{ color: '#4a5568', fontSize: '1.1rem' }}>
                Since you've been exploring our pricing, get <strong>20% off</strong> your first 3 months with code: <code style={{ background: '#667eea', color: 'white', padding: '2px 8px', borderRadius: '4px' }}>RETURNING20</code>
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Simplified Features Section */}
      <section className="section" style={{ background: '#f7fafc' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#2d3748' }}>
            Why Our Customers Love Our Pricing
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💳</div>
              <h3>Transparent Pricing</h3>
              <p>No hidden fees, no surprises. What you see is what you pay.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔄</div>
              <h3>Flexible Plans</h3>
              <p>Upgrade or downgrade anytime. Cancel with just one click.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎁</div>
              <h3>30-Day Free Trial</h3>
              <p>Try any plan free for 30 days. No credit card required.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingFocusedHomepage;
