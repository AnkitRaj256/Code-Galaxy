import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CSS/QnA.css';

const QuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch question and answers from the API (replace with actual backend logic)
    const fetchQuestionDetails = async () => {
      const mockQuestion = {
        id,
        title: "What is React?",
        description:
          "React is a JavaScript library for building user interfaces. Can someone explain the virtual DOM?",
        tags: ["JavaScript", "React"],
        votes: 10,
        timePosted: "2024-12-02T14:00:00Z",
      };

      const mockAnswers = [
        {
          id: 1,
          content: "The virtual DOM is a lightweight representation of the real DOM.",
          votes: 5,
        },
        {
          id: 2,
          content: "React uses the virtual DOM to optimize updates to the actual DOM.",
          votes: 3,
        },
      ];

      setQuestion(mockQuestion);
      setAnswers(mockAnswers);
    };

    fetchQuestionDetails();
  }, [id]);

  const handleVote = (answerId, type) => {
    setAnswers((prevAnswers) =>
      prevAnswers.map((answer) =>
        answer.id === answerId
          ? { ...answer, votes: answer.votes + (type === 'upvote' ? 1 : -1) }
          : answer
      )
    );
  };

  const handleAddAnswer = () => {
    if (newAnswer.trim()) {
      const newAnswerObj = {
        id: answers.length + 1,
        content: newAnswer,
        votes: 0,
      };
      setAnswers((prevAnswers) => [...prevAnswers, newAnswerObj]);
      setNewAnswer('');
    }
  };

  if (!question) return <p>Loading...</p>;

  return (
    <div className="qna-container">
      <button className="GoBack" onClick={() => navigate(-1)} style={{ marginBottom: '10px' }}>
        Go Back
      </button>
      <div className="question-detail">
        <h2>{question.title}</h2>
        <p>{question.description}</p>
        <div className="tags">
          {question.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="meta">
          <span>{question.votes} votes</span>
          <span>{new Date(question.timePosted).toLocaleString()}</span>
        </div>
      </div>
      <div className="answers-section">
        <h3>Answers</h3>
        {answers.map((answer) => (
          <div key={answer.id} className="answer-card">
            <p>{answer.content}</p>
            <div className="vote-controls">
              <button onClick={() => handleVote(answer.id, 'upvote')}>▲</button>
              <span>{answer.votes}</span>
              <button onClick={() => handleVote(answer.id, 'downvote')}>▼</button>
            </div>
          </div>
        ))}
        <div className="add-answer">
          <textarea
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="Write your answer..."
          ></textarea>
          <button onClick={handleAddAnswer}>Submit Answer</button>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;
