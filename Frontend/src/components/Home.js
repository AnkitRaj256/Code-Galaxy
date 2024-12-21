import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./CSS/Home.css";
import axios from "axios";

function Home() {
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation(); // Use location to access state
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    const fetchUserInfo = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("user-info"));
        
        setFullName(userInfo ? userInfo.fullName : "");
        
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchUserInfo();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="home">
      <nav className="navbar">
        <div className="logo">Code Galaxy</div>
        <ul className="nav-links">
          <li><a href="#hero">Home</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#qna">QnA</a></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contactus">Contact Us</Link></li>
        </ul>
      </nav>

      <div className="top-buttons">
        <Link to="/notification">
          <button className="top-btn">Notifications</button>
        </Link>
        <Link to="/leaderboard">
          <button className="top-btn">LeaderBoard</button>
        </Link>
      </div>
      <section id="hero" className="hero">
        <h2>Hello <span id="nameAfterLogin">{fullName}</span></h2>
        <h1>Your one-stop solution for coding queries!</h1>
        <div className="cta-buttons">
          <Link to="/AskQuestion">
            <button className="cta-btn">Ask a Question</button>
          </Link>
          <Link to="/signup">
            <button className="cta-btn">Sign Up</button>
          </Link>
          <Link to="/userprofile">
            <button className="cta-btn">Profile</button>
          </Link>
        </div>
      </section>

      {/* Features Overview */}
      <section id="features" className="features">
        <h2>Platform Features</h2>
        <div className="feature-cards">
          <div className="card">
            <i className="icon">🖥️</i>
            <h3>Live Code Editor</h3>
            <p>Write and test your code in real-time with our editor.</p>
          </div>
          <div className="card">
            <i className="icon">🤖</i>
            <h3>AI Suggestions</h3>
            <p>Get smart code suggestions based on your queries.</p>
          </div>
          <div className="card">
            <i className="icon">🎮</i>
            <h3>Gamified Learning</h3>
            <p>Learn while having fun with interactive challenges.</p>
          </div>
        </div>
      </section>

      {/* Trending Questions */}
      <section id="trending" className="trending">
        <h2>Trending Questions</h2>
        <div className="question-grid">
          <div className="question-card">
            <h4>How to implement quicksort in Java?</h4>
            <span className="tags">#Java #Algorithm</span>
            <span className="votes">Votes: 42</span>
          </div>
          <div className="question-card">
            <h4>What is the difference between let and var in JavaScript?</h4>
            <span className="tags">#JavaScript #Variables</span>
            <span className="votes">Votes: 38</span>
          </div>
        </div>
      </section>

      {/* QnA Section */}
      <section id="qna" className="qna-section">
        <h2>Explore Our Q&A Section</h2>
        <p>Have questions? Get answers from our vibrant community of coders. Join the discussion and expand your knowledge!</p>
        <Link to="/QnA">
          <button className="qna-btn">Visit Q&A</button>
        </Link>
      </section>


      {/* User Testimonials */}
      <section id="testimonials" className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p>"This platform has helped me solve coding problems faster. The AI suggestions are spot on!"</p>
            <span>- Jane Doe</span>
          </div>
          <div className="testimonial-card">
            <p>"Love the gamified approach. It's fun and educational!"</p>
            <span>- John Smith</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="footer">
        <div className="social-icons">
          <a href="https://twitter.com" className="social-icon" target="_blank" rel="noopener noreferrer">🐦</a>
          <a href="https://facebook.com" className="social-icon" target="_blank" rel="noopener noreferrer">📘</a>
          <a href="https://github.com" className="social-icon" target="_blank" rel="noopener noreferrer">🐙</a>
        </div>
        <div className="copyright">
          &copy; {new Date().getFullYear()} Code Galaxy. All Rights Reserved.
        </div>
      </footer>

    </div>
  );
}

export default Home;
