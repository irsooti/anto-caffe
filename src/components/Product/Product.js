import React from 'react';
import CssModule from './Product.module.css';
import Button from '../../ui/Button/Button';

const Product = ({
  descr,
  id,
  quantity = 0,
  onAdd = () => {},
  onRemove = () => {}
}) => {
  return (
    <div className={CssModule.product}>
      {quantity > 0 ? (
        <div className={CssModule.quantity}>x{quantity}</div>
      ) : null}
      <div className={CssModule.description}>{descr}</div>
      <div className={CssModule.productController}>
        <Button onClick={onAdd(id)} text="+" />
        <Button disabled={quantity === 0} onClick={onRemove(id)} text="-" />
      </div>
    </div>
  );
};

export default Product;
