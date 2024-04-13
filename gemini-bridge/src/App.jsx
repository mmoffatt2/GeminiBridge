
import React, { useState, useEffect } from 'react';
import VideoPlayer from './components/VideoPlayer';
import Chat from './components/Chat';
import Question from './components/Question';
import Answer from './components/Answer';
import './App.css';

// Import JSON into a JavaScript object
import structure from './course/EECS280/structure.json';

function App() {
  console.log(structure)

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [onSubmitAnswer, setOnSubmitAnswer] = useState("");
  const [currentVideo, setCurrentVideo] = useState("./videos/3.1.mp4");
  const [messages, setMessages] = useState([]);

  // // Fetch video data on component mount (replace with your API call)
  // useEffect(() => {
  //   fetch('')
  //     .then(response => response.json())
  //     .then(data => setCurrentVideo(data))
  //     .catch(error => console.error('Error fetching video:', error));
  // }, []);

  // // Function to handle new chat messages
  const handleNewMessage = (message) => {
    // Send message to backend API (replace with your API call)
    fetch('https://your-backend-api.com/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
    })
      .then(() => {
        setMessages([...messages, message]);
      })
      .catch(error => console.error('Error sending message:', error));
  };

  return (
    <div className="app-container">
      <header>
        <img src="/logo.png" alt="Logo" className="logo" />
        <h1>EECS 280 - Module: Intro to Pointers</h1>
        {/* Add more header content here */}
      </header>
      <main>
        <section className="video-section">
          {currentVideo && <VideoPlayer videoSrc={currentVideo} title={"Pointers"} description={""} />}
        </section>
        <section className="question-answer-section">
          <Question question={"Static questions are cool but don't do much; why are they still useful?"} />
          <Answer onSubmitAnswer={onSubmitAnswer} setOnSubmitAnswer={setOnSubmitAnswer}/>
        </section>
        <section className="chat-section">
          <Chat messages={messages} onNewMessage={handleNewMessage} />
        </section>
      </main>
    </div>
  );
}

export default App;