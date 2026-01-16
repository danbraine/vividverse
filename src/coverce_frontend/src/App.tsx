import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ValidatorDashboard from './pages/ValidatorDashboard';
import MovieViewer from './pages/MovieViewer';
import Studio from './pages/Studio';
import Analytics from './pages/Analytics';
import Watch from './pages/Watch';
import Community from './pages/Community';
import Economics from './pages/Economics';
import NetworkHealth from './pages/NetworkHealth';
import Settings from './pages/Settings';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/studio" element={<Studio />} />
            <Route path="/validate" element={<ValidatorDashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/watch" element={<Watch />} />
            <Route path="/community" element={<Community />} />
            <Route path="/economics" element={<Economics />} />
            <Route path="/network" element={<NetworkHealth />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/movie/:scriptId" element={<MovieViewer />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;



