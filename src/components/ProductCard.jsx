import { Link } from 'react-router-dom';
import { mockShops } from '../data/mockData';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const shop = mockShops.find(s => s.id === product.shopId);

  return (
    <div className="product-card">
      <Link to={`/shop/${shop.id}`} className="product-image-link">
        <img src={product.image} alt={product.name} className="product-image" />
        {product.inStock && <span className="in-stock-badge">In Stock</span>}
      </Link>

      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>

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
          View Shop & Contact
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
