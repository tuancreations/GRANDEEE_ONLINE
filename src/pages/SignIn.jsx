import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "./SignIn.css";

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="signin-container">
      <div className="signin-card">
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

          {/* 👇 THIS is the key line */}
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
