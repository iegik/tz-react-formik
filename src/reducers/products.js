import * as productsActions from '../actions/products';

export const initialState = [];

export function products(state = initialState, action) {
  switch (action.type) {
    case productsActions.RECEIVE_PRODUCTS:
      return [
        ...action.products,
      ];
    case productsActions.RECEIVE_PRODUCT:
      if (!action.product) {
        return state;
      }
      return [
        ...state,
        action.product,
      ];
    case productsActions.REQUEST_PRODUCT_UPDATE:
      return [
        {...action.product, requestId: action.requestId},
        ...state.filter(product => product.id !== action.product.id),
      ];
    case productsActions.RECEIVE_PRODUCT_ID:
      const {requestId, ...product} = state.find(product => product.requestId === action.requestId);

      return [
        {...product, id: action.productId },
        ...state.filter(product => product.requestId !== action.requestId),
      ];
    default:
      return state;
  }
}

export function getProductsById(state) {
  return state.products.reduce((acc, product) => {
    return {
      ...acc,
      [product.id]: product
    }
  }, {})
}
