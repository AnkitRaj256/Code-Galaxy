import React, { useState } from "react";
import { motion } from "framer-motion";
import "./CSS/UserProfile.css";

const UserProfile = () => {
  // State hooks inside the component
  const [profilePic, setProfilePic] = useState("https://via.placeholder.com/100");
  const [username, setUsername] = useState("John Doe");
  const [bio, setBio] = useState("Tech Enthusiast | Problem Solver");
  const [expanded, setExpanded] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(false);

  // Handle profile picture change
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result); // Update profile picture with base64
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle save action
  const handleSave = () => {
    // Save updated profile information
    setIsEditing(false);
    console.log("Updated Profile:", { username, bio, profilePic });
  };

  // Toggle expanded activity details
  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  // Sample activity data
  const activities = [
    { title: "Asked: How to learn React?", details: "Details about the question." },
    { title: "Answered: Redux vs Context API", details: "Details about the answer." },
  ];

  return (
    <div className="user-profile dark">
      {/* Header Section */}
      <header className="header">
        <div className="profile">
          <img
            src={profilePic} // Use profilePic state
            alt="Profile"
            className="profile-picture"
            onClick={() => setFullscreenImage(true)}
          />
          <h1 className="username">{username}</h1>
          <p className="bio">{bio}</p>
        </div>
        <button className="edit-btn" onClick={() => setIsEditing(true)}>
          ✏️ Edit
        </button>
      </header>

      {/* Dashboard Overview Section */}
      <section className="dashboard">
        <motion.div className="card" whileHover={{ scale: 1.05 }}>
          <h3>Questions Asked</h3>
          <p>25</p>
        </motion.div>
        <motion.div className="card" whileHover={{ scale: 1.05 }}>
          <h3>Answers Posted</h3>
          <p>40</p>
        </motion.div>
        <motion.div className="card" whileHover={{ scale: 1.05 }}>
          <h3>Badges Earned</h3>
          <div className="badge-carousel">🎖️ 🏆 🥇</div>
        </motion.div>
        <motion.div className="card" whileHover={{ scale: 1.05 }}>
          <h3>Leaderboard Rank</h3>
          <p>#12</p>
        </motion.div>
      </section>

      {/* Recent Activity Section */}
      <section className="recent-activity">
        <h2>Recent Activity</h2>
        {activities.map((activity, index) => (
          <motion.div
            className="activity-item"
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => toggleExpand(index)}
          >
            <p>{activity.title}</p>
            {expanded === index && (
              <motion.div
                className="details"
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
              >
                {activity.details}
              </motion.div>
            )}
          </motion.div>
        ))}
      </section>

      {/* Modal for Editing Profile */}
      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Profile</h2>

            {/* Profile Picture Update */}
            <div className="update-profile-pic">
              <img
                src={profilePic} // Use the current profilePic state
                alt="Profile"
                className="edit-profile-pic"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleProfilePicChange(e)}
              />
            </div>

            {/* Username Update */}
            <input
              type="text"
              placeholder="Update Username"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            {/* Bio Update */}
            <textarea
              placeholder="Update Bio"
              className="textarea-field"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>

            {/* Modal Actions */}
            <div className="modal-actions">
              <button onClick={() => setIsEditing(false)}>Cancel</button>
              <button onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Profile Picture */}
      {fullscreenImage && (
        <div className="fullscreen-image" onClick={() => setFullscreenImage(false)}>
          <img src={profilePic} alt="Profile Fullscreen" /> {/* Use profilePic */}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
