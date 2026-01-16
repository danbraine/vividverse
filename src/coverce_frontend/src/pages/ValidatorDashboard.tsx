import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './ValidatorDashboard.css';

interface StoryFragment {
  id: string;
  content: string;
  author: string;
  authorName?: string;
  parentStoryId?: string;
  parentFragmentId?: string;
  viralScore: number;
  consensusScore: number;
  validatorCount: number;
  upvotes: number;
  createdAt: Date;
  tags: string[];
  prompt?: string;
  storyTitle?: string;
}

interface VideoSegment {
  id: string;
  fragmentId: string;
  fragmentContent: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  creatorId: string;
  creatorName: string;
  status: 'pending' | 'validating' | 'approved' | 'rejected';
  validationScore?: number;
  validatorCount: number;
  uploadedAt: Date;
  aiModel?: string;
  duration?: number;
  generationPrompt?: string;
}

const FRAGMENT_VALIDATION_CATEGORIES = [
  { key: 'creativity', label: 'Creativity & Originality', description: 'How unique and imaginative is this fragment?' },
  { key: 'narrative', label: 'Narrative Quality', description: 'Does it advance the story effectively?' },
  { key: 'visual', label: 'Visual Potential', description: 'Can AI generate compelling visuals from this?' },
  { key: 'coherence', label: 'Story Coherence', description: 'Does it fit well with the existing narrative?' },
  { key: 'engagement', label: 'Engagement', description: 'Is it compelling and interesting?' },
  { key: 'viral', label: 'Viral Potential', description: 'Could this become popular and shareable?' },
];

const VIDEO_VALIDATION_CATEGORIES = [
  { key: 'visualQuality', label: 'Visual Quality', description: 'Technical quality, resolution, clarity, and production value' },
  { key: 'scriptAdherence', label: 'Script Adherence', description: 'How well does it match the approved fragment?' },
  { key: 'cinematography', label: 'Cinematography', description: 'Composition, lighting, camera movement, and visual storytelling' },
  { key: 'aiExecution', label: 'AI Generation Quality', description: 'How well was the AI model utilized?' },
  { key: 'engagement', label: 'Engagement', description: 'Is it compelling and watchable?' },
  { key: 'consistency', label: 'Style Consistency', description: 'Does it match the overall story aesthetic?' },
];

const ValidatorDashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const [validationType, setValidationType] = useState<'fragments' | 'videos'>('fragments');
  const [fragments, setFragments] = useState<StoryFragment[]>([]);
  const [videos, setVideos] = useState<VideoSegment[]>([]);
  const [selectedFragment, setSelectedFragment] = useState<StoryFragment | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoSegment | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [filter, setFilter] = useState<'pending' | 'validated' | 'all'>('pending');

  useEffect(() => {
    if (isAuthenticated) {
      if (validationType === 'fragments') {
        loadFragments();
      } else {
        loadVideos();
      }
    }
  }, [isAuthenticated, filter, validationType]);

  const loadFragments = async () => {
    setLoading(true);
    try {
      // TODO: Load from API
      // Mock data for now - fragments waiting for validation
      const mockFragments: StoryFragment[] = [
        {
          id: 'frag_1',
          content: 'As the last starship drifted into the unknown, the captain realized the coordinates were not random—they were a message from the future, warning of what was to come.',
          author: 'miner_0x789',
          authorName: 'Jordan',
          parentStoryId: 'story1',
          storyTitle: 'The Memory Thief',
          viralScore: 0,
          consensusScore: 0,
          validatorCount: 0,
          upvotes: 0,
          createdAt: new Date(Date.now() - 3600000),
          tags: ['sci-fi', 'mystery'],
          prompt: 'A starship drifting through deep space, the captain looking at coordinates on a screen that glow with an ominous light.',
        },
        {
          id: 'frag_2',
          content: 'The emotion painter dipped her brush into the void between colors, and for the first time in history, someone felt something that had never been felt before.',
          author: 'miner_0xabc',
          authorName: 'Riley',
          parentStoryId: 'story3',
          storyTitle: 'The Emotion Painter',
          viralScore: 0,
          consensusScore: 0,
          validatorCount: 0,
          upvotes: 0,
          createdAt: new Date(Date.now() - 7200000),
          tags: ['fantasy', 'art'],
          prompt: 'An artist in a surreal studio, dipping a brush into a void that creates a new color never seen before.',
        },
        {
          id: 'frag_3',
          content: 'When the AI asked "Why do you fear me?" the silence that followed was more profound than any answer could have been.',
          author: 'miner_0xdef',
          authorName: 'Casey',
          parentStoryId: 'story5',
          storyTitle: 'The Conscious AI',
          viralScore: 0,
          consensusScore: 0,
          validatorCount: 0,
          upvotes: 0,
          createdAt: new Date(Date.now() - 1800000),
          tags: ['sci-fi', 'philosophy'],
          prompt: 'A minimalist room where a human and an AI consciousness meet, the AI appearing as ethereal light.',
        },
      ];

      setFragments(mockFragments);
    } catch (err) {
      console.error('Error loading fragments:', err);
      setError('Failed to load fragments');
    } finally {
      setLoading(false);
    }
  };

  const loadVideos = async () => {
    setLoading(true);
    try {
      // TODO: Load from API
      // Mock data for video segments waiting for validation
      const mockVideos: VideoSegment[] = [
        {
          id: 'vid_1',
          fragmentId: 'frag_101',
          fragmentContent: 'In a world where memories can be traded like currency, a young thief discovers she can steal the most valuable memories of all: the moments people wish they could forget.',
          videoUrl: 'https://example.com/video1.mp4',
          thumbnailUrl: 'https://example.com/thumb1.jpg',
          creatorId: 'creator_0x001',
          creatorName: 'VideoArtist_Alpha',
          status: 'validating',
          validationScore: 0,
          validatorCount: 0,
          uploadedAt: new Date(Date.now() - 86400000),
          aiModel: 'Runway Gen-3',
          duration: 45,
          generationPrompt: 'A dark, futuristic cityscape at night, neon lights reflecting off wet streets, a hooded figure moves through the crowd',
        },
        {
          id: 'vid_2',
          fragmentId: 'frag_102',
          fragmentContent: 'The librarian\'s hand trembled as she reached for the entry. The book pulsed with an otherworldly energy.',
          videoUrl: 'https://example.com/video2.mp4',
          thumbnailUrl: 'https://example.com/thumb2.jpg',
          creatorId: 'creator_0x002',
          creatorName: 'AIFilmMaker_Beta',
          status: 'validating',
          validationScore: 0,
          validatorCount: 0,
          uploadedAt: new Date(Date.now() - 43200000),
          aiModel: 'Luma Dream Machine',
          duration: 38,
          generationPrompt: 'Ancient library with floating books, mystical energy, woman reaching for a glowing book',
        },
      ];

      setVideos(mockVideos);
    } catch (err) {
      console.error('Error loading videos:', err);
      setError('Failed to load videos');
    } finally {
      setLoading(false);
    }
  };

  const handleScoreChange = (category: string, value: number) => {
    setScores({ ...scores, [category]: value });
  };

  const handleSubmitValidation = async () => {
    if (!selectedFragment && !selectedVideo) return;

    const categories = validationType === 'fragments' ? FRAGMENT_VALIDATION_CATEGORIES : VIDEO_VALIDATION_CATEGORIES;
    
    // Validate all scores are provided
    const missingScores = categories.filter(
      cat => !scores[cat.key] || scores[cat.key] < 1 || scores[cat.key] > 10
    );
    
    if (missingScores.length > 0) {
      setError('Please provide scores (1-10) for all categories');
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      // TODO: Submit to API
      console.log(`Submitting ${validationType} validation:`, {
        itemId: selectedFragment?.id || selectedVideo?.id,
        scores,
        comments,
        validator: user?.email,
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSuccess(true);
      setSelectedFragment(null);
      setSelectedVideo(null);
      setScores({});
      setComments('');
      
      // Remove validated item from list
      if (validationType === 'fragments') {
        setFragments(fragments.filter(f => f.id !== selectedFragment?.id));
      } else {
        setVideos(videos.filter(v => v.id !== selectedVideo?.id));
      }
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit validation');
    } finally {
      setSubmitting(false);
    }
  };

  const calculateAverageScore = () => {
    const values = Object.values(scores).filter(v => v > 0);
    if (values.length === 0) return 0;
    return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
  };

  if (!isAuthenticated) {
    return (
      <div className="validator-dashboard">
        <div className="auth-required">
          <h2>Authentication Required</h2>
          <p>Please login to access the validator dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="validator-dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h1>Validation Hub</h1>
            <p className="subtitle">
              {validationType === 'fragments' 
                ? 'Review and score story fragments to ensure quality and select the most optimal pieces for the creative flywheel'
                : 'Review and score AI-generated videos for visual quality, script adherence, and cinematography'}
            </p>
            <div className="validation-type-toggle">
              <button
                className={`toggle-btn ${validationType === 'fragments' ? 'active' : ''}`}
                onClick={() => {
                  setValidationType('fragments');
                  setSelectedFragment(null);
                  setSelectedVideo(null);
                  setScores({});
                }}
              >
                📝 Fragment Validation
              </button>
              <button
                className={`toggle-btn ${validationType === 'videos' ? 'active' : ''}`}
                onClick={() => {
                  setValidationType('videos');
                  setSelectedFragment(null);
                  setSelectedVideo(null);
                  setScores({});
                }}
              >
                🎬 Video Validation
              </button>
            </div>
          </div>
          <div className="validator-stats">
            <div className="stat-item">
              <span className="stat-value">{validationType === 'fragments' ? fragments.length : videos.length}</span>
              <span className="stat-label">Pending</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{user?.name || 'Validator'}</span>
              <span className="stat-label">You</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="alert alert-error">
            <span>⚠️</span> {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            <span>✅</span> Validation submitted successfully! Your scores will help determine which fragments advance.
          </div>
        )}

        <div className="dashboard-content">
          <div className="fragments-list">
            <div className="list-header">
              <h2>{validationType === 'fragments' ? 'Story Fragments Awaiting Validation' : 'AI Videos Awaiting Validation'}</h2>
              <div className="filter-tabs">
                <button
                  className={`filter-tab ${filter === 'pending' ? 'active' : ''}`}
                  onClick={() => setFilter('pending')}
                >
                  Pending ({validationType === 'fragments' ? fragments.length : videos.length})
                </button>
                <button
                  className={`filter-tab ${filter === 'validated' ? 'active' : ''}`}
                  onClick={() => setFilter('validated')}
                >
                  Validated
                </button>
              </div>
            </div>

            {loading ? (
              <div className="loading-state">Loading {validationType}...</div>
            ) : (validationType === 'fragments' ? fragments.length === 0 : videos.length === 0) ? (
              <div className="empty-state">
                <div className="empty-icon">✨</div>
                <h3>No {validationType} pending validation</h3>
                <p>All {validationType} have been reviewed. Check back soon for new submissions!</p>
              </div>
            ) : (
              <div className="fragment-cards">
                {validationType === 'fragments' ? fragments.map((fragment) => (
                  <div
                    key={fragment.id}
                    className={`fragment-card ${selectedFragment?.id === fragment.id ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedFragment(fragment);
                      setScores({});
                      setComments('');
                      setError(null);
                    }}
                  >
                    <div className="fragment-card-header">
                      <div className="fragment-author">
                        <span className="author-avatar">{fragment.authorName?.[0] || 'M'}</span>
                        <span className="author-name">{fragment.authorName || fragment.author}</span>
                      </div>
                      {fragment.storyTitle && (
                        <span className="story-badge">{fragment.storyTitle}</span>
                      )}
                    </div>
                    
                    <p className="fragment-content">{fragment.content}</p>
                    
                    {fragment.prompt && (
                      <div className="fragment-ai-prompt">
                        <span className="prompt-label">🎬 AI Prompt:</span>
                        <p>{fragment.prompt}</p>
                      </div>
                    )}
                    
                    <div className="fragment-meta">
                      <div className="fragment-tags">
                        {fragment.tags.map((tag) => (
                          <span key={tag} className="tag">{tag}</span>
                        ))}
                      </div>
                      <span className="fragment-time">
                        {new Date(fragment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                )) : videos.map((video) => (
                  <div
                    key={video.id}
                    className={`fragment-card video-card ${selectedVideo?.id === video.id ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedVideo(video);
                      setScores({});
                      setComments('');
                      setError(null);
                    }}
                  >
                    <div className="video-thumbnail-container">
                      {video.thumbnailUrl ? (
                        <img src={video.thumbnailUrl} alt="Video thumbnail" className="video-thumbnail" />
                      ) : (
                        <div className="placeholder-thumbnail">🎬</div>
                      )}
                      {video.duration && (
                        <div className="video-duration-badge">{video.duration}s</div>
                      )}
                    </div>
                    
                    <div className="fragment-card-header">
                      <div className="fragment-author">
                        <span className="author-avatar">{video.creatorName?.[0] || 'C'}</span>
                        <span className="author-name">{video.creatorName}</span>
                      </div>
                      <span className={`status-badge ${video.status}`}>{video.status}</span>
                    </div>
                    
                    <p className="fragment-content">{video.fragmentContent}</p>
                    
                    <div className="video-meta">
                      <span>🎨 {video.aiModel}</span>
                      {video.generationPrompt && (
                        <>
                          <span>•</span>
                          <span className="prompt-preview">{video.generationPrompt.slice(0, 40)}...</span>
                        </>
                      )}
                    </div>
                    
                    <div className="fragment-meta">
                      <span className="fragment-time">
                        {new Date(video.uploadedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {(selectedFragment || selectedVideo) && (
            <div className="validation-panel">
              <div className="panel-header">
                <h2>{selectedFragment ? 'Validate Fragment' : 'Validate Video'}</h2>
                <button
                  className="btn-close"
                  onClick={() => {
                    setSelectedFragment(null);
                    setSelectedVideo(null);
                    setScores({});
                    setComments('');
                  }}
                >
                  ×
                </button>
              </div>

              {selectedFragment && (
                <div className="fragment-preview">
                  <p className="preview-content">{selectedFragment.content}</p>
                  {selectedFragment.prompt && (
                    <div className="preview-prompt">
                      <strong>AI Prompt:</strong> {selectedFragment.prompt}
                    </div>
                  )}
                </div>
              )}

              {selectedVideo && (
                <div className="video-preview">
                  <div className="video-player-placeholder">
                    <p>🎬 Video Player</p>
                    <p className="video-url">{selectedVideo.videoUrl}</p>
                  </div>
                  <div className="video-details">
                    <p className="preview-content">{selectedVideo.fragmentContent}</p>
                    <div className="video-meta-info">
                      <div><strong>AI Model:</strong> {selectedVideo.aiModel}</div>
                      <div><strong>Duration:</strong> {selectedVideo.duration}s</div>
                      {selectedVideo.generationPrompt && (
                        <div className="preview-prompt">
                          <strong>Generation Prompt:</strong> {selectedVideo.generationPrompt}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="scoring-form">
                <div className="scoring-header">
                  <h3>Score This {selectedFragment ? 'Fragment' : 'Video'}</h3>
                  <div className="average-score">
                    Average: <span className="score-highlight">{calculateAverageScore()}/10</span>
                  </div>
                </div>

                {(selectedFragment ? FRAGMENT_VALIDATION_CATEGORIES : VIDEO_VALIDATION_CATEGORIES).map((category) => (
                  <div key={category.key} className="score-input">
                    <div className="score-label-row">
                      <label>
                        <span className="label-text">{category.label}</span>
                        <span className="label-desc">{category.description}</span>
                      </label>
                      <span className="score-value">
                        {scores[category.key] || 0}/10
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={scores[category.key] || 5}
                      onChange={(e) => handleScoreChange(category.key, parseInt(e.target.value))}
                      className="score-slider"
                    />
                    <div className="score-labels">
                      <span>Poor (1)</span>
                      <span>Excellent (10)</span>
                    </div>
                  </div>
                ))}

                <div className="comments-section">
                  <label htmlFor="comments">
                    Feedback & Comments <span className="optional">(Optional)</span>
                  </label>
                  <textarea
                    id="comments"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Provide constructive feedback on this fragment. What works well? What could be improved? How does it contribute to the story?"
                    rows={5}
                  />
                </div>

                <div className="validation-actions">
                  <button
                    onClick={() => {
                      setSelectedFragment(null);
                      setScores({});
                      setComments('');
                    }}
                    className="btn btn-secondary"
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitValidation}
                    className="btn btn-primary btn-submit"
                    disabled={submitting}
                  >
                    {submitting ? 'Submitting...' : `Submit Validation (${calculateAverageScore()}/10)`}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ValidatorDashboard;
