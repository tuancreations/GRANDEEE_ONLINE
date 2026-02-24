import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { mockShops, mockProducts } from '../data/mockData';
import CommunicationPanel from '../components/CommunicationPanel';
import './ShopDetail.css';

const ShopDetail = () => {
  const { id } = useParams();
  const { activeCommunication, sellerLocation } = useApp();
  const [shop, setShop] = useState(null);
  const [shopProducts, setShopProducts] = useState([]);
  const [showMap, setShowMap] = useState(true);

  useEffect(() => {
    const foundShop = mockShops.find(s => s.id === parseInt(id));
    setShop(foundShop);
    if (foundShop) {
      setShopProducts(mockProducts.filter(p => p.shopId === foundShop.id));
    }
  }, [id]);

  if (!shop) {
    return (
      <div className="shop-detail-page">
        <div className="not-found">Shop not found</div>
      </div>
    );
  }

  const handleNavigate = () => {
    const { lat, lng } = shop.location.coordinates;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
  };

  const currentLocation = activeCommunication ? sellerLocation || shop.location.coordinates : shop.location.coordinates;

  return (
    <div className="shop-detail-page">
      <div className="shop-detail-container">
        <div className="shop-header-section">
          <Link to="/" className="back-link">← Back to Home</Link>

          <div className="shop-header-card">
            <img src={shop.avatar} alt={shop.name} className="shop-avatar-large" />
            <div className="shop-header-info">
              <div className="shop-title-row">
                <h1>{shop.name}</h1>
                {shop.verified && (
                  <svg className="verified-icon" width="28" height="28" viewBox="0 0 24 24" fill="#ff6b35">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                <span className={`shop-status ${shop.online ? 'online' : 'offline'}`}>
                  {shop.online ? '● Online' : '● Offline'}
                </span>
              </div>

              <p className="shop-description-text">{shop.description}</p>

              <div className="shop-meta">
                <div className="meta-item">
                  <span className="rating-large">★ {shop.rating}</span>
                  <span className="reviews-text">({shop.reviews} reviews)</span>
                </div>
                <div className="meta-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{shop.location.country}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="shop-content">
          <div className="main-content">
            <section className="location-section">
              <div className="section-header-with-action">
                <h2>Shop Location</h2>
                <button onClick={handleNavigate} className="navigate-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Navigate to Shop
                </button>
              </div>

              <div className="location-info">
                <p className="address">{shop.location.address}</p>
                <p className="coordinates">
                  GPS: {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
                  {activeCommunication && (
                    <span className="live-indicator">● LIVE</span>
                  )}
                </p>
              </div>

              {showMap && (
                <div className="map-container">
                  <div className="map-placeholder">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <p>Interactive Map</p>
                    <p className="map-note">
                      Location: {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
                    </p>
                    {activeCommunication && (
                      <p className="tracking-note">
                        Real-time seller location tracking active
                      </p>
                    )}
                    <button onClick={handleNavigate} className="open-maps-btn">
                      Open in Google Maps
                    </button>
                  </div>
                </div>
              )}
            </section>

            <section className="products-section">
              <h2>Available Products</h2>
              {shopProducts.length > 0 ? (
                <div className="products-list">
                  {shopProducts.map(product => (
                    <div key={product.id} className="product-item">
                      <img src={product.image} alt={product.name} className="product-thumbnail" />
                      <div className="product-item-details">
                        <h3>{product.name}</h3>
                        <p className="product-category">{product.category}</p>
                        <p className="product-price">
                          {product.currency} {product.price.toLocaleString()}
                        </p>
                      </div>
                      {product.inStock && (
                        <span className="stock-badge">In Stock</span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-products">No products available from this shop.</p>
              )}
            </section>
          </div>

          <div className="sidebar">
            <CommunicationPanel shop={shop} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetail;
