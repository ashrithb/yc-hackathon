import React from 'react';

const DemoControls = ({ 
  onSimulateBehavior, 
  onToggleAnalytics, 
  onSeedDemo, 
  onReset 
}) => {
  return (
    <div className="demo-controls">
      <h4>🎬 Demo Controls</h4>
      <div style={{ marginBottom: '10px' }}>
        <strong>Simulate User:</strong>
      </div>
      <button 
        className="demo-button"
        onClick={() => onSimulateBehavior('pricing_interest')}
      >
        📊 Sarah (Pricing Focused)
      </button>
      <button 
        className="demo-button"
        onClick={() => onSimulateBehavior('content_explorer')}
      >
        📚 Marcus (Content Explorer)
      </button>
      <button 
        className="demo-button"
        onClick={() => onSimulateBehavior('quick_browser')}
      >
        ⚡ Alex (Quick Browser)
      </button>
      
      <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #e2e8f0' }}>
        <button className="demo-button" onClick={onToggleAnalytics}>
          📈 Toggle Analytics
        </button>
        <button className="demo-button" onClick={onSeedDemo}>
          🌱 Seed Demo Data
        </button>
        <button 
          className="demo-button" 
          onClick={onReset}
          style={{ background: '#e53e3e' }}
        >
          🔄 Reset
        </button>
      </div>
      
      <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '10px' }}>
        Click a user type to simulate their behavior and watch the AI optimize the page!
      </div>
    </div>
  );
};

export default DemoControls;
