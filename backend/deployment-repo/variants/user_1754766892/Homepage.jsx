
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
