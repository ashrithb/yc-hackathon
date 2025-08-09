import React from 'react';
import { motion } from 'framer-motion';

const ContentHeavyHomepage = ({ onPageView }) => {
  React.useEffect(() => {
    onPageView && onPageView('home-content-heavy');
  }, [onPageView]);

  return (
    <div className="homepage">
      <section className="hero" style={{ background: 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)' }}>
        <div className="container">
          <h1>Deep Dive into TechFlow</h1>
          <p>Since you love exploring content, here's everything you need to know about our platform, technology, and philosophy.</p>
          <button className="cta-button">Explore Our Story ⬇️</button>
        </div>
      </section>

      {/* Detailed About Section */}
      <section className="section">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{ textAlign: 'center', marginBottom: '3rem', color: '#2d3748', fontSize: '2.5rem' }}>
              Our Story & Mission 📖
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
              <div>
                <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>Founded in 2020</h3>
                <p style={{ lineHeight: '1.8', color: '#4a5568', fontSize: '1.1rem' }}>
                  TechFlow was born from a simple observation: businesses waste countless hours on repetitive tasks 
                  that could be automated. Our founders, Sarah Chen and Marcus Rodriguez, previously worked at Google 
                  and Microsoft respectively, bringing together decades of experience in enterprise software.
                </p>
                <p style={{ lineHeight: '1.8', color: '#4a5568', fontSize: '1.1rem', marginTop: '1rem' }}>
                  Starting with just 3 engineers in a San Francisco garage, we've grown to a team of 150+ passionate 
                  individuals across 12 countries, all united by our mission to eliminate business friction through 
                  intelligent automation.
                </p>
              </div>
              <div style={{ background: '#f7fafc', padding: '2rem', borderRadius: '12px' }}>
                <h4 style={{ color: '#2d3748', marginBottom: '1rem' }}>Key Milestones 🎯</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '0.5rem' }}>🚀 2020: Founded with $2M seed funding</li>
                  <li style={{ marginBottom: '0.5rem' }}>📈 2021: Reached 1,000 customers</li>
                  <li style={{ marginBottom: '0.5rem' }}>💰 2022: Series A $15M raised</li>
                  <li style={{ marginBottom: '0.5rem' }}>🌍 2023: Expanded to Europe & Asia</li>
                  <li style={{ marginBottom: '0.5rem' }}>🏆 2024: Named "Best SaaS Platform" by TechCrunch</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technology Deep Dive */}
      <section className="section" style={{ background: '#f7fafc' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem', color: '#2d3748', fontSize: '2.5rem' }}>
            Technology & Architecture 🔧
          </h2>
          <div className="features">
            <motion.div 
              className="feature"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <h3>⚡ Lightning Infrastructure</h3>
              <p><strong>Powered by Kubernetes & Docker:</strong> Our microservices architecture runs on AWS with auto-scaling capabilities. We use Redis for caching, PostgreSQL for primary data, and Elasticsearch for search functionality.</p>
              <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
                <strong>Performance:</strong> 99.9% uptime, &lt;100ms response times globally
              </div>
            </motion.div>
            
            <motion.div 
              className="feature"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <h3>🤖 AI & Machine Learning</h3>
              <p><strong>Smart Automation Engine:</strong> Built with TensorFlow and PyTorch, our AI learns from your workflows to suggest optimizations. We process over 50 million data points daily to improve recommendations.</p>
              <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
                <strong>Models:</strong> Natural Language Processing, Predictive Analytics, Computer Vision
              </div>
            </motion.div>
            
            <motion.div 
              className="feature"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <h3>🔐 Enterprise Security</h3>
              <p><strong>Bank-Grade Protection:</strong> SOC 2 Type II compliant with end-to-end encryption. We use OAuth 2.0, SAML SSO, and have penetration testing quarterly by external security firms.</p>
              <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
                <strong>Certifications:</strong> ISO 27001, GDPR Compliant, HIPAA Ready
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem', color: '#2d3748', fontSize: '2.5rem' }}>
            Customer Success Stories 💼
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
            <motion.div 
              style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>Acme Corp - Fortune 500</h3>
              <p style={{ fontStyle: 'italic', color: '#666', marginBottom: '1rem' }}>
                "TechFlow reduced our manual processing time by 73% and saved us $2.3M annually."
              </p>
              <p style={{ lineHeight: '1.6', color: '#4a5568' }}>
                <strong>Challenge:</strong> Managing 50,000+ customer invoices manually<br/>
                <strong>Solution:</strong> Automated workflow with AI-powered categorization<br/>
                <strong>Result:</strong> 73% time reduction, 99.2% accuracy improvement
              </p>
              <div style={{ marginTop: '1rem', color: '#48bb78', fontWeight: 'bold' }}>
                ROI: 340% in first year
              </div>
            </motion.div>
            
            <motion.div 
              style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>TechStart Inc - Startup</h3>
              <p style={{ fontStyle: 'italic', color: '#666', marginBottom: '1rem' }}>
                "As a lean team, TechFlow gave us enterprise capabilities without enterprise costs."
              </p>
              <p style={{ lineHeight: '1.6', color: '#4a5568' }}>
                <strong>Challenge:</strong> Limited resources for operations automation<br/>
                <strong>Solution:</strong> Complete workflow digitization in 2 weeks<br/>
                <strong>Result:</strong> 5x faster customer onboarding, 60% cost savings
              </p>
              <div style={{ marginTop: '1rem', color: '#48bb78', fontWeight: 'bold' }}>
                Enabled 10x growth scaling
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="section" style={{ background: '#f7fafc' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem', color: '#2d3748', fontSize: '2.5rem' }}>
            Feature Deep Dive 🛠️
          </h2>
          <div style={{ display: 'grid', gap: '2rem' }}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px' }}>
              <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>Workflow Automation Studio</h3>
              <p style={{ lineHeight: '1.6', color: '#4a5568', marginBottom: '1rem' }}>
                Visual drag-and-drop interface for creating complex automation workflows. Connect over 1,000+ 
                applications including Salesforce, HubSpot, Slack, Microsoft 365, and Google Workspace.
              </p>
              <ul style={{ color: '#4a5568', lineHeight: '1.6' }}>
                <li>🎨 Visual workflow designer with 50+ pre-built templates</li>
                <li>🔗 Native integrations with popular business tools</li>
                <li>⚡ Real-time execution monitoring and debugging</li>
                <li>📊 Performance analytics and optimization suggestions</li>
              </ul>
            </div>
            
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px' }}>
              <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>Intelligent Document Processing</h3>
              <p style={{ lineHeight: '1.6', color: '#4a5568', marginBottom: '1rem' }}>
                AI-powered OCR and document understanding that can extract data from invoices, contracts, 
                forms, and emails with 99.2% accuracy across 40+ languages.
              </p>
              <ul style={{ color: '#4a5568', lineHeight: '1.6' }}>
                <li>📄 Support for PDFs, images, scanned documents</li>
                <li>🧠 Machine learning models trained on millions of documents</li>
                <li>🌍 Multi-language support with cultural context</li>
                <li>✅ Human-in-the-loop validation for critical processes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '2rem', color: '#2d3748' }}>Ready to Learn More?</h2>
          <p style={{ fontSize: '1.1rem', color: '#4a5568', marginBottom: '2rem' }}>
            Schedule a personalized demo with our solutions engineer to see TechFlow in action.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="cta-button">Schedule Demo</button>
            <button style={{ background: 'transparent', color: '#667eea', border: '2px solid #667eea', padding: '15px 30px', borderRadius: '8px', fontSize: '1.1rem', cursor: 'pointer' }}>
              Download Technical Whitepaper
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContentHeavyHomepage;
