import { Link } from 'react-router-dom';
import { mockShops } from '../data/mockData';
import './AllShops.css';

const AllShops = () => {
  return (
    <div className="all-shops-page">
      <div className="all-shops-container">
        <div className="page-header">
          <h1>All Verified Shops</h1>
          <p>Browse our global network of verified vendors</p>
        </div>

        <div className="shops-list">
          {mockShops.map(shop => (
            <Link to={`/shop/${shop.id}`} key={shop.id} className="shop-card">
              <div className="shop-card-header">
                <img src={shop.avatar} alt={shop.name} className="shop-card-avatar" />
                {shop.online && <span className="online-dot">●</span>}
              </div>

              <div className="shop-card-body">
                <div className="shop-card-title">
                  <h2>{shop.name}</h2>
                  {shop.verified && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#ff6b35">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>

                <p className="shop-card-description">{shop.description}</p>

                <div className="shop-card-location">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{shop.location.country}</span>
                </div>

                <div className="shop-card-stats">
                  <div className="stat">
                    <span className="stat-value">★ {shop.rating}</span>
                    <span className="stat-label">Rating</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">{shop.reviews}</span>
                    <span className="stat-label">Reviews</span>
                  </div>
                  <div className="stat">
                    <span className={`stat-badge ${shop.online ? 'online' : 'offline'}`}>
                      {shop.online ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>

                <button className="contact-btn">
                  View Shop & Contact
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllShops;
