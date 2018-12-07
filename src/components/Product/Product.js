import React from 'react';
import CssModule from './Product.module.css';
import Button from '../../ui/Button/Button';
import Input from '../../ui/Input/Input';

const ExistingProduct = ({
  descr,
  id,
  quantity = 0,
  onAdd = () => {},
  onRemove = () => {}
}) => {
  return (
    <>
      {quantity > 0 ? (
        <div className={CssModule.quantity}>x{quantity}</div>
      ) : null}
      <div className={CssModule.description}>{descr}</div>
      <div className={CssModule.productController}>
        <Button onClick={onAdd(id)} text="+" />
        <Button disabled={quantity === 0} onClick={onRemove(id)} text="-" />
      </div>
    </>
  );
};

const AddNewProduct = ({ onAdd = () => {} }) => {
  return (
    <>
      <div className={CssModule.description}>
        <Input
          block={true}
          style={{ paddingBottom: '15px', width: '100%' }}
          placeholder="...WIP"
        />
      </div>
      <div className={CssModule.addProduct}>
        <Button onClick={onAdd} text="Aggiungi" />
      </div>
    </>
  );
};

const Product = ({
  descr,
  id,
  isAddingProduct = false,
  quantity = 0,
  onAdd = () => {},
  onRemove = () => {}
}) => {
  return (
    <div className={CssModule.product}>
      {isAddingProduct ? (
        <AddNewProduct onAdd={onAdd} />
      ) : (
        <ExistingProduct
          descr={descr}
          id={id}
          quantity={quantity}
          onAdd={onAdd}
          onRemove={onRemove}
        />
      )}
    </div>
  );
};

export default Product;
