import { database, auth } from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { getTodayPath } from '../utils/data';

export const onDailyCheckoutChange = onChangeFn => {
  let today = new Date();
  let formatRef =
    today.getDate() + '' + today.getFullYear() + '' + today.getMonth();
  var ref = database().ref('checkout/' + formatRef);
  ref.on(
    'value',
    function(snapshot) {
      let orders = snapshot.val();
      let container = [];

      if (!orders) return container;

      Object.keys(orders).map(orderId => {
        return Object.keys(orders[orderId]).map(authorId => {
          return orders[orderId][authorId].map(item => {
            return container.push({
              uid: authorId,
              ...item
            });
          });
        });
      });

      onChangeFn(container);
    },
    function(error) {
      throw error.message;
    }
  );
};

export const lockDailyOrders = async () => {
  try {
    const { displayName, email } = auth().currentUser;
    return await database()
      .ref('locks/' + getTodayPath())
      .set({ displayName, email, timestamp: new Date().toISOString() });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const onLockDailyChange = onChange =>
  new Promise(resolve => {
    try {
      database()
        .ref('locks')
        .child(getTodayPath())
        .on('value', snapshot => resolve(onChange(snapshot.val())));
    } catch (err) {
      resolve(null);
    }
  });

export const isDailyOrderLocked = async () => {
  try {
    const resp = await database()
      .ref('locks/' + getTodayPath())
      .once('value');
    return !!resp.val();
  } catch (err) {
    console.error(err);
    return false;
  }
};

/**
 * @deprecated better use onDailyCheckoutChange instead
 */
export const getDailyCheckout = () =>
  new Promise((resolve, reject) => {
    let today = new Date();
    let formatRef =
      today.getDate() + '' + today.getFullYear() + '' + today.getMonth();
    var ref = database().ref('checkout/' + formatRef);

    ref.on(
      'value',
      function(snapshot) {
        let orders = snapshot.val();
        let container = [];

        if (!orders) return container;

        Object.keys(orders).map(orderId => {
          return Object.keys(orders[orderId]).map(authorId => {
            return orders[orderId][authorId].map(item => {
              return container.push({
                uid: authorId,
                ...item
              });
            });
          });
        });

        resolve(container);
      },
      function(error) {
        reject(error.code);
      }
    );
  });
