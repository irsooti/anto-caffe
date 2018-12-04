import * as actionTypes from './actionTypes';

export const getProductsFlow = () => {
  return {
    type: actionTypes.GET_PRODUCTS_FLOW
  };
};

export const getProductsStatus = bool => {
  return {
    type: actionTypes.GET_PRODUCTS_PENDING,
    payload: {
      isLoading: bool
    }
  };
};

export const getProductsWithSuccess = products => {
  return {
    type: actionTypes.GET_PRODUCTS_SUCCESS,
    payload: {
      products
    }
  };
};

export const getProductsWithFailure = err => {
  return {
    type: actionTypes.GET_PRODUCTS_FAILURE,
    payload: {
      isError: true,
      msg: err
    }
  };
};

export const addProductToCart = id => {
  return {
    type: actionTypes.ADD_PRODUCT_TO_CART,
    payload: { id }
  };
};

export const removeProductFromCart = id => {
  return {
    type: actionTypes.REMOVE_PRODUCT_FROM_CART,
    payload: { id }
  };
};

export const beginCheckoutFlow = (cart, uid, displayName) => ({
  type: actionTypes.BEGIN_CHECKOUT_FLOW,
  payload: { cart, uid, displayName }
});

export const checkoutSuccess = response => ({
  type: actionTypes.CHECKOUT_SUCCESS,
  payload: { response }
});

export const checkoutFailed = err => ({
  type: actionTypes.CHECKOUT_FAILED,
  payload: {
    err
  }
});

export const checkoutPendingStatus = bool => ({
  type: actionTypes.CHECKOUT_PENDING,
  payload: {
    checkoutIsPending: bool
  }
});
