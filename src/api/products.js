import { database } from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

export const getAllProducts = () =>
  new Promise((resolve, reject) => {
    var ref = database().ref('products');

    ref.on(
      'value',
      function(snapshot) {
        let value = snapshot.val();
        resolve(
          Object.keys(value).map(id => ({
            id,
            ...value[id]
          }))
        );
      },
      function(error) {
        reject(error.code);
      }
    );
  });

export const addDailyCheckout = (cart, uid, displayName, email) =>
  new Promise((resolve, reject) => {
    let today = new Date();
    let formatRef =
      today.getDate() + '' + today.getFullYear() + '' + today.getMonth();
    var ref = database()
      .ref('checkout/' + formatRef + '/' + uid)
      .push(
        cart
          .filter(x => x.quantity !== 0)
          .map(c => {
            c.displayName = displayName;
            c.email = email;
            return c;
          })
      );

    ref.on(
      'value',
      function(snapshot) {
        let value = snapshot.val();
        resolve(value);
      },
      function(error) {
        reject(error.code);
      }
    );
  });

export const addProduct = productName =>
  new Promise((resolve, reject) => {
    var ref = database()
      .ref('products')
      .push({ descr: 'caffe' });

    ref.on(
      'value',
      function(snapshot) {
        resolve(snapshot.val());
      },
      function(error) {
        reject(error.code);
      }
    );
  });
