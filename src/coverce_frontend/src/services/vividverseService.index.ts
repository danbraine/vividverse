// Auto-switch between mock and real service based on environment
// Set VITE_USE_MOCK_SERVICE=true in .env to use mock mode for UI development

const useMock = import.meta.env.VITE_USE_MOCK_SERVICE === 'true' || import.meta.env.MODE === 'development';

if (useMock) {
  console.log('🎨 Using MOCK service for UI development');
  // Export mock version
  export * from './vividverseService.mock';
} else {
  // Export real API version
  export * from './vividverseService';
}
