import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/QnA.css'; // Optional CSS file for additional styling
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
          </select>
          <label>
            <input
              type="checkbox"
              name="unanswered"
              onChange={handleFilterChange}
            />
            Unanswered
          </label>
          <select name="sortBy" onChange={handleFilterChange}>
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
  );
};

export default QnA;
