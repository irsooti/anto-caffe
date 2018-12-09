import { database } from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

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
