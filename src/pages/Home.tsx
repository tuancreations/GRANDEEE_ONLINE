import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { mockProducts, mockShops, categories } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import onlineImage from '../assets/online.jpeg';
import './Home.css';

const sellerTypes = [
  { label: 'Retailers', icon: 'bag' },
  { label: 'Manufacturers', icon: 'factory' },
  { label: 'Farmers', icon: 'leaf' },
  { label: 'Professional Services', icon: 'briefcase' },
  { label: 'Institutions', icon: 'bank' },
  { label: 'Distributors', icon: 'truck' }
];

const categoryIcons: Record<string, string> = {
  Electronics: 'phone',
  Fashion: 'dress',
  'Home & Living': 'sofa',
  Beauty: 'bottle',
  Sports: 'ball',
  'Food & Beverages': 'burger',
  Toys: 'toy',
  Books: 'book',
  'Professional Services': 'briefcase',
  Institutions: 'bank'
};

const formatPrice = (currency: string, price: number) => {
  if (currency === 'USD') return `$${price.toLocaleString()}`;
  return `${currency} ${price.toLocaleString()}`;
};

const Home = () => {
  const {
    user,
    searchQuery,
    selectedCategory,
    setSelectedCategory,
    getManagedShop,
    buyerMarketPartition
  } = useApp();
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [activeView, setActiveView] = useState<'buyer' | 'seller'>(user?.role ?? 'buyer');

  useEffect(() => {
    let results = mockProducts;

    results = results.filter((product) => {
      const shop = getManagedShop(product.shopId);
      if (!shop) return false;

      if (buyerMarketPartition === 'retail') return shop.segment === 'retailer';
      if (buyerMarketPartition === 'manufacturer-distributor') return shop.segment === 'manufacturer-distributor';
      if (buyerMarketPartition === 'wholesale-farmer') return shop.segment === 'wholesale-farmer';
      if (buyerMarketPartition === 'professional-services') return shop.segment === 'professional-services';
      return shop.segment === 'institution';
    });

    if (selectedCategory !== 'All Categories') {
      results = results.filter((product) => product.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      results = results.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(results);
  }, [searchQuery, selectedCategory, buyerMarketPartition, getManagedShop]);

  useEffect(() => {
    setActiveView(user?.role ?? 'buyer');
  }, [user?.role]);

  const featuredProducts = filteredProducts.slice(0, 4);
  const trendingProducts = useMemo(() => mockProducts.slice(0, 6), []);
  const recentlyViewed = useMemo(() => mockProducts.slice(3, 9), []);
  const visibleCategories = categories.filter((category) => category !== 'All Categories').slice(0, 8);
  const hasSellerAccess = user?.role === 'seller';

  if (activeView === 'seller') {
    return (
      <div className="home-page app-storefront">
        <section className="seller-gateway-section">
          <div className="seller-gateway-card">
            <p className="seller-gateway-kicker">Seller access</p>
            <h1>{hasSellerAccess ? 'Open your seller dashboard' : 'Register or log in as a seller'}</h1>
            <p>
              Manage product listings, storefront links, buyer messages, and delivery updates from one focused dashboard.
            </p>
            <div className="seller-gateway-actions">
              {hasSellerAccess ? (
                <Link to="/seller/dashboard" className="hero-primary-cta">Go to Dashboard</Link>
              ) : (
                <>
                  <Link to="/signin" className="hero-primary-cta">Seller Login</Link>
                  <Link to="/signup" className="hero-secondary-cta">Register</Link>
                </>
              )}
            </div>
            <button type="button" className="buyer-return" onClick={() => setActiveView('buyer')}>
              Return to shopping
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="home-page app-storefront">
      <section className="commerce-hero" aria-label="Grandee worldwide marketplace">
        <div className="hero-copy">
          <h1>Buy &amp; Sell <span>Worldwide</span></h1>
          <p>Discover millions of products from verified sellers.</p>
          <div className="hero-actions">
            <Link to="/shops" className="hero-primary-cta">Shop Now</Link>
            <button type="button" className="hero-secondary-cta" onClick={() => setActiveView('seller')}>
              Become a Seller
            </button>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <img src={onlineImage} alt="Grandee marketplace" className="hero-image" />
        </div>
      </section>

      <div className="carousel-dots" aria-hidden="true">
        <span className="active" />
        <span />
        <span />
      </div>

      <section className="mobile-section">
        <div className="mobile-section-header">
          <h2>Shop by Sellers</h2>
          <Link to="/shops">View all</Link>
        </div>
        <div className="icon-row">
          {sellerTypes.map((seller) => (
            <Link to="/shops" className="icon-tile" key={seller.label}>
              <span className={`tile-icon icon-${seller.icon}`} aria-hidden="true" />
              <span>{seller.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mobile-section">
        <div className="mobile-section-header">
          <h2>Shop by Categories</h2>
          <Link to="/shops">View all</Link>
        </div>
        <div className="icon-row">
          {visibleCategories.map((category) => (
            <button
              key={category}
              className={`icon-tile ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
              type="button"
            >
              <span className={`tile-icon icon-${categoryIcons[category] ?? 'bag'}`} aria-hidden="true" />
              <span>{category}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="mobile-section">
        <div className="mobile-section-header">
          <h2>Featured Products</h2>
          <Link to="/shops">View all</Link>
        </div>
        {featuredProducts.length === 0 ? (
          <div className="no-results">
            <p>No listings match your search. Try another keyword or category.</p>
          </div>
        ) : (
          <div className="featured-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="mobile-section">
        <div className="mobile-section-header">
          <h2>Top Sellers</h2>
          <Link to="/shops">View all</Link>
        </div>
        <div className="seller-strip">
          {mockShops.slice(0, 4).map((shop) => {
            const managedShop = getManagedShop(shop.id) ?? shop;
            return (
              <Link to={`/shop/${shop.id}`} key={shop.id} className="seller-card">
                <img src={managedShop.avatar} alt={managedShop.name} />
                <div>
                  <h3>{managedShop.name}</h3>
                  <p><strong>{managedShop.rating}</strong> ★</p>
                  <span>{managedShop.reviews.toLocaleString()} Products</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mobile-section">
        <div className="mobile-section-header">
          <h2>Trending Products</h2>
          <Link to="/shops">View all</Link>
        </div>
        <div className="mini-product-row">
          {trendingProducts.map((product) => (
            <Link to={`/shop/${product.shopId}`} className="mini-product" key={product.id}>
              <img src={product.image} alt={product.name} />
              <button type="button" aria-label="Add to wishlist">♡</button>
              <strong>{formatPrice(product.currency, product.price)}</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="mobile-section last-section">
        <div className="mobile-section-header">
          <h2>Recently Viewed</h2>
        </div>
        <div className="mini-product-row">
          {recentlyViewed.map((product) => (
            <Link to={`/shop/${product.shopId}`} className="mini-product" key={product.id}>
              <img src={product.image} alt={product.name} />
              <button type="button" aria-label="Add to wishlist">♡</button>
              <strong>{formatPrice(product.currency, product.price)}</strong>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
