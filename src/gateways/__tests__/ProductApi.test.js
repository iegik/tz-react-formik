import { ProductApi } from '../ProductApi';

describe('productApi', () => {
  it('getProducts', () => {
    const productApi = new ProductApi();

    const products = productApi.getProducts();

    expect(productApi.store.map(({ id }) => id)).toStrictEqual([1, 2, 3]);
    expect(products.map(({ id }) => id)).toStrictEqual([1, 2, 3]);
  })

  it('setProduct (create)', () => {
    const productApi = new ProductApi();

    const out = productApi.setProduct({ name: 'Foo' })
    const product = productApi.store.pop();

    expect(out.id).toBe(4);
    expect(product.id).toBe(4);
    expect(product.name).toBe('Foo');
  })

  it('setProduct (update)', () => {
    const productApi = new ProductApi();

    productApi.setProduct({ id: 1, name: 'Foo'});
    const product = productApi.store.pop();

    expect(product.id).toBe(1);
    expect(product.name).toBe('Foo');
  })

  it('deleteProduct', () => {
    const productApi = new ProductApi();

    const out = productApi.deleteProduct(productApi.store[0]);

    expect(out.id).toBe(1);
    expect(productApi.store.map(({ id }) => id)).toStrictEqual([2, 3]);
  })
});
