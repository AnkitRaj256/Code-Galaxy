import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import "./CSS/About.css";
import Ankit from "./Images/Ankit.jpg";
import Srijan from "./Images/Srijan.jpg";

const About = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check localStorage for dark mode preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", !isDarkMode ? "dark" : "light");
  };

  return (
    <div className="about-page dark">
      <header className="header">
        <motion.h1
          className="about-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          About Us
        </motion.h1>
        <motion.p
          className="tagline"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        >
          Empowering the coding community, one line at a time.
        </motion.p>
      </header>

      {/* Story Section */}
      <section className="story-section">
        <motion.h2
          className="story-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          The Story Behind Code Galaxy
        </motion.h2>
        <p>
          Code Galaxy was created to connect developers and encourage knowledge-sharing in the tech world.
          Our platform aims to empower coders to ask, answer, and grow together.
        </p>
        <motion.div
          className="timeline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Example of milestones */}
          <div className="milestone">Launched in 2024</div>
          <div className="milestone">Reached 1M users</div>
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <motion.h2
            className="team-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            Meet the Team
        </motion.h2>
        <div className="team-profiles">
            <motion.div
            className="profile-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            >
            <img src={Ankit} alt="Ankit" className="profile-photo" />
            <h3>Ankit Raj</h3>
            <p className="description">I am a passionate Frontend Developer with expertise in creating intuitive and responsive web interfaces using technologies like HTML, CSS, JavaScript, React, and Bootstrap. I focus on delivering seamless user experiences while ensuring clean and efficient code. With a strong eye for design and functionality, I take pride in crafting engaging, user-friendly applications.</p>
            <a href="https://janedoeportfolio.com" className="portfolio-button">Visit Portfolio</a>
            </motion.div>
            <motion.div
            className="profile-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            >
            <img src={Srijan} alt="Srijan" className="profile-photo" />
            <h3>Srijan Maurya</h3>
            <p className="description">I am a dedicated Backend Developer with expertise in building robust and scalable server-side applications using Node.js, Express.js, and MongoDB. I specialize in designing efficient APIs, managing databases, and ensuring seamless integration between frontend and backend systems. My focus is on creating secure, optimized, and reliable solutions to support dynamic web applications.</p>
            <a href="https://johnsmithportfolio.com" className="portfolio-button">Visit Portfolio</a>
            </motion.div>
        </div>
        </section>


        <section className="vision-section">
      <motion.h2
        className="vision-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Join Our Community
      </motion.h2>
      <p>
        We believe that sharing knowledge is key to growth. Join us in building
        a stronger, more connected coding community. Together, we can achieve
        greater things and inspire each other.
      </p>
      <motion.button
        className="join-button"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
        onClick={() => navigate('/contactus')} // Navigate to ContactUs page
      >
        Join Us
      </motion.button>
    </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>© 2024 Code Whispers</p>
      </footer>
    </div>
  );
};

export default About;
