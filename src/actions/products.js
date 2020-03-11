import { productApi } from '../gateways/ProductApi';

export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const REQUEST_PRODUCT_UPDATE = 'REQUEST_PRODUCT_UPDATE';
export const RECEIVE_PRODUCT_ID = 'RECEIVE_PRODUCT_ID';
export const RECEIVE_PRODUCT = 'RECEIVE_PRODUCT';

const requestProducts = () => ({
  type: REQUEST_PRODUCTS,
});

const receiveProducts = (json) => ({
  type: RECEIVE_PRODUCTS,
  products: json.map(product => product),
});

const requestProductUpdate = (product, requestId) => ({
  type: REQUEST_PRODUCT_UPDATE,
  product,
  requestId
});

const receiveProductId = (json, requestId) => ({
  type: RECEIVE_PRODUCT_ID,
  productId: json.id,
  requestId,
});

const receiveProduct = (json) => ({
  type: RECEIVE_PRODUCT,
  product: json,
});

export const fetchProducts = () => dispatch => {
  dispatch(requestProducts());
  const json = productApi.getProducts();
  dispatch(receiveProducts(json));
};

export const fetchProductById = (productId) => dispatch => {
  dispatch(requestProducts());
  const json = productApi.getProductById(productId);
  dispatch(receiveProduct(json));
};

export const fetchUpdateProduct = (product, requestId) => dispatch => {
  dispatch(requestProductUpdate(product, requestId));
  const json = productApi.setProduct(product);
  dispatch(receiveProductId(json, requestId));
};
