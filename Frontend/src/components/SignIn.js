// SignInPage.jsx
import React from "react";
import "./CSS/SignIn.css";

const SignInPage = () => (
  <div className="sign-in-page">
    <div className="background-animation"></div>
    <div className="sign-in-container">
      <h1>Welcome Back!</h1>
      <p>Please sign in to continue</p>
      <form className="sign-in-form">
        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" required />
        </div>
        <button type="submit" className="sign-in-btn">
          Sign In
        </button>
      </form>
      <div className="alternative-option">
        <p>
          Don’t have an account?{" "}
          <a href="/signup" className="signup-link">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  </div>
);

export default SignInPage;
