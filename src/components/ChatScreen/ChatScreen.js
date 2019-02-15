import React, { useState, useEffect } from 'react';
import { onChatEnter, onChatLeft } from '../../api/chat';
import cssModule from './ChatScreen.module.css';
import ChatMessage from '../ChatMessage/ChatMessage';

const ChatScreen = ({ currentUserId }) => {
  const [messages, updateMessages] = useState([]);

  useEffect(() => {
    console.log('[Chat start]');
    onChatEnter(remoteMessages => {
      updateMessages(remoteMessages);
    });
    return () => {
      console.log('[Chat left]');
      onChatLeft();
    };
  }, []);

  useEffect(
    () => {
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          left: 0,
          behavior: 'smooth'
        });
      }, 100);
    },
    [messages]
  );

  return (
    <div className="column full" style={{ paddingBottom: '100px' }}>
      <div className={cssModule.pattern} />
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
