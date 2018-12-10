export function getOrdersByEmail(orders = [], email) {
  return ordersReducer(orders.filter(order => order.email === email));
}

export function getWhoOrder(orders = []) {
  return orders.reduce((acc, currentOrder) => {
    var key = currentOrder['email'];
    if (!acc[key]) {
      acc[key] = currentOrder['displayName'];
    }

    return acc;
  }, {});
}

export function ordersReducer(orders = []) {
  if (orders.length === 0) return orders;
  return orders.reduce((acc, currentOrder) => {
    var key = currentOrder['id'];
    if (!acc[key]) {
      acc[key] = { quantity: 0 };
    }
    acc[key].descr = currentOrder.descr;
    acc[key].quantity = currentOrder.quantity + acc[key].quantity;
    return acc;
  }, {});
}
