import React, { useState } from 'react';
import './Chat.css'; 

function Chat() {
  const [messages, setMessages] = useState([]);

  const handleNewMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <div className="chat">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <input type="text" placeholder="Type your question..." onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleNewMessage(e.target.value);
          e.target.value = '';
        }
      }} />
    </div>
  );
}

export default Chat;