import { useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "../assets/file_00000000b15871f48aee870982fc872f.png";
import "./SignUp.css";

const SignUp = () => {
  const [role, setRole] = useState("shop");

  return (
    <div className="signup-page">

      {/* Logo + Title */}
      <div className="signup-header">
        <img src={logoImg} alt="Grandee Online" className="signup-logo" />
        <h1>
          <span>Grandee</span> Online
        </h1>
        <p className="tagline">Connect. Trade. Thrive.</p>
      </div>

      {/* Signup Card */}
      <div className="signup-card">
        <h2>Join Grandee</h2>
        <p className="subtitle">Create your account to get started</p>

        <form>
          <label>Full Name</label>
          <input type="text" placeholder="John Doe" />

          <label>Email Address</label>
          <input type="email" placeholder="you@example.com" />

          <label>Password</label>
          <input type="password" placeholder="At least 6 characters" />

          <label>I want to</label>

          <div className="role-select">
            <div
              className={`role-card ${role === "shop" ? "active" : ""}`}
              onClick={() => setRole("shop")}
            >
              <h3>Shop</h3>
              <p>Browse & buy</p>
            </div>

            <div
              className={`role-card ${role === "sell" ? "active" : ""}`}
              onClick={() => setRole("sell")}
            >
              <h3>Sell</h3>
              <p>Open a shop</p>
            </div>
          </div>

          <button type="submit" className="create-btn">
            Create Account
          </button>
        </form>

        <p className="signin-link">
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
      </div>

    </div>
  );
};

export default SignUp;
