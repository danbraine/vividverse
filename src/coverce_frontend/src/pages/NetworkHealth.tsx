import './NetworkHealth.css';

const NetworkHealth = () => {
  // Mock live statistics
  const liveStats = {
    activeUsersNow: 3247,
    fragmentsToday: 1247,
    fragmentsYesterday: 1153,
    validationsToday: 8392,
    videosThisWeek: 142,
    storiesThisMonth: 67,
    taoDistributed24h: 12450,
  };

  // Mock network milestones
  const milestones = [
    { id: 1, icon: '🎉', title: '10,000th fragment submitted!', date: '2 days ago', achieved: true },
    { id: 2, icon: '🎬', title: '1,000th video approved!', date: '5 days ago', achieved: true },
    { id: 3, icon: '👥', title: '5,000 users joined!', date: '1 week ago', achieved: true },
    { id: 4, icon: '💎', title: '1M TAO distributed!', date: '2 weeks ago', achieved: true },
  ];

  // Mock upcoming milestones
  const upcomingMilestones = [
    { id: 1, title: '15,000 fragments', current: 10247, target: 15000, progress: 68 },
    { id: 2, title: '10,000 users', current: 5234, target: 10000, progress: 52 },
    { id: 3, title: '2,000 videos', current: 1142, target: 2000, progress: 57 },
  ];

  // Mock health metrics
  const healthMetrics = {
    validatorParticipation: 87,
    avgValidationTime: 4.2,
    approvalRate: 23,
    videoCompletionRate: 67,
    platformUptime: 99.97,
  };

  // Mock submissions over time (last 7 days)
  const submissionsData = [
    { day: 'Mon', count: 1050 },
    { day: 'Tue', count: 1180 },
    { day: 'Wed', count: 1320 },
    { day: 'Thu', count: 1150 },
    { day: 'Fri', count: 1420 },
    { day: 'Sat', count: 980 },
    { day: 'Sun', count: 1247 },
  ];

  const maxSubmissions = Math.max(...submissionsData.map((d) => d.count));

  return (
    <div className="network-health">
      <div className="network-health-container">
        <div className="network-health-header">
          <h1>🌐 Network Health Dashboard</h1>
          <p className="subtitle">Real-time platform analytics and performance metrics</p>
        </div>

        {/* Live Statistics */}
        <div className="health-section">
          <h2>📊 Live Statistics</h2>
          <div className="live-stats-grid">
            <div className="live-stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-value">{liveStats.activeUsersNow.toLocaleString()}</div>
              <div className="stat-label">Active Users Now</div>
              <div className="stat-pulse">●</div>
            </div>
            <div className="live-stat-card">
              <div className="stat-icon">📝</div>
              <div className="stat-value">{liveStats.fragmentsToday.toLocaleString()}</div>
              <div className="stat-label">Fragments Today</div>
              <div className="stat-change positive">
                ↑ {Math.round(((liveStats.fragmentsToday - liveStats.fragmentsYesterday) / liveStats.fragmentsYesterday) * 100)}% vs. yesterday
              </div>
            </div>
            <div className="live-stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-value">{liveStats.validationsToday.toLocaleString()}</div>
              <div className="stat-label">Validations Today</div>
            </div>
            <div className="live-stat-card">
              <div className="stat-icon">🎬</div>
              <div className="stat-value">{liveStats.videosThisWeek}</div>
              <div className="stat-label">Videos This Week</div>
            </div>
            <div className="live-stat-card">
              <div className="stat-icon">📺</div>
              <div className="stat-value">{liveStats.storiesThisMonth}</div>
              <div className="stat-label">Stories This Month</div>
            </div>
            <div className="live-stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-value">{liveStats.taoDistributed24h.toLocaleString()}</div>
              <div className="stat-label">TAO Distributed (24h)</div>
            </div>
          </div>
        </div>

        {/* Submissions Over Time */}
        <div className="health-section">
          <h2>📈 Submissions Over Time</h2>
          <p className="section-desc">Daily fragment submissions (last 7 days)</p>
          <div className="submissions-chart">
            {submissionsData.map((data) => (
              <div key={data.day} className="chart-bar-container">
                <div
                  className="chart-bar"
                  style={{ height: `${(data.count / maxSubmissions) * 100}%` }}
                >
                  <span className="bar-value">{data.count}</span>
                </div>
                <span className="bar-label">{data.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Health Metrics */}
        <div className="health-section">
          <h2>💚 Health Metrics</h2>
          <div className="health-metrics-grid">
            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-label">Validator Participation</span>
                <span className={`metric-status ${healthMetrics.validatorParticipation > 80 ? 'healthy' : 'warning'}`}>
                  {healthMetrics.validatorParticipation > 80 ? '✓ Healthy' : '⚠ Warning'}
                </span>
              </div>
              <div className="metric-value">{healthMetrics.validatorParticipation}%</div>
              <div className="metric-bar">
                <div
                  className="metric-bar-fill healthy"
                  style={{ width: `${healthMetrics.validatorParticipation}%` }}
                />
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-label">Avg Validation Time</span>
                <span className="metric-status healthy">✓ Healthy</span>
              </div>
              <div className="metric-value">{healthMetrics.avgValidationTime} min</div>
              <div className="metric-note">Target: &lt; 5 minutes</div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-label">Approval Rate</span>
                <span className="metric-status healthy">✓ Healthy</span>
              </div>
              <div className="metric-value">{healthMetrics.approvalRate}%</div>
              <div className="metric-note">Quality threshold working</div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-label">Video Completion Rate</span>
                <span className="metric-status healthy">✓ Healthy</span>
              </div>
              <div className="metric-value">{healthMetrics.videoCompletionRate}%</div>
              <div className="metric-bar">
                <div
                  className="metric-bar-fill healthy"
                  style={{ width: `${healthMetrics.videoCompletionRate}%` }}
                />
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-label">Platform Uptime</span>
                <span className="metric-status healthy">✓ Excellent</span>
              </div>
              <div className="metric-value">{healthMetrics.platformUptime}%</div>
              <div className="metric-note">Last 30 days</div>
            </div>
          </div>
        </div>

        {/* Network Milestones */}
        <div className="health-section">
          <h2>🏆 Network Milestones</h2>
          <p className="section-desc">Recent achievements</p>
          <div className="milestones-list">
            {milestones.map((milestone) => (
              <div key={milestone.id} className="milestone-item achieved">
                <div className="milestone-icon">{milestone.icon}</div>
                <div className="milestone-content">
                  <div className="milestone-title">{milestone.title}</div>
                  <div className="milestone-date">{milestone.date}</div>
                </div>
                <div className="milestone-badge">✓</div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Milestones */}
        <div className="health-section">
          <h2>🎯 Upcoming Milestones</h2>
          <p className="section-desc">Progress towards next achievements</p>
          <div className="upcoming-milestones">
            {upcomingMilestones.map((milestone) => (
              <div key={milestone.id} className="upcoming-milestone-card">
                <div className="upcoming-milestone-header">
                  <span className="upcoming-milestone-title">{milestone.title}</span>
                  <span className="upcoming-milestone-progress">{milestone.progress}%</span>
                </div>
                <div className="upcoming-milestone-bar">
                  <div
                    className="upcoming-milestone-fill"
                    style={{ width: `${milestone.progress}%` }}
                  />
                </div>
                <div className="upcoming-milestone-counts">
                  {milestone.current.toLocaleString()} / {milestone.target.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkHealth;
