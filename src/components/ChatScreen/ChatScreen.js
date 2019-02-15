import React, { useState, useEffect } from 'react';
import { onChatEnter } from '../../api/chat';
import ChatMessage from '../ChatMessage/ChatMessage';

const ChatScreen = ({ currentUserId }) => {
  const [messages, updateMessages] = useState([]);

  useEffect(() => {
    onChatEnter(remoteMessages => {
      updateMessages(remoteMessages);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
    }, 100);
  }, [messages]);

  return (
    <div className="column full" style={{ paddingBottom: '100px', paddingTop: '80px' }}>
      {messages.map(message => (
        <ChatMessage
          isCurrentUser={currentUserId === message.uid}
          key={message._id}
          text={message.text}
          photoUrl={message.photoUrl}
          displayName={message.displayName}
        />
      ))}
    </div>
  );
};

export default ChatScreen;
