import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './CSS/Notification.css';

const Notification = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'System Update', message: 'A new update is available for your system.', type: 'info' },
    { id: 2, title: 'Security Alert', message: 'Your account login was detected from a new device.', type: 'warning' },
    { id: 3, title: 'Promotion', message: '50% off on your next purchase! Don’t miss out!', type: 'success' },
  ]);

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  return (
    <motion.div
      className="notification-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="notification-heading"
        initial={{ x: '-100vw' }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
      >
        Your Notifications
      </motion.h1>

      <motion.button
        className="clear-btn"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClearNotifications}
      >
        Clear All Notifications
      </motion.button>

      <div className="notification-list">
        {notifications.length === 0 ? (
          <motion.p
            className="no-notifications"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            No notifications available.
          </motion.p>
        ) : (
          notifications.map((notification) => (
            <motion.div
              className={`notification-card ${notification.type}`}
              key={notification.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h3 className="notification-title">{notification.title}</h3>
              <p className="notification-message">{notification.message}</p>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default Notification;
