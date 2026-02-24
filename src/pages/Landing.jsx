import { Link } from "react-router-dom";
import logoImg from "../assets/file_00000000b15871f48aee870982fc872f.png";
import "./Landing.css";

const Landing = () => {
  return (
    <div className="landing-page">

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">

          {/* Brand Logo */}
          <img src={logoImg} alt="Grandee Online" className="landing-logo" />

          <h1>
            Connect with Global Sellers,
            <span> Anytime, Anywhere</span>
          </h1>

          <p>
            Discover products from verified shops worldwide. Chat, call,
            and trade with confidence using real-time location tracking
            and transparent communication.
          </p>

          <div className="hero-buttons">
            <Link to="/home" className="primary-btn">
              Get Started →
            </Link>

            <Link to="/signin" className="secondary-btn">
              Sign In
            </Link>
          </div>
        </div>

        {/* Logo Highlight Circle */}
        <div className="hero-right">
          <div className="hero-circle">
            <img src={logoImg} alt="Grandee Logo" />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="feature-card">
          <h3>Instant Discovery</h3>
          <p>
            Search across thousands of global shops and find exactly
            what you need with powerful filters and real-time availability.
          </p>
        </div>

        <div className="feature-card">
          <h3>Direct Communication</h3>
          <p>
            Connect with sellers instantly using messaging, voice calls,
            and video calls. Share documents and media seamlessly.
          </p>
        </div>

        <div className="feature-card">
          <h3>Real-Time Location</h3>
          <p>
            View verified GPS coordinates and track seller locations.
            Navigate directly to physical shops with confidence.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Ready to Start Trading?</h2>
        <p>Join thousands of customers and sellers on Grandee Online</p>

        <Link to="/signin" className="primary-btn">
          Sign In Now →
        </Link>
      </section>

    </div>
  );
};

export default Landing;
