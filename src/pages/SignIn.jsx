import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useApp } from "../contexts/AppContext";
import logoImg from "../assets/file_00000000b15871f48aee870982fc872f.png";
import "./SignIn.css";

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="signin-container">
      <div className="signin-card">
        {/* Logo */}
        <img src={logoImg} alt="Grandee Online" className="signin-logo" />

        <h2>Welcome Back</h2>
        <p className="subtitle">Sign in to continue to Grandee</p>

        <form onSubmit={(e) => e.preventDefault()}>
          <label>Email Address</label>
          <input type="email" placeholder="you@example.com" />

          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <button type="button" onClick={() => navigate("/home")}>
            Sign In
          </button>
        </form>

        <p className="signup-text">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
