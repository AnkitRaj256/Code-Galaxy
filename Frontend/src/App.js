import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Notification from './components/Notification';
import LeaderBoard from './components/LeaderBoard';
import SignUp from './components/SignUp';
import AskQuestionPage from './components/AskQuestion';
import SignInPage from './components/SignIn';
import UserProfile from './components/UserProfile';
import About from './components/About';
import ContactUs from './components/ContactUs';
import QnA from './components/QnA';
import QuestionDetail from './components/QuestionDetail';
import NotFound from './NotFound';

function App() {
  return (
    <Router>  {/* Wrap the entire app in Router */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Route for Home page */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path='/askquestion' element={<AskQuestionPage />}/>
        <Route path='/signin' element={<SignInPage />}/>
        <Route path='/userprofile' element={<UserProfile />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/contactus' element={<ContactUs />}/>
        <Route path='/qna' element={<QnA />}/>
        <Route path='/questiondetail/:id' element={<QuestionDetail />}/>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
  );
}

export default App;
