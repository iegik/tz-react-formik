import React, { useReducer, useCallback, useEffect } from 'react';
import ProductEditForm from './ProductEditForm';
import { products as productsReducer } from '../../reducers/products';
import { categories as categoriesReducer } from '../../reducers/categories';
import { fetchUpdateProduct, fetchProductById, fetchDeleteProduct } from '../../actions/products';
import { fetchCategories } from '../../actions/categories';
import { parseDateIn } from './parsers';

const defaultProduct = {
  name: '',
  brand: '',
  rating: '',
  featured: false,
  itemsInStock: '',
  categories: '',
  receiptDate: '',
  expirationDate: '',
}

const ProductEditFormContainer = (props) => {
  const [products, productsDispatch] = useReducer(productsReducer, []);
  const [categories, categoriesDispatch] = useReducer(categoriesReducer, []);

  const productId = parseInt(props.match.params.id) || null;
  let product = null;
  if (productId == null){
    product = { ...defaultProduct, createdAt: parseDateIn(new Date()) };
  } else if (products.length) {
    product = products.find(product => product.id === productId);
  }

  const goBack = useCallback(function () {
    props.history.push('/');
  }, [props.history]);

  const onSubmit = useCallback((product) => {
    fetchUpdateProduct(product)(productsDispatch);
    goBack();
  }, [goBack]);

  const onDelete = useCallback(() => {
    fetchDeleteProduct(product)(productsDispatch);
    goBack();
  }, [goBack, product]);

  useEffect(() => {
    fetchProductById(productId)(productsDispatch);
    fetchCategories()(categoriesDispatch);
  }, [productId]);

  if(!product) {
    return null;
  }

  return (
    <ProductEditForm
      product={product}
      categories={categories}
      onSubmit={onSubmit}
      onCancel={goBack}
      onDelete={onDelete}
    />
  );
};

export default ProductEditFormContainer;
