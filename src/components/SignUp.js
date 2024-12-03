// SignupPage.jsx
import React from "react";
import "./CSS/SignUp.css";
import { FaGoogle, FaGithub } from "react-icons/fa";

const SocialLogin = () => (
  <div className="social-login">
    <button className="social-btn google">
      <FaGoogle /> Sign in with Google
    </button>
    <button className="social-btn github">
      <FaGithub /> Sign in with GitHub
    </button>
  </div>
);

const SignupForm = () => (
  <form className="signup-form">
    <h2>Sign Up</h2>
    <div className="form-group">
      <label>Email</label>
      <input type="email" placeholder="Enter your email" required />
    </div>
    <div className="form-group">
      <label>Username</label>
      <input type="text" placeholder="Choose a username" required />
    </div>
    <div className="form-group">
      <label>Password</label>
      <input type="password" placeholder="Create a password" required />
    </div>
    <button type="submit" className="submit-btn">
      Sign Up
    </button>
  </form>
);

const ForgotPassword = () => (
  <div className="forgot-password">
    <a href="#recover">Forgot your password?</a>
  </div>
);

const AlreadyUser = () => (
  <div className="already-user">
    <p>
      Already a user?{" "}
      <a href="/signin" className="signin-link">
        Sign In
      </a>
    </p>
  </div>
);

const SignupPage = () => (
  <div className="signup-page">
    <div className="container">
      <SocialLogin />
      <SignupForm />
      <ForgotPassword />
      <AlreadyUser />
    </div>
  </div>
);

export default SignupPage;
