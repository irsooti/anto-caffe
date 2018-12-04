import * as products from '../actions/products';
import { put, call } from 'redux-saga/effects';
import { getAllProducts, addDailyCheckout } from '../../api/products';

export function* retrievePostsWorker(action) {
  yield put(products.getProductsStatus(true));
  try {
    let response = yield call(getAllProducts);
    yield put(products.getProductsWithSuccess(response));
  } catch (err) {
    console.log(err);
    yield put(products.getProductsWithFailure(err.message));
  } finally {
    yield put(products.getProductsStatus(false));
  }
}

export function* checkoutWorker(action) {
  yield put(products.checkoutPendingStatus(true));
  try {
    let response = yield call(
      addDailyCheckout,
      action.payload.cart,
      action.payload.uid,
      action.payload.displayName
    );

    yield put(products.checkoutSuccess(response));
  } catch (err) {
    console.log(err);
    yield put(products.checkoutFailed(err.message));
  } finally {
    yield put(products.checkoutPendingStatus(false));
  }
}
