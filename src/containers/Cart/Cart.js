import React, { Component } from 'react';
import cssModule from './Cart.module.css';
import Button from '../../ui/Button/Button';
import CartList from '../../components/CartList/CartList';

export default class Cart extends Component {


  render() {
    const cart  = this.props.cart.concat().filter(f => f.quantity > 0);
    const emptyCart = 'Nessun elemento nel carrello';

    const fullCart = <CartList cart={cart}></CartList>

    return (
      <div className={cssModule.cart}>
        <h3>
          <span className="fas fa-shopping-cart" /> Carrello
        </h3>
        <div className={cssModule.content}>
          {cart.length === 0 ? emptyCart : fullCart}
        </div>
        <div className={cssModule.footer}>
            
          <Button disabled={cart.length === 0 ? 'btn--disabled' : ''} onClick={this.props.onConfirm} text="Conferma" />
        </div>
      </div>
    );
  }
}
