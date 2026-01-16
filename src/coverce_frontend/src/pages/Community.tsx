import { useState } from 'react';
import './Community.css';

interface LeaderboardEntry {
  rank: number;
  username: string;
  avatar: string;
  score: number;
  fragments?: number;
  validations?: number;
  videos?: number;
  taoEarned: number;
  badge?: string;
  trend?: 'up' | 'down' | 'same';
}

const Community = () => {
  const [activeTab, setActiveTab] = useState<'writers' | 'validators' | 'creators' | 'rising'>('writers');
  const [timeFilter, setTimeFilter] = useState<'today' | 'week' | 'month' | 'alltime'>('week');

  // Mock leaderboard data
  const topWriters: LeaderboardEntry[] = [
    { rank: 1, username: 'NeonDreamer', avatar: '✍️', score: 9.4, fragments: 127, taoEarned: 3450.5, badge: '👑', trend: 'up' },
    { rank: 2, username: 'QuantumQuill', avatar: '✍️', score: 9.2, fragments: 98, taoEarned: 2987.3, badge: '⭐', trend: 'same' },
    { rank: 3, username: 'StoryWeaver', avatar: '✍️', score: 9.1, fragments: 145, taoEarned: 3124.8, badge: '⭐', trend: 'up' },
    { rank: 4, username: 'PixelPoet', avatar: '✍️', score: 8.9, fragments: 89, taoEarned: 2456.2, trend: 'down' },
    { rank: 5, username: 'DataBard', avatar: '✍️', score: 8.8, fragments: 76, taoEarned: 2198.7, trend: 'up' },
  ];

  const topValidators: LeaderboardEntry[] = [
    { rank: 1, username: 'TruthSeeker', avatar: '✅', score: 96.8, validations: 2847, taoEarned: 4234.5, badge: '👑', trend: 'up' },
    { rank: 2, username: 'ConsensusKing', avatar: '✅', score: 95.2, validations: 3124, taoEarned: 3987.2, badge: '⭐', trend: 'same' },
    { rank: 3, username: 'QualityGuard', avatar: '✅', score: 94.7, validations: 2456, taoEarned: 3654.1, badge: '⭐', trend: 'up' },
    { rank: 4, username: 'ScoreKeeper', avatar: '✅', score: 93.9, validations: 1987, taoEarned: 2987.6, trend: 'up' },
    { rank: 5, username: 'ValidatorPro', avatar: '✅', score: 93.2, validations: 2234, taoEarned: 3124.3, trend: 'down' },
  ];

  const topCreators: LeaderboardEntry[] = [
    { rank: 1, username: 'AIVisionary', avatar: '🎨', score: 9.3, videos: 87, taoEarned: 5432.1, badge: '👑', trend: 'up' },
    { rank: 2, username: 'FrameMaster', avatar: '🎨', score: 9.1, videos: 65, taoEarned: 4876.5, badge: '⭐', trend: 'up' },
    { rank: 3, username: 'VisualWizard', avatar: '🎨', score: 8.9, videos: 72, taoEarned: 4234.8, badge: '⭐', trend: 'same' },
    { rank: 4, username: 'CineAI', avatar: '🎨', score: 8.7, videos: 54, taoEarned: 3765.2, trend: 'up' },
    { rank: 5, username: 'PixelCraft', avatar: '🎨', score: 8.6, videos: 61, taoEarned: 3456.7, trend: 'down' },
  ];

  const risingStars: LeaderboardEntry[] = [
    { rank: 1, username: 'NewWave2024', avatar: '🌟', score: 9.1, fragments: 23, taoEarned: 567.8, badge: '🆕', trend: 'up' },
    { rank: 2, username: 'FreshMind', avatar: '🌟', score: 8.9, fragments: 18, taoEarned: 432.5, badge: '🆕', trend: 'up' },
    { rank: 3, username: 'EmergingTalent', avatar: '🌟', score: 8.7, fragments: 27, taoEarned: 623.1, badge: '🆕', trend: 'up' },
    { rank: 4, username: 'RookieGenius', avatar: '🌟', score: 8.6, fragments: 15, taoEarned: 389.4, badge: '🆕', trend: 'up' },
    { rank: 5, username: 'StarInMaking', avatar: '🌟', score: 8.5, fragments: 21, taoEarned: 498.6, badge: '🆕', trend: 'up' },
  ];

  const getCurrentLeaderboard = () => {
    switch (activeTab) {
      case 'writers':
        return topWriters;
      case 'validators':
        return topValidators;
      case 'creators':
        return topCreators;
      case 'rising':
        return risingStars;
      default:
        return topWriters;
    }
  };

  // Mock activity feed
  const activityFeed = [
    { id: 1, user: '@alex', action: 'published a fragment in', target: 'Neon Dreams', icon: '✍️', time: '2m ago' },
    { id: 2, user: '@sarah', action: 'video reached', target: '100K views!', icon: '🎬', time: '15m ago' },
    { id: 3, user: 'Story', action: 'Memory Thieves completed', target: 'episode 5', icon: '📺', time: '1h ago' },
    { id: 4, user: '@techwriter', action: 'earned the', target: 'Consistency Master badge', icon: '🏆', time: '2h ago' },
    { id: 5, user: '@validator42', action: 'reached', target: '1,000 validations', icon: '✅', time: '3h ago' },
    { id: 6, user: '@creator99', action: 'uploaded video for', target: 'The Last Library', icon: '🎨', time: '4h ago' },
  ];

  return (
    <div className="community">
      <div className="community-container">
        <div className="community-header">
          <h1>🏆 Community Hub</h1>
          <p className="subtitle">Discover the best creators, validators, and rising stars in VividVerse</p>
        </div>

        {/* Leaderboards Section */}
        <div className="leaderboards-section">
          <div className="section-header">
            <h2>📊 Leaderboards</h2>
            <div className="time-filters">
              {['today', 'week', 'month', 'alltime'].map((filter) => (
                <button
                  key={filter}
                  className={`time-filter ${timeFilter === filter ? 'active' : ''}`}
                  onClick={() => setTimeFilter(filter as typeof timeFilter)}
                >
                  {filter === 'today' && '📅 Today'}
                  {filter === 'week' && '📆 This Week'}
                  {filter === 'month' && '🗓️ This Month'}
                  {filter === 'alltime' && '⏰ All Time'}
                </button>
              ))}
            </div>
          </div>

          <div className="leaderboard-tabs">
            <button
              className={`tab-button ${activeTab === 'writers' ? 'active' : ''}`}
              onClick={() => setActiveTab('writers')}
            >
              ✍️ Top Writers
            </button>
            <button
              className={`tab-button ${activeTab === 'validators' ? 'active' : ''}`}
              onClick={() => setActiveTab('validators')}
            >
              ✅ Top Validators
            </button>
            <button
              className={`tab-button ${activeTab === 'creators' ? 'active' : ''}`}
              onClick={() => setActiveTab('creators')}
            >
              🎨 Top Video Creators
            </button>
            <button
              className={`tab-button ${activeTab === 'rising' ? 'active' : ''}`}
              onClick={() => setActiveTab('rising')}
            >
              🌟 Rising Stars
            </button>
          </div>

          <div className="leaderboard-content">
            <div className="leaderboard-table">
              <div className="table-header">
                <span className="col-rank">Rank</span>
                <span className="col-user">User</span>
                <span className="col-score">
                  {activeTab === 'validators' ? 'Accuracy' : 'Avg Score'}
                </span>
                <span className="col-count">
                  {activeTab === 'writers' && 'Fragments'}
                  {activeTab === 'validators' && 'Validations'}
                  {activeTab === 'creators' && 'Videos'}
                  {activeTab === 'rising' && 'Fragments'}
                </span>
                <span className="col-earnings">TAO Earned</span>
                <span className="col-trend">Trend</span>
              </div>

              {getCurrentLeaderboard().map((entry) => (
                <div key={entry.rank} className={`table-row rank-${entry.rank}`}>
                  <span className="col-rank">
                    {entry.rank <= 3 ? (
                      <span className="medal">
                        {entry.rank === 1 && '🥇'}
                        {entry.rank === 2 && '🥈'}
                        {entry.rank === 3 && '🥉'}
                      </span>
                    ) : (
                      `#${entry.rank}`
                    )}
                  </span>
                  <span className="col-user">
                    <span className="user-avatar">{entry.avatar}</span>
                    <span className="username">{entry.username}</span>
                    {entry.badge && <span className="user-badge">{entry.badge}</span>}
                  </span>
                  <span className="col-score">{entry.score}</span>
                  <span className="col-count">
                    {entry.fragments || entry.validations || entry.videos}
                  </span>
                  <span className="col-earnings">{entry.taoEarned.toLocaleString()} TAO</span>
                  <span className="col-trend">
                    {entry.trend === 'up' && <span className="trend-up">↑</span>}
                    {entry.trend === 'down' && <span className="trend-down">↓</span>}
                    {entry.trend === 'same' && <span className="trend-same">−</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Feed Section */}
        <div className="activity-section">
          <h2>📰 Activity Feed</h2>
          <p className="section-desc">Real-time platform activity</p>

          <div className="activity-feed">
            {activityFeed.map((activity) => (
              <div key={activity.id} className="activity-item">
                <span className="activity-icon">{activity.icon}</span>
                <div className="activity-content">
                  <span className="activity-user">{activity.user}</span>
                  <span className="activity-action">{activity.action}</span>
                  <span className="activity-target">{activity.target}</span>
                </div>
                <span className="activity-time">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hall of Fame */}
        <div className="hall-of-fame-section">
          <h2>🏛️ Hall of Fame</h2>
          <p className="section-desc">All-time greatest contributors</p>

          <div className="hall-of-fame-grid">
            <div className="fame-card">
              <div className="fame-icon">🏆</div>
              <div className="fame-title">Legend</div>
              <div className="fame-user">@QuantumQuill</div>
              <div className="fame-stat">10,000+ TAO Earned</div>
            </div>
            <div className="fame-card">
              <div className="fame-icon">💎</div>
              <div className="fame-title">Diamond Creator</div>
              <div className="fame-user">@AIVisionary</div>
              <div className="fame-stat">500+ Videos Created</div>
            </div>
            <div className="fame-card">
              <div className="fame-icon">⚡</div>
              <div className="fame-title">Elite Validator</div>
              <div className="fame-user">@TruthSeeker</div>
              <div className="fame-stat">98.5% Accuracy</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
