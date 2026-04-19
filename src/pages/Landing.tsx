import { Link } from "react-router-dom";
import logoImg from "../assets/grandee-online-logo.jpeg";
import "./Landing.css";

const Landing = () => {
  return (
    <div className="landing-page">
      <section className="landing-hero">
        <div className="landing-hero-left">
          <p className="landing-kicker">B2B and Retail Marketplace</p>

          <h1 className="landing-title">
            Buy Better.
            <span> Sell Faster.</span>
          </h1>

          <p className="landing-subtitle">
            Grandee Online helps buyers request quotes from trusted sellers and helps
            sellers publish listings that convert into real orders.
          </p>

          <div className="landing-actions">
            <Link to="/signup" className="landing-btn landing-btn-primary">
              Create Account
            </Link>
            <Link to="/shops" className="landing-btn landing-btn-ghost">
              Browse Sellers
            </Link>
            <Link to="/signin" className="landing-btn landing-btn-secondary">
              Sign In
            </Link>
          </div>

          <div className="landing-trust-row">
            <article>
              <h3>2.4k+</h3>
              <p>Monthly quote requests</p>
            </article>
            <article>
              <h3>780+</h3>
              <p>Verified sellers</p>
            </article>
            <article>
              <h3>96%</h3>
              <p>Deal response rate</p>
            </article>
          </div>
        </div>

        <div className="landing-hero-right">
          <div className="hero-orb">
            <img src={logoImg} alt="Grandee Online Logo" className="hero-orb-logo" />
            <div className="hero-orb-card top">
              <p>Incoming RFQ</p>
              <strong>Solar Inverter x 250 Units</strong>
              <span>Buyer requested delivery in 14 days</span>
            </div>
            <div className="hero-orb-card bottom">
              <p>Seller Conversion</p>
              <strong>+38% this month</strong>
              <span>Listings with clear MOQ convert faster</span>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-highlights">
        <article className="highlight-card">
          <h3>Discover Reliable Suppliers</h3>
          <p>
            Filter sellers by category, location, response speed, and buyer
            reviews to shortlist better partners quickly.
          </p>
        </article>
        <article className="highlight-card">
          <h3>Request Quotes in Minutes</h3>
          <p>
            Start a chat or call, confirm MOQ, delivery timeline, and pricing,
            then compare offers before placing your order.
          </p>
        </article>
        <article className="highlight-card">
          <h3>Turn Listings into Revenue</h3>
          <p>
            Sellers can publish offers, manage inventory, and respond to buyer
            inquiries from one simple dashboard.
          </p>
        </article>
      </section>

      <section className="landing-journey">
        <div className="journey-copy">
          <p className="landing-kicker">How It Works</p>
          <h2>Built for both buyers and sellers</h2>
        </div>

        <div className="journey-columns">
          <article className="journey-card">
            <h3>For Buyers</h3>
            <ol>
              <li>Create your account and choose product categories.</li>
              <li>Review verified seller profiles and active listings.</li>
              <li>Request quotes and negotiate payment/delivery terms.</li>
              <li>Confirm the best offer and place your order.</li>
            </ol>
          </article>

          <article className="journey-card">
            <h3>For Sellers</h3>
            <ol>
              <li>Set up your storefront and verification details.</li>
              <li>Publish listings with price, stock, and MOQ.</li>
              <li>Respond to buyer quote requests quickly.</li>
              <li>Close deals and track repeat buyers.</li>
            </ol>
          </article>
        </div>
      </section>

      <section className="landing-cta">
        <h2>Ready to Launch Your Marketplace Journey?</h2>
        <p>
          Join Grandee Online today and start requesting quotes or receiving buyer
          inquiries in your first session.
        </p>

        <Link to="/signup" className="landing-btn landing-btn-light">
          Get Started Now
        </Link>
      </section>
    </div>
  );
};

export default Landing;
