import * as actionTypes from '../actions/actionTypes';
import { updateState } from '../../utils/data';

const initialState = {
  ordersArePending: false,
  orderList: [],
  retrieveOrdersErr: null
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.RETRIEVE_ORDERS_PENDING:
      return updateState(state, { ordersArePending: payload.ordersArePending });

    case actionTypes.RETRIEVE_ORDERS_SUCCESS:
      return updateState(state, {
        orderList: payload.orderList,
        retrieveOrdersErr: null
      });

    case actionTypes.RETRIEVE_ORDERS_FAILURE:
      return updateState(state, {
        retrieveOrdersErr: payload.err
      });

    default:
      return state;
  }
};

export default reducer;
