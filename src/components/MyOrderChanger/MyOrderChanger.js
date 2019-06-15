import React from 'react';
import cssModule from './MyOrderChanger.module.css';

function Chevron({ direction, onClick, active, ariaLabel }) {
  const inactiveFn = () => console.warn("can't remove anymore of those");
  return (
    <i
      aria-label={ariaLabel}
      onClick={active ? onClick : inactiveFn}
      className={`fas fa-chevron-${direction} ${
        !active ? cssModule.notActive : ''
      }`}
    />
  );
}

function MyOrderChanger({ children, quantity, onAdd, onRemove, descr }) {
  return (
    <div className={cssModule.myOrderChanger}>
      <Chevron
        ariaLabel={`Aggiungi un'ordinazione di ${descr}`}
        onClick={onAdd}
        active={true}
        direction="up"
      />
      <div>{children}</div>
      <Chevron
        ariaLabel={`Rimuovi un'ordinazione di ${descr}`}
        onClick={onRemove}
        active={quantity > 0}
        direction="down"
      />
    </div>
  );
}

export default MyOrderChanger;
