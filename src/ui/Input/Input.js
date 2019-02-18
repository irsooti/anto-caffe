import React from 'react';
// import cssModule from './Input.module.css';

const SIZE = {
  small: 'input-sm',
  medium: 'input-md',
  large: 'input-lg'
};

export default ({
  onKeyPress,
  value,
  className,
  type = 'text',
  block = false,
  style = {},
  size = 'small',
  onChange = () => {},
  placeholder,
  label,
  currentPassword = false,
  required = false
}) => {
  let change = ({ target }) => {
    onChange(target.value);
  };

  return (
    <div style={style} className={`input ${block ? 'block' : ''} ${className}`}>
      {label ? <label className={'label '}>{label}</label> : null}
      <input
        onKeyPress={onKeyPress}
        value={value}
        required={required}
        onChange={change}
        type={type}
        placeholder={placeholder}
        className={`${SIZE[size]} `}
        autoComplete={currentPassword ? 'current-password' : ''}
      />
    </div>
  );
};
