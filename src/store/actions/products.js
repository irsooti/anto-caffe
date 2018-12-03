import {
  GET_PRODUCTS_FLOW,
  GET_PRODUCTS_PENDING,
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_SUCCESS,
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  BEGIN_CHECKOUT_FLOW,
  CHECKOUT_SUCCESS,
  CHECKOUT_PENDING,
  CHECKOUT_FAILED
} from './actionTypes';

export const getProductsFlow = () => {
  return {
    type: GET_PRODUCTS_FLOW
  };
};

export const getProductsStatus = bool => {
  return {
    type: GET_PRODUCTS_PENDING,
    payload: {
      isLoading: bool
    }
  };
};

export const getProductsWithSuccess = products => {
  return {
    type: GET_PRODUCTS_SUCCESS,
    payload: {
      products
    }
  };
};

export const getProductsWithFailure = err => {
  return {
    type: GET_PRODUCTS_FAILURE,
    payload: {
      isError: true,
      msg: err
    }
  };
};

export const addProductToCart = id => {
  return {
    type: ADD_PRODUCT_TO_CART,
    payload: { id }
  };
};

export const removeProductFromCart = id => {
  return {
    type: REMOVE_PRODUCT_FROM_CART,
    payload: { id }
  };
};

export const beginCheckoutFlow = (cart, uid) => ({
  type: BEGIN_CHECKOUT_FLOW,
  payload: { cart, uid }
});

export const checkoutSuccess = response => ({
  type: CHECKOUT_SUCCESS,
  payload: { response }
});

export const checkoutFailed = err => ({
  type: CHECKOUT_FAILED,
  payload: {
    err
  }
});

export const checkoutPendingStatus = bool => ({
  type: CHECKOUT_PENDING,
  payload: {
    checkoutIsPending: bool
  }
});
