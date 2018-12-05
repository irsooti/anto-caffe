import React from 'react';

export default function Button({
  onClick,
  text,
  size = 'lg',
  type,
  disabled = false,
  icon
}) {
  let iconElement = icon ? <span style={{marginLeft: '10px'}} className={icon} /> : null;

  return type === 'submit' ? (
    <input
      type="submit"
      value={text}
      className={'btn btn--' + size + (disabled ? ' btn--disabled' : '')}
      onClick={!disabled ? onClick : null}
    />
  ) : (
    <button
      className={'btn btn--' + size + (disabled ? ' btn--disabled' : '')}
      onClick={!disabled ? onClick : null}
    >
      {text} {iconElement}
    </button>
  );
}
