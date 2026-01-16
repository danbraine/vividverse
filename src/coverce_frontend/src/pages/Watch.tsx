import { useState } from 'react';
import './Watch.css';

interface Story {
  id: string;
  title: string;
  thumbnail: string;
  genre: string;
  views: number;
  rating: number;
  duration: string;
  sceneCount: number;
  isFeatured?: boolean;
  isNew?: boolean;
}

interface VideoFragment {
  id: string;
  storyTitle: string;
  sceneNumber: number;
  totalScenes: number;
  videoUrl: string;
  writer: string;
  creator: string;
  views: number;
  likes: number;
  shares: number;
  comments: number;
}

const Watch = () => {
  const [viewMode, setViewMode] = useState<'discover' | 'story'>('discover');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  // Mock data for stories
  const featuredStories: Story[] = [
    {
      id: 'story-1',
      title: 'Memory Thieves',
      thumbnail: '🧠',
      genre: 'Sci-Fi',
      views: 1234567,
      rating: 9.2,
      duration: '45m',
      sceneCount: 12,
      isFeatured: true,
    },
    {
      id: 'story-2',
      title: 'Neon Dreams',
      thumbnail: '🌃',
      genre: 'Cyberpunk',
      views: 987654,
      rating: 8.9,
      duration: '38m',
      sceneCount: 10,
      isFeatured: true,
    },
    {
      id: 'story-3',
      title: 'The Last Library',
      thumbnail: '📚',
      genre: 'Fantasy',
      views: 756432,
      rating: 9.5,
      duration: '52m',
      sceneCount: 15,
      isNew: true,
    },
  ];

  const trendingStories: Story[] = [
    {
      id: 'story-4',
      title: 'Quantum Paradox',
      thumbnail: '⚛️',
      genre: 'Sci-Fi',
      views: 543210,
      rating: 8.7,
      duration: '41m',
      sceneCount: 11,
    },
    {
      id: 'story-5',
      title: 'Shadow Protocol',
      thumbnail: '🕵️',
      genre: 'Thriller',
      views: 432198,
      rating: 9.1,
      duration: '36m',
      sceneCount: 9,
    },
    {
      id: 'story-6',
      title: 'Echoes of Tomorrow',
      thumbnail: '🔮',
      genre: 'Mystery',
      views: 398765,
      rating: 8.8,
      duration: '44m',
      sceneCount: 12,
    },
    {
      id: 'story-7',
      title: 'Digital Ghosts',
      thumbnail: '👻',
      genre: 'Horror',
      views: 321987,
      rating: 8.4,
      duration: '33m',
      sceneCount: 8,
    },
    {
      id: 'story-8',
      title: 'Starlight Serenade',
      thumbnail: '✨',
      genre: 'Romance',
      views: 298456,
      rating: 8.6,
      duration: '39m',
      sceneCount: 10,
    },
  ];

  const handleStoryClick = (story: Story) => {
    setSelectedStory(story);
    setViewMode('story');
  };

  const handleBackToDiscover = () => {
    setSelectedStory(null);
    setViewMode('discover');
  };

  return (
    <div className="watch">
      <div className="watch-container">
        {viewMode === 'discover' ? (
          <>
            {/* Hero Section */}
            <div className="watch-hero">
              <div className="hero-content">
                <h1>🎬 Watch VividVerse</h1>
                <p className="hero-subtitle">
                  Experience AI-powered stories created by our community of talented creators
                </p>
              </div>
            </div>

            {/* Featured Stories */}
            <section className="watch-section">
              <h2 className="section-title">⭐ Featured Stories</h2>
              <div className="stories-grid featured">
                {featuredStories.map((story) => (
                  <div
                    key={story.id}
                    className="story-card featured-card"
                    onClick={() => handleStoryClick(story)}
                  >
                    {story.isNew && <div className="badge new-badge">🆕 New</div>}
                    {story.isFeatured && <div className="badge featured-badge">⭐ Featured</div>}
                    <div className="story-thumbnail">{story.thumbnail}</div>
                    <div className="story-info">
                      <h3 className="story-title">{story.title}</h3>
                      <div className="story-meta">
                        <span className="genre-tag">{story.genre}</span>
                        <span className="rating">⭐ {story.rating}</span>
                      </div>
                      <div className="story-stats">
                        <span>👁️ {(story.views / 1000000).toFixed(1)}M views</span>
                        <span>⏱️ {story.duration}</span>
                        <span>📹 {story.sceneCount} scenes</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Trending Now */}
            <section className="watch-section">
              <h2 className="section-title">🔥 Trending Now</h2>
              <div className="stories-grid">
                {trendingStories.map((story) => (
                  <div
                    key={story.id}
                    className="story-card"
                    onClick={() => handleStoryClick(story)}
                  >
                    <div className="story-thumbnail">{story.thumbnail}</div>
                    <div className="story-info">
                      <h3 className="story-title">{story.title}</h3>
                      <div className="story-meta">
                        <span className="genre-tag">{story.genre}</span>
                        <span className="rating">⭐ {story.rating}</span>
                      </div>
                      <div className="story-stats">
                        <span>👁️ {(story.views / 1000).toFixed(0)}K views</span>
                        <span>⏱️ {story.duration}</span>
                        <span>📹 {story.sceneCount} scenes</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Browse by Genre */}
            <section className="watch-section">
              <h2 className="section-title">🎭 Browse by Genre</h2>
              <div className="genre-grid">
                {['Sci-Fi', 'Fantasy', 'Horror', 'Romance', 'Mystery', 'Thriller', 'Comedy', 'Drama'].map(
                  (genre) => (
                    <div key={genre} className="genre-card">
                      <span className="genre-icon">
                        {genre === 'Sci-Fi' && '🚀'}
                        {genre === 'Fantasy' && '🐉'}
                        {genre === 'Horror' && '👻'}
                        {genre === 'Romance' && '💕'}
                        {genre === 'Mystery' && '🔍'}
                        {genre === 'Thriller' && '🎯'}
                        {genre === 'Comedy' && '😂'}
                        {genre === 'Drama' && '🎭'}
                      </span>
                      <span className="genre-name">{genre}</span>
                    </div>
                  )
                )}
              </div>
            </section>
          </>
        ) : (
          <>
            {/* Story Detail View */}
            <div className="story-detail">
              <button className="back-button" onClick={handleBackToDiscover}>
                ← Back to Discover
              </button>

              {selectedStory && (
                <>
                  <div className="story-hero">
                    <div className="story-hero-thumbnail">{selectedStory.thumbnail}</div>
                    <div className="story-hero-info">
                      <h1>{selectedStory.title}</h1>
                      <div className="story-hero-meta">
                        <span className="genre-tag">{selectedStory.genre}</span>
                        <span className="rating">⭐ {selectedStory.rating}/10</span>
                        <span>⏱️ {selectedStory.duration}</span>
                        <span>📹 {selectedStory.sceneCount} scenes</span>
                      </div>
                      <div className="story-hero-stats">
                        <span>👁️ {selectedStory.views.toLocaleString()} views</span>
                        <span>❤️ {Math.floor(selectedStory.views * 0.15).toLocaleString()} likes</span>
                        <span>💬 {Math.floor(selectedStory.views * 0.02).toLocaleString()} comments</span>
                      </div>
                      <div className="story-actions">
                        <button className="play-button">▶️ Watch Now</button>
                        <button className="action-button">➕ Watch Later</button>
                        <button className="action-button">🔗 Share</button>
                      </div>
                    </div>
                  </div>

                  {/* Synopsis */}
                  <div className="story-section">
                    <h2>📖 Synopsis</h2>
                    <p className="synopsis">
                      In a world where memories can be stolen and traded like currency, a skilled thief discovers
                      a conspiracy that threatens the fabric of reality itself. As she delves deeper into the
                      mystery, she must confront her own forgotten past and make an impossible choice between
                      saving herself or saving the world.
                    </p>
                  </div>

                  {/* Scene Breakdown */}
                  <div className="story-section">
                    <h2>🎬 Scene Breakdown</h2>
                    <div className="scene-timeline">
                      {Array.from({ length: selectedStory.sceneCount }, (_, i) => (
                        <div key={i} className="scene-item">
                          <div className="scene-number">Scene {i + 1}</div>
                          <div className="scene-preview">
                            <div className="scene-thumbnail">🎥</div>
                            <div className="scene-info">
                              <div className="scene-title">Scene Title {i + 1}</div>
                              <div className="scene-meta">
                                <span>Written by @creator{i % 3 + 1}</span>
                                <span>•</span>
                                <span>Video by @artist{i % 3 + 1}</span>
                              </div>
                            </div>
                          </div>
                          <button className="play-scene-btn">▶️</button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contributors */}
                  <div className="story-section">
                    <h2>👥 Contributors</h2>
                    <div className="contributors-grid">
                      {['@creator1', '@creator2', '@creator3', '@artist1', '@artist2', '@validator1'].map(
                        (contributor) => (
                          <div key={contributor} className="contributor-card">
                            <div className="contributor-avatar">
                              {contributor.includes('creator') && '✍️'}
                              {contributor.includes('artist') && '🎨'}
                              {contributor.includes('validator') && '✅'}
                            </div>
                            <div className="contributor-name">{contributor}</div>
                            <div className="contributor-role">
                              {contributor.includes('creator') && 'Writer'}
                              {contributor.includes('artist') && 'Video Creator'}
                              {contributor.includes('validator') && 'Validator'}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Watch;
