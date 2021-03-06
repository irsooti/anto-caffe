import { all, takeLatest, takeEvery } from 'redux-saga/effects';
import * as auth from './auth';
import * as products from './products';
import * as orders from './orders';
import * as actionTypes from '../actions/actionTypes';

export function* rootSaga() {
  yield all([
    yield takeLatest(
      actionTypes.AUTHENTICATION_FLOW,
      auth.authenticationWorker
    ),
    yield takeLatest(actionTypes.VERIFYING_TOKEN_FLOW, auth.verifyTokenWorker),
    yield takeEvery(actionTypes.LOGOUT_FLOW, auth.logoutWorker),
    yield takeLatest(actionTypes.SIGN_UP_FLOW, auth.signupWorker),
    yield takeLatest(
      actionTypes.GET_PRODUCTS_FLOW,
      products.retrievePostsWorker
    ),
    yield takeLatest(actionTypes.BEGIN_ORDERS_FLOW, orders.ordersFlowWorker),
    yield takeLatest(actionTypes.BEGIN_CHECKOUT_FLOW, products.checkoutWorker),
    yield takeLatest(
      actionTypes.BEGIN_ADD_PRODUCT_FLOW,
      products.addProductWorker
    )
  ]);
}
