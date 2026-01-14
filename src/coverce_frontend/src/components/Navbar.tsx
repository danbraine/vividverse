import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import vividverseLogo from '../vividverse_logo.svg';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <img src={vividverseLogo} alt="VividVerse" className="navbar-logo" />
          <span className="navbar-brand-text">VividVerse</span>
        </Link>
        
        <div className="navbar-links">
          <Link to="/studio" className="nav-link">Studio</Link>
          {isAuthenticated && (
            <Link to="/validate" className="nav-link">Validate</Link>
          )}
        </div>
        
        <div className="navbar-auth">
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
  );
};

export default Navbar;



