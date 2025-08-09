import React from 'react';
import { motion } from 'framer-motion';

const SimplifiedHomepage = ({ onPageView }) => {
  React.useEffect(() => {
    onPageView && onPageView('home-simplified');
  }, [onPageView]);

  return (
    <div className="homepage">
      <motion.section 
        className="hero"
        style={{ background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)', padding: '60px 0' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          <h1 style={{ fontSize: '2.5rem' }}>Simple. Fast. Effective.</h1>
          <p style={{ fontSize: '1.1rem', margin: '1rem auto 2rem' }}>
            Get started in under 60 seconds.
          </p>
          <motion.button 
            className="cta-button"
            style={{ fontSize: '1.2rem', padding: '18px 40px' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Now →
          </motion.button>
        </div>
      </motion.section>

      {/* Simplified Benefits */}
      <section className="section">
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem',
            textAlign: 'center'
          }}>
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚡</div>
              <h3 style={{ color: '#2d3748', marginBottom: '0.5rem' }}>Quick Setup</h3>
              <p style={{ color: '#4a5568' }}>Ready in 60 seconds</p>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💡</div>
              <h3 style={{ color: '#2d3748', marginBottom: '0.5rem' }}>Easy to Use</h3>
              <p style={{ color: '#4a5568' }}>No training required</p>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎯</div>
              <h3 style={{ color: '#2d3748', marginBottom: '0.5rem' }}>Instant Results</h3>
              <p style={{ color: '#4a5568' }}>See improvements today</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Simple Pricing */}
      <section className="section" style={{ background: '#f7fafc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
            <h2 style={{ color: '#2d3748', marginBottom: '1rem' }}>One Price. Everything Included.</h2>
            <motion.div 
              style={{ 
                background: 'white', 
                padding: '3rem', 
                borderRadius: '12px', 
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)' 
              }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#48bb78', marginBottom: '1rem' }}>
                $49<span style={{ fontSize: '1rem', color: '#666' }}>/month</span>
              </div>
              <p style={{ color: '#4a5568', marginBottom: '2rem', fontSize: '1.1rem' }}>
                Everything you need to get started and scale.
              </p>
              <ul style={{ 
                textAlign: 'left', 
                listStyle: 'none', 
                padding: 0, 
                color: '#4a5568',
                marginBottom: '2rem'
              }}>
                <li style={{ marginBottom: '0.5rem' }}>✓ Unlimited users & workflows</li>
                <li style={{ marginBottom: '0.5rem' }}>✓ All features included</li>
                <li style={{ marginBottom: '0.5rem' }}>✓ 24/7 support</li>
                <li style={{ marginBottom: '0.5rem' }}>✓ 30-day money-back guarantee</li>
              </ul>
              <motion.button 
                style={{ 
                  background: '#48bb78', 
                  color: 'white', 
                  border: 'none', 
                  padding: '15px 30px', 
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  width: '100%'
                }}
                whileHover={{ background: '#38a169' }}
                transition={{ duration: 0.2 }}
              >
                Start Free Trial
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1rem', color: '#2d3748' }}>Join 10,000+ Happy Customers</h2>
          <p style={{ fontSize: '1.1rem', color: '#4a5568', marginBottom: '2rem' }}>
            Start your free trial today. No credit card required.
          </p>
          <motion.button 
            className="cta-button"
            style={{ fontSize: '1.2rem', padding: '18px 40px' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Free
          </motion.button>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '1rem' }}>
            Cancel anytime. Setup takes less than 60 seconds.
          </p>
        </div>
      </section>
    </div>
  );
};

export default SimplifiedHomepage;
