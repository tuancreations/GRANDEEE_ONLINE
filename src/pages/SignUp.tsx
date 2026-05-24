import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import type { SellerSegment } from "../data/mockData";
import logoImg from "../assets/grandee-online-logo.jpeg";
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const { setUser } = useApp();
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sellerType, setSellerType] = useState<SellerSegment>('retailer');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || password.length < 6) {
      alert('Please complete all fields and use a password with at least 6 characters.');
      return;
    }

    setUser({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role,
      sellerType: role === 'seller' ? sellerType : undefined
    });

    navigate(role === 'seller' ? '/seller/dashboard' : '/');
  };

  return (
    <div className="signup-page">

      {/* Logo + Title */}
      <div className="signup-header">
        <img src={logoImg} alt="Grandee Online" className="signup-logo" />
        <h1>Grandee Online</h1>
        <p className="tagline">Source Smarter. Sell Faster.</p>
      </div>

      {/* Signup Card */}
      <div className="signup-card">
        <h2>Create Your Marketplace Account</h2>
        <p className="subtitle">Choose your role and complete onboarding in under 2 minutes</p>

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />

          <label>I want to</label>

          <div className="role-select">
            <div
              className={`role-card ${role === "buyer" ? "active" : ""}`}
              onClick={() => setRole("buyer")}
            >
              <h3>Shop</h3>
              <p>Find suppliers and request quotes</p>
            </div>

            <div
              className={`role-card ${role === "seller" ? "active" : ""}`}
              onClick={() => setRole("seller")}
            >
              <h3>Sell</h3>
              <p>Open your storefront and receive quote requests</p>
            </div>
          </div>

          {role === 'seller' && (
            <>
              <label>Seller Type</label>
              <select
                value={sellerType}
                onChange={(e) => setSellerType(e.target.value as SellerSegment)}
              >
                <option value="retailer">Retailer</option>
                <option value="manufacturer-distributor">Manufacturer / Distributor</option>
                <option value="wholesale-farmer">Wholesale Farmer</option>
                <option value="professional-services">Professional Service Provider</option>
                <option value="institution">Institution</option>
              </select>
            </>
          )}

          <button type="submit" className="create-btn">
            Create Marketplace Account
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
