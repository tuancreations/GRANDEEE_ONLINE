import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import Hamburger from './Hamburger';
import Logo from './Logo';
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

        <Link to="/" className="logo-link">
          <Logo className="logo" />
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
            <button className="search-button" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </div>
        )}

        <div className="header-actions" ref={menuRef}>
          <button type="button" className="icon-action" aria-label="Notifications">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>
          <Hamburger isOpen={isMenuOpen} onClick={() => setIsMenuOpen((prev) => !prev)} />
          <Link to="/profile" className="icon-action" aria-label="Account">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21a8 8 0 0 1 16 0" />
            </svg>
          </Link>

          {isMenuOpen && (
            <div className="menu-panel">
              <Link to={dashboardPath} className="menu-link">Dashboard</Link>
              <Link to="/shops" className="menu-link">All Shops</Link>
              <Link to="/cart" className="menu-link">Cart</Link>
              <Link to="/wishlist" className="menu-link">Wishlist</Link>
              <Link to="/orders" className="menu-link">Orders</Link>
              <Link to="/help" className="menu-link">Help</Link>

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
    </header>
  );
};

export default Header;
