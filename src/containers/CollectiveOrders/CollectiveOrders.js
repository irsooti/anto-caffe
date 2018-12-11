import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  beginOrdersFlow,
  retrieveOrdersWithSuccess
} from '../../store/actions/orders';
import cssModule from './CollectiveOrders.module.css';
import Button from '../../ui/Button/Button';
import { onDailyCheckoutChange } from '../../api/orders';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import { ordersReducer, getWhoOrder } from '../../utils/order';
import UserOrder from '../../components/UserOrders/UserOrder';

const { REACT_APP_ANTO_TEL } = process.env;
class CollectiveOrders extends Component {
  componentDidMount() {
    const { onOrdersChange } = this.props;

    onDailyCheckoutChange(resp => {
      onOrdersChange(resp);
    });
  }
  render() {
    const { orders } = this.props;
    const totalOrders = ordersReducer(orders);
    const whoOrder = getWhoOrder(orders);
    if (orders.length > 0);

    return (
      <div className={cssModule.fullHeightContainer}>
        <div className={cssModule.container}>
          <div className={cssModule.title}>
            <h3>Ordini</h3>
          </div>
          <div className={cssModule.body}>
            {orders.length === 0 ? (
              <div className={cssModule.order}>Nessuno ha ancora ordinato</div>
            ) : (
              ''
            )}
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
          <div className={cssModule.footer}>
            <Button
              onClick={() => (window.location = 'tel:' + REACT_APP_ANTO_TEL)}
              icon="fa fa-phone"
              text="Chiama Antonio"
            />

            <hr />
            <h4>Chi ha ordinato</h4>
            <div>
              {orders.length === 0 ? 'Nessuno ha ancora ordinato' : ''}
              {Object.keys(whoOrder).map(email => (
                <div key={email}>
                  <NavLink to={`${this.props.match.path}/${email}`}>
                    {whoOrder[email]} - {email}
                  </NavLink>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Router>
          <Route
            path={`${this.props.match.path}/:email`}
            render={props => (
              <div className={cssModule.fullHeightContainer}>
                <div className={cssModule.container}>

                  <UserOrder
                    orders={orders}
                    email={props.match.params.email}
                    cssModule={cssModule}
                  />
                </div>
              </div>
            )}
          />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.orders.orderList
});

const mapDispatchToProps = dispatch => {
  return {
    onOrdersLoad: () => dispatch(beginOrdersFlow()),
    onOrdersChange: resp => dispatch(retrieveOrdersWithSuccess(resp))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectiveOrders);
