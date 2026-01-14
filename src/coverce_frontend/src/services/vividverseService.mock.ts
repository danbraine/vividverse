// Mock service for UI development - returns mock data without requiring backend

// Mock script data
const mockScripts = [
  {
    id: 1,
    title: 'The Last Sunset',
    author: 'mock-user-principal-12345',
    format: { Text: null },
    status: { PendingValidation: null },
    submittedAt: BigInt(Date.now() - 86400000), // 1 day ago
    summary: 'A story about redemption and hope in a post-apocalyptic world.',
  },
  {
    id: 2,
    title: 'Digital Dreams',
    author: 'mock-user-principal-67890',
    format: { Fountain: null },
    status: { Validating: null },
    submittedAt: BigInt(Date.now() - 172800000), // 2 days ago
    summary: 'A sci-fi thriller exploring the boundaries of virtual reality.',
  },
];

// Mock validation data
const mockValidations: Record<number, any[]> = {
  1: [
    {
      validator: 'validator-1',
      scores: [
        [{ Story: null }, 8],
        [{ Characters: null }, 7],
        [{ Dialogue: null }, 9],
        [{ Originality: null }, 8],
        [{ Structure: null }, 7],
        [{ VisualPotential: null }, 9],
      ],
      comments: 'Great character development and visual potential!',
      submittedAt: BigInt(Date.now() - 3600000),
    },
  ],
};

// Mock aggregated scores
const mockAggregatedScores: Record<number, any> = {
  1: {
    story: 8.0,
    characters: 7.5,
    dialogue: 8.5,
    originality: 8.0,
    structure: 7.5,
    visualPotential: 9.0,
    totalValidations: 2,
  },
  2: {
    story: 7.0,
    characters: 6.5,
    dialogue: 7.5,
    originality: 8.5,
    structure: 7.0,
    visualPotential: 8.0,
    totalValidations: 1,
  },
};

// Mock movie data
const mockMovies: Record<number, any> = {
  1: {
    scriptId: 1,
    status: { Completed: null },
    movieHash: 'mock-movie-hash-123',
    thumbnailHash: 'mock-thumbnail-hash-123',
    generatedAt: BigInt(Date.now() - 3600000),
  },
};

export const submitScript = async (
  title: string,
  format: 'PDF' | 'Fountain' | 'Text',
  content: Uint8Array,
  summary?: string
) => {
  console.log('📝 Mock: Submitting script', { title, format, summary });
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
  
  const newScript = {
    id: mockScripts.length + 1,
    title,
    author: 'mock-user-principal-12345',
    format: format === 'PDF' ? { PDF: null } : format === 'Fountain' ? { Fountain: null } : { Text: null },
    status: { PendingValidation: null },
    submittedAt: BigInt(Date.now()),
    summary: summary || '',
  };
  
  mockScripts.push(newScript);
  return newScript.id;
};

export const getScript = async (scriptId: number) => {
  console.log('📖 Mock: Getting script', scriptId);
  await new Promise(resolve => setTimeout(resolve, 300));
  const script = mockScripts.find(s => s.id === scriptId);
  if (!script) {
    throw new Error('Script not found');
  }
  return script;
};

export const getPendingScripts = async () => {
  console.log('📋 Mock: Getting pending scripts');
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockScripts.filter(s => 'PendingValidation' in s.status || 'Validating' in s.status);
};

export const getAllScripts = async () => {
  console.log('📚 Mock: Getting all scripts');
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockScripts;
};

export const registerValidator = async () => {
  console.log('✅ Mock: Registering as validator');
  await new Promise(resolve => setTimeout(resolve, 500));
  return { ok: true };
};

export const isValidator = async (userId: string) => {
  console.log('🔍 Mock: Checking if validator', userId);
  await new Promise(resolve => setTimeout(resolve, 200));
  return true; // Always return true in mock mode
};

export const submitValidation = async (
  scriptId: number,
  scores: Array<{ category: string; score: number }>,
  comments?: string
) => {
  console.log('⭐ Mock: Submitting validation', { scriptId, scores, comments });
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (!mockValidations[scriptId]) {
    mockValidations[scriptId] = [];
  }
  
  const validation = {
    validator: 'mock-user-principal-12345',
    scores: scores.map(s => [
      s.category === 'Story' ? { Story: null } :
      s.category === 'Characters' ? { Characters: null } :
      s.category === 'Dialogue' ? { Dialogue: null } :
      s.category === 'Originality' ? { Originality: null } :
      s.category === 'Structure' ? { Structure: null } :
      { VisualPotential: null },
      s.score
    ] as [any, number]),
    comments: comments || '',
    submittedAt: BigInt(Date.now()),
  };
  
  mockValidations[scriptId].push(validation);
  
  // Update aggregated score
  const existingScores = mockAggregatedScores[scriptId] || {
    story: 0, characters: 0, dialogue: 0, originality: 0, structure: 0, visualPotential: 0, totalValidations: 0
  };
  
  const newScores = { ...existingScores };
  scores.forEach(s => {
    const key = s.category === 'Story' ? 'story' :
                s.category === 'Characters' ? 'characters' :
                s.category === 'Dialogue' ? 'dialogue' :
                s.category === 'Originality' ? 'originality' :
                s.category === 'Structure' ? 'structure' : 'visualPotential';
    newScores[key] = (newScores[key] * newScores.totalValidations + s.score) / (newScores.totalValidations + 1);
  });
  newScores.totalValidations += 1;
  mockAggregatedScores[scriptId] = newScores;
  
  return { ok: true };
};

export const getValidations = async (scriptId: number) => {
  console.log('📊 Mock: Getting validations', scriptId);
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockValidations[scriptId] || [];
};

export const getAggregatedScore = async (scriptId: number) => {
  console.log('📈 Mock: Getting aggregated score', scriptId);
  await new Promise(resolve => setTimeout(resolve, 300));
  const score = mockAggregatedScores[scriptId];
  if (!score) {
    throw new Error('Score not found');
  }
  return score;
};

export const getTopScript = async () => {
  console.log('🏆 Mock: Getting top script');
  await new Promise(resolve => setTimeout(resolve, 300));
  // Return script with highest average score
  return mockScripts[0] || null;
};

export const startMovieGeneration = async (scriptId: number) => {
  console.log('🎬 Mock: Starting movie generation', scriptId);
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  mockMovies[scriptId] = {
    scriptId,
    status: { Generating: null },
    movieHash: `mock-movie-hash-${scriptId}`,
    thumbnailHash: `mock-thumbnail-hash-${scriptId}`,
    generatedAt: BigInt(Date.now()),
  };
  
  // Simulate generation completion after 3 seconds
  setTimeout(() => {
    if (mockMovies[scriptId]) {
      mockMovies[scriptId].status = { Completed: null };
    }
  }, 3000);
  
  return { ok: true };
};

export const getMovie = async (scriptId: number) => {
  console.log('🎥 Mock: Getting movie', scriptId);
  await new Promise(resolve => setTimeout(resolve, 300));
  const movie = mockMovies[scriptId];
  if (!movie) {
    throw new Error('Movie not found');
  }
  return movie;
};
