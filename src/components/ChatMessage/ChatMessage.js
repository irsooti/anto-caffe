import React from 'react';
import cssModule from './ChatMessage.module.css';

const ChatMessage = ({ text, displayName, photoUrl, isCurrentUser }) => {
  return (
    <div className={cssModule.chatMessage}>
      <div className={cssModule.text}>
        <small className={cssModule.name}>
          {displayName}
        </small>
        <div className={isCurrentUser ? cssModule.currentUser : ''}>
          <span>{text}</span>
        </div>
      </div>
      <div
        className={cssModule.avatar}
        title={displayName}
        style={{
          textTransform: 'capitalize',
          textAlign: 'center',
          display: 'flex',
          width: '50px',
          height: '50px',
          backgroundImage: 'url(' + photoUrl + ')',
          backgroundColor: '#CCC',
          backgroundPosition: 'center center',
          backgroundSize: 'contain',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {photoUrl ? null : displayName[0]}
      </div>
    </div>
  );
};

export default ChatMessage;
