import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// Import page variants
import DefaultHomepage from './components/DefaultHomepage';
import PricingFocusedHomepage from './components/PricingFocusedHomepage';
import ContentHeavyHomepage from './components/ContentHeavyHomepage';
import SimplifiedHomepage from './components/SimplifiedHomepage';
import AnalyticsPanel from './components/AnalyticsPanel';
import DemoControls from './components/DemoControls';

const VARIANTS = {
  default: DefaultHomepage,
  pricing_focused: PricingFocusedHomepage,
  content_heavy: ContentHeavyHomepage,
  simplified: SimplifiedHomepage
};

function App() {
  const [currentVariant, setCurrentVariant] = useState('default');
  const [optimization, setOptimization] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeUser();
  }, []);

  const initializeUser = async () => {
    try {
      // Track session start
      await axios.post('/api/track', {
        event: 'session_start',
        timestamp: new Date().toISOString()
      });

      // Get optimization recommendation
      await getOptimization();
    } catch (error) {
      console.error('Error initializing user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getOptimization = async () => {
    try {
      const response = await axios.get('/api/optimize');
      const optimizationData = response.data;
      
      setOptimization(optimizationData);
      
      // Apply optimization after a short delay for demo effect
      setTimeout(() => {
        if (optimizationData.variant !== 'default') {
          setCurrentVariant(optimizationData.variant);
        }
      }, 2000);
      
    } catch (error) {
      console.error('Error getting optimization:', error);
    }
  };

  const trackPageView = async (page, timeSpent = 30) => {
    try {
      await axios.post('/api/track', {
        event: 'page_view',
        page: page,
        time_spent: timeSpent,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  };

  const simulateUserBehavior = async (behavior) => {
    setIsLoading(true);
    
    try {
      if (behavior === 'pricing_interest') {
        // Simulate Sarah - pricing focused user
        await axios.post('/api/track', {
          event: 'session_start'
        });
        await trackPageView('home', 45);
        await trackPageView('pricing', 120);
        await trackPageView('pricing', 90);
        
      } else if (behavior === 'content_explorer') {
        // Simulate content-heavy user
        await axios.post('/api/track', {
          event: 'session_start'
        });
        await trackPageView('home', 60);
        await trackPageView('about', 180);
        await trackPageView('blog', 200);
        await trackPageView('features', 150);
        
      } else if (behavior === 'quick_browser') {
        // Simulate quick browser
        await axios.post('/api/track', {
          event: 'session_start'
        });
        await trackPageView('home', 15);
      }
      
      // Get new optimization
      await getOptimization();
      
    } catch (error) {
      console.error('Error simulating behavior:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const seedDemoData = async () => {
    try {
      await axios.post('/api/seed-demo-data');
      console.log('Demo data seeded');
    } catch (error) {
      console.error('Error seeding demo data:', error);
    }
  };

  const CurrentPageComponent = VARIANTS[currentVariant];

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        color: '#667eea'
      }}>
        🤖 AI analyzing your behavior...
      </div>
    );
  }

  return (
    <div className="App">
      <AnalyticsPanel 
        show={showAnalytics}
        optimization={optimization}
      />
      
      {optimization && optimization.variant !== 'default' && (
        <motion.div
          className="optimization-indicator"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          🎯 AI Optimized: {optimization.reason}
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentVariant}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <CurrentPageComponent 
            optimization={optimization}
            onPageView={trackPageView}
          />
        </motion.div>
      </AnimatePresence>

      <DemoControls
        onSimulateBehavior={simulateUserBehavior}
        onToggleAnalytics={() => setShowAnalytics(!showAnalytics)}
        onSeedDemo={seedDemoData}
        onReset={() => {
          setCurrentVariant('default');
          setOptimization(null);
        }}
      />
    </div>
  );
}

export default App;
