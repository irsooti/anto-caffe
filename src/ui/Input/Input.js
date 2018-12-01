import React from 'react';
import cssModule from './Input.module.css';

const SIZE = {
  small: 'input-sm',
  medium: 'input-md',
  large: 'input-lg'
};

export default function Input({
  type = 'text',
  block = false,
  size = 'small',
  onChange = () => {},
  placeholder,
  label,
  required = false
}) {
  let change = ({ target }) => {
    onChange(target.value);
  };

  return (
    <div className={`input ${block ? 'block' : ''}`}>
      {label ? <label className={'label '}>{label}</label> : null}
      <input
        required={required}
        onChange={change}
        type={type}
        placeholder={placeholder}
        className={`${SIZE[size]} `}
      />
    </div>
  );
}
