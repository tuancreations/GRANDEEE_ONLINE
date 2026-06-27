import { Link } from 'react-router-dom';
import { mockShops } from '../data/mockData';
import type { Product } from '../data/mockData';
import { useApp } from '../contexts/AppContext';
import './ProductCard.css';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, toggleWishlist, isInWishlist, getManagedShop } = useApp();
  const shop = getManagedShop(product.shopId) ?? mockShops.find(s => s.id === product.shopId);

  if (!shop) {
    return null;
  }

  const shopSegmentLabel = shop.segment ? shop.segment.replace('-', ' ') : 'Seller';
  const isRequestOrder = shop.tradeMode === 'request';
  const wishlistActive = isInWishlist(product.id);
  void shopSegmentLabel;

  return (
    <div className="product-card">
      <Link to={`/shop/${shop.id}`} className="product-image-link">
        <img src={product.image} alt={product.name} className="product-image" />
      </Link>
      <button
        type="button"
        className={`product-wishlist ${wishlistActive ? 'active' : ''}`}
        onClick={() => toggleWishlist(product.id)}
        aria-label={wishlistActive ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        ♡
      </button>

      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>

        <Link to={`/shop/${shop.id}`} className="shop-link">
          <span>{shop.name}</span>
          {shop.verified && (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#1976d2">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </Link>

        <div className="product-price">
          <span className="price-value">
            {product.currency === 'USD' ? '$' : `${product.currency} `}{product.price.toLocaleString()}
          </span>
        </div>

        <p className="product-rating">★ 4.{product.id % 7 + 2} ({120 + product.id * 35})</p>

        <div className="product-quick-actions">
          <button onClick={() => addToCart(product.id)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 2-1.6L23 6H6" />
            </svg>
            {isRequestOrder ? 'Request' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
