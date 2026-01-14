// Auto-switch between mock and real auth based on environment
// Set VITE_USE_MOCK_AUTH=true in .env to use mock mode for UI development

const useMock = import.meta.env.VITE_USE_MOCK_AUTH === 'true' || import.meta.env.MODE === 'development';

if (useMock) {
  console.log('🎨 Using MOCK auth context for UI development');
  // Export mock version
  export { AuthProvider, useAuth } from './AuthContext.mock';
} else {
  // Export real JWT version
  export { AuthProvider, useAuth } from './AuthContext';
}
