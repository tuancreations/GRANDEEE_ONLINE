import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { mockProducts, mockShops, categories } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = () => {
  const {
    user,
    searchQuery,
    selectedCategory,
    setSelectedCategory,
    buyerMarketPartition
  } = useApp();
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [activeView, setActiveView] = useState<'buyer' | 'seller'>(user?.role ?? 'buyer');

  useEffect(() => {
    let results = mockProducts;

    results = results.filter((product) => {
      const shop = mockShops.find((item) => item.id === product.shopId);
      if (!shop) return false;

      if (buyerMarketPartition === 'retail') {
        return shop.segment === 'retailer';
      }

      if (buyerMarketPartition === 'manufacturer-distributor') {
        return shop.segment === 'manufacturer-distributor';
      }

      if (buyerMarketPartition === 'wholesale-farmer') {
        return shop.segment === 'wholesale-farmer';
      }

      if (buyerMarketPartition === 'professional-services') {
        return shop.segment === 'professional-services';
      }

      return shop.segment === 'institution';
    });

    if (selectedCategory !== 'All Categories') {
      results = results.filter(p => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      results = results.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(results);
  }, [searchQuery, selectedCategory, buyerMarketPartition]);

  useEffect(() => {
    setActiveView(user?.role ?? 'buyer');
  }, [user?.role]);

  const primaryAction = activeView === 'buyer' ? '/shops' : '/seller/dashboard';
  const primaryActionLabel = activeView === 'buyer' ? 'Find sellers' : 'Manage listings';
  const secondaryAction = activeView === 'buyer' ? '/seller/dashboard' : '/shops';
  const secondaryActionLabel = activeView === 'buyer' ? 'Open seller tools' : 'Switch to buyer view';
  const isSellerMode = activeView === 'seller';
  const hasSellerAccess = user?.role === 'seller';

  return (
    <div className="home-page">
      <section className="hero-section dashboard-hero">
        <div className="hero-content">
          <p className="hero-kicker">Welcome to Grandee Online!</p>
          <h1 className="hero-title">Buy and Sell instantly from one place</h1>
          {activeView === 'buyer' ? (
            <p className="hero-subtitle">Discover products, request quotes, and manage orders instantly.</p>
          ) : (
            <p className="hero-subtitle">List products, respond to quotes, and dispatch orders efficiently.</p>
          )}
          <div className="dashboard-mode-switch" role="tablist" aria-label="Marketplace dashboard mode">
            <button
              type="button"
              className={`mode-chip ${activeView === 'buyer' ? 'active' : ''}`}
              onClick={() => setActiveView('buyer')}
            >
              Buyer view
            </button>
            <button
              type="button"
              className={`mode-chip ${activeView === 'seller' ? 'active' : ''}`}
              onClick={() => setActiveView('seller')}
            >
              Seller view
            </button>
          </div>
          <div className="hero-features">
            {activeView === 'buyer' ? (
              <>
                <div className="feature-badge">Search products</div>
                <div className="feature-badge">Chat sellers live</div>
                <div className="feature-badge">Delivery handled for you</div>
              </>
            ) : (
              <>
                <div className="feature-badge">List products</div>
                <div className="feature-badge">Chat with buyers</div>
                <div className="feature-badge">Manage dispatch & delivery</div>
              </>
            )}
          </div>

          <div className="hero-actions">
            <Link to={primaryAction} className="hero-primary-cta">{primaryActionLabel}</Link>
            <Link to={secondaryAction} className="hero-secondary-cta">{secondaryActionLabel}</Link>
          </div>
          <p className="dashboard-help"><Link to="/help">Need help using the dashboard?</Link></p>
        </div>
      </section>

      {isSellerMode ? (
        <section className="seller-gateway-section">
          <div className="seller-gateway-card">
            <p className="seller-gateway-kicker">Seller access only</p>
            <h2>{hasSellerAccess ? 'Open your real seller dashboard' : 'Register or log in as a seller to continue'}</h2>
            <p>
              Seller mode is reserved for managing listings, storefront links, analytics, and buyer update channels.
              Market listings stay hidden here so you can focus on seller tools.
            </p>

            <div className="seller-gateway-features">
              <span>Website & social links</span>
              <span>Performance analytics</span>
              <span>Buyer update channels</span>
              <span>Listing management</span>
            </div>

            <div className="seller-gateway-actions">
              {hasSellerAccess ? (
                <Link to="/seller/dashboard" className="hero-primary-cta">Go to Seller Dashboard</Link>
              ) : (
                <>
                  <Link to="/signin" className="hero-primary-cta">Seller Login</Link>
                  <Link to="/signup" className="hero-secondary-cta">Register as Seller</Link>
                </>
              )}
            </div>

            <p className="seller-gateway-note">
              Need help setting up your seller account? <Link to="/help">Read the seller guide</Link>
            </p>
          </div>
        </section>
      ) : (
        <>
          <section className="categories-section">
            <div className="categories-scroll">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>

          <section className="products-section">
            <h2 className="section-title">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Marketplace Listings'}
            </h2>
            <p className="partition-note">
              Quick notes: retail shows instant quotes; request-order requires approval. <Link to="/help">More</Link>
            </p>

            {filteredProducts.length === 0 ? (
              <div className="no-results">
                <p>No listings match your search. Try another keyword or category.</p>
              </div>
            ) : (
              <div className="products-grid">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </section>

          <section className="shops-preview">
            <div className="section-header">
              <h2 className="section-title">Top Verified Sellers</h2>
              <Link to="/shops" className="view-all-link">Compare Sellers and Request Quotes →</Link>
            </div>
            <div className="shops-grid">
              {mockShops.slice(0, 4).map(shop => (
                <Link to={`/shop/${shop.id}`} key={shop.id} className="shop-preview-card">
                  <img src={shop.avatar} alt={shop.name} className="shop-avatar" />
                  <div className="shop-info">
                    <div className="shop-header">
                      <h3>{shop.name}</h3>
                      {shop.verified && (
                        <svg className="verified-badge" width="18" height="18" viewBox="0 0 24 24" fill="#ff6b35">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>
                    <p className="shop-description">{shop.description}</p>
                    <div className="shop-stats">
                      <span className="rating">★ {shop.rating}</span>
                      <span className="reviews">({shop.reviews} buyer reviews)</span>
                      <span className={`status ${shop.online ? 'online' : 'offline'}`}>
                        {shop.online ? 'Available now' : 'Currently offline'}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Home;
