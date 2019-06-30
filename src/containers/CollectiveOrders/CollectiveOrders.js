import React, { Component } from 'react';
import { connect } from 'react-redux';
import { beginOrdersFlow } from '../../store/actions/orders';
import cssModule from './CollectiveOrders.module.css';
import Button from '../../ui/Button/Button';
import { Route, NavLink, Switch } from 'react-router-dom';
import { ordersReducer, getWhoOrder, whoOrderThis } from '../../utils/order';
import UserOrder from '../../components/UserOrders/UserOrder';
import Modal from '../../ui/Modal/Modal';
import { normalizeToDashcase, getTodayPath } from '../../utils/data';
import { lockDailyOrders } from '../../api/orders';
import AuthenticatedContext from '../AuthenticatedArea/AuthenticatedContext';

const {
  REACT_APP_ANTO_TEL,
  REACT_APP_ANTO_CELL,
  REACT_APP_INCOMING_LINK
} = process.env;
class CollectiveOrders extends Component {
  state = {
    lastProductSelectedName: '',
    isOrderConfirmationModalVisible: false,
    orderConfirmationType: 'tel'
  };

  confirmationType = {
    tel: () => (window.location = 'tel:' + REACT_APP_ANTO_TEL),
    wa: () =>
      (window.location = `https://api.whatsapp.com/send?phone=39${REACT_APP_ANTO_CELL}&text=${this.encodeTextForWhatsapp()}`)
  };

  encodeTextForWhatsapp = () => {
    const { orders, user } = this.props;
    const totalOrders = ordersReducer(orders);

    let text = `Ciao Antonio, sono ${
      user.displayName
    } di Aesys potresti portarci questo?\n`;
    Object.keys(totalOrders).map(orderId => {
      if (totalOrders[orderId].quantity !== 0)
        text =
          text +
          '👉 ' +
          totalOrders[orderId].quantity +
          ' - ' +
          totalOrders[orderId].descr +
          '\n';

      return text;
    });
    text =
      text +
      `
      Ti ringrazio!\n
      Quando stai per salire, clicca su questo link: ${REACT_APP_INCOMING_LINK}/code/${getTodayPath()} così verremo avvisati!
    `;

    return encodeURI(text);
  };

  orderConfirmationToggle = type => {
    this.setState({
      isOrderConfirmationModalVisible: !this.state
        .isOrderConfirmationModalVisible,
      orderConfirmationType: type
    });
  };

  render() {
    const { orders } = this.props;
    const totalOrders = ordersReducer(orders);
    const whoOrder = getWhoOrder(orders);
    if (orders.length > 0);

    return (
      <AuthenticatedContext.Consumer>
        {orderer => (
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
                      aria-label={`Chi ha ordinao per ${
                        totalOrders[orderId].descr
                      }`}
                      onClick={() => {
                        this.setState({
                          lastProductSelectedName: totalOrders[orderId].descr
                        });
                        this.props.history.push(
                          `${
                            this.props.match.path
                          }/product/${normalizeToDashcase(
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
                  disabled={orderer !== null}
                  onClick={() => this.orderConfirmationToggle('tel')}
                  icon="fa fa-phone"
                  text="Chiama Antonio"
                />

                <Button
                  disabled={orderer !== null}
                  onClick={() => this.orderConfirmationToggle('wa')}
                  icon="fab fa-whatsapp"
                  text="Ordina da Whatsapp"
                />

                <hr />
                <h4>Chi ha ordinato</h4>
                <div>
                  <div style={{ textAlign: 'right' }}>
                    {orders.length === 0 ? 'Nessuno ha ancora ordinato' : ''}
                  </div>
                  {Object.keys(whoOrder).map(email => (
                    <div key={email}>
                      <NavLink
                        aria-label={`Le ordinazioni di ${whoOrder[email]}`}
                        to={`${this.props.match.path}/${email}`}
                      >
                        {whoOrder[email]} - {email}
                      </NavLink>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Modal
              visible={this.state.isOrderConfirmationModalVisible}
              toggle={this.orderConfirmationToggle}
            >
              <div style={{ maxWidth: '100%' }}>
                <div className={cssModule.title}>
                  <h3>Conferma ordinazione</h3>
                </div>
                <div className="gutter">
                  Sicuro di voler ordinare? <br />
                  Confermando non sarà più possibile modificare tutti gli altri
                  ordini.
                </div>
                <hr style={{ margin: '15px' }} className="hr" />
                <div className="text-right">
                  <Button
                    onClick={async () => {
                      await lockDailyOrders();
                      this.confirmationType[this.state.orderConfirmationType]();
                    }}
                    text="Sì, ordina"
                  />
                  <Button onClick={this.orderConfirmationToggle} text="No" />
                </div>
              </div>
            </Modal>
            <Switch>
              <Route
                path={`${this.props.match.path}/product/:orderId`}
                render={props => (
                  <Modal visible={true} toggle={this.props.history.goBack}>
                    <div style={{ maxWidth: '100%' }}>
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
                  <div
                    style={{ marginTop: '15px' }}
                    className={cssModule.container}
                  >
                    <UserOrder
                      orders={orders}
                      email={props.match.params.email}
                      cssModule={cssModule}
                    />
                  </div>
                )}
              />
            </Switch>
          </div>
        )}
      </AuthenticatedContext.Consumer>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.orders.orderList,
  user: state.auth.user
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
