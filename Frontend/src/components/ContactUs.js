import React from 'react';
import { motion } from 'framer-motion';
import './CSS/ContactUs.css';

const ContactUs = () => {
  return (
    <motion.section
      className="contact-us"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="contact-heading"
        initial={{ x: '-100vw' }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
      >
        Get in Touch
      </motion.h1>

      <motion.form
        className="contact-form"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <motion.input
          type="text"
          placeholder="Your Name"
          className="contact-input"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        />
        <motion.input
          type="email"
          placeholder="Your Email"
          className="contact-input"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        />
        <motion.textarea
          placeholder="Your Message"
          className="contact-textarea"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        ></motion.textarea>
        <motion.button
          type="submit"
          className="contact-button"
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          Send Message
        </motion.button>
      </motion.form>
    </motion.section>
  );
};

export default ContactUs;
