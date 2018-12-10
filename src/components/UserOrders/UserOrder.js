import React from 'react';
import { getOrdersByEmail } from '../../utils/order';

const UserOrder = ({ orders, email, cssModule }) => {
  const totalOrders = getOrdersByEmail(orders, email);

  return Object.keys(totalOrders).map((orderId, id) => {
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
  });
};

export default UserOrder;
