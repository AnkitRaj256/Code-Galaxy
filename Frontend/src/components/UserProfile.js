import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./CSS/UserProfile.css";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  // State hooks inside the component
  const [profilePic, setProfilePic] = useState("https://via.placeholder.com/100");
  const [fullname, setFullname] = useState("Anonymus");
  const [bio, setBio] = useState("Update your profile to set your bio");
  const [expanded, setExpanded] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state to track login status
  const [questionAsked, setQuestionAsked] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [leaderboardRank, setLeaderboardRank] = useState(0);
  const [recentQuestions, setRecentQuestions] = useState([]);
  const [recentAnswers, setRecentAnswers] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
 // Fetch user details once when the component is mounted
useEffect(() => {
  const fetchUserDetails = async () => {
    try {
        const data = JSON.parse(localStorage.getItem("user-info"));
        if (!data) {
            throw new Error('User not logged in');
        }
        setIsLoggedIn(true); // Set login status to true   
        setFullname(data.fullName || fullname);
        setQuestionAsked(data.questionsAsked || questionAsked);
        setQuestionsAnswered(data.questionsAnswered || questionsAnswered);
        setLeaderboardRank(data.leaderboardRank || leaderboardRank);
        setBio(data.bio || bio); // Set bio from fetched data or default bio message
        setRecentQuestions(data.quesAskId);
        setRecentAnswers(data.questionsAnsweredId);
        setProfilePic(data.coverImage || profilePic); // Set profile picture from fetched data or default image
        setBio(data.bio || bio); // Set bio from fetched
    } catch (error) {
        // Handle any other errors that occur during the fetch process
        console.error('Failed to fetch user details:', error);
        setIsLoggedIn(false); // Set login status 
    }
  };

  fetchUserDetails();
}, []); // Empty dependency array ensures this runs only once when the component mounts

  // Handle profile picture change
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result); // Update profile picture with base64
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle save action
  const handleSave = () => {
    const formData = new FormData();
  
    if (selectedFile) {
      formData.append('coverImage', selectedFile); // Add profile picture
    }
    
    formData.append('bio', bio); // Add bio
    
    fetch('http://localhost:8000/api/v1/update-profile', { // Replace with your backend endpoint
      method: 'PUT',
      body: formData,
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          if (data.profilePicUrl) {
            setProfilePic(data.profilePicUrl); // Update profile picture state
          }
          alert('Profile updated successfully!');
          setIsEditing(false); // Close modal
        } else {
          console.log("hee",data);
          
          alert('Failed to update profile.');
        }
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
      });
  };
  
  const handleLogout = async () => {
    try {
        // Send a POST request to log out
        const response = await fetch('http://localhost:8000/api/v1/logout', {
            method: 'POST',
            credentials: 'include', // Ensures cookies are sent along with the request
        });

        const data = await response.json();

        if (response.ok) {
            // Handle successful logout (e.g., redirect to login page or update UI)
            // Clear local storage
            localStorage.removeItem('user-info');
            console.log(data.message); // Should print: "User logged out successfully"
            navigate("/#hero");
        } else {
          if(data.message==="jwt expired"){
            localStorage.removeItem('user-info');
            alert("Session Expired. Please login again.");
            navigate("/#hero");
          }
          console.error("helo", data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
  };

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
          <h1 className="username">{fullname}</h1>
          <p className="bio">{bio}</p>
        </div>
        
        {/* Conditionally render the logout button if the user is logged in */}
        {isLoggedIn && (
          <button className="edit-btn" id="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
        
        <button className="edit-btn" onClick={() => setIsEditing(true)}>
          ✏️ Update Profile
        </button>
      </header>

      {/* Dashboard Overview Section */}
      <section className="dashboard">
        <motion.div className="card" whileHover={{ scale: 1.05 }}>
          <h3>Questions Asked</h3>
          <p>{questionAsked}</p>
        </motion.div>
        <motion.div className="card" whileHover={{ scale: 1.05 }}>
          <h3>Answers Posted</h3>
          <p>{questionsAnswered}</p>
        </motion.div>
        <motion.div className="card" whileHover={{ scale: 1.05 }}>
          <h3>Badges Earned</h3>
          <div className="badge-carousel">🎖️ 🏆 🥇</div>
        </motion.div>
        <motion.div className="card" whileHover={{ scale: 1.05 }}>
          <h3>Leaderboard Rank</h3>
          <p>#{leaderboardRank}</p>
        </motion.div>
      </section>

      {/* Recent Activity Section */}
      <section className="recent-activity">
        <h2>Recent Activity</h2>
          <h3>Question Asked</h3>
            {recentQuestions && recentQuestions.length > 0 ? (
            recentQuestions.map((question, index) => (
              <div key={index} className="activity-item"
              onClick={() => navigate(`/questiondetail/${question.queryId}`)}>
                <p>{question.description}</p>
              </div>
            ))
          ) : (
            <p>No recent questions to display.</p>
          )}
          <h3>Answers Given</h3>
            {recentAnswers && recentAnswers.length > 0 ? (
            recentAnswers.map((question, index) => (
              <div key={index} className="activity-item"
              onClick={() => navigate(`/questiondetail/${question.queryId}`)}>
                <p>{question.description}</p>
              </div>
            ))
          ) : (
            <p>No recent questions to display.</p>
          )}
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
