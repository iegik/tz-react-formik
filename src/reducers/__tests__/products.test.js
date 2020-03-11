import { getProductsById, products } from '../products';
import * as productsActions from '../../actions/products';

describe('reducers/products', () => {
  it('getProductsById', () => {
    const state = {
      products: [
        { id: 1, name: 'John' },
        { id: 2, name: 'Doe' },
      ]
    };

    const expected = {
      1: { id: 1, name: 'John' },
      2: { id: 2, name: 'Doe' },
    };

    expect(getProductsById(state)).toStrictEqual(expected);
  })

  it('products RECEIVE_PRODUCTS', () => {
    expect(products([], { type: productsActions.RECEIVE_PRODUCTS, products: ['foo'] })).toStrictEqual(['foo']);
  })

  it('products RECEIVE_PRODUCT', () => {
    expect(products([], { type: productsActions.RECEIVE_PRODUCT, product: 'foo' })).toStrictEqual(['foo']);
  })

  it('products REQUEST_PRODUCT_UPDATE', () => {
    const state = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];
    const action = { type: productsActions.REQUEST_PRODUCT_UPDATE, product: { id: 1 }, requestId: 2 };
    const expected = [
      { id: 1, name: 'John', requestId: 2 },
      { id: 2, name: 'Doe' },
    ];

    expect(products(state, action)).toStrictEqual(expected);
  })

  it('products REQUEST_PRODUCT_DELETE', () => {
    const state = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];
    const action = { type: productsActions.REQUEST_PRODUCT_DELETE, product: { id: 1 }, requestId: 2 };
    const expected = [
      { id: 1, name: 'John', requestId: 2 },
      { id: 2, name: 'Doe' },
    ];

    expect(products(state, action)).toStrictEqual(expected);
  })

  it('products RECEIVE_UPDATED_PRODUCT_ID', () => {
    const state = [
      { requestId: 2 },
      { id: 2, name: 'Doe' },
    ];
    const action = { type: productsActions.RECEIVE_UPDATED_PRODUCT_ID, product: { id: 1, name: 'John' }, requestId: 2 };
    const expected = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];

    expect(products(state, action)).toStrictEqual(expected);
  })

  it('products RECEIVE_UPDATED_PRODUCT_ID', () => {
    const state = [
      { id: 1, name: 'Juhn', requestId: 2 },
      { id: 2, name: 'Doe' },
    ];
    const action = { type: productsActions.RECEIVE_UPDATED_PRODUCT_ID, product: { id: 1, name: 'John' }, requestId: 2 };
    const expected = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];

    expect(products(state, action)).toStrictEqual(expected);
  })

  it('products RECEIVE_DELETED_PRODUCT_ID', () => {
    const state = [
      { id: 1, name: 'John', requestId: 2 },
      { id: 2, name: 'Doe' },
    ];
    const action = { type: productsActions.RECEIVE_DELETED_PRODUCT_ID, requestId: 2 };
    const expected = [
      { id: 2, name: 'Doe' },
    ];

    expect(products(state, action)).toStrictEqual(expected);
  })
})