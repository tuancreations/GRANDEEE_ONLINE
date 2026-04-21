import { useApp } from '../contexts/AppContext';
import './UtilityPages.css';

const Orders = () => {
  const { user } = useApp();

  return (
    <div className="utility-page">
      <div className="utility-container">
        <h1>Manage Orders</h1>
        <p className="utility-subtitle">Track requests, scheduled delivery updates, and completed purchases.</p>

        <div className="utility-grid">
          <article className="utility-card">
            <h3>Pending Requests</h3>
            <p>Orders waiting for seller approval or delivery date confirmation.</p>
          </article>
          <article className="utility-card">
            <h3>Scheduled Orders</h3>
            <p>Orders accepted by the seller with a confirmed delivery timeline.</p>
          </article>
          <article className="utility-card">
            <h3>Completed Orders</h3>
            <p>Successfully delivered or collected via Auto-Guide pickup.</p>
          </article>
        </div>

        <small className="utility-note">
          {user?.role === 'seller'
            ? 'Seller view can be expanded with fulfillment controls and dispatch updates.'
            : 'Buyer view focuses on order status and communication follow-up.'}
        </small>
      </div>
    </div>
  );
};

export default Orders;
