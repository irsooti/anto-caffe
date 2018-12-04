import { put, call } from 'redux-saga/effects';
import {
  retrieveOrdersIsPending,
  retrieveOrdersWithSuccess,
  retrieveOrdersWithFailure
} from '../actions/orders';
import { getDailyCheckout } from '../../api/orders';

export function* ordersFlowWorker(action) {
  yield put(retrieveOrdersIsPending(true));

  try {
    let response = yield call(getDailyCheckout);
    yield put(retrieveOrdersWithSuccess(response));
  } catch (err) {
    yield put(retrieveOrdersWithFailure(err));
  } finally {
    yield put(retrieveOrdersIsPending(false));
  }
}
