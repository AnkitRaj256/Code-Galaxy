// Home.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CSS/Home.css";
import CustomCursor from "./CustomCursor"; // Import the CustomCursor component

function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [fullName, setFullName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    const fetchUserInfo = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("user-info"));
        setFullName(userInfo ? userInfo.fullName : "");
        setIsLoggedIn(!!userInfo);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchUserInfo();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="home">
      <CustomCursor /> {/* Add the custom cursor here */}

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
        <h2>Welcome to Code Galaxy <span id="nameAfterLogin">{fullName}</span>!</h2>
        <h1>Explore the universe of coding solutions, all in one place!</h1>
        <div className="cta-buttons">
          <Link to="/AskQuestion">
            <button className="cta-btn">Ask a Question</button>
          </Link>
          {!isLoggedIn && (
            <Link to="/signup">
              <button className="cta-btn">Sign Up</button>
            </Link>
          )}
          <Link to="/userprofile">
            <button className="cta-btn">Profile</button>
          </Link>
        </div>
      </section>

      <section className="Others">
        {/* Features Overview */}
        <section id="features" className="features">
          <h2>Platform Features</h2>
          <div className="feature-cards">
            <div className="card">
              <i className="icon">🏷️</i>
              <h3>Topic Tags</h3>
              <p>Add tags for specific topics like JavaScript, HTML, and CSS to easily filter your queries.</p>
            </div>
            <div className="card">
              <i className="icon">👍👎</i>
              <h3>Upvote & Downvote</h3>
              <p>Rate responses to help others find the most accurate and helpful answers quickly.</p>
            </div>
            <div className="card">
              <i className="icon">🏆</i>
              <h3>Leaderboards</h3>
              <p>View the top contributors and their expertise to gain insights into community knowledge.</p>
            </div>
            <div className="card">
              <i className="icon">💬</i>
              <h3>Multiple Replies</h3>
              <p>Get diverse answers for your questions to enhance your understanding and learning.</p>
            </div>
            <div className="card">
              <i className="icon">📊</i>
              <h3>Analytics Dashboard</h3>
              <p>Monitor your learning journey with detailed analytics and insights about your activity.</p>
            </div>
            <div className="card">
              <i className="icon">🔔</i>
              <h3>Real-time Notifications</h3>
              <p>Stay updated with instant notifications whenever someone replies to your questions.</p>
            </div>
            <div className="card">
              <i className="icon">📚</i>
              <h3>Resource Library</h3>
              <p>Access a rich library of coding resources, tutorials, and guides for your learning.</p>
            </div>
            <div className="card">
              <i className="icon">🛠️</i>
              <h3>Customizable Settings</h3>
              <p>Personalize your experience with various settings tailored to your preferences.</p>
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
            <div className="question-card">
              <h4>How to handle asynchronous requests in JavaScript?</h4>
              <span className="tags">#JavaScript #Async</span>
              <span className="votes">Votes: 35</span>
            </div>
            <div className="question-card">
              <h4>What are the main features of CSS Grid layout?</h4>
              <span className="tags">#CSS #Grid</span>
              <span className="votes">Votes: 29</span>
            </div>
            <div className="question-card">
              <h4>How can I improve my website's loading speed?</h4>
              <span className="tags">#WebDev #Performance</span>
              <span className="votes">Votes: 45</span>
            </div>
            <div className="question-card">
              <h4>What is the purpose of the 'this' keyword in JavaScript?</h4>
              <span className="tags">#JavaScript #Scope</span>
              <span className="votes">Votes: 33</span>
            </div>
          </div>
        </section>

        {/* QnA Section */}
        <section id="qna" className="qna-section">
          <h2>Unlock Knowledge in Our Q&A Hub!</h2>
          <p>Got questions? Dive into insights from our passionate coding community. Join the conversation and elevate your skills!</p>
          <Link to="/QnA">
              <button className="qna-btn">Join the Q&A</button>
          </Link>
        </section>

        {/* User Testimonials */}
        <section id="testimonials" className="testimonials">
          <h2>What Our Users Are Raving About</h2>
          <div className="testimonial-cards">
              <div className="testimonial-card">
                  <p>"This platform has completely changed my coding journey! The AI suggestions are incredibly accurate and help me solve problems quickly!"</p>
                  <span>- Aarav Sharma</span>
              </div>
              <div className="testimonial-card">
                  <p>"I love the gamified approach! It makes learning to code enjoyable and engaging while also being educational!"</p>
                  <span>- Priya Patel</span>
              </div>
              <div className="testimonial-card">
                  <p>"My coding skills have improved drastically! The instant feedback and guidance are game-changers for my learning!"</p>
                  <span>- Rohan Verma</span>
              </div>
              <div className="testimonial-card">
                  <p>"This platform makes coding concepts easy to grasp! The interactive elements make learning so much more fun!"</p>
                  <span>- Neha Gupta</span>
              </div>
              <div className="testimonial-card">
                  <p>"I’ve advanced my coding skills significantly thanks to this platform! The community support really boosts my confidence!"</p>
                  <span>- Siddharth Iyer</span>
              </div>
            </div>
        </section>
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
