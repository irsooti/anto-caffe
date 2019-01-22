import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ordersReducer } from '../../utils/order';
import cssModule from './MyOrders.module.css';
import MyOrderChanger from '../../components/MyOrderChanger/MyOrderChanger';
import Button from '../../ui/Button/Button';
import { equals, clone } from 'ramda';
import { changeDailyCheckout } from '../../api/products';
import MessageBar from '../../ui/MessageBar/MessageBar';
class MyOrders extends Component {
  state = {
    orders: {},
    isEditable: false,
    errorMessage: null,
    successMessage: null
  };

  componentDidUpdate = prevProps => {
    if (prevProps.orders.length < this.props.orders.length) {
      const orders = { ...ordersReducer(this.props.orders) };
      this.setState({ orders: clone(orders), isEditable: true });
    }
  };

  addQuantityHandler = productId => {
    let orders = { ...this.state.orders };
    return () => {
      orders[productId].quantity = orders[productId].quantity + 1;
      this.setState({
        orders: orders,
        errorMessage: null,
        successMessage: null
      });
    };
  };
  removeQuantityHandler = productId => {
    let orders = { ...this.state.orders };
    return () => {
      orders[productId].quantity = orders[productId].quantity - 1;
      this.setState({
        orders: orders,
        errorMessage: null,
        successMessage: null
      });
    };
  };

  ordersAreDifferent = () => {
    return equals(this.state.orders, ordersReducer(this.props.orders));
  };

  modifyOrderHandler = () => {
    let orders = [];
    Object.keys(this.state.orders).map(productId => {
      return orders.push({
        id: productId,
        descr: this.state.orders[productId].descr,
        quantity: this.state.orders[productId].quantity,
        email: this.props.user.email,
        displayName: this.props.user.displayName
      });
    });

    changeDailyCheckout(orders, this.props.user.uid)
      .then(() =>
        this.setState({
          errorMessage: null,
          successMessage: 'Ordine modificato con successo!'
        })
      )
      .catch(e =>
        this.setState({ errorMessage: e.message, successMessage: null })
      );
  };

  render() {
    const totalOrders = this.state.orders;
    return (
      <div className={cssModule.fullHeightContainer}>
        <div className={cssModule.container}>
          <div className={cssModule.title}>
            <h3>Riepilogo dei miei ordini</h3>
          </div>
          <div>
            {this.state.errorMessage && (
              <MessageBar status="danger">{this.state.errorMessage}</MessageBar>
            )}
            {this.state.successMessage && (
              <MessageBar status="success">
                {this.state.successMessage}
              </MessageBar>
            )}
          </div>
          {Object.keys(totalOrders).length > 0 ? (
            Object.keys(totalOrders).map((orderId, id) => {
              let descriptionClasses = [cssModule.orderName];

              if (totalOrders[orderId].quantity === 0)
                descriptionClasses.push(cssModule.deleted);
              return (
                <div className={cssModule.order} key={id}>
                  <span className={descriptionClasses.join(' ')}>
                    {totalOrders[orderId].descr}
                  </span>
                  <span className={cssModule.orderCount}>
                    <MyOrderChanger
                      onAdd={this.addQuantityHandler(orderId)}
                      onRemove={this.removeQuantityHandler(orderId)}
                      quantity={totalOrders[orderId].quantity}
                    >
                      {totalOrders[orderId].quantity}
                    </MyOrderChanger>
                  </span>
                </div>
              );
            })
          ) : (
            <div className={cssModule.order}>
              <span className={cssModule.orderName}>
                Nessun ordine trovato{' '}
                {this.state.isEditable ? null : '(ma sto ancora verificando)'}.
              </span>
            </div>
          )}
          <div style={{ textAlign: 'right', marginTop: '20px' }}>
            <Button
              onClick={this.modifyOrderHandler}
              disabled={this.ordersAreDifferent() || !this.state.isEditable}
              text="Modifica ordine"
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  orders: state.orders.orderList.filter(
    order => order.email === state.auth.user.email
  ),
  user: state.auth.user
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyOrders);
