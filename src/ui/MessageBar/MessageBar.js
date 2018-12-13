import React from 'react';

function MessageBar({ children, status }) {
  return (
    <div className={"message-bar message-bar__" + status}>
      {children}
    </div>
  );
}

export default MessageBar;
