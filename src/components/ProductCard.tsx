import { Link } from 'react-router-dom';
import { mockShops } from '../data/mockData';
import type { Product } from '../data/mockData';
import { useApp } from '../contexts/AppContext';
import './ProductCard.css';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, toggleWishlist, isInWishlist } = useApp();
  const shop = mockShops.find(s => s.id === product.shopId);

  if (!shop) {
    return null;
  }

  const isRequestOrder = shop.tradeMode === 'request';
  const wishlistActive = isInWishlist(product.id);

  return (
    <div className="product-card">
      <Link to={`/shop/${shop.id}`} className="product-image-link">
        <img src={product.image} alt={product.name} className="product-image" />
        {product.inStock && <span className="in-stock-badge">In Stock</span>}
      </Link>

      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>

        <div className="product-tags">
          <span className="product-tag">{shop.segment.replace('-', ' ')}</span>
          {isRequestOrder && <span className="product-tag request">Order request</span>}
          {product.minimumOrderQty && <span className="product-tag">MOQ {product.minimumOrderQty}</span>}
        </div>

        <div className="product-price">
          <span className="price-value">
            {product.currency} {product.price.toLocaleString()}
          </span>
        </div>

        <Link to={`/shop/${shop.id}`} className="shop-link">
          <img src={shop.avatar} alt={shop.name} className="shop-avatar-small" />
          <span>{shop.name}</span>
          {shop.verified && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#ff6b35">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </Link>

        <Link to={`/shop/${shop.id}`} className="view-shop-btn">
          {isRequestOrder ? 'Place Order Request' : 'Request Quote / Negotiate'}
        </Link>

        <div className="product-quick-actions">
          <button onClick={() => addToCart(product.id)}>Add to Cart</button>
          <button className={wishlistActive ? 'active' : ''} onClick={() => toggleWishlist(product.id)}>
            {wishlistActive ? 'In Wishlist' : 'Wishlist'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
