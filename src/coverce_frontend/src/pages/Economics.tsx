import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Economics.css';

const Economics = () => {
  const { isAuthenticated } = useAuth();
  const [rewardInputs, setRewardInputs] = useState({
    fragmentsPerWeek: 10,
    consensusScore: 8.5,
    validationsPerWeek: 25,
    videosPerMonth: 3,
  });

  // Mock network economics data
  const networkEconomics = {
    taoDistributed24h: 50000,
    taoDistributedAllTime: 12500000,
    activeMiners: 2847,
    activeValidators: 459,
    fragmentsToday: 1247,
    videosThisWeek: 142,
    avgConsensusScore: 7.8,
  };

  // Mock reward distribution
  const rewardDistribution = [
    { category: 'Miners', percentage: 50, tao: 25000 },
    { category: 'Validators', percentage: 35, tao: 17500 },
    { category: 'Video Creators', percentage: 15, tao: 7500 },
  ];

  // Mock personal economics
  const personalEconomics = {
    totalEarned: 1247.5,
    totalEarnedUSD: 62375,
    thisWeek: 142.3,
    weekChange: 12,
    avgPerFragment: 23.5,
    pendingValidation: 15.2,
    pendingFragments: 3,
  };

  // Mock market data
  const marketData = {
    taoPrice: 50.0,
    priceChange24h: 5.2,
    platformMarketCap: 625000000,
    validatorStakeRequired: 1000,
  };

  // Calculate estimated earnings
  const calculateEstimatedEarnings = () => {
    const fragmentEarnings = rewardInputs.fragmentsPerWeek * (rewardInputs.consensusScore / 10) * 23.5 * 4;
    const validationEarnings = rewardInputs.validationsPerWeek * 2.5 * 4;
    const videoEarnings = rewardInputs.videosPerMonth * 150;
    return fragmentEarnings + validationEarnings + videoEarnings;
  };

  const estimatedMonthly = calculateEstimatedEarnings();

  return (
    <div className="economics">
      <div className="economics-container">
        <div className="economics-header">
          <h1>💎 Economics Dashboard</h1>
          <p className="subtitle">Transparent view of platform tokenomics and your earnings</p>
        </div>

        {/* Network Economics */}
        <div className="economics-section">
          <h2>🌐 Network Economics</h2>
          <div className="network-stats-grid">
            <div className="stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-value">{networkEconomics.taoDistributed24h.toLocaleString()} TAO</div>
              <div className="stat-label">Distributed (24h)</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🏆</div>
              <div className="stat-value">{(networkEconomics.taoDistributedAllTime / 1000000).toFixed(1)}M TAO</div>
              <div className="stat-label">All-Time Distribution</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✍️</div>
              <div className="stat-value">{networkEconomics.activeMiners.toLocaleString()}</div>
              <div className="stat-label">Active Miners</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-value">{networkEconomics.activeValidators.toLocaleString()}</div>
              <div className="stat-label">Active Validators</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📝</div>
              <div className="stat-value">{networkEconomics.fragmentsToday.toLocaleString()}</div>
              <div className="stat-label">Fragments Today</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🎬</div>
              <div className="stat-value">{networkEconomics.videosThisWeek}</div>
              <div className="stat-label">Videos This Week</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-value">{networkEconomics.avgConsensusScore}</div>
              <div className="stat-label">Avg Consensus Score</div>
            </div>
          </div>
        </div>

        {/* Reward Distribution */}
        <div className="economics-section">
          <h2>📊 Reward Distribution</h2>
          <p className="section-desc">Live breakdown of TAO allocation</p>
          <div className="reward-distribution">
            <div className="distribution-chart">
              {rewardDistribution.map((item) => (
                <div
                  key={item.category}
                  className="distribution-segment"
                  style={{ width: `${item.percentage}%` }}
                  title={`${item.category}: ${item.percentage}%`}
                >
                  <span className="segment-label">{item.percentage}%</span>
                </div>
              ))}
            </div>
            <div className="distribution-legend">
              {rewardDistribution.map((item, idx) => (
                <div key={item.category} className="legend-item">
                  <div className={`legend-color color-${idx}`} />
                  <div className="legend-info">
                    <span className="legend-category">{item.category}</span>
                    <span className="legend-value">{item.tao.toLocaleString()} TAO ({item.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="reward-pool">
            <span>Reward Pool Status:</span>
            <span className="pool-amount">12,500 TAO available for distribution</span>
          </div>
        </div>

        {/* Personal Economics */}
        {isAuthenticated && (
          <div className="economics-section">
            <h2>💼 Personal Economics</h2>
            <div className="personal-stats">
              <div className="personal-card main-card">
                <div className="personal-label">Total Earned</div>
                <div className="personal-value">{personalEconomics.totalEarned.toLocaleString()} TAO</div>
                <div className="personal-usd">${personalEconomics.totalEarnedUSD.toLocaleString()} USD</div>
              </div>
              <div className="personal-card">
                <div className="personal-label">This Week</div>
                <div className="personal-value">+{personalEconomics.thisWeek} TAO</div>
                <div className="personal-change positive">↑ {personalEconomics.weekChange}% from last week</div>
              </div>
              <div className="personal-card">
                <div className="personal-label">Avg Per Fragment</div>
                <div className="personal-value">{personalEconomics.avgPerFragment} TAO</div>
              </div>
              <div className="personal-card">
                <div className="personal-label">Pending Validation</div>
                <div className="personal-value">{personalEconomics.pendingValidation} TAO</div>
                <div className="personal-meta">{personalEconomics.pendingFragments} fragments in queue</div>
              </div>
            </div>
          </div>
        )}

        {/* Reward Calculator */}
        <div className="economics-section">
          <h2>🧮 Reward Calculator</h2>
          <p className="section-desc">Estimate your potential earnings</p>
          <div className="calculator">
            <div className="calculator-inputs">
              <div className="input-group">
                <label>Fragments per week</label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={rewardInputs.fragmentsPerWeek}
                  onChange={(e) =>
                    setRewardInputs({ ...rewardInputs, fragmentsPerWeek: parseInt(e.target.value) })
                  }
                />
                <span className="input-value">{rewardInputs.fragmentsPerWeek}</span>
              </div>
              <div className="input-group">
                <label>Expected consensus score</label>
                <input
                  type="range"
                  min="5.0"
                  max="10.0"
                  step="0.1"
                  value={rewardInputs.consensusScore}
                  onChange={(e) =>
                    setRewardInputs({ ...rewardInputs, consensusScore: parseFloat(e.target.value) })
                  }
                />
                <span className="input-value">{rewardInputs.consensusScore.toFixed(1)}</span>
              </div>
              <div className="input-group">
                <label>Validations per week</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={rewardInputs.validationsPerWeek}
                  onChange={(e) =>
                    setRewardInputs({ ...rewardInputs, validationsPerWeek: parseInt(e.target.value) })
                  }
                />
                <span className="input-value">{rewardInputs.validationsPerWeek}</span>
              </div>
              <div className="input-group">
                <label>Videos per month</label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={rewardInputs.videosPerMonth}
                  onChange={(e) =>
                    setRewardInputs({ ...rewardInputs, videosPerMonth: parseInt(e.target.value) })
                  }
                />
                <span className="input-value">{rewardInputs.videosPerMonth}</span>
              </div>
            </div>
            <div className="calculator-output">
              <div className="output-label">Estimated Monthly Earnings</div>
              <div className="output-value">~{estimatedMonthly.toFixed(0)} TAO</div>
              <div className="output-usd">${(estimatedMonthly * marketData.taoPrice).toLocaleString()} USD</div>
              <div className="output-note">Top 10% earners make 500+ TAO/month</div>
            </div>
          </div>
        </div>

        {/* Market Data */}
        <div className="economics-section">
          <h2>📈 Market Data</h2>
          <div className="market-grid">
            <div className="market-card">
              <div className="market-label">TAO Price</div>
              <div className="market-value">${marketData.taoPrice.toFixed(2)}</div>
              <div className={`market-change ${marketData.priceChange24h > 0 ? 'positive' : 'negative'}`}>
                {marketData.priceChange24h > 0 ? '↑' : '↓'} {Math.abs(marketData.priceChange24h)}% (24h)
              </div>
            </div>
            <div className="market-card">
              <div className="market-label">Platform Market Cap</div>
              <div className="market-value">${(marketData.platformMarketCap / 1000000).toFixed(1)}M</div>
            </div>
            <div className="market-card">
              <div className="market-label">Validator Stake Required</div>
              <div className="market-value">{marketData.validatorStakeRequired.toLocaleString()} TAO</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Economics;
