import React from 'react';
import CartList from '../CartList/CartList';
import cssModule from './CheckoutSummary.module.css';
import Button from '../../ui/Button/Button';

const CheckoutSummary = ({ cart, onConfirm, errorMsg }) => {
  return (
    <div className={cssModule.summary}>
      <h3 style={{marginBottom:'20px'}}>Riepilogo</h3>
      <hr className="hr" />
      {errorMsg ? (
            <div className={cssModule.errorBlock}>{errorMsg}</div>
          ) : null}
      <CartList
        style={{ display: 'flex', borderBottom: 'solid 1px' }}
        quantityClassName={cssModule.quantity}
        descrClassName={cssModule.descr}
        cart={cart.filter(filter => filter.quantity !== 0)}
      />

        <span style={{padding: '30px 10px', display: 'inline-block'}}>Se confermi, questa operazione non può essere annullata</span>

      <hr className="hr" />
      <div style={{ textAlign: 'right' }}>
        <Button onClick={onConfirm} text="Conferma" />
      </div>
    </div>
  );
};

export default CheckoutSummary;
