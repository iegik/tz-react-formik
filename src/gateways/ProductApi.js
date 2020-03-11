import products from '../mocks/products';

let store = [...products];
class ProductApi {
  getProducts = () => {
    return store;
  }
  getProductById = (productId) => {
    return store.find(product => product.id === productId);
  }
  setProduct = (product) => {

    if (!product.id) {
      const id = store[store.length - 1].id + 1;
      store = [...store, {...product, id}];

      return { id };
    }
    store = [...store.filter(({ id }) => id !== product.id), product];

    return { id: product.id };
  }
}

export const productApi = new ProductApi();
