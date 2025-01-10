import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import CustomCursor from "./CustomCursor";
import './CSS/AskQuestion.css';
const baseUrl = process.env.REACT_APP_API_BASE_URL;

// Sample data for previously asked questions and popular topics
const sampleQuestions = [
  { id: 1, title: 'Optimizing for loops in JavaScript', description: 'How can I optimize my for loops in JavaScript effectively?' },
  { id: 2, title: 'Using the React useEffect Hook', description: 'Could you explain how the useEffect hook works in React?' },
  { id: 3, title: 'Improving performance of Python code', description: 'What steps can I take to enhance the performance of my Python code?' },
  { id: 4, title: 'let vs var vs const in JavaScript', description: 'What are the key differences between let, var, and const in JS?' },
  { id: 5, title: 'Best practices for debugging Node.js', description: 'What are some effective practices for debugging Node.js apps?' },
  { id: 6, title: 'Centering a div using CSS techniques', description: 'What is the best way to center a div both vertically and horizontally?' },
  { id: 7, title: 'Async/await in JavaScript explained', description: 'Can you provide clear examples of using async/await in JavaScript?' },
  { id: 8, title: 'Explaining decorators in Python', description: 'How do Python decorators work, and when should I use them?' },
  { id: 9, title: 'Managing state effectively in React', description: 'What are common methods for managing state in a React app?' },
  { id: 10, title: 'Comparing SQL and NoSQL databases', description: 'What are the main differences and when to use SQL or NoSQL databases?' },
  { id: 11, title: 'Optimizing CSS for large applications', description: 'What tips can help me improve CSS performance in large-scale projects?' },
  { id: 12, title: 'Simple explanation of closures in JS', description: 'Can you explain closures in JavaScript with clear examples?' },
  { id: 13, title: 'Handling API errors in React apps', description: 'What are best practices for managing API errors in React applications?' },
  { id: 14, title: 'Big O Notation for beginners', description: 'Could you provide a beginner-friendly overview of Big O notation?' },
];


const popularTopics = ['JavaScript', 'React', 'Node.js', 'Python', 'CSS', 'HTML'];

const AskQuestionPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [questionData, setQuestionData] = useState({
    title: '',
    description: '',
    tags: '',
  });
  const [customTag, setCustomTag] = useState(''); // Separate state for custom tags
  const [errors, setErrors] = useState({});
  const [otherSelected, setOtherSelected] = useState(false);

  // Toggle modal visibility
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestionData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Validate form inputs
  const validateForm = () => {
    const errors = {};
    if (!questionData.title) errors.title = 'Title is required';
    if (!questionData.description) errors.description = 'Description is required';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      const payload = {
        title: questionData.title,
        description: questionData.description,
        tags: questionData.tags,
      };
      
      try {
        const response = await fetch(`${baseUrl}/api/v1/doubts`, {
          method: 'POST',
          credentials: 'include', // Ensures cookies are sent along with the request
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        
        if (!response.ok) {
          if(response.statusText==='Unauthorized'){
            alert('You need to be SignedIn to sumbit a Response.')
          }
          else{
            throw new Error('Failed to post question');
          }
        }
  
        const data = await response.json();
        console.log('Successfully posted question:', data);
  
        // Optionally, clear form and close modal
        setQuestionData({ title: '', description: '', tags: '' });
        toggleModal();
      } catch (error) {
        console.error('Error posting question:', error);
      }
    }
  };
  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = questionData.tags
      .split('#')
      .filter((tag) => tag !== tagToRemove)
      .join('#');
    setQuestionData({ ...questionData, tags: updatedTags });
  };
  

  // Handle tag selection change
  const handleTagSelectChange = (e) => {
    const value = e.target.value;
    if (value === 'Other') {
      setOtherSelected(true);
    } else {
      setOtherSelected(false);
      setQuestionData({
        ...questionData,
        tags: `${questionData.tags}#${value}`.trim(),
      });
    }
  };

  // Handle adding custom tags
  const handleAddTag = () => {
    if (customTag.trim()) {
      const newTag = customTag.trim();
      const currentTags = questionData.tags.split('#').filter((tag) => tag);
      if (!currentTags.includes(newTag)) {
        const updatedTags = `${questionData.tags}#${newTag}`.trim();
        setQuestionData((prevData) => ({ ...prevData, tags: updatedTags }));
      }
      setCustomTag('');
    }
  };

  return (
    <div className="ask-question-page1">
    <CustomCursor />
      <nav className="navbar">
        <div className="logo">Code Galaxy</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contactus">Contact Us</Link></li>
        </ul>
      </nav>
      <div className="ask-question-page">
      {/* Welcome Section */}
      <section className="welcome-section">
        <h1>Welcome to the Q&A Page</h1>
        <p>Have a question? Don’t hesitate to ask, and get help from the community!</p>
      </section>

      {/* Previously Asked Questions */}
      <section className="previous-questions">
        <h2>Previously Asked Questions</h2>
        {sampleQuestions.length > 0 ? (
          <ul className="question-list">
            {sampleQuestions.map((question) => (
              <li key={question.id}>
                <h3>{question.title}</h3>
                <p>{question.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No questions asked yet. Ask your first question!</p>
        )}
      </section>

      {/* Popular Topics */}
      <section className="popular-topics">
        <h2>Popular Topics</h2>
        <ul>
          {popularTopics.map((topic, index) => (
            <li key={index}>{topic}</li>
          ))}
        </ul>
      </section>

      {/* Ask a Question Button */}
      <button className="ask-button" onClick={toggleModal}>
       ❔ Ask a Question
      </button>

      {/* Modal for posting a question */}
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Ask a Question</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={questionData.title}
                  onChange={handleInputChange}
                  className={errors.title ? 'error' : ''}
                />
                {errors.title && <small className="error-message">{errors.title}</small>}
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={questionData.description}
                  onChange={handleInputChange}
                  className={errors.description ? 'error' : ''}
                />
                {errors.description && <small className="error-message">{errors.description}</small>}
              </div>

              <div className="form-group">
                <label htmlFor="tag-select">Select a tag</label>
                <select
                  id="tag-select"
                  name="tag-select"
                  onChange={handleTagSelectChange}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Choose a tag
                  </option>
                  {popularTopics.map((topic, index) => (
                    <option key={index} value={topic}>
                      {topic}
                    </option>
                  ))}
                  <option value="Other">Others (write in the below section)</option>
                </select>
              </div>

              {otherSelected && (
                <div className="form-group">
                  <label htmlFor="custom-tags">Custom Tags</label>
                  <div className="custom-tag-input">
                    <input
                      type="text"
                      id="custom-tags"
                      value={customTag}
                      onChange={(e) => setCustomTag(e.target.value)}
                      placeholder="Enter custom tag"
                    />
                    <button type="button" className="add-tag-button" onClick={handleAddTag}>
                      Add
                    </button>
                  </div>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="selected-tags">Selected Tags</label>
                <div id="selected-tags" className="selected-tags-display">
                  {questionData.tags && questionData.tags.length > 0 ? (
                    questionData.tags.split('#').map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                        <button
                          type="button"
                          className="remove-tag-button"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          ✖
                        </button>
                      </span>
                    ))
                  ) : (
                    <span className="placeholder">No tags selected</span>
                  )}
                </div>
              </div>

              <button type="submit" className="submit-button">
                Submit Question
              </button>
            </form>
            <button className="close-modal" onClick={toggleModal}>
              Close
            </button>
          </div>
        </div>
      )}

      </div>
    </div>
  );
};

export default AskQuestionPage;
