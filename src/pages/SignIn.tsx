import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import type { SellerSegment } from "../data/mockData";
import "./SignIn.css";

const SignIn = () => {
  const { setUser } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer');
  const [sellerType, setSellerType] = useState<SellerSegment>('retailer');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    // Update user first
    setUser({
      email,
      role,
      sellerType: role === 'seller' ? sellerType : undefined
    });

    // Trigger alert and navigate after short delay
    setTimeout(() => {
      alert("Login successful!");
      navigate(role === 'seller' ? "/seller/dashboard" : "/");
    }, 50);
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h2>Welcome Back to Grandee Online Marketplace</h2>
        <p className="subtitle">Sign in as a buyer or seller to continue</p>

        <form onSubmit={handleSubmit}>
          <label>Account Type</label>
          <div className="role-select signin-role-select">
            <div
              className={`role-card ${role === "buyer" ? "active" : ""}`}
              onClick={() => setRole("buyer")}
            >
              <h3>Buyer</h3>
              <p>Source and compare listings</p>
            </div>

            <div
              className={`role-card ${role === "seller" ? "active" : ""}`}
              onClick={() => setRole("seller")}
            >
              <h3>Seller</h3>
              <p>Manage listings and respond to quote requests</p>
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

          <label>Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <button type="submit" className="signin-btn">Sign In</button>
        </form>

        <p className="signup-text">
          New to Grandee Online? <Link to="/signup">Create Marketplace Account</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
