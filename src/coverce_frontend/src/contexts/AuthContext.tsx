// Auto-switch between mock and real auth
// Set VITE_USE_MOCK_AUTH=false to use real JWT auth

// Default to mock auth for UI development - switch to real when backend is ready
// For production, set VITE_USE_MOCK_AUTH=false in .env

// Re-export mock auth by default for UI development
// To use real auth, change this import to './AuthContext.real'
export { AuthProvider, useAuth } from './AuthContext.mock';
