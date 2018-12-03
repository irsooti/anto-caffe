import React from 'react';

const CartList = ({ cart = [], quantityClassName, descrClassName, style }) => {
  return cart.map(item => (
    <div style={{alignItems: 'center', ...style}} key={item.id}>
      <span className={quantityClassName}>x{item.quantity}</span> <span className={descrClassName}>{item.descr}</span>
    </div>
  ));
}

export default CartList;
