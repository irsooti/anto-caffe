import React, { Component } from 'react';
import { connect } from 'react-redux';
import { beginOrdersFlow } from '../../store/actions/orders';
import cssModule from './CollectiveOrders.module.css';
class CollectiveOrders extends Component {
  componentDidMount() {
    this.props.onOrdersLoad();
  }
  render() {
    const { orders } = this.props;
    const totalOrders = ordersReducer(orders);
    if (this.props.orders.length > 0);

    return (
      <div className={cssModule.fullHeightContainer}>
        <div className={cssModule.container}>
          <div className={cssModule.title}>
            <h3>Ordini</h3>
          </div>
          <div className={cssModule.body}>
            {Object.keys(totalOrders).map((orderId, id) => (
              <div className={cssModule.order} key={id}>
                {console.log(totalOrders)}
                <span className={cssModule.orderName}>
                  {totalOrders[orderId].descr}
                </span>
                <span className={cssModule.orderCount}>
                  {totalOrders[orderId].quantity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.orders.orderList
});

const mapDispatchToProps = dispatch => {
  return {
    onOrdersLoad: () => dispatch(beginOrdersFlow())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectiveOrders);

function ordersReducer(orders = []) {
  if (orders.length === 0) return orders;
  return orders.reduce((acc, currentOrder) => {
    var key = currentOrder['id'];
    if (!acc[key]) {
      acc[key] = { quantity: 0 };
    }
    console.log(acc[key].quantity);
    acc[key].descr = currentOrder.descr;
    acc[key].quantity = currentOrder.quantity + acc[key].quantity;
    return acc;
  }, {});
}
