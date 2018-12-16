import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ordersReducer } from '../../utils/order';
import cssModule from './MyOrders.module.css';

class MyOrders extends Component {
  componentDidMount() {
    console.log();
  }
  render() {
    const totalOrders = ordersReducer(this.props.orders);
    return (
      <div className={cssModule.fullHeightContainer}>
        <div className={cssModule.container}>
          <div className={cssModule.title}>
            <h3>Riepilogo dei miei ordini</h3>
          </div>
          {Object.keys(totalOrders).map((orderId, id) => {
            if (totalOrders[orderId].quantity === 0) return null;
            return (
              <div className={cssModule.order} key={id}>
                <span className={cssModule.orderName}>
                  {totalOrders[orderId].descr}
                </span>
                <span className={cssModule.orderCount}>
                  {totalOrders[orderId].quantity}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  orders: state.orders.orderList.filter(
    order => order.email === state.auth.user.email
  )
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyOrders);
