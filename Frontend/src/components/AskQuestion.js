import React, { useState } from 'react';
import './CSS/AskQuestion.css';

// Sample data for previously asked questions and popular topics
const sampleQuestions = [
  { id: 1, title: 'How to optimize a for loop in JavaScript?', description: 'Looking for ways to optimize a for loop in my JS code.' },
  { id: 2, title: 'Understanding React useEffect Hook', description: 'Can someone explain useEffect in React in simple terms?' },
  { id: 3, title: 'Why is my Python code running slowly?', description: 'My Python program is too slow, how can I improve performance?' },
  { id: 1, title: 'How to optimize a for loop in JavaScript?', description: 'Looking for ways to optimize a for loop in my JS code.' },
  { id: 2, title: 'Understanding React useEffect Hook', description: 'Can someone explain useEffect in React in simple terms?' },
  { id: 3, title: 'Why is my Python code running slowly?', description: 'My Python program is too slow, how can I improve performance?' },
  { id: 1, title: 'How to optimize a for loop in JavaScript?', description: 'Looking for ways to optimize a for loop in my JS code.' },
  { id: 2, title: 'Understanding React useEffect Hook', description: 'Can someone explain useEffect in React in simple terms?' },
];

const popularTopics = ['JavaScript', 'React', 'Node.js', 'Python', 'CSS', 'HTML'];

const AskQuestionPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [questionData, setQuestionData] = useState({
    title: '',
    description: '',
    tags: [],
  });
  const [errors, setErrors] = useState({});

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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted', questionData);
      toggleModal(); // Close modal after submitting
    }
  };

  return (
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
      <button
        aria-label="Ask a question"
        className="ask-button"
        onClick={toggleModal}
      >
        <i className="icon-question">❓</i>
        <span className="button-text">Ask a Question</span>
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
                <label htmlFor="tags">Tags</label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={questionData.tags}
                  onChange={handleInputChange}
                  placeholder="Enter tags (comma separated)"
                />
              </div>

              <button type="submit" className="submit-button">Submit Question</button>
            </form>
            <button className="close-modal" onClick={toggleModal}>X</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AskQuestionPage;
