import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io();

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    socket.on('chat-message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  function handleInputValueChange(event) {
    setInputValue(event.target.value);
  }

  function handleSendMessage() {
    socket.emit('chat-message', inputValue);
    setInputValue('');
  }

  return (
    <>
    <div>
      <div id="chat-box">
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <div>
        <input
          type="text"
          id="message-input"
          value={inputValue}
          onChange={handleInputValueChange}
        />
        <button id="send-button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
    </>
  );
}

export default ChatApp;
