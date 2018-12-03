import * as actionTypes from '../actions/actionTypes';
import { updateState } from '../../utils/data';

const initialState = {
  isLoading: false,
  products: [],
  isError: null,
  errorMsg: null,
  checkoutErrorMsg: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS_PENDING:
      return updateState(state, { isLoading: action.payload.isLoading });

    case actionTypes.GET_PRODUCTS_SUCCESS:
      let products = action.payload.products.map(product => ({
        ...product,
        quantity: 0
      }));

      return updateState(state, { products: products });

    case actionTypes.GET_PRODUCTS_FAILURE:
      return updateState(state, {
        isError: action.payload.isError,
        errorMsg: action.payload.msg
      });

    case actionTypes.ADD_PRODUCT_TO_CART: {
      let currentCart = [...state.products];

      let currentProduct = currentCart.filter(
        w => w.id === action.payload.id
      )[0];
      currentProduct.quantity = currentProduct.quantity + 1;

      return updateState(state, { products: currentCart });
    }

    case actionTypes.REMOVE_PRODUCT_FROM_CART: {
      let currentCart = [...state.products];
      let currentProduct = currentCart.filter(
        w => w.id === action.payload.id
      )[0];

      currentProduct.quantity = currentProduct.quantity
        ? currentProduct.quantity - 1
        : currentProduct.quantity;

      return updateState(state, { products: currentCart });
    }

    case actionTypes.CHECKOUT_FAILED: {
      return updateState(state, { checkoutErrorMsg: action.payload.err });
    }
    case actionTypes.CHECKOUT_PENDING: {
      return updateState(state, {
        checkoutIsPending: action.payload.checkoutIsPending
      });
    }
    case actionTypes.CHECKOUT_SUCCESS: {
      let products = action.payload.products.map(product => ({
        ...product,
        quantity: 0
      }));

      return updateState(state, {
        checkoutIsPending: action.payload.checkoutIsPending,
        products: products
      });
    }

    default:
      return state;
  }
};

export default reducer;
