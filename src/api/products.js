import { database, auth } from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

export const getAllProducts = () =>
  new Promise((resolve, reject) => {
    database()
      .ref('products')
      .once('value')
      .then(res => {
        let value = res.val();
        resolve(
          Object.keys(value).map(id => ({
            id,
            ...value[id]
          }))
        );
      });
    //
    // ref.on(
    //   'value',
    //   function(snapshot) {
    //     let value = snapshot.val();
    //     resolve(
    //       Object.keys(value).map(id => ({
    //         id,
    //         ...value[id]
    //       }))
    //     );
    //   },
    //   function(error) {
    //     reject(error.code);
    //   }
    // );
  });
/**
 *
 * @param {Array} cart
 * Cart with ordered products
 * @param {String} uid
 * User ID
 * @param {String} displayName
 * User display name
 * @param {String} email
 * User current email
 */
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

/**
 * @param {Array} cart
 * Cart with ordered products
 * @param {String} uid
 * User ID
 * @param {String} displayName
 * User display name
 * @param {String} email
 * User current email
 */
export const changeDailyCheckout = (cart, uid) =>
  new Promise(async resolve => {
    let today = new Date();
    let formatRef =
      today.getDate() + '' + today.getFullYear() + '' + today.getMonth();
    let branch = database().ref('checkout/' + formatRef + '/' + uid);
    await branch.remove();

    resolve(await branch.push(cart));
  });

export const addProduct = productName =>
  new Promise(resolve => {
    const user = auth().currentUser;
    database()
      .ref('products')
      .push({ descr: productName, author: user.email })
      .once('value')
      .then(snapshot => {
        resolve(snapshot.key);
      });
  });
