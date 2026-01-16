import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Analytics.css';

interface CategoryScore {
  category: string;
  score: number;
}

const Analytics = () => {
  const { isAuthenticated, user } = useAuth();
  const [viewType, setViewType] = useState<'creator' | 'validator'>('creator');

  // Mock data for creator analytics
  const creatorData = {
    performanceTrends: [
      { date: '2024-01-01', score: 7.5 },
      { date: '2024-01-08', score: 8.2 },
      { date: '2024-01-15', score: 8.7 },
      { date: '2024-01-22', score: 9.1 },
      { date: '2024-01-29', score: 8.9 },
    ],
    categoryScores: [
      { category: 'Creativity', score: 9.2 },
      { category: 'Narrative', score: 8.7 },
      { category: 'Visual', score: 9.5 },
      { category: 'Coherence', score: 8.4 },
      { category: 'Engagement', score: 9.1 },
      { category: 'Viral', score: 8.8 },
    ],
    viralMetrics: [
      { fragmentId: '#1847', title: 'Memory Thief Discovery', views: 45200, continuations: 23, videos: 3 },
      { fragmentId: '#1923', title: 'Neon Dreams Opening', views: 38100, continuations: 18, videos: 2 },
      { fragmentId: '#2041', title: 'The Last Library', views: 29800, continuations: 15, videos: 2 },
    ],
    earningsBreakdown: [
      { category: 'High Consensus (9.0+)', tao: 450.5, percentage: 65 },
      { category: 'Good Consensus (8.0-8.9)', tao: 187.2, percentage: 27 },
      { category: 'Viral Bonuses', tao: 56.8, percentage: 8 },
    ],
    benchmarks: {
      rank: '12%',
      totalCreators: 2847,
      avgConsensus: 8.7,
      topPercentile: 'Top 15%',
    },
  };

  // Mock data for validator analytics
  const validatorData = {
    accuracyByCategory: [
      { category: 'Creativity', accuracy: 94.2 },
      { category: 'Narrative', accuracy: 96.1 },
      { category: 'Visual', accuracy: 92.8 },
      { category: 'Coherence', accuracy: 95.5 },
      { category: 'Engagement', accuracy: 93.7 },
      { category: 'Viral', accuracy: 91.4 },
    ],
    consensusAlignment: 94.2,
    validationsPerWeek: [
      { week: 'Week 1', count: 45 },
      { week: 'Week 2', count: 52 },
      { week: 'Week 3', count: 61 },
      { week: 'Week 4', count: 58 },
    ],
    expertiseCategories: [
      { category: 'Narrative Quality', accuracy: 96.1, count: 234 },
      { category: 'Visual Potential', accuracy: 95.8, count: 198 },
      { category: 'Engagement', accuracy: 94.9, count: 267 },
    ],
    earnings: {
      accuracyRewards: 342.5,
      volumeBonus: 78.3,
      reputationMultiplier: 1.25,
      totalEarned: 525.3,
    },
    optimization: {
      currentDaily: 15,
      bonusThreshold: 20,
      remaining: 5,
      message: 'Validate 5 more fragments to hit daily bonus (+10 TAO)',
    },
  };

  if (!isAuthenticated) {
    return (
      <div className="analytics">
        <div className="auth-required">
          <h2>Authentication Required</h2>
          <p>Please login to view your analytics dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics">
      <div className="analytics-container">
        <div className="analytics-header">
          <div>
            <h1>📊 Analytics Dashboard</h1>
            <p className="subtitle">Deep insights into your performance and earnings</p>
          </div>
          <div className="view-toggle">
            <button
              className={`toggle-btn ${viewType === 'creator' ? 'active' : ''}`}
              onClick={() => setViewType('creator')}
            >
              ✍️ Creator Analytics
            </button>
            <button
              className={`toggle-btn ${viewType === 'validator' ? 'active' : ''}`}
              onClick={() => setViewType('validator')}
            >
              ✅ Validator Analytics
            </button>
          </div>
        </div>

        {viewType === 'creator' ? (
          <div className="creator-analytics">
            {/* Performance Trends */}
            <div className="analytics-section">
              <h2>📈 Performance Trends</h2>
              <p className="section-desc">Your consensus scores over time</p>
              <div className="chart-container">
                <div className="line-chart">
                  {creatorData.performanceTrends.map((point, idx) => (
                    <div key={idx} className="chart-point">
                      <div className="chart-bar" style={{ height: `${point.score * 10}%` }}>
                        <span className="chart-value">{point.score}</span>
                      </div>
                      <span className="chart-label">{new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="analytics-section">
              <h2>🎯 Category Breakdown</h2>
              <p className="section-desc">Your strengths across validation categories</p>
              <div className="radar-chart-container">
                <div className="category-bars">
                  {creatorData.categoryScores.map((cat) => (
                    <div key={cat.category} className="category-bar-item">
                      <div className="category-info">
                        <span className="category-name">{cat.category}</span>
                        <span className="category-score">{cat.score}/10</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${cat.score * 10}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Viral Metrics */}
            <div className="analytics-section">
              <h2>🔥 Viral Metrics</h2>
              <p className="section-desc">Your most successful fragments</p>
              <div className="viral-table">
                {creatorData.viralMetrics.map((metric) => (
                  <div key={metric.fragmentId} className="viral-row">
                    <div className="viral-id">{metric.fragmentId}</div>
                    <div className="viral-title">{metric.title}</div>
                    <div className="viral-stats">
                      <span>👁️ {metric.views.toLocaleString()} views</span>
                      <span>🔗 {metric.continuations} continues</span>
                      <span>🎬 {metric.videos} videos</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Earnings Analysis */}
            <div className="analytics-section">
              <h2>💰 Earnings Analysis</h2>
              <p className="section-desc">TAO earned by performance category</p>
              <div className="earnings-breakdown">
                {creatorData.earningsBreakdown.map((item) => (
                  <div key={item.category} className="earnings-item">
                    <div className="earnings-header">
                      <span className="earnings-category">{item.category}</span>
                      <span className="earnings-amount">{item.tao} TAO</span>
                    </div>
                    <div className="earnings-bar">
                      <div className="earnings-fill" style={{ width: `${item.percentage}%` }} />
                    </div>
                    <span className="earnings-percentage">{item.percentage}%</span>
                  </div>
                ))}
              </div>
              <div className="total-earnings">
                Total Earnings: <span className="earnings-total">{creatorData.earningsBreakdown.reduce((sum, item) => sum + item.tao, 0).toFixed(1)} TAO</span>
              </div>
            </div>

            {/* Comparative Benchmarks */}
            <div className="analytics-section">
              <h2>📊 Comparative Benchmarks</h2>
              <p className="section-desc">How you compare to the network</p>
              <div className="benchmarks-grid">
                <div className="benchmark-card">
                  <div className="benchmark-value">{creatorData.benchmarks.topPercentile}</div>
                  <div className="benchmark-label">Network Ranking</div>
                </div>
                <div className="benchmark-card">
                  <div className="benchmark-value">{creatorData.benchmarks.avgConsensus}</div>
                  <div className="benchmark-label">Avg Consensus Score</div>
                </div>
                <div className="benchmark-card">
                  <div className="benchmark-value">#{Math.floor(2847 * 0.12)}</div>
                  <div className="benchmark-label">of {creatorData.benchmarks.totalCreators} Creators</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="validator-analytics">
            {/* Accuracy Heatmap */}
            <div className="analytics-section">
              <h2>🎯 Accuracy by Category</h2>
              <p className="section-desc">Your scoring accuracy across validation dimensions</p>
              <div className="accuracy-grid">
                {validatorData.accuracyByCategory.map((cat) => (
                  <div key={cat.category} className="accuracy-item">
                    <div className="accuracy-category">{cat.category}</div>
                    <div className="accuracy-bar">
                      <div
                        className="accuracy-fill"
                        style={{
                          width: `${cat.accuracy}%`,
                          backgroundColor: cat.accuracy > 95 ? '#4ade80' : cat.accuracy > 90 ? '#fbbf24' : '#f87171',
                        }}
                      />
                    </div>
                    <div className="accuracy-value">{cat.accuracy}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Consensus Alignment */}
            <div className="analytics-section">
              <h2>🤝 Consensus Alignment</h2>
              <p className="section-desc">How often your scores match network consensus</p>
              <div className="consensus-circle">
                <svg viewBox="0 0 200 200" className="circular-progress">
                  <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(102, 126, 234, 0.2)" strokeWidth="20" />
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#667eea"
                    strokeWidth="20"
                    strokeDasharray={`${2 * Math.PI * 80}`}
                    strokeDashoffset={`${2 * Math.PI * 80 * (1 - validatorData.consensusAlignment / 100)}`}
                    transform="rotate(-90 100 100)"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="consensus-text">
                  <div className="consensus-percentage">{validatorData.consensusAlignment}%</div>
                  <div className="consensus-label">Alignment</div>
                </div>
              </div>
            </div>

            {/* Validation Velocity */}
            <div className="analytics-section">
              <h2>⚡ Validation Velocity</h2>
              <p className="section-desc">Fragments validated per week</p>
              <div className="velocity-chart">
                {validatorData.validationsPerWeek.map((week, idx) => (
                  <div key={idx} className="velocity-bar">
                    <div className="velocity-fill" style={{ height: `${(week.count / 70) * 100}%` }}>
                      <span className="velocity-count">{week.count}</span>
                    </div>
                    <span className="velocity-label">{week.week}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Expertise */}
            <div className="analytics-section">
              <h2>🏆 Category Expertise</h2>
              <p className="section-desc">Categories where you excel</p>
              <div className="expertise-list">
                {validatorData.expertiseCategories.map((cat, idx) => (
                  <div key={idx} className="expertise-item">
                    <div className="expertise-rank">#{idx + 1}</div>
                    <div className="expertise-details">
                      <div className="expertise-name">{cat.category}</div>
                      <div className="expertise-meta">
                        <span>{cat.accuracy}% accuracy</span>
                        <span>•</span>
                        <span>{cat.count} validations</span>
                      </div>
                    </div>
                    <div className="expertise-badge">Expert</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Earnings Optimization */}
            <div className="analytics-section">
              <h2>💎 Earnings Optimization</h2>
              <p className="section-desc">Maximize your TAO rewards</p>
              <div className="optimization-card">
                <div className="optimization-message">{validatorData.optimization.message}</div>
                <div className="optimization-progress">
                  <div className="optimization-bar">
                    <div
                      className="optimization-fill"
                      style={{ width: `${(validatorData.optimization.currentDaily / validatorData.optimization.bonusThreshold) * 100}%` }}
                    />
                  </div>
                  <div className="optimization-counts">
                    <span>{validatorData.optimization.currentDaily}/{validatorData.optimization.bonusThreshold} today</span>
                  </div>
                </div>
              </div>
              <div className="earnings-summary">
                <div className="earnings-sum-item">
                  <span>Accuracy Rewards</span>
                  <span>{validatorData.earnings.accuracyRewards} TAO</span>
                </div>
                <div className="earnings-sum-item">
                  <span>Volume Bonus</span>
                  <span>{validatorData.earnings.volumeBonus} TAO</span>
                </div>
                <div className="earnings-sum-item">
                  <span>Reputation Multiplier</span>
                  <span>×{validatorData.earnings.reputationMultiplier}</span>
                </div>
                <div className="earnings-sum-item total">
                  <span>Total Earned</span>
                  <span>{validatorData.earnings.totalEarned} TAO</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
