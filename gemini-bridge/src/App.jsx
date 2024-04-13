
import React, { useState, useEffect } from 'react';
import VideoPlayer from './components/VideoPlayer';
import Chat from './components/Chat';
import Question from './components/Question';
import Answer from './components/Answer';
import Grid from '@mui/material/Grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';

// Import JSON into a JavaScript object
import structure from './course/EECS280/structure.json';
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [onSubmitAnswer, setOnSubmitAnswer] = useState("");
  const [currentVideo, setCurrentVideo] = useState("./videos/3.1.mp4");
  const [messages, setMessages] = useState([]);
  const [mainModel, setMainModel] = useState(null);

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

  // current chapter
  const chapter = 3;
  const curr_module = 1;
  const chapter_dict = structure.chapters[chapter];

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <div className="app-container">

      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '1em' }}>
          <div style={{ maxWidth:"40%", marginTop: "-0.5em", marginBottom: "1.5em", display: 'flex', alignItems: 'center'}}>
            <img src="../src/logolow.png" alt="Logo" className="logo" />  
          </div>
        </div>
        <h2 style = {{fontSize:'1.1em', marginTop: "-0.5em", marginBottom: "2em"}}>Course: {structure.course}</h2>
        <h2 style = {{fontSize:"1.1em", marginTop: "-1em", marginBottom: "2em"}}>Unit: {chapter} ({chapter_dict.title})</h2>
          
        </header>
      {/* <ThemeProvider theme={darkTheme}>
        <CssBaseline /> */}
        <main>
          <Grid container spacing={8} >
            <Grid item xs={8}>
              <section className="video-section">
                {currentVideo && <VideoPlayer videoSrc={currentVideo} chapter_dict={chapter_dict} curr_module={curr_module}/>}
              </section>
              <section className="question-answer-section">
                <Question question={"Static questions are cool but don't do much; why are they still useful?"} />
                <Answer onSubmitAnswer={onSubmitAnswer} setOnSubmitAnswer={setOnSubmitAnswer}/>
              </section>
            </Grid>
            <Grid item xs={4}>
              <section className="chat-section">
                <Chat messages={messages} onNewMessage={handleNewMessage} />
              </section>
            </Grid>
          </Grid>
        </main>
      {/* </ThemeProvider> */}
    </div>
  );
}

export default App;