import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlistItems, getProductById, toggleWishlist, addToCart } = useApp();

  const rows = wishlistItems
    .map((id) => getProductById(id))
    .filter((item): item is NonNullable<ReturnType<typeof getProductById>> => Boolean(item));

  return (
    <div className="wishlist-page">
      <div className="wishlist-container">
        <div className="wishlist-header">
          <h1>Wishlist</h1>
          <p>Save products to compare before placing an order request.</p>
        </div>

        {rows.length === 0 ? (
          <div className="wishlist-empty">
            <p>No saved products yet.</p>
            <Link to="/" className="wishlist-cta">Explore Marketplace</Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {rows.map((product) => (
              <article key={product.id} className="wishlist-card">
                <img src={product.image} alt={product.name} className="wishlist-image" />
                <div className="wishlist-body">
                  <h3>{product.name}</h3>
                  <p>{product.category}</p>
                  <strong>{product.currency} {product.price.toLocaleString()}</strong>
                  <div className="wishlist-actions">
                    <button onClick={() => addToCart(product.id)}>Add to Cart</button>
                    <button className="ghost" onClick={() => toggleWishlist(product.id)}>Remove</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
