import React from 'react';
import cssModule from './MyOrderChanger.module.css';

function Chevron({ direction, onClick, active }) {
  const inactiveFn = () => console.warn("can't remove anymore of those");
  return (
    <i
      onClick={active ? onClick : inactiveFn}
      className={`fas fa-chevron-${direction} ${
        !active ? cssModule.notActive : ''
      }`}
    />
  );
}

function MyOrderChanger({ children, quantity, onAdd, onRemove }) {
  return (
    <div className={cssModule.myOrderChanger}>
      <Chevron onClick={onAdd} active={true} direction="up" />
      <div>{children}</div>
      <Chevron onClick={onRemove} active={quantity > 0} direction="down" />
    </div>
  );
}

export default MyOrderChanger;
