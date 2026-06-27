import { Link, useLocation } from 'react-router-dom';
import type { BuyerMarketPartition } from '../contexts/AppContext';
import { useApp } from '../contexts/AppContext';
import './MarketplaceFooter.css';

const segmentOptions: Array<{ value: BuyerMarketPartition; label: string }> = [
  { value: 'retail', label: 'Retail' },
  { value: 'manufacturer-distributor', label: 'Manufacturers' },
  { value: 'wholesale-farmer', label: 'Wholesale Farmers' },
  { value: 'professional-services', label: 'Professional Services' },
  { value: 'institution', label: 'Institutions' }
];

const MarketplaceFooter = () => {
  const { user, buyerMarketPartition, setBuyerMarketPartition } = useApp();
  const location = useLocation();

  const tabs = [
    { to: '/', label: 'Home', icon: 'home' },
    { to: '/shops', label: 'Explore', icon: 'search' },
    { to: '/wishlist', label: 'Wishlist', icon: 'heart' },
    { to: '/cart', label: 'Cart', icon: 'cart' },
    { to: '/profile', label: 'Account', icon: 'user' }
  ];

  return (
    <footer className={`market-footer ${user?.role === 'seller' ? 'seller-footer' : ''}`}>
      <div className="market-footer-inner">
        {user?.role === 'seller' ? (
          <p>Seller tools: manage listings, reply to requests, and monitor fulfillment from your dashboard.</p>
        ) : null}

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
        <nav className="mobile-tabbar" aria-label="Mobile navigation">
          {tabs.map((tab) => (
            <Link
              key={tab.to}
              to={tab.to}
              className={`mobile-tab ${location.pathname === tab.to ? 'active' : ''}`}
            >
              <span className={`tab-icon tab-${tab.icon}`} aria-hidden="true" />
              <span>{tab.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default MarketplaceFooter;
