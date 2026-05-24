import './UtilityPages.css';

const Coupons = () => {
  return (
    <div className="utility-page">
      <div className="utility-container">
        <h1>Coupons</h1>
        <p className="utility-subtitle">Apply discounts to selected listings and save on recurring purchases.</p>

        <div className="utility-grid">
          <article className="utility-card">
            <h3>Marketplace Promotions</h3>
            <p>Platform-wide offers for verified sellers and selected categories.</p>
          </article>
          <article className="utility-card">
            <h3>Wholesale Discounts</h3>
            <p>Request-only volume discounts for manufacturers and wholesale farmers.</p>
          </article>
          <article className="utility-card">
            <h3>Service Offers</h3>
            <p>Limited-time rates for professional services and institutional packages.</p>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Coupons;
