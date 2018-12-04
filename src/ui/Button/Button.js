import React from 'react';

export default function Button({
  onClick,
  text,
  type,
  disabled = false,
  icon
}) {
  let iconElement = icon ? <span style={{marginRight: '10px'}} className={icon} /> : null;

  return type === 'submit' ? (
    <input
      type="submit"
      value={text}
      className={'btn ' + (disabled ? 'btn--disabled' : '')}
      onClick={!disabled ? onClick : null}
    />
  ) : (
    <button
      className={'btn ' + (disabled ? 'btn--disabled' : '')}
      onClick={!disabled ? onClick : null}
    >
      {iconElement} {text}
    </button>
  );
}
