import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Settings.css';

const Settings = () => {
  const { isAuthenticated, user } = useAuth();
  const [activeSection, setActiveSection] = useState<'profile' | 'preferences' | 'notifications' | 'privacy' | 'creator'>('profile');

  // Mock settings state
  const [profileSettings, setProfileSettings] = useState({
    displayName: user?.name || 'Creative Miner',
    bio: 'Passionate storyteller and AI enthusiast',
    location: 'San Francisco, CA',
    website: 'https://example.com',
    twitter: '@username',
    discord: 'username#1234',
  });

  const [preferences, setPreferences] = useState({
    defaultView: 'list' as 'list' | 'grid',
    theme: 'dark' as 'dark' | 'light' | 'auto',
    language: 'en',
    autoPlayVideos: true,
    reduceMotion: false,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    emailFrequency: 'daily' as 'instant' | 'daily' | 'weekly' | 'off',
    pushNotifications: true,
    inAppNotifications: true,
    soundEffects: true,
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public' as 'public' | 'followers' | 'private',
    showEarnings: true,
    showStatistics: true,
    anonymousValidation: false,
  });

  const [creatorSettings, setCreatorSettings] = useState({
    defaultTags: ['Sci-Fi', 'Thriller'],
    defaultGenre: 'Sci-Fi',
    preferredAIModels: ['Runway Gen-3', 'Luma'],
    autoSubmitChallenges: false,
    dailyFragmentGoal: 3,
  });

  if (!isAuthenticated) {
    return (
      <div className="settings">
        <div className="auth-required">
          <h2>Authentication Required</h2>
          <p>Please login to access settings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="settings">
      <div className="settings-container">
        <div className="settings-header">
          <h1>⚙️ Settings</h1>
          <p className="subtitle">Customize your VividVerse experience</p>
        </div>

        <div className="settings-layout">
          {/* Settings Sidebar */}
          <div className="settings-sidebar">
            <button
              className={`settings-nav-item ${activeSection === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveSection('profile')}
            >
              👤 Profile
            </button>
            <button
              className={`settings-nav-item ${activeSection === 'preferences' ? 'active' : ''}`}
              onClick={() => setActiveSection('preferences')}
            >
              🎨 Preferences
            </button>
            <button
              className={`settings-nav-item ${activeSection === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveSection('notifications')}
            >
              🔔 Notifications
            </button>
            <button
              className={`settings-nav-item ${activeSection === 'privacy' ? 'active' : ''}`}
              onClick={() => setActiveSection('privacy')}
            >
              🔒 Privacy
            </button>
            <button
              className={`settings-nav-item ${activeSection === 'creator' ? 'active' : ''}`}
              onClick={() => setActiveSection('creator')}
            >
              ✍️ Creator Settings
            </button>
          </div>

          {/* Settings Content */}
          <div className="settings-content">
            {activeSection === 'profile' && (
              <div className="settings-section">
                <h2>Profile Settings</h2>
                <p className="section-desc">Manage your public profile information</p>

                <div className="settings-form">
                  <div className="form-group">
                    <label>Display Name</label>
                    <input
                      type="text"
                      value={profileSettings.displayName}
                      onChange={(e) => setProfileSettings({ ...profileSettings, displayName: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Bio</label>
                    <textarea
                      rows={4}
                      value={profileSettings.bio}
                      onChange={(e) => setProfileSettings({ ...profileSettings, bio: e.target.value })}
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      value={profileSettings.location}
                      onChange={(e) => setProfileSettings({ ...profileSettings, location: e.target.value })}
                      placeholder="City, Country"
                    />
                  </div>

                  <div className="form-group">
                    <label>Website</label>
                    <input
                      type="url"
                      value={profileSettings.website}
                      onChange={(e) => setProfileSettings({ ...profileSettings, website: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>

                  <div className="form-group">
                    <label>Twitter</label>
                    <input
                      type="text"
                      value={profileSettings.twitter}
                      onChange={(e) => setProfileSettings({ ...profileSettings, twitter: e.target.value })}
                      placeholder="@username"
                    />
                  </div>

                  <div className="form-group">
                    <label>Discord</label>
                    <input
                      type="text"
                      value={profileSettings.discord}
                      onChange={(e) => setProfileSettings({ ...profileSettings, discord: e.target.value })}
                      placeholder="username#1234"
                    />
                  </div>

                  <button className="btn btn-primary">Save Profile</button>
                </div>
              </div>
            )}

            {activeSection === 'preferences' && (
              <div className="settings-section">
                <h2>Preferences</h2>
                <p className="section-desc">Customize your viewing and interaction preferences</p>

                <div className="settings-form">
                  <div className="form-group">
                    <label>Default View</label>
                    <select
                      value={preferences.defaultView}
                      onChange={(e) => setPreferences({ ...preferences, defaultView: e.target.value as 'list' | 'grid' })}
                    >
                      <option value="list">List</option>
                      <option value="grid">Grid</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Theme</label>
                    <select
                      value={preferences.theme}
                      onChange={(e) => setPreferences({ ...preferences, theme: e.target.value as 'dark' | 'light' | 'auto' })}
                    >
                      <option value="dark">Dark</option>
                      <option value="light">Light</option>
                      <option value="auto">Auto (System)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Language</label>
                    <select
                      value={preferences.language}
                      onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="zh">中文</option>
                      <option value="ja">日本語</option>
                    </select>
                  </div>

                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={preferences.autoPlayVideos}
                        onChange={(e) => setPreferences({ ...preferences, autoPlayVideos: e.target.checked })}
                      />
                      Auto-play videos
                    </label>
                  </div>

                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={preferences.reduceMotion}
                        onChange={(e) => setPreferences({ ...preferences, reduceMotion: e.target.checked })}
                      />
                      Reduce motion (accessibility)
                    </label>
                  </div>

                  <button className="btn btn-primary">Save Preferences</button>
                </div>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="settings-section">
                <h2>Notifications</h2>
                <p className="section-desc">Control how you receive updates</p>

                <div className="settings-form">
                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={notificationSettings.emailNotifications}
                        onChange={(e) => setNotificationSettings({ ...notificationSettings, emailNotifications: e.target.checked })}
                      />
                      Email notifications
                    </label>
                  </div>

                  {notificationSettings.emailNotifications && (
                    <div className="form-group">
                      <label>Email frequency</label>
                      <select
                        value={notificationSettings.emailFrequency}
                        onChange={(e) => setNotificationSettings({ ...notificationSettings, emailFrequency: e.target.value as typeof notificationSettings.emailFrequency })}
                      >
                        <option value="instant">Instant</option>
                        <option value="daily">Daily digest</option>
                        <option value="weekly">Weekly digest</option>
                        <option value="off">Off</option>
                      </select>
                    </div>
                  )}

                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={notificationSettings.pushNotifications}
                        onChange={(e) => setNotificationSettings({ ...notificationSettings, pushNotifications: e.target.checked })}
                      />
                      Push notifications (browser/mobile)
                    </label>
                  </div>

                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={notificationSettings.inAppNotifications}
                        onChange={(e) => setNotificationSettings({ ...notificationSettings, inAppNotifications: e.target.checked })}
                      />
                      In-app notifications
                    </label>
                  </div>

                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={notificationSettings.soundEffects}
                        onChange={(e) => setNotificationSettings({ ...notificationSettings, soundEffects: e.target.checked })}
                      />
                      Sound effects
                    </label>
                  </div>

                  <button className="btn btn-primary">Save Notification Settings</button>
                </div>
              </div>
            )}

            {activeSection === 'privacy' && (
              <div className="settings-section">
                <h2>Privacy</h2>
                <p className="section-desc">Control your data and visibility</p>

                <div className="settings-form">
                  <div className="form-group">
                    <label>Profile visibility</label>
                    <select
                      value={privacySettings.profileVisibility}
                      onChange={(e) => setPrivacySettings({ ...privacySettings, profileVisibility: e.target.value as typeof privacySettings.profileVisibility })}
                    >
                      <option value="public">Public</option>
                      <option value="followers">Followers only</option>
                      <option value="private">Private</option>
                    </select>
                  </div>

                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={privacySettings.showEarnings}
                        onChange={(e) => setPrivacySettings({ ...privacySettings, showEarnings: e.target.checked })}
                      />
                      Show TAO earnings publicly
                    </label>
                  </div>

                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={privacySettings.showStatistics}
                        onChange={(e) => setPrivacySettings({ ...privacySettings, showStatistics: e.target.checked })}
                      />
                      Show fragment/validation counts
                    </label>
                  </div>

                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={privacySettings.anonymousValidation}
                        onChange={(e) => setPrivacySettings({ ...privacySettings, anonymousValidation: e.target.checked })}
                      />
                      Validate anonymously (hide username)
                    </label>
                  </div>

                  <button className="btn btn-primary">Save Privacy Settings</button>

                  <div className="danger-zone">
                    <h3>Danger Zone</h3>
                    <button className="btn btn-secondary">Export My Data</button>
                    <button className="btn btn-danger">Delete Account</button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'creator' && (
              <div className="settings-section">
                <h2>Creator Settings</h2>
                <p className="section-desc">Customize your content creation workflow</p>

                <div className="settings-form">
                  <div className="form-group">
                    <label>Default Genre</label>
                    <select
                      value={creatorSettings.defaultGenre}
                      onChange={(e) => setCreatorSettings({ ...creatorSettings, defaultGenre: e.target.value })}
                    >
                      <option value="Sci-Fi">Sci-Fi</option>
                      <option value="Fantasy">Fantasy</option>
                      <option value="Horror">Horror</option>
                      <option value="Romance">Romance</option>
                      <option value="Mystery">Mystery</option>
                      <option value="Thriller">Thriller</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Daily Fragment Goal</label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={creatorSettings.dailyFragmentGoal}
                      onChange={(e) => setCreatorSettings({ ...creatorSettings, dailyFragmentGoal: parseInt(e.target.value) })}
                    />
                  </div>

                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={creatorSettings.autoSubmitChallenges}
                        onChange={(e) => setCreatorSettings({ ...creatorSettings, autoSubmitChallenges: e.target.checked })}
                      />
                      Auto-submit to weekly challenges
                    </label>
                  </div>

                  <button className="btn btn-primary">Save Creator Settings</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
