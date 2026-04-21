import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { mockProducts, mockShops, categories } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = () => {
  const { user, searchQuery, selectedCategory, setSelectedCategory } = useApp();
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [activeView, setActiveView] = useState<'buyer' | 'seller'>(user?.role ?? 'buyer');

  useEffect(() => {
    let results = mockProducts;

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
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    setActiveView(user?.role ?? 'buyer');
  }, [user?.role]);

  const viewTitle = activeView === 'buyer' ? 'Buyer dashboard' : 'Seller dashboard';
  const viewSubtitle =
    activeView === 'buyer'
      ? 'Search, chat, and order from one simple screen.'
      : 'List products, answer requests, and hand over delivery.';
  const primaryAction = activeView === 'buyer' ? '/shops' : '/seller/dashboard';
  const primaryActionLabel = activeView === 'buyer' ? 'Find sellers' : 'Manage listings';
  const secondaryAction = activeView === 'buyer' ? '/seller/dashboard' : '/shops';
  const secondaryActionLabel = activeView === 'buyer' ? 'Open seller tools' : 'Switch to buyer view';
  const quickFlow =
    activeView === 'buyer'
      ? ['Search products', 'Negotiate in chat/voice/video', 'Choose delivery or pickup']
      : ['Publish listing in minutes', 'Reply to buyer requests', 'Choose fulfillment option'];

  return (
    <div className="home-page">
      <section className="hero-section dashboard-hero">
        <div className="hero-content">
          <p className="hero-kicker">Marketplace dashboard</p>
          <h1 className="hero-title">Trade from one simple dashboard.</h1>
          <p className="hero-subtitle">
            Find products, talk to sellers, and complete delivery without leaving the app.
          </p>
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
            <div className="feature-badge">
              Search products
            </div>
            <div className="feature-badge">
              Chat sellers live
            </div>
            <div className="feature-badge">
              Delivery handled for you
            </div>
          </div>

          <div className="quick-flow">
            {quickFlow.map((step, index) => (
              <div key={step} className="quick-flow-step">
                <span>{index + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>

          <div className="hero-actions">
            <Link to={primaryAction} className="hero-primary-cta">{primaryActionLabel}</Link>
            <Link to={secondaryAction} className="hero-secondary-cta">{secondaryActionLabel}</Link>
          </div>
        </div>

        <div className="hero-dashboard">
          <article className="dashboard-card dashboard-card-feature">
            <p>{viewTitle}</p>
            <strong>{activeView === 'buyer' ? '1. Search products' : '1. Add your listing'}</strong>
            <span>{viewSubtitle}</span>
          </article>
          <article className="dashboard-card dashboard-card-feature">
            <p>{activeView === 'buyer' ? 'Simple trade flow' : 'Simple seller flow'}</p>
            <strong>{activeView === 'buyer' ? '2. Chat and compare sellers' : '2. Reply, hold stock, dispatch'}</strong>
            <span>{activeView === 'buyer' ? 'Open a seller page, ask questions, and compare offers.' : 'See requests, confirm stock, and send orders to delivery.'}</span>
          </article>
          <article className="dashboard-card dashboard-card-logistics">
            <div className="logistics-header">
              <p>Delivery</p>
              <strong>3. We move the order</strong>
            </div>
            <div className="logistics-track">
              <div className="logistics-step active">
                <span>1</span>
                <div>
                  <strong>Order confirmed</strong>
                  <p>Price and quantity are agreed in chat.</p>
                </div>
              </div>
              <div className="logistics-step active">
                <span>2</span>
                <div>
                  <strong>Warehouse packed</strong>
                  <p>Goods are collected and prepared.</p>
                </div>
              </div>
              <div className="logistics-step">
                <span>3</span>
                <div>
                  <strong>Delivered</strong>
                  <p>The order reaches the buyer locally or abroad.</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="dashboard-rail">
        <article className="rail-card">
          <p className="rail-label">1. Search</p>
          <h3>Find products by category, seller, or location.</h3>
          <p>Start with what you need, then narrow down fast.</p>
        </article>
        <article className="rail-card">
          <p className="rail-label">2. Compare</p>
          <h3>Open seller pages and chat before you buy.</h3>
          <p>Ask about price, stock, and delivery in one place.</p>
        </article>
        <article className="rail-card">
          <p className="rail-label">3. Order</p>
          <h3>Confirm the deal and let logistics handle the rest.</h3>
          <p>Warehouse and delivery support stays built into the platform.</p>
        </article>
      </section>

      <section className="fulfillment-choice">
        <article className="choice-card">
          <p className="choice-label">Flexible fulfillment</p>
          <h3>Grandee-managed logistics</h3>
          <p>Collection, sorting, packaging, and delivery handled by Grandee.</p>
        </article>
        <article className="choice-card">
          <p className="choice-label">Flexible fulfillment</p>
          <h3>Seller-managed delivery</h3>
          <p>Seller uses their own rider, fleet, or courier partner.</p>
        </article>
        <article className="choice-card">
          <p className="choice-label">Auto-Guide</p>
          <h3>Pickup from physical shop</h3>
          <p>Buyer can navigate to the seller location and collect directly.</p>
        </article>
      </section>

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
    </div>
  );
};

export default Home;
