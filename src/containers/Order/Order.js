import React, { Component } from 'react';
import Product from '../../components/Product/Product';
import cssModule from './Order.module.css';
import Cart from '../Cart/Cart';
import Modal from '../../ui/Modal/Modal';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import { connect } from 'react-redux';
import {
  getProductsFlow,
  addProductToCart,
  removeProductFromCart,
  beginCheckoutFlow
} from '../../store/actions/products';

class Order extends Component {
  state = {
    modal: false,
    checkoutDone: false,
    total: {}
  };

  addToCart = id => () => {
    this.props.addProductToCart(id);
  };

  removeFromCart = id => () => {
    this.props.removeProductToCart(id);
  };

  onConfirm = () => {
    this.setState({ modal: 'true' });
  };

  onCheckout = () => {
    this.setState({ checkoutDone: true });
    this.props.checkout(
      this.props.products,
      this.props.user.uid,
      this.props.user.displayName
    );
  };

  componentDidUpdate(prevProps) {
    if (
      this.state.checkoutDone &&
      prevProps.lastCheckout !== this.props.lastCheckout
    ) {
      this.props.history.push('/dailyorder');
    }
  }

  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const { products } = this.props;
    return (
      <div className={cssModule.OrderContainer}>
        <div className={'container column ' + cssModule.order}>
          {products.map(product => (
            <Product
              key={product.id}
              id={product.id}
              descr={product.descr}
              quantity={product.quantity}
              onAdd={this.addToCart}
              onRemove={this.removeFromCart}
            />
          ))}
        </div>

        <div>
          <Cart onConfirm={this.onConfirm} cart={products} />
        </div>
        <Modal
          visible={this.state.modal}
          toggle={() => this.setState({ modal: false })}
        >
          <CheckoutSummary onConfirm={this.onCheckout} cart={products} />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ products, auth }) => ({
  products: products.products,
  user: auth.user,
  lastCheckout: products.lastCheckout
});

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProductsFlow()),
  addProductToCart: id => dispatch(addProductToCart(id)),
  removeProductToCart: id => dispatch(removeProductFromCart(id)),
  checkout: (cart, uid) => dispatch(beginCheckoutFlow(cart, uid))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Order);
