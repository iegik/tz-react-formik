import React, { useReducer, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import ProductEditForm from './ProductEditForm';
import { products as productsReducer, initialState as productsInitialState } from '../../reducers/products';
import { categories as categoriesReducer, getCategoriesById } from '../../reducers/categories';
import { fetchUpdateProduct, fetchProductById, fetchDeleteProduct } from '../../actions/products';
import { fetchCategories } from '../../actions/categories';
import { parseDateIn } from './parsers';

const ProductEditFormContainer = (props) => {
  const [products, productsDispatch] = useReducer(productsReducer, productsInitialState);
  const [categories, categoriesDispatch] = useReducer(categoriesReducer, []);

  const productId = parseInt(props.match.params.id);
  const product = products.find(product => product.id === productId) || { categories: [], createdAt: parseDateIn(new Date()) };

  const goBack = useCallback(function () {
    props.history.push('/');
  }, [props.history]);

  const onSubmit = useCallback((product) => {
    fetchUpdateProduct(product, +new Date())(productsDispatch);
    goBack();
  }, [goBack]);

  const onDelete = useCallback((product) => {
    fetchDeleteProduct(product, +new Date())(productsDispatch);
    goBack();
  }, [goBack]);

  useEffect(() => {
    fetchProductById(productId)(productsDispatch);
    fetchCategories()(categoriesDispatch);
  }, [productId]);

  return (
    <ProductEditForm
      key={product.id}
      product={product}
      categories={categories}
      onSubmit={onSubmit}
      onCancel={goBack}
      onDelete={onDelete}
    />
  );
};

const mapStateToProps = (state) => {
  const categoriesById = getCategoriesById(state);

  return {
    products: state.products,
    categories: categoriesById,
  }
};


export default connect(mapStateToProps)(ProductEditFormContainer);