import './UtilityPages.css';

const Tips = () => {
  return (
    <div className="utility-page">
      <div className="utility-container">
        <h1>Trading Tips</h1>
        <p className="utility-subtitle">Quick guidance for smarter negotiations and safer order completion.</p>

        <div className="utility-grid">
          <article className="utility-card">
            <h3>Before Negotiation</h3>
            <p>Confirm product quality, quantity, and seller segment before sending a request.</p>
          </article>
          <article className="utility-card">
            <h3>During Negotiation</h3>
            <p>Agree on pricing, fulfillment owner, and delivery or pickup mode clearly in chat.</p>
          </article>
          <article className="utility-card">
            <h3>After Agreement</h3>
            <p>Track seller confirmation for request-order listings and monitor order status updates.</p>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Tips;
