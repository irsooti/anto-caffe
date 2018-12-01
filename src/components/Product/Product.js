import React from 'react';
import CssModule from './Product.module.css';
import Button from '../../ui/Button/Button';

const Product = ({ name }) => {
  return (
    <div className={CssModule.product + ' column'}>
      <div className={CssModule.description + ' column'}>{name}</div>
      <div className={CssModule.productController + ' column'}>
        <Button text="+" />
        <Button text="-" />
      </div>
    </div>
  );
};

export default Product;
