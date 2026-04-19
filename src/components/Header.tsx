import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import logoImg from '../assets/grandee-online-logo.jpeg';
import './Header.css';

const Header = () => {
  const { searchQuery, setSearchQuery, user, setUser } = useApp();
  const location = useLocation();
  const isSeller = user?.role === 'seller';
  const showSearch = !location.pathname.startsWith('/seller');

  return (
    <header className="header">
      <div className="header-container">

        {/* Logo */}
        <Link to="/" className="logo-link">
          <img src={logoImg} alt="Grandee Online" className="logo" />
        </Link>

        {/* Search Bar */}
        {showSearch && (
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for products or services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button className="search-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </div>
        )}

        {/* Navigation */}
        <nav className="header-nav">
          {!isSeller && <Link to="/home" className="nav-link">Home</Link>}
          {!isSeller && <Link to="/shops" className="nav-link">All Shops</Link>}
          {isSeller && <Link to="/seller/dashboard" className="nav-link">Seller Dashboard</Link>}
          {!user ? (
            <Link to="/signin" className="nav-link">Sign In</Link>
          ) : (
            <button className="nav-button" onClick={() => setUser(null)}>Sign Out</button>
          )}
        </nav>

      </div>
    </header>
  );
};

export default Header;
