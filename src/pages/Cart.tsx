import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, getProductById, updateCartQuantity, removeFromCart } = useApp();

  const cartRows = cartItems
    .map((item) => {
      const product = getProductById(item.productId);
      if (!product) return null;
      return { ...item, product };
    })
    .filter((row): row is { productId: number; quantity: number; product: NonNullable<ReturnType<typeof getProductById>> } => Boolean(row));

  const grandTotal = cartRows.reduce((sum, row) => sum + row.quantity * row.product.price, 0);

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1>Cart</h1>
          <p>Review selected products before negotiation and order confirmation.</p>
        </div>

        {cartRows.length === 0 ? (
          <div className="empty-state">
            <p>Your cart is empty.</p>
            <Link to="/" className="empty-cta">Back to Dashboard</Link>
          </div>
        ) : (
          <>
            <div className="cart-list">
              {cartRows.map((row) => (
                <article key={row.productId} className="cart-item">
                  <img src={row.product.image} alt={row.product.name} className="cart-image" />
                  <div className="cart-details">
                    <h3>{row.product.name}</h3>
                    <p>{row.product.category}</p>
                    <strong>{row.product.currency} {row.product.price.toLocaleString()}</strong>
                  </div>
                  <div className="cart-actions">
                    <div className="qty-control">
                      <button onClick={() => updateCartQuantity(row.productId, row.quantity - 1)}>-</button>
                      <span>{row.quantity}</span>
                      <button onClick={() => updateCartQuantity(row.productId, row.quantity + 1)}>+</button>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(row.productId)}>Remove</button>
                  </div>
                </article>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Total</h2>
              <p>{grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              <small>Currency may vary by product. Confirm final pricing in seller negotiation.</small>
              <Link to="/shops" className="checkout-btn">Proceed to Seller Negotiation</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
