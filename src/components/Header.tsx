import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import logoImg from '../assets/grandee-online-logo.jpeg';
import './Header.css';

const Header = () => {
  const { searchQuery, setSearchQuery, user, setUser } = useApp();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isSeller = user?.role === 'seller';
  const showSearch = !location.pathname.startsWith('/seller');
  const dashboardPath = isSeller ? '/seller/dashboard' : '/';

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="header-container">

        {/* Logo */}
        <Link to="/" className="logo-link">
          <img src={logoImg} alt="Grandee Online" className="logo" />
        </Link>

        {showSearch && (
          <div className="search-bar">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search for products..."
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

        <div className="header-controls">
          <nav className="header-nav" aria-label="Primary navigation">
            <Link to={dashboardPath} className="nav-link">Dashboard</Link>
            <Link to="/shops" className="nav-link">All Shops</Link>
            <Link to="/help" className="nav-link">Help</Link>
            {!user ? (
              <Link to="/signin" className="nav-link">Sign In</Link>
            ) : (
              <button className="nav-button" onClick={() => setUser(null)}>Sign Out</button>
            )}
          </nav>

          <div className="header-actions" ref={menuRef}>
            <Link to="/wishlist" className="icon-action" aria-label="Wishlist">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19.5 12.6 12 20l-7.5-7.4A5 5 0 0 1 12 6a5 5 0 0 1 7.5 6.6Z" />
              </svg>
            </Link>
            <button
              type="button"
              className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
              aria-label="Open navigation menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <span />
              <span />
              <span />
            </button>
            <Link to="/profile" className="icon-action" aria-label="Account">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21a8 8 0 0 1 16 0" />
              </svg>
            </Link>

            {isMenuOpen && (
              <div className="menu-panel">
                <Link to="/wishlist" className="menu-link">Shopping List</Link>
                <Link to="/cart" className="menu-link">Cart</Link>
                <Link to="/orders" className="menu-link">Orders</Link>
                <Link to="/coupons" className="menu-link">Coupons</Link>
                <Link to="/tips" className="menu-link">Tips</Link>
                <Link to="/profile" className="menu-link">My Profile</Link>

                <div className="menu-divider" />

                {!user ? (
                  <Link to="/signin" className="menu-link menu-strong">Sign In</Link>
                ) : (
                  <button type="button" className="menu-link menu-strong menu-button" onClick={() => setUser(null)}>
                    Sign Out
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
