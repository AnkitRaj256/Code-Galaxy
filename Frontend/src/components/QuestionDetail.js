import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CSS/QnA.css';
import CustomCursor from "./CustomCursor";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

const QuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState();
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch question and answers from the API (replace with actual backend logic)
    const fetchQuestionDetails = async () => {
      try {
        // Replace with your actual API endpoint for fetching a specific question
        const response = await fetch(`${baseUrl}/api/v1/questions/${id}`);
        const data = await response.json();

        const browseredQuestion = ({
          id: data.question._id,
          title: data.question.title,
          description: data.question.description,
          tags: data.question.tags,
          timePosted: data.question.createdAt,
        });      
        // Map answers to match expected format
        const parsedAnswers = data.question.answers.map((answer) => ({
          id: answer._id,
          content: answer.text,
          votes: answer.upvotes - answer.downvotes,
        }));    
        setQuestion(browseredQuestion);
        setAnswers(parsedAnswers);
      } catch (error) {
        console.error("Error fetching question details:", error);
      }
    };
    
    fetchQuestionDetails();

    
  }, [id]);
  
  const handleVote = async (questionId, answerId, type) => {
    try {
      // Send the vote update to the backend
      const response = await fetch(`${baseUrl}/api/v1/answers/vote`, {
        method: 'POST',
        credentials: 'include', // Include cookies if needed
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          voteType: type,
          answerId: answerId,
          questionId: questionId,
         }),
      });
      
      if (response.ok) {
        // Fetch updated answer from the backend
        const updatedAnswer = await response.json();  
  
        // Update the local state with the new vote count
        setAnswers((prevAnswers) =>
          prevAnswers.map((answer) =>
            answer.id === answerId ? { ...answer, votes: updatedAnswer.upvotes-updatedAnswer.downvotes } : answer
          )
        );

      } else {
        if(response.statusText==='Unauthorized'){
          alert('You need to be SignedIn to sumbit a Response.')
        }
        else{
          const errorData = await response.json();
          console.error('Error updating vote:', errorData);
        }
      }
    } catch (error) {
      console.error('Error connecting to backend:', error);
    }
  };
  

  const handleAddAnswer = async () => {
    if (newAnswer.trim()) {
      try {
        const queryId = question.id;
  
        // Create the new answer object to send to the backend
        const newAnswerObj = {
          text: newAnswer,
          queryId: queryId
        };
        
        // Send the new answer to the backend
        const response = await fetch(`${baseUrl}/api/v1/submitAnswer`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newAnswerObj),
        });
        
        // Parse the response from the backend
        if (response.ok) {
          const updatedQuery = await response.json(); // Updated query data returned by the backend
          // I want to navigate to QnA.js page
          navigate('/QnA');
          setAnswers(updatedQuery.answers); // Update answers in the UI
          setNewAnswer(''); // Clear input
        } else {
          if(response.statusText==='Unauthorized'){
            alert('You need to be SignedIn to sumbit a Response.')
          }
          else{
            const errorData = await response.json();
            console.error('Error adding answer:', errorData);
          }
        }
      } catch (error) {
        console.error('Error connecting to backend:', error);
      }
    }
  };
  

  if (!question) return <p>Loading...</p>;

  return (
    <div className="qna-container">
    <CustomCursor />
      <button className="GoBack" onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>
        Go Back
      </button>
      <div className="question-detail">
        <h2>Q. {question.title}</h2>
        <p>Description: {question.description}</p>
        <div className="tags">
          Tags: {question.tags }
        </div>
        <div className="meta">
          <span>{new Date(question.timePosted).toLocaleString()}</span>
        </div>
      </div>
      <div className="answers-section">
      <h3>Answers</h3>
        {answers.map((answer) => (
          <div key={answer.id} className="answer-card">
            <p>{answer.content}</p>
            <div className="vote-controls">
            <button onClick={() => handleVote(question.id, answer.id, 'upvote')}>▲</button>
              <span>{answer.votes}</span>
              <button onClick={() => handleVote(question.id, answer.id, 'downvote')}>▼</button>  
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