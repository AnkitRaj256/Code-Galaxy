import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/SignIn.css";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/v1/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Sign-in successful:", data.fullName);
        // Navigate to Home and pass fullName via state
        navigate("/#hero", { state: { fullName: data.fullName } });
      } else {
        console.error("Sign-in error:", data.message);
        alert(data.message || "Sign-in failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="sign-in-page">
      <div className="background-animation"></div>
      <div className="sign-in-container">
        <h1>Welcome Back!</h1>
        <p>Please sign in to continue</p>
        <form className="sign-in-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
};

export default SignInPage;
