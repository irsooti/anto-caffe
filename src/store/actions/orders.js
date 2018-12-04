import * as actionTypes from './actionTypes';

export const beginOrdersFlow = () => ({
  type: actionTypes.BEGIN_ORDERS_FLOW
});

export const retrieveOrdersWithSuccess = orders => ({
  type: actionTypes.RETRIEVE_ORDERS_SUCCESS,
  payload: { orderList: orders }
});

export const retrieveOrdersWithFailure = err => ({
  type: actionTypes.RETRIEVE_ORDERS_FAILURE,
  payload: { err: err.message }
});

export const retrieveOrdersIsPending = bool => ({
  type: actionTypes.RETRIEVE_ORDERS_PENDING,
  payload: { isPending: bool }
});
