import * as products from '../actions/products';
import { put, call } from 'redux-saga/effects';
import {
  getAllProducts,
  addDailyCheckout,
  addProduct
} from '../../api/products';

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
      action.payload.displayName,
      action.payload.email
    );

    console.log(response)

    yield put(products.checkoutSuccess(response));
  } catch (err) {
    console.log(err);
    yield put(products.checkoutFailed(err.message));
  } finally {
    yield put(products.checkoutPendingStatus(false));
  }
}

export function* addProductWorker(action) {
  console.log(action)
  yield put(products.addProductPendingStatus(true));
  try {
    let id = yield call(addProduct, action.payload.descr);
    yield put(products.addProductWithSuccess(id, action.payload.descr));
  } catch (err) {
    yield put(products.addProductFailed(err.message));
  } finally {
    yield put(products.addProductPendingStatus(false));
  }
}
