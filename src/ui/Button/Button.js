import React from 'react';

export default function Button({ onClick, text, type }) {
  return type === 'submit' ? (
    <input type="submit" value={text} className="btn" onClick={onClick} />
  ) : (
    <button className="btn" onClick={onClick}>
      {text}
    </button>
  );
}
