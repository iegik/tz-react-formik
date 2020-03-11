import products from '../mocks/products';

const takeIdProperty = ({ id }) => id;

export class ProductApi {
  constructor() {
    this.store = [...products];
  }
  getProducts = () => {
    return this.store;
  }
  getProductById = (productId) => {
    return this.store.find(product => product.id === productId);
  }
  setProduct = (product) => {
    const storedAt = (new Date()).toISOString();
    if (!product.id) {
      const id = this.store[this.store.length - 1].id + 1;

      this.store = [
        ...this.store,
        {
          ...product,
          id, // replacing with new id
          storedAt
        }
      ];

      return { id, storedAt };
    }

    this.store = [
      ...this.store.filter(({ id }) => id !== product.id),
      {
        ...product,
        storedAt
      }
    ];

    return { product, storedAt };
  }

  deleteProduct = ({ categories, ...product }) => {
    const deletedAt = (new Date()).toISOString();

    if (product.id == null) {
      return {};
    }

    this.store = this.store.filter(({ id }) => product.id !== id);

    return { ...product, categories: categories.map(takeIdProperty), deletedAt };
  }
}

export const productApi = new ProductApi();
