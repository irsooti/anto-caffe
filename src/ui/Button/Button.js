import React from 'react';

export default function Button({
  onClick,
  text,
  size = 'lg',
  type,
  disabled = false,
  icon,
  style
}) {
  let iconElement = icon ? (
    <span style={{ marginLeft: '10px' }} className={icon} />
  ) : null;

  return type === 'submit' ? (
    <input
      style={style}
      type="submit"
      value={text}
      className={'btn btn--' + size + (disabled ? ' btn--disabled' : '')}
      onClick={!disabled ? onClick : null}
    />
  ) : (
    <button
      style={style}
      className={'btn btn--' + size + (disabled ? ' btn--disabled' : '')}
      onClick={!disabled ? onClick : null}
    >
      {text} {iconElement}
    </button>
  );
}
