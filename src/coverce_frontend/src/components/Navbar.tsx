import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Notifications from './Notifications';
import vividverseLogo from '../vividverse_logo.svg';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, login, logout } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const applyTheme = (nextTheme: 'dark' | 'light') => {
    document.documentElement.dataset.theme = nextTheme;
    document.body.dataset.theme = nextTheme;
    document.documentElement.classList.toggle('theme-light', nextTheme === 'light');
    document.documentElement.classList.toggle('theme-dark', nextTheme === 'dark');
  };

  useEffect(() => {
    const savedTheme = (localStorage.getItem('vividverse_theme') as 'dark' | 'light') || 'dark';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    applyTheme(nextTheme);
    localStorage.setItem('vividverse_theme', nextTheme);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        aria-label="Toggle theme"
      >
        <span className="theme-icon">
          {theme === 'dark' ? '☀︎' : '☾'}
        </span>
      </button>
      
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            <img src={vividverseLogo} alt="VividVerse" className="navbar-logo" />
            <span className="navbar-brand-text">
              <span className="brand-v">V</span>
              <span className="brand-rest">ividVerse</span>
            </span>
          </Link>
          
          <div className="navbar-links">
            <Link to="/watch" className="nav-link">Watch</Link>
            <Link to="/studio" className="nav-link">Studio</Link>
            {isAuthenticated && (
              <Link to="/validate" className="nav-link">Validate</Link>
            )}
            <Link to="/community" className="nav-link">Community</Link>
            {isAuthenticated && (
              <Link to="/analytics" className="nav-link">Analytics</Link>
            )}
          </div>
          
          <div className="navbar-auth">
            {isAuthenticated && <Notifications />}
            {isAuthenticated ? (
              <div className="auth-info">
                <span className="user-name">
                  {user?.name || user?.email?.slice(0, 8)}...
                </span>
                <button onClick={handleLogout} className="btn-logout">
                  Logout
                </button>
              </div>
            ) : (
              <button onClick={() => navigate('/')} className="btn-login">
                Login
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;



