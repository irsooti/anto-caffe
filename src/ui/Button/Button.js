import React from 'react';

export default function Button({ onClick, text, type, disabled = false }) {


  return type === 'submit' ? (
    <input
      type="submit"
      value={text}
      className={'btn ' + (disabled ? 'btn--disabled' : '')}
      onClick={!disabled ? onClick: null}
    />
  ) : (
    <button
      className={'btn ' + (disabled ? 'btn--disabled' : '')}
      onClick={!disabled ? onClick: null}
    >
      {text}
    </button>
  );
}
