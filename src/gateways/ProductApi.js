import products from '../mocks/products';

let store = [...products];
const takeIdProperty = ({ id }) => id;

class ProductApi {
  getProducts = () => {
    return store;
  }
  getProductById = (productId) => {
    return store.find(product => product.id === productId);
  }
  setProduct = ({ categories, ...product }) => {
    const storedAt = (new Date()).toISOString();
    if (!product.id) {
      const id = store[store.length - 1].id + 1;

      store = [
        ...store,
        {
          ...product,
          id, // replacing with new id
          categories: categories.map(takeIdProperty),
          storedAt
        }
      ];

      return { id, storedAt };
    }

    store = [
      ...store.filter(({ id }) => id !== product.id),
      {
        ...product,
        categories: categories.map(takeIdProperty),
        storedAt
      }
    ];

    return { id: product.id, storedAt };
  }

  deleteProduct = ({ categories, ...product }) => {
    const deletedAt = (new Date()).toISOString();

    store = store.filter(({ id }) => product.id !== id);

    return { ...product, categories: categories.map(takeIdProperty), deletedAt };
  }
}

export const productApi = new ProductApi();
