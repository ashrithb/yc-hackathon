import React from 'react';

const DefaultHomepage = ({ onPageView }) => {
  React.useEffect(() => {
    onPageView && onPageView('home');
  }, [onPageView]);

  return (
    <div className="homepage">
      <section className="hero">
        <div className="container">
          <h1>Welcome to TechFlow</h1>
          <p>The most innovative SaaS platform for modern businesses. Streamline your workflow and boost productivity.</p>
          <button className="cta-button">Get Started Free</button>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem', color: '#2d3748' }}>
            Why Choose TechFlow?
          </h2>
          <div className="features">
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

      <section className="section" style={{ background: '#f7fafc' }}>
        <div className="container">
          <div className="pricing">
            <h2>Simple Pricing</h2>
            <div className="pricing-grid">
              <div className="pricing-card">
                <h3>Starter</h3>
                <div className="price">$29/mo</div>
                <ul style={{ textAlign: 'left', color: '#4a5568' }}>
                  <li>✓ Up to 1,000 users</li>
                  <li>✓ Basic analytics</li>
                  <li>✓ Email support</li>
                </ul>
              </div>
              <div className="pricing-card featured">
                <h3>Professional</h3>
                <div className="price">$79/mo</div>
                <ul style={{ textAlign: 'left', color: '#4a5568' }}>
                  <li>✓ Up to 10,000 users</li>
                  <li>✓ Advanced analytics</li>
                  <li>✓ Priority support</li>
                  <li>✓ Custom integrations</li>
                </ul>
              </div>
              <div className="pricing-card">
                <h3>Enterprise</h3>
                <div className="price">Custom</div>
                <ul style={{ textAlign: 'left', color: '#4a5568' }}>
                  <li>✓ Unlimited users</li>
                  <li>✓ White-label solution</li>
                  <li>✓ Dedicated support</li>
                  <li>✓ Custom development</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '2rem', color: '#2d3748' }}>Ready to Transform Your Business?</h2>
          <p style={{ fontSize: '1.1rem', color: '#4a5568', marginBottom: '2rem' }}>
            Join thousands of companies already using TechFlow to streamline their operations.
          </p>
          <button className="cta-button">Start Free Trial</button>
        </div>
      </section>
    </div>
  );
};

export default DefaultHomepage;
