import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { mockShops, mockProducts } from '../data/mockData';
import type { Product, Shop } from '../data/mockData';
import CommunicationPanel from '../components/CommunicationPanel';
import './ShopDetail.css';

const ShopDetail = () => {
  const { id } = useParams();
  const { activeCommunication, sellerLocation } = useApp();
  const [shop, setShop] = useState<Shop | null>(null);
  const [shopProducts, setShopProducts] = useState<Product[]>([]);
  const [fulfillmentMode, setFulfillmentMode] = useState<'grandee' | 'seller'>('grandee');
  const [completionMode, setCompletionMode] = useState<'delivery' | 'pickup'>('delivery');

  useEffect(() => {
    const shopId = Number(id);
    if (Number.isNaN(shopId)) {
      setShop(null);
      setShopProducts([]);
      return;
    }

    const foundShop = mockShops.find((s) => s.id === shopId);
    setShop(foundShop ?? null);
    if (foundShop) {
      setShopProducts(mockProducts.filter((p) => p.shopId === foundShop.id));
    } else {
      setShopProducts([]);
    }
  }, [id]);

  if (!shop) {
    return (
      <div className="shop-detail-page">
        <div className="not-found">Seller profile not found</div>
      </div>
    );
  }

  const handleNavigate = () => {
    const { lat, lng } = shop.location.coordinates;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
  };

  const isLiveForShop = activeCommunication?.shop.id === shop.id;
  const currentLocation = isLiveForShop ? sellerLocation || shop.location.coordinates : shop.location.coordinates;

  return (
    <div className="shop-detail-page">
      <div className="shop-detail-container">
        <div className="shop-header-section">
          <Link to="/shops" className="back-link">← Back to Seller Directory</Link>

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
                <h2>Seller Location</h2>
                <button onClick={handleNavigate} className="navigate-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Get Directions
                </button>
              </div>

              <div className="location-info">
                <p className="address">{shop.location.address}</p>
                <p className="coordinates">
                  GPS: {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
                  {isLiveForShop && (
                    <span className="live-indicator">● LIVE</span>
                  )}
                </p>
              </div>

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
                  {isLiveForShop && (
                    <p className="tracking-note">
                        Live seller location sharing is active during this session
                    </p>
                  )}
                  <button onClick={handleNavigate} className="open-maps-btn">
                    Open in Google Maps
                  </button>
                </div>
              </div>
            </section>

            <section className="order-completion-section">
              <h2>Complete This Order</h2>
              <p className="completion-subtitle">Choose how fulfillment should happen after negotiation.</p>

              <div className="completion-grid">
                <article className="completion-card">
                  <p className="completion-label">Step 1</p>
                  <h3>Pick fulfillment owner</h3>
                  <div className="completion-options">
                    <button
                      type="button"
                      className={`completion-option ${fulfillmentMode === 'grandee' ? 'active' : ''}`}
                      onClick={() => setFulfillmentMode('grandee')}
                    >
                      Grandee logistics
                    </button>
                    <button
                      type="button"
                      className={`completion-option ${fulfillmentMode === 'seller' ? 'active' : ''}`}
                      onClick={() => setFulfillmentMode('seller')}
                    >
                      Seller delivery
                    </button>
                  </div>
                </article>

                <article className="completion-card">
                  <p className="completion-label">Step 2</p>
                  <h3>Pick buyer completion mode</h3>
                  <div className="completion-options">
                    <button
                      type="button"
                      className={`completion-option ${completionMode === 'delivery' ? 'active' : ''}`}
                      onClick={() => setCompletionMode('delivery')}
                    >
                      Delivery
                    </button>
                    <button
                      type="button"
                      className={`completion-option ${completionMode === 'pickup' ? 'active' : ''}`}
                      onClick={() => setCompletionMode('pickup')}
                    >
                      Auto-Guide pickup
                    </button>
                  </div>
                </article>

                <article className="completion-card summary-card">
                  <p className="completion-label">Step 3</p>
                  <h3>Order summary</h3>
                  <p>
                    {fulfillmentMode === 'grandee' ? 'Grandee will collect and dispatch your goods.' : 'Seller will arrange dispatch with their preferred courier.'}
                  </p>
                  <p>
                    {completionMode === 'delivery' ? 'Buyer receives delivery at destination.' : 'Buyer will navigate and collect at seller location.'}
                  </p>
                  <button type="button" className="completion-cta">
                    Confirm trade path
                  </button>
                </article>
              </div>
            </section>

            <section className="products-section">
              <h2>Active Listings</h2>
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
                <p className="no-products">No active listings are available from this seller right now.</p>
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
