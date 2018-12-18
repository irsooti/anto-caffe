import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  beginOrdersFlow,
  retrieveOrdersWithSuccess
} from '../../store/actions/orders';
import cssModule from './CollectiveOrders.module.css';
import Button from '../../ui/Button/Button';
import { onDailyCheckoutChange } from '../../api/orders';
import { Route, NavLink, Switch } from 'react-router-dom';
import { ordersReducer, getWhoOrder, whoOrderThis } from '../../utils/order';
import UserOrder from '../../components/UserOrders/UserOrder';
import Modal from '../../ui/Modal/Modal';
import { normalizeToDashcase } from '../../utils/data';

const { REACT_APP_ANTO_TEL } = process.env;
class CollectiveOrders extends Component {
  state = {
    lastProductSelectedName: ''
  };
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
              <div
                style={{ textAlign: 'right', display: 'block' }}
                className={cssModule.order}
              >
                Nessuno ha ancora ordinato
              </div>
            ) : (
              ''
            )}
            {Object.keys(totalOrders).map((orderId, id) => {
              if (totalOrders[orderId].quantity === 0) return null;
              return (
                <div
                  onClick={() => {
                    this.setState({
                      lastProductSelectedName: totalOrders[orderId].descr
                    });
                    this.props.history.push(
                      `${this.props.match.path}/product/${normalizeToDashcase(
                        totalOrders[orderId].descr
                      )}`
                    );
                  }}
                  style={{ cursor: 'pointer' }}
                  className={cssModule.order}
                  key={id}
                >
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
              <div style={{ textAlign: 'right' }}>
                {orders.length === 0 ? 'Nessuno ha ancora ordinato' : ''}
              </div>
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

        <Switch>
          <Route
            path={`${this.props.match.path}/product/:orderId`}
            render={props => (
              <Modal visible={true} toggle={this.props.history.goBack}>
                <div>
                  <div className={cssModule.title}>
                    <h3>{this.state.lastProductSelectedName}</h3>
                  </div>
                  <ul>
                    {whoOrderThis(orders, props.match.params.orderId).map(
                      (order, key) => (
                        <li className={cssModule.order} key={key}>
                          <span className={cssModule.orderName}>
                            <span style={{ display: 'block' }}>
                              {order.displayName}
                              <br />
                              <small
                                style={{
                                  display: 'block',
                                  fontSize: '0.8em'
                                }}
                              >
                                {order.email}
                              </small>
                            </span>
                          </span>
                          <span
                            style={{ alignSelf: 'center' }}
                            className={cssModule.orderCount}
                          >
                            {order.quantity}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </Modal>
            )}
          />
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
        </Switch>
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
