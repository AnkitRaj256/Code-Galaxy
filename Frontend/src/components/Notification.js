import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CustomCursor from "./CustomCursor";
import './CSS/Notification.css';

const Notification = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Solution Available', message: 'Your doubt "How to implement a binary search?" has been answered by Alex.', type: 'success' },
    { id: 2, title: 'Review Pending', message: 'Please review the solution provided for your doubt "Difference between BFS and DFS."', type: 'info' },
    { id: 3, title: 'Doubt Approved', message: 'Your posted doubt "Best practices for API integration in Node.js" has been approved by moderators.', type: 'success' },
    { id: 4, title: 'Moderator Feedback', message: 'Your doubt "How to optimize SQL queries?" needs more clarity. Please update the description.', type: 'warning' },
    { id: 5, title: 'New Comment', message: 'Alex commented on your doubt: "Try indexing on the column to improve query speed."', type: 'info' },
    { id: 6, title: 'Solution Removed', message: 'The solution provided for your doubt "How to create a REST API in Flask?" was flagged and removed.', type: 'error' },
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
    <CustomCursor />
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
