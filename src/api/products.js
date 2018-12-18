import { database, auth } from 'firebase/app';
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

    database()
      .ref('checkout/' + formatRef + '/' + uid)
      .push(
        cart
          .filter(x => x.quantity !== 0)
          .map(c => {
            c.displayName = displayName;
            c.email = email;
            return c;
          })
      )
      .then(value => resolve(value))
      .catch(err => reject(err));
  });

export const addProduct = productName =>
  new Promise((resolve, reject) => {
    auth().onAuthStateChanged(
      function(user) {
        var ref = database()
          .ref('products')
          .push({ descr: productName, author: user.email });

        ref.on(
          'value',
          function(snapshot, b) {
            resolve(snapshot.key);
          },
          function(error) {
            reject(error.code);
          }
        );
      },
      err => console.error(err),
      complete => complete()
    );
  });
