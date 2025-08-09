import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AnalyticsPanel = ({ show, optimization }) => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    if (show) {
      fetchAnalytics();
    }
  }, [show]);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get('/api/analytics');
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  if (!show || !analytics) {
    return null;
  }

  return (
    <div className="analytics-panel">
      <div>
        <strong>👥 Users:</strong> {analytics.total_users}
      </div>
      <div>
        <strong>🎯 Optimizations:</strong> {analytics.optimizations_applied}
      </div>
      <div>
        <strong>📈 Success Rate:</strong> {Math.round(analytics.optimization_rate * 100)}%
      </div>
      <div>
        <strong>⚡ Engagement Lift:</strong> {analytics.improvement_metrics.avg_engagement_lift}
      </div>
      <div>
        <strong>🔍 Current:</strong> {optimization ? optimization.variant : 'default'}
      </div>
    </div>
  );
};

export default AnalyticsPanel;
