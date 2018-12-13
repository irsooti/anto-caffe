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

export function whoOrderThis(orders = [], descr) {
  return whoOrderThisReducer(orders.filter(order => order.descr === descr));
}

function whoOrderThisReducer(orders = []) {
  if (orders.length === 0) return orders;
  let reducer = orders.reduce((acc, currentOrder) => {
    var key = currentOrder['email'];
    if (!acc[key]) {
      acc[key] = {
        quantity: 1,
        email: key,
        displayName: currentOrder.displayName
      };
    } else {
      acc[key].quantity = acc[key].quantity + 1;
    }

    return acc;
  }, {});
  return Object.keys(reducer).map(email => reducer[email]);
}
