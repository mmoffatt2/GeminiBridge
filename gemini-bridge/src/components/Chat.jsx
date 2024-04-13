import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Paper, Typography, InputAdornment } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ReactMarkdown from 'react-markdown';
import { GoogleGenerativeAI } from "@google/generative-ai"

const INITIAL_PROMPT = "Ask me anything about the video. I can clarify concepts, provide background information, and guide you to specific timestamps."

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [model, setModel] = useState(null);

  // Set up Google API
  useEffect(() => {
      const API_KEY = '';
      const generativeAI = new GoogleGenerativeAI(API_KEY);
      const initModel = async () => {
        const loadedModel = await generativeAI.getGenerativeModel({ 
          model: "gemini-pro",
          // systemInstruction: "You should help student with their questions"
        });
        setModel(loadedModel);
      };
      initModel();
      
  }, []);

  const handleMessageSend = async (message) => {
    setMessages(prev => [...prev, { text: message, fromUser: true }]);

    if (!model) {
      setMessages(prev => [...prev, { text: "The model is not loaded yet.", fromUser: false }]);
      return;
    }

    // Start a chat with the model if it's ready
    try {
      const history = messages.map(message => ({
        role: message.fromUser ? "user" : "model",
        parts: [{ text: message.text }]
      }));
      const chat = await model.startChat({
        history: history,
        // generationConfig: {
        //   maxOutputTokens: 100,
        // },
      });

      // streaming
      const result = await chat.sendMessageStream(message);
      let text = '';

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        

        console.log(chunkText);
        if (text === '') {
          // need to initialize state with new chunk
          setMessages(prev => [...prev, { text, fromUser: false }]);
        }
        // add word by word to the last message when printing it out
        // setMessages(prev => [...prev.slice(0, -1), { text: prev[prev.length - 1].text + chunkText, fromUser: false }])
        // Split chunk into words
        
        const words = chunkText.split(' ');

        for (let word of words) {
          // add word by word to the last message when printing it out
          word += ' ';
          setMessages(prev => [...prev.slice(0, -1), { text: prev[prev.length - 1].text + word, fromUser: false }])
          await new Promise(resolve => setTimeout(resolve, 10)); // Delay to simulate typing
        }
        // for async (const word in words) {
        //   // add word by word to the last message when printing it out
        //   setMessages(prev => [...prev.slice(0, -1), { text: prev[prev.length - 1].text + word, fromUser: false }])
        // }
        text += chunkText; // need to update the state here
      }
    } catch (error) {
      console.error("Error communicating with the AI:", error);
      setMessages(prev => [...prev, { text: "Failed to get a response from the AI.", fromUser: false }]);
    }
  };

  // // load initial prompt into chat
  // useEffect(() => {
  //   const words = INITIAL_PROMPT.split(' ');
  //   // initialize
  //   setMessages([{ text: '', fromUser: false }]);
  //   for (let word of words) {
  //     // await new Promise(resolve => setTimeout(resolve, 100)); // Delay to simulate typing
  //     setMessages(prevMessages => {
  //       const newMessages = [...prevMessages];
  //       newMessages[newMessages.length - 1].text += word + ' '; // Append the word and a space
  //       return newMessages;
  //     });
  //   }
  // }, []);



  return (
    <>
    
    <Grid container component={Paper} sx={{ height: '100%' }} style={{ backgroundColor: '#161616' , color:"white"}}>
      <Grid item xs={12} sx={{ overflowY: 'auto', height: 'calc(100% - 4rem)', color:"white"}}>
        {messages.map((message, index) => (
          <Typography key={index} sx={{ margin: '1rem', borderBottom: '0.5px solid rgba(255, 255, 255, 0.3)',  textAlign: message.fromUser ? 'right' : 'left', color:"white" }}>
            <ReactMarkdown>{message.text}</ReactMarkdown>
          </Typography>
        ))}
      </Grid>
      <Grid item xs={12} sx={{ padding: '1rem', color:"white" }}>
        <TextField
          InputProps={{
            style: { color: 'white', marginBottom: "1em"},
            startAdornment: (
              <InputAdornment position="start" style={{ color: 'white', marginBottom: "1.5em", marginTop: "1.5em" }}>
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          variant="standard"
          fullWidth
          multiline
          color="primary" focused
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleMessageSend(e.target.value);
              e.target.value = '';
            }
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            const input = document.getElementById('chat-input');
            handleMessageSend(input.value);
            input.value = '';
          }}
          sx={{ marginTop: '1rem' }}
        >
          Send
        </Button>
      </Grid>
    </Grid>

    </>
  )
}

export default ChatBox;