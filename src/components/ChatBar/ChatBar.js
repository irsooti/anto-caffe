import React, { useState } from 'react';
import cssModule from './ChatBar.module.css';
import { sendMessage } from '../../api/chat';

const ChatBar = () => {
  const [message, setMessage] = useState('');

  const sendNotEmptyMessage = () => {
    if (message.trim().length === 0) return;
    sendMessage(message);
  };

  const sendMessageHandler = () => {
    sendNotEmptyMessage();
    setMessage('');
  };

  const inputHandler = ({ target }) => {
    setMessage(target.value);
  };

  const keyPressHandler = event => {
    if (event.key === 'Enter') {
      sendNotEmptyMessage();
      setMessage('');
    }
  };

  return (
    <div className={cssModule.chatBar}>
      <input
        value={message}
        className={cssModule.chatInput}
        onKeyPress={keyPressHandler}
        onChange={inputHandler}
      />

      <button className={cssModule.chatButton} onClick={sendMessageHandler}>
        <i className="far fa-comment-alt fa-2x" />
      </button>
    </div>
  );
};

export default ChatBar;
