import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import type { BuyerMarketPartition } from '../contexts/AppContext';
import './MarketplaceFooter.css';

const segmentOptions: Array<{ value: BuyerMarketPartition; label: string }> = [
  { value: 'retail', label: 'Retail' },
  { value: 'manufacturer-distributor', label: 'Manufacturers' },
  { value: 'wholesale-farmer', label: 'Wholesale Farmers' },
  { value: 'professional-services', label: 'Professional Services' },
  { value: 'institution', label: 'Institutions' }
];

const MarketplaceFooter = () => {
  const {
    user,
    buyerMarketPartition,
    setBuyerMarketPartition,
    cartCount,
    wishlistCount
  } = useApp();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  if (user?.role === 'seller') {
    return (
      <footer className="market-footer seller-footer">
        <div className="market-footer-inner">
          <p>Seller tools: manage listings, reply to requests, and monitor fulfillment from your dashboard.</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="market-footer">
      <div className="market-footer-inner">
        <div className="footer-quick-links">
          <Link to="/">Dashboard</Link>
          <Link to="/wishlist">Shopping List {wishlistCount > 0 ? `(${wishlistCount})` : ''}</Link>
          <Link to="/cart">Cart {cartCount > 0 ? `(${cartCount})` : ''}</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/coupons">Coupons</Link>
          <Link to="/tips">Tips</Link>

          <div className="profile-dropdown">
            <button onClick={() => setIsProfileOpen((prev) => !prev)}>
              My Profile
            </button>
            {isProfileOpen && (
              <div className="profile-menu">
                <Link to="/profile" onClick={() => setIsProfileOpen(false)}>Profile Overview</Link>
                <Link to="/orders" onClick={() => setIsProfileOpen(false)}>Manage Orders</Link>
                <Link to="/wishlist" onClick={() => setIsProfileOpen(false)}>Shopping List</Link>
                <Link to="/tips" onClick={() => setIsProfileOpen(false)}>Tips</Link>
                <Link to="/coupons" onClick={() => setIsProfileOpen(false)}>Coupons</Link>
              </div>
            )}
          </div>
        </div>

        <div className="footer-partitions">
          {segmentOptions.map((segment) => (
            <button
              key={segment.value}
              className={`partition-button ${buyerMarketPartition === segment.value ? 'active' : ''}`}
              onClick={() => setBuyerMarketPartition(segment.value)}
            >
              {segment.label}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default MarketplaceFooter;
