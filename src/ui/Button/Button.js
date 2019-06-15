import React from 'react';

export default function Button({
  onClick,
  text,
  size = 'lg',
  type,
  disabled = false,
  icon,
  ref,
  ariaLabel,
  style,
  onMouseOver,
  onMouseLeave
}) {
  let iconElement = icon ? (
    <span style={{ marginLeft: '10px' }} className={icon} />
  ) : null;

  return type === 'submit' ? (
    <input
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      aria-label={ariaLabel}
      style={style}
      type="submit"
      value={text}
      className={'btn btn--' + size + (disabled ? ' btn--disabled' : '')}
      onClick={!disabled ? onClick : null}
    />
  ) : (
    <button
      aria-label={ariaLabel}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      ref={ref}
      style={style}
      className={'btn btn--' + size + (disabled ? ' btn--disabled' : '')}
      onClick={!disabled ? onClick : null}
    >
      {text} {iconElement}
    </button>
  );
}
