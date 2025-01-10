import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/QnA.css'; // Optional CSS file for additional styling
import { Link, useLocation } from "react-router-dom";
import CustomCursor from "./CustomCursor";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

const QnA = () => {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    tags: '',
    difficulty: '',
    unanswered: false,
    sortBy: 'recent',
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch questions from an API or database (replace with your backend logic)
    const mockQuestions = [];
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/v1/fetchQueries`); // Replace with your API endpoint
        const data = await response.json();
        //setQuestions(data);
        let index = 0;
        while (index < data.length) {
          const query = data[index];

          mockQuestions.push({
            id: query._id, // Use the backend-provided unique ID
            title: query.title,
            snippet: query.description, // Map "description" to "snippet"
            tags: query.tags.split(","), // Convert the string of tags to an array if necessary
            votes: query.answers.length, // Use the length of answers as the "votes"
            timePosted: query.createdAt, // Map "createdAt" to "timePosted"
          });

          index++;
        }
        
        setQuestions(mockQuestions);

      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
  }, []);

  const handleSearch = (e) => setSearch(e.target.value);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const filteredQuestions = questions
    .filter((q) =>
      q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
    )
    .filter((q) => (filters.tags ? q.tags.includes(filters.tags) : true))
    .filter((q) => (filters.unanswered ? q.votes === 0 : true))
    .sort((a, b) => (filters.sortBy === 'recent' ? new Date(b.timePosted) - new Date(a.timePosted) : b.votes - a.votes));

  const handleAskQuestion = () => navigate('/askquestion'); // Redirect to an ask question page

  return (
    <div>
    <CustomCursor />
      <nav className="navbar">
            <div className="logo">Code Galaxy</div>
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contactus">Contact Us</Link></li>
              <li><Link to="/userprofile">Profile</Link></li>
            </ul>
          </nav>
    <div className="qna-container">
      <div className="qna-header">
        <input
          type="text"
          className="search-bar"
          placeholder="Search questions by keywords, tags, or usernames..."
          value={search}
          onChange={handleSearch}
        />
        <div className="filters">
          <select name="tags" onChange={handleFilterChange}>
            <option value="">Filter by Tag</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Algorithms">Algorithms</option>
            <option value="React">React</option>
            <option value="CSS">CSS</option>
            <option value="HTML">HTML</option>
            <option value="Python">Python</option>
            <option value="Data Structures">Data Structures</option>
            <option value="Node.js">Node.js</option>
            <option value="Databases">Databases</option>
            <option value="SQL">SQL</option>
            <option value="NoSQL">NoSQL</option>
            <option value="APIs">APIs</option>
            <option value="TypeScript">TypeScript</option>
            <option value="Backend Development">Backend Development</option>
            <option value="Frontend Development">Frontend Development</option>
            <option value="Web Performance">Web Performance</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Big O Notation">Big O Notation</option>
            <option value="Debugging">Debugging</option>
            <option value="Testing">Testing</option>
            <option value="Version Control">Version Control</option>
            <option value="Git">Git</option>
            <option value="DevOps">DevOps</option>
            <option value="Cloud Computing">Cloud Computing</option>
            <option value="Security">Security</option>
            <option value="Accessibility">Accessibility</option>
          </select>
          <label className='Check'>
            <input
              type="checkbox"
              name="unanswered"
              onChange={handleFilterChange}
            />
            Unanswered
          </label>
          <select name="sortBy" onChange={handleFilterChange}>
            <option value="">Sort by</option>
            <option value="recent">Sort by Recent</option>
            <option value="votes">Sort by Votes</option>
          </select>
        </div>
      </div>

      <div className="question-list">
        {filteredQuestions.map((q) => (
          <div
            key={q.id}
            className="question-card"
            onClick={() => navigate(`/questiondetail/${q.id}`)} // Navigate to detailed question view
          >
            <h3>{q.title}</h3>
            <p>{q.snippet}</p>
            <div className="tags">
              {q.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="meta">
              <span>{q.votes} votes</span>
              <span>{new Date(q.timePosted).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="ask-question-btn" onClick={handleAskQuestion}>
        Ask a Question
      </button>
    </div>
    </div>
  );
};

export default QnA;
