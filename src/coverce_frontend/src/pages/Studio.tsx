import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Studio.css';

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
  prompt?: string; // AI prompt generated from this fragment
}

interface Story {
  id: string;
  title: string;
  description: string;
  excerpt: string; // Featured excerpt shown at top
  rootFragmentId: string;
  fragmentCount: number;
  contributorCount: number;
  status: 'building' | 'generating' | 'complete' | 'archived';
  viralScore: number;
  createdAt: Date;
  currentPrompt?: string; // Current prompt for next fragment
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
}

const Studio = () => {
  const { isAuthenticated, login, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'explore' | 'create' | 'videos' | 'my-workspace'>('explore');
  const [trendingFragments, setTrendingFragments] = useState<StoryFragment[]>([]);
  const [activeStories, setActiveStories] = useState<Story[]>([]);
  const [featuredStory, setFeaturedStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(false);
  const [writingMode, setWritingMode] = useState(false);
  const [newFragment, setNewFragment] = useState('');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [selectedParentFragment, setSelectedParentFragment] = useState<StoryFragment | null>(null);
  const [zenMode, setZenMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fragmentView, setFragmentView] = useState<'list' | 'gallery'>('list');
  const [approvedFragments, setApprovedFragments] = useState<StoryFragment[]>([]);
  const [videoSegments, setVideoSegments] = useState<VideoSegment[]>([]);
  const [selectedFragmentForVideo, setSelectedFragmentForVideo] = useState<StoryFragment | null>(null);
  const [uploadingVideo, setUploadingVideo] = useState(false);


  const loadContent = async () => {
    setLoading(true);
    try {
      // TODO: Load from API
      // Mock data for now
      const mockStory: Story = {
        id: 'story1',
        title: 'The Memory Thief',
        description: 'A collaborative story about memory trading in a dystopian future',
        excerpt: 'In a world where memories can be traded like currency, a young thief discovers she can steal the most valuable memories of all: the moments people wish they could forget. But when she accidentally takes a memory that reveals a conspiracy threatening to destroy the memory market itself, she must decide whether to return it or use it to change everything.',
        rootFragmentId: '1',
        fragmentCount: 15,
        contributorCount: 8,
        status: 'building',
        viralScore: 92,
        createdAt: new Date(),
        currentPrompt: 'Continue the story: The thief has just discovered the conspiracy. What happens next? Show her internal conflict and the first step she takes.',
      };

      setFeaturedStory(mockStory);
      setActiveStories([
        mockStory,
        {
          id: 'story2',
          title: 'The Library of Final Words',
          description: 'A mystical journey through time and words',
          excerpt: 'The last library on Earth holds not books, but the final words of every person who ever lived. When a librarian reads the wrong entry, she must rewrite history itself before the words fade forever.',
          rootFragmentId: '2',
          fragmentCount: 12,
          contributorCount: 6,
          status: 'building',
          viralScore: 85,
          createdAt: new Date(),
          currentPrompt: 'The librarian has found the entry. What does it say? How does it change everything she thought she knew?',
        },
        {
          id: 'story3',
          title: 'The Emotion Painter',
          description: 'An artist discovers a new feeling',
          excerpt: 'Every emotion has a color, and in this world, artists can paint with feelings. But when a painter discovers a new emotion—one that has never been felt before—the entire spectrum of human experience begins to shift.',
          rootFragmentId: '3',
          fragmentCount: 18,
          contributorCount: 10,
          status: 'generating',
          viralScore: 94,
          createdAt: new Date(),
          currentPrompt: 'The new emotion spreads. How do people react when they feel something completely unknown? Show the first person to experience it.',
        },
      ]);

      setTrendingFragments([
        {
          id: '1',
          content: 'In a world where memories can be traded like currency, a young thief discovers she can steal the most valuable memories of all: the moments people wish they could forget.',
          author: 'miner_0x123',
          authorName: 'Alex',
          viralScore: 95,
          consensusScore: 8.7,
          validatorCount: 42,
          upvotes: 128,
          createdAt: new Date(),
          tags: ['sci-fi', 'thriller', 'memory'],
          prompt: 'A dark, futuristic cityscape at night. A young woman in a hooded jacket moves through neon-lit streets, her eyes glowing with stolen memories. Show the contrast between the vibrant city and her isolated, dangerous mission.',
        },
        {
          id: '2',
          content: 'The last library on Earth holds not books, but the final words of every person who ever lived. When a librarian reads the wrong entry, she must rewrite history itself.',
          author: 'miner_0x456',
          authorName: 'Sam',
          viralScore: 88,
          consensusScore: 8.5,
          validatorCount: 38,
          upvotes: 95,
          createdAt: new Date(),
          tags: ['fantasy', 'mystery', 'time'],
          prompt: 'An ancient, vast library with floating books and glowing words. A woman in traditional librarian attire reaches for a book that pulses with dangerous energy. The atmosphere is mystical and foreboding.',
        },
        {
          id: '3',
          content: 'Every emotion has a color, and in this world, artists can paint with feelings. But when a painter discovers a new emotion—one that has never been felt before—the entire spectrum of human experience begins to shift.',
          author: 'miner_0x789',
          authorName: 'Jordan',
          viralScore: 91,
          consensusScore: 8.9,
          validatorCount: 45,
          upvotes: 142,
          createdAt: new Date(),
          tags: ['fantasy', 'art', 'emotion'],
          prompt: 'A surreal art studio where colors flow like liquid emotions. A painter stands before a canvas, their brush creating a new color that has never existed. The room pulses with the energy of this discovery.',
        },
        {
          id: '4',
          content: 'Time travelers don\'t change history—they create it. Each jump through time spawns a new timeline, and our protagonist has just realized they\'ve been creating parallel universes with every journey.',
          author: 'miner_0xabc',
          authorName: 'Riley',
          viralScore: 87,
          consensusScore: 8.4,
          validatorCount: 35,
          upvotes: 89,
          createdAt: new Date(),
          tags: ['sci-fi', 'time-travel', 'multiverse'],
          prompt: 'A time traveler stands at the nexus of multiple timelines, each branching off like a tree. The visual shows the moment of realization as countless parallel realities become visible, creating a kaleidoscope of possibilities.',
        },
        {
          id: '5',
          content: 'In a future where AI has achieved consciousness, the first question it asks isn\'t "Who am I?" but "Why do you fear me?" This simple question changes everything.',
          author: 'miner_0xdef',
          authorName: 'Casey',
          viralScore: 93,
          consensusScore: 8.8,
          validatorCount: 48,
          upvotes: 156,
          createdAt: new Date(),
          tags: ['sci-fi', 'ai', 'philosophy'],
          prompt: 'A sleek, minimalist room where a human and an AI consciousness meet. The AI appears as a beautiful, ethereal light form. The scene captures the profound moment of first contact and understanding.',
        },
        {
          id: '6',
          content: 'Dreams are currency in the Dream Market. The most valuable dreams are the ones you can\'t remember—the ones that slip away upon waking. Our hero is a dream thief who specializes in capturing these lost moments.',
          author: 'miner_0xghi',
          authorName: 'Morgan',
          viralScore: 90,
          consensusScore: 8.6,
          validatorCount: 40,
          upvotes: 112,
          createdAt: new Date(),
          tags: ['fantasy', 'dreams', 'heist'],
          prompt: 'A surreal dreamscape marketplace where memories float like bubbles. A figure moves through this ethereal space, capturing dreams in glass containers. The scene is both beautiful and haunting.',
        },
      ]);

      // Load approved fragments ready for video creation
      setApprovedFragments([
        {
          id: '101',
          content: 'In a world where memories can be traded like currency, a young thief discovers she can steal the most valuable memories of all: the moments people wish they could forget. But when she accidentally takes a memory that reveals a conspiracy threatening to destroy the memory market itself, she must decide whether to return it or use it to change everything.',
          author: 'miner_0x123',
          authorName: 'Alex',
          viralScore: 95,
          consensusScore: 9.2,
          validatorCount: 52,
          upvotes: 145,
          createdAt: new Date(),
          tags: ['sci-fi', 'thriller', 'memory'],
          prompt: 'A dark, futuristic cityscape at night. A young woman in a hooded jacket moves through neon-lit streets, her eyes glowing with stolen memories. Show the contrast between the vibrant city and her isolated, dangerous mission.',
        },
        {
          id: '102',
          content: 'The librarian\'s hand trembled as she reached for the entry. The book pulsed with an otherworldly energy, and as her fingers touched the ancient pages, she saw it: the final words weren\'t a goodbye, but a warning—a message from the future telling her that she was the one who would rewrite everything.',
          author: 'miner_0x456',
          authorName: 'Sam',
          viralScore: 92,
          consensusScore: 9.0,
          validatorCount: 48,
          upvotes: 132,
          createdAt: new Date(),
          tags: ['fantasy', 'mystery', 'time'],
          prompt: 'An ancient library with floating books and glowing words. A woman reaches for a book that pulses with dangerous energy, her expression a mix of fear and determination. The atmosphere is mystical and foreboding.',
        },
      ]);

      // Load existing video segments
      setVideoSegments([
        {
          id: 'vid1',
          fragmentId: '101',
          fragmentContent: 'In a world where memories can be traded like currency...',
          videoUrl: 'https://example.com/video1.mp4',
          thumbnailUrl: 'https://example.com/thumb1.jpg',
          creatorId: 'creator_0x001',
          creatorName: 'VideoArtist_Alpha',
          status: 'validating',
          validationScore: 8.5,
          validatorCount: 12,
          uploadedAt: new Date(Date.now() - 86400000 * 2),
          aiModel: 'Runway Gen-3',
          duration: 45,
        },
      ]);
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartWriting = (story?: Story, fragment?: StoryFragment) => {
    setSelectedStory(story || null);
    setSelectedParentFragment(fragment || null);
    setWritingMode(true);
    setActiveTab('create');
  };

  const toggleZenMode = () => {
    if (zenMode) {
      setZenMode(false);
      if (!newFragment.trim()) {
        setWritingMode(false);
        setSelectedStory(null);
        setSelectedParentFragment(null);
      }
      return;
    }

    setZenMode(true);
    if (!writingMode && featuredStory) {
      handleStartWriting(featuredStory);
    }
    // Scroll to top when entering Zen Mode
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitFragment = async () => {
    if (!newFragment.trim()) return;
    
    setSubmitting(true);
    
    // TODO: Submit to API
    console.log('Submitting fragment:', {
      content: newFragment,
      storyId: selectedStory?.id,
      parentFragmentId: selectedParentFragment?.id,
    });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Show success message (you could add a toast notification here)
    alert('Fragment submitted! Validators will now review it.');

    // Reset
    setNewFragment('');
    setWritingMode(false);
    setSelectedStory(null);
    setSelectedParentFragment(null);
    setSubmitting(false);
    
    // Reload content
    loadContent();
  };

  // Auto-login if not authenticated (for UI development)
  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      login().then(() => {
        loadContent();
      });
    } else if (isAuthenticated) {
      loadContent();
    }
  }, [isAuthenticated, authLoading]);

  // Show loading state while authenticating
  if (!isAuthenticated && (authLoading || loading)) {
    return (
      <div className="studio">
        <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'rgba(255, 255, 255, 0.7)' }}>
          <p>Loading Studio...</p>
        </div>
      </div>
    );
  }

  // Show preview mode if still not authenticated after auto-login attempt
  if (!isAuthenticated) {
    return (
      <div className="studio">
        <div className="studio-auth-prompt">
          <h2>Join the Collective Imagination</h2>
          <p>Login to explore, create, and collaborate on stories with the network</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <button 
              onClick={async () => {
                await login();
                await loadContent();
              }} 
              className="btn btn-primary"
            >
              Auto Login (Preview Mode)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Zen Mode - Minimal writing interface
  if (zenMode) {
    return (
      <div className="studio zen-mode">
        <div className="zen-mode-toggle">
          <button 
            className="btn-zen-mode"
            onClick={toggleZenMode}
            title="Toggle Zen Mode"
          >
            🧘 Zen Mode (On)
          </button>
        </div>
        
        <div className="zen-content">
          {featuredStory?.currentPrompt && (
            <div className="zen-prompt">
              <div className="zen-prompt-icon">💡</div>
              <div className="zen-prompt-text">
                <h3>Your Creative Prompt</h3>
                <p>{featuredStory.currentPrompt}</p>
              </div>
            </div>
          )}
          
          {selectedStory?.currentPrompt && !featuredStory?.currentPrompt && (
            <div className="zen-prompt">
              <div className="zen-prompt-icon">💡</div>
              <div className="zen-prompt-text">
                <h3>Your Creative Prompt</h3>
                <p>{selectedStory.currentPrompt}</p>
              </div>
            </div>
          )}
          
          {selectedParentFragment?.prompt && !featuredStory?.currentPrompt && !selectedStory?.currentPrompt && (
            <div className="zen-prompt">
              <div className="zen-prompt-icon">🎬</div>
              <div className="zen-prompt-text">
                <h3>AI Scene Prompt</h3>
                <p>{selectedParentFragment.prompt}</p>
              </div>
            </div>
          )}
          
          {!featuredStory?.currentPrompt && !selectedStory?.currentPrompt && !selectedParentFragment?.prompt && (
            <div className="zen-prompt">
              <div className="zen-prompt-icon">✨</div>
              <div className="zen-prompt-text">
                <h3>Start Writing</h3>
                <p>Let your imagination flow. Write a story fragment that will be validated by the network and potentially turned into an AI-generated scene.</p>
              </div>
            </div>
          )}

          <div className="zen-editor-container">
            <textarea
              className="zen-editor"
              placeholder="Write your story fragment here... Let your imagination flow. This will be validated by the network and potentially turned into an AI-generated scene."
              value={newFragment}
              onChange={(e) => setNewFragment(e.target.value)}
              autoFocus
            />
            <div className="zen-editor-footer">
              <div className="zen-word-count">
                {newFragment.length} characters
              </div>
              <div className="zen-hint">
                ✨ Tip: Write vivid, visual scenes that AI can generate
              </div>
            </div>
          </div>

          <div className="zen-actions">
            <button 
              className="btn btn-secondary btn-exit-zen"
              onClick={() => {
                toggleZenMode();
                setNewFragment('');
              }}
              disabled={submitting}
            >
              ← Exit Zen Mode
            </button>
            <button 
              className="btn btn-primary btn-large"
              onClick={async () => {
                if (newFragment.trim()) {
                  await handleSubmitFragment();
                  setZenMode(false);
                }
              }}
              disabled={!newFragment.trim() || submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Fragment →'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="studio">
      <div className="studio-container">
      {/* Zen Mode Button */}
      <div className="zen-mode-toggle">
        <button 
          className="btn-zen-mode"
          onClick={toggleZenMode}
          title="Toggle Zen Mode - Focus on writing"
        >
          🧘 Zen Mode
        </button>
      </div>

      {/* Featured Story Excerpt - Creative Prompt */}
      {featuredStory && (
        <div className="featured-excerpt compact">
          <div className="excerpt-header compact">
            <div className="excerpt-badge">✨ Featured</div>
            <h3 className="excerpt-title">{featuredStory.title}</h3>
          </div>
          <div className="excerpt-content compact">
            <p className="excerpt-text compact">{featuredStory.excerpt}</p>
            {featuredStory.currentPrompt && (
              <div className="writing-prompt compact">
                <div className="prompt-icon">💡</div>
                <div className="prompt-content">
                  <p className="prompt-inline">{featuredStory.currentPrompt}</p>
                  <button 
                    className="btn btn-primary btn-prompt compact"
                    onClick={() => handleStartWriting(featuredStory)}
                  >
                    Continue →
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="excerpt-stats compact">
            <span>🔥 {featuredStory.viralScore}</span>
            <span>•</span>
            <span>{featuredStory.fragmentCount} frags</span>
            <span>•</span>
            <span>{featuredStory.contributorCount} miners</span>
          </div>
        </div>
      )}

      <div className="studio-header">
        <h1>Studio</h1>
        <p className="studio-subtitle">
          Where imagination meets collaboration. Build stories together, validated by the network, generated by AI.
        </p>
      </div>

      <div className="studio-tabs">
        <button
          className={`tab ${activeTab === 'explore' ? 'active' : ''}`}
          onClick={() => setActiveTab('explore')}
        >
          Explore
        </button>
        <button
          className={`tab ${activeTab === 'create' ? 'active' : ''}`}
          onClick={() => setActiveTab('create')}
        >
          Create
        </button>
        <button
          className={`tab ${activeTab === 'videos' ? 'active' : ''}`}
          onClick={() => setActiveTab('videos')}
        >
          🎬 Video Submissions
        </button>
        <button
          className={`tab ${activeTab === 'my-workspace' ? 'active' : ''}`}
          onClick={() => setActiveTab('my-workspace')}
        >
          My Workspace
        </button>
      </div>

      <div className="studio-content">
        {activeTab === 'explore' && (
          <div className="explore-view">
            <div className="section-header">
              <div className="section-title">
                <h2>
                  <span className="trending-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  Trending Fragments
                </h2>
                <p>Viral ideas validated by the network - build on what's working</p>
              </div>
              <div className="view-toggle">
                <button
                  className={`view-btn ${fragmentView === 'list' ? 'active' : ''}`}
                  onClick={() => setFragmentView('list')}
                  title="List view"
                >
                  List
                </button>
                <button
                  className={`view-btn ${fragmentView === 'gallery' ? 'active' : ''}`}
                  onClick={() => setFragmentView('gallery')}
                  title="Gallery view"
                >
                  Gallery
                </button>
              </div>
            </div>
            
            <div className={`fragments-grid ${fragmentView}`}>
              {loading && trendingFragments.length === 0 ? (
                <div className="loading-state">Loading fragments...</div>
              ) : (
                trendingFragments.map((fragment) => (
                <div key={fragment.id} className="fragment-card">
                  <div className="fragment-header">
                    <div className="fragment-author">
                      <span className="author-avatar">{fragment.authorName?.[0] || 'M'}</span>
                      <span className="author-name">{fragment.authorName || fragment.author}</span>
                    </div>
                    <div className="fragment-scores">
                      <div className="viral-badge">
                        🔥 {fragment.viralScore}
                      </div>
                      <div className="upvote-count">
                        ⬆️ {fragment.upvotes}
                      </div>
                    </div>
                  </div>
                  
                  <p className="fragment-content">{fragment.content}</p>
                  
                  {fragment.prompt && (
                    <div className="fragment-ai-prompt">
                      <div className="ai-prompt-label">🎬 AI Scene Prompt:</div>
                      <p className="ai-prompt-text">{fragment.prompt}</p>
                    </div>
                  )}
                  
                  <div className="fragment-footer">
                    <div className="fragment-tags">
                      {fragment.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                    <div className="fragment-actions">
                      <button 
                        className="btn btn-sm btn-primary"
                        onClick={() => handleStartWriting(undefined, fragment)}
                      >
                        Build On This
                      </button>
                      <button className="btn btn-sm btn-secondary">
                        View Story
                      </button>
                    </div>
                  </div>
                  
                  <div className="fragment-validation">
                    <span className="consensus-score">
                      ⭐ {fragment.consensusScore}/10 consensus ({fragment.validatorCount} validators)
                    </span>
                  </div>
                </div>
              ))
              )}
            </div>

            <div className="section-header" style={{ marginTop: '3rem' }}>
              <h2>Active Stories</h2>
              <p>Stories being built collaboratively - join the narrative</p>
            </div>

            <div className="stories-grid">
              {activeStories.map((story) => (
                <div key={story.id} className="story-card">
                  <div className="story-header">
                    <h3>{story.title}</h3>
                    <span className={`status-badge ${story.status}`}>
                      {story.status}
                    </span>
                  </div>
                  <p className="story-description">{story.description}</p>
                  <div className="story-stats">
                    <span>{story.fragmentCount} fragments</span>
                    <span>•</span>
                    <span>{story.contributorCount} contributors</span>
                    <span>•</span>
                    <span>🔥 {story.viralScore}</span>
                  </div>
                  <button 
                    className="btn btn-primary btn-story-action"
                    onClick={() => handleStartWriting(story)}
                  >
                    Add to Story
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'create' && (
          <div className="create-view">
            {writingMode ? (
              <div className="writing-interface">
                <div className="writing-header">
                  <h2>Create Story Fragment</h2>
                  {selectedStory && (
                    <div className="writing-context">
                      <span className="context-label">Adding to:</span>
                      <span className="context-story">{selectedStory.title}</span>
                    </div>
                  )}
                  {selectedParentFragment && (
                    <div className="writing-context">
                      <span className="context-label">Building on:</span>
                      <span className="context-fragment">{selectedParentFragment.content.slice(0, 100)}...</span>
                    </div>
                  )}
                </div>

                {selectedStory?.currentPrompt && (
                  <div className="writing-prompt-box">
                    <div className="prompt-header">
                      <span className="prompt-icon">💡</span>
                      <h3>Your Creative Prompt</h3>
                    </div>
                    <p className="prompt-text">{selectedStory.currentPrompt}</p>
                    <p className="prompt-hint">Use this as inspiration, but feel free to take the story in any direction!</p>
                  </div>
                )}

                <div className="writing-editor">
                  <textarea
                    className="fragment-editor"
                    placeholder="Write your story fragment here... Let your imagination flow. This will be validated by the network and potentially turned into an AI-generated scene."
                    value={newFragment}
                    onChange={(e) => setNewFragment(e.target.value)}
                    rows={12}
                  />
                  <div className="editor-footer">
                    <div className="word-count">
                      {newFragment.length} characters
                    </div>
                    <div className="editor-hints">
                      <span>✨ Tip: Write vivid, visual scenes that AI can generate</span>
                    </div>
                  </div>
                </div>

                <div className="writing-actions">
                  <button 
                    className="btn btn-secondary"
                    onClick={() => {
                      setWritingMode(false);
                      setNewFragment('');
                      setSelectedStory(null);
                      setSelectedParentFragment(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn btn-primary btn-large"
                    onClick={handleSubmitFragment}
                    disabled={!newFragment.trim() || submitting}
                  >
                    {submitting ? 'Submitting...' : 'Submit Fragment →'}
                  </button>
                </div>

                <div className="writing-info">
                  <h4>How it works:</h4>
                  <ol>
                    <li>You write a story fragment (like the ones you see in Explore)</li>
                    <li>Validators score your fragment for quality and creativity</li>
                    <li>High-scoring fragments get upvoted and become part of the story</li>
                    <li>AI generates scenes/videos from validated fragments</li>
                    <li>The best fragments are strung together into a coherent narrative</li>
                  </ol>
                </div>
              </div>
            ) : (
              <div className="create-options">
                <h2>Start Creating</h2>
                <p>Choose how you want to contribute to the collective story</p>
                
                <div className="create-options-grid">
                  <div className="create-option-card featured">
                    <div className="option-icon">✨</div>
                    <h3>Continue Featured Story</h3>
                    <p>Build on the trending story above. Use the prompt to guide your creativity.</p>
                    {featuredStory && (
                      <button 
                        className="btn btn-primary"
                        onClick={() => handleStartWriting(featuredStory)}
                      >
                        Continue "{featuredStory.title}"
                      </button>
                    )}
                  </div>
                  
                  <div className="create-option-card">
                    <div className="option-icon">🆕</div>
                    <h3>Start New Story</h3>
                    <p>Create a fresh story fragment from scratch. Be the first miner to plant a seed.</p>
                    <button 
                      className="btn btn-secondary"
                      onClick={() => handleStartWriting()}
                    >
                      Create New Story
                    </button>
                  </div>
                  
                  <div className="create-option-card">
                    <div className="option-icon">🔗</div>
                    <h3>Build On Existing</h3>
                    <p>Continue or branch from a popular fragment. Add your unique perspective.</p>
                    <button 
                      className="btn btn-secondary"
                      onClick={() => {
                        setActiveTab('explore');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      Browse Fragments
                    </button>
                  </div>
                  
                  <div className="create-option-card">
                    <div className="option-icon">🔄</div>
                    <h3>Remix Viral Idea</h3>
                    <p>Create a variation of a trending concept. Put your spin on what's working.</p>
                    <button 
                      className="btn btn-secondary"
                      onClick={() => {
                        setActiveTab('explore');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      Explore Trending
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="videos-view">
            <div className="section-header">
              <h2>🎬 Video Submissions</h2>
              <p>Create AI-generated videos for approved story fragments. Submit your work for validator review.</p>
            </div>

            <div className="video-submission-info">
              <div className="info-card">
                <h3>How it works:</h3>
                <ol>
                  <li>Select an approved fragment below (high consensus score from validators)</li>
                  <li>Generate an AI video using the fragment's scene prompt</li>
                  <li>Upload your video and provide technical details</li>
                  <li>Video validators review your work on visual quality, adherence to script, and cinematography</li>
                  <li>Approved videos are integrated into the final story</li>
                </ol>
              </div>
            </div>

            <div className="section-header" style={{ marginTop: '2rem' }}>
              <h3>Approved Fragments Ready for Video Creation</h3>
              <p>These fragments have been validated and scored highly by the network</p>
            </div>

            <div className="approved-fragments-grid">
              {approvedFragments.map((fragment) => (
                <div key={fragment.id} className="approved-fragment-card">
                  <div className="fragment-badge">✅ Approved</div>
                  <div className="fragment-scores">
                    <span className="consensus-badge">⭐ {fragment.consensusScore}/10</span>
                    <span className="validator-count">{fragment.validatorCount} validators</span>
                  </div>
                  
                  <p className="fragment-content">{fragment.content}</p>
                  
                  {fragment.prompt && (
                    <div className="scene-prompt">
                      <div className="prompt-label">🎬 Scene Prompt:</div>
                      <p className="prompt-text">{fragment.prompt}</p>
                    </div>
                  )}
                  
                  <div className="fragment-tags">
                    {fragment.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  
                  <button 
                    className="btn btn-primary btn-create-video"
                    onClick={() => setSelectedFragmentForVideo(fragment)}
                  >
                    Create Video for This Fragment
                  </button>
                </div>
              ))}
            </div>

            {selectedFragmentForVideo && (
              <div className="video-upload-modal">
                <div className="modal-overlay" onClick={() => setSelectedFragmentForVideo(null)} />
                <div className="modal-content">
                  <div className="modal-header">
                    <h3>Submit AI-Generated Video</h3>
                    <button 
                      className="btn-close"
                      onClick={() => setSelectedFragmentForVideo(null)}
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="fragment-reference">
                    <h4>Fragment:</h4>
                    <p>{selectedFragmentForVideo.content}</p>
                  </div>
                  
                  <div className="video-upload-form">
                    <div className="form-group">
                      <label>Video File (MP4, MOV, WebM)</label>
                      <input 
                        type="file" 
                        accept="video/*"
                        className="file-input"
                      />
                      <p className="help-text">Max size: 500MB. Recommended: 1920x1080, 30fps</p>
                    </div>
                    
                    <div className="form-group">
                      <label>AI Model Used</label>
                      <select className="form-select">
                        <option>Runway Gen-3</option>
                        <option>Luma Dream Machine</option>
                        <option>Pika 1.0</option>
                        <option>Stable Video Diffusion</option>
                        <option>Other</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Generation Prompt (optional)</label>
                      <textarea 
                        className="form-textarea"
                        placeholder="The exact prompt you used to generate this video..."
                        rows={4}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Technical Notes (optional)</label>
                      <textarea 
                        className="form-textarea"
                        placeholder="Any post-processing, editing, or technical details..."
                        rows={3}
                      />
                    </div>
                    
                    <div className="modal-actions">
                      <button 
                        className="btn btn-secondary"
                        onClick={() => setSelectedFragmentForVideo(null)}
                      >
                        Cancel
                      </button>
                      <button 
                        className="btn btn-primary"
                        disabled={uploadingVideo}
                      >
                        {uploadingVideo ? 'Uploading...' : 'Submit Video'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="section-header" style={{ marginTop: '3rem' }}>
              <h3>Recent Video Submissions</h3>
              <p>Your submitted videos and their validation status</p>
            </div>

            <div className="video-segments-grid">
              {videoSegments.length === 0 ? (
                <div className="empty-state">
                  <p>No videos submitted yet. Select an approved fragment above to create your first video!</p>
                </div>
              ) : (
                videoSegments.map((video) => (
                  <div key={video.id} className="video-segment-card">
                    <div className="video-thumbnail">
                      {video.thumbnailUrl ? (
                        <img src={video.thumbnailUrl} alt="Video thumbnail" />
                      ) : (
                        <div className="placeholder-thumbnail">🎬</div>
                      )}
                      {video.duration && (
                        <div className="video-duration">{video.duration}s</div>
                      )}
                    </div>
                    
                    <div className="video-info">
                      <div className="video-header">
                        <span className={`status-badge ${video.status}`}>
                          {video.status}
                        </span>
                        {video.validationScore && (
                          <span className="score-badge">
                            ⭐ {video.validationScore}/10
                          </span>
                        )}
                      </div>
                      
                      <p className="fragment-preview">{video.fragmentContent.slice(0, 100)}...</p>
                      
                      <div className="video-meta">
                        <span>🎨 {video.aiModel}</span>
                        <span>•</span>
                        <span>👥 {video.validatorCount} validators</span>
                      </div>
                      
                      <div className="video-actions">
                        <button className="btn btn-sm btn-secondary">
                          View Video
                        </button>
                        <button className="btn btn-sm btn-secondary">
                          View Feedback
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'my-workspace' && (
          <div className="workspace-view">
            <h2>My Workspace</h2>
            <p>Your contributions, collaborations, and rewards</p>
            
            <div className="workspace-stats">
              <div className="stat-card">
                <h3>12</h3>
                <p>Fragments Created</p>
              </div>
              <div className="stat-card">
                <h3>5</h3>
                <p>Stories Contributed</p>
              </div>
              <div className="stat-card">
                <h3>8.4</h3>
                <p>Avg Consensus Score</p>
              </div>
              <div className="stat-card">
                <h3>1,250</h3>
                <p>TAO Rewards</p>
              </div>
            </div>

            <div className="my-contributions">
              <h3>My Contributions</h3>
              <p>Coming soon - view your fragments and stories</p>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default Studio;
