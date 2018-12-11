import React, { Fragment } from 'react';
import { getOrdersByEmail, getWhoOrder } from '../../utils/order';

const UserOrder = ({ orders, email, cssModule }) => {
  const totalOrders = getOrdersByEmail(orders, email);
  const who = getWhoOrder(orders);

  return (
    <Fragment>
      <div className={cssModule.title}>
        <h3>Ordini di {who[email]}</h3>
      </div>

      {Object.keys(totalOrders).map((orderId, id) => (
        <div className={cssModule.order} key={id}>
          <span className={cssModule.orderName}>
            {totalOrders[orderId].descr}
          </span>
          <span className={cssModule.orderCount}>
            {totalOrders[orderId].quantity}
          </span>
        </div>
      ))}
    </Fragment>
  );
};

export default UserOrder;
