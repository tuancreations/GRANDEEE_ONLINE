import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { mockProducts, mockShops, categories } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = () => {
  const { searchQuery, selectedCategory, setSelectedCategory } = useApp();
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

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

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Discover Global Shopping</h1>
          <p className="hero-subtitle">
            Connect with verified vendors worldwide. Real-time communication, verified locations, transparent pricing.
          </p>
          <div className="hero-features">
            <div className="feature-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              GPS Verified Locations
            </div>
            <div className="feature-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Real-Time Communication
            </div>
            <div className="feature-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Voice & Video Calls
            </div>
          </div>
        </div>
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
          {searchQuery ? `Search Results for "${searchQuery}"` : 'Featured Products'}
        </h2>

        {filteredProducts.length === 0 ? (
          <div className="no-results">
            <p>No products found. Try a different search or category.</p>
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
          <h2 className="section-title">Top Verified Shops</h2>
          <Link to="/shops" className="view-all-link">View All Shops →</Link>
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
                  <span className="reviews">({shop.reviews} reviews)</span>
                  <span className={`status ${shop.online ? 'online' : 'offline'}`}>
                    {shop.online ? 'Online' : 'Offline'}
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
