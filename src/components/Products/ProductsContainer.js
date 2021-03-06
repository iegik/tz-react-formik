import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import ProductsList from './ProductsList';
import { fetchCategories } from '../../actions/categories';
import { fetchProducts, fetchDeleteProduct } from '../../actions/products';
import { getCategoriesById } from '../../reducers/categories';

class ProductsContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }

  render() {
    const { products, history, dispatch } = this.props;

    function handleClick(id) {
      history.push(`/edit/${id}`);
    }

    function handleCreate(id) {
      history.push(`/edit`);
    }

    function handleDelete(product) {
      if (window.confirm(`Are you sure you want to delete "${product.name}"`)) {
        dispatch(fetchDeleteProduct(product));
      }
    }

    return (
      <Fragment>
        <Header name="Products"/>
        <ProductsList products={products} onEdit={handleClick} onCreate={handleCreate} onDelete={handleDelete}/>
      </Fragment>
    );
  }
}

ProductsContainer.propTypes = {
  products: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const categoriesById = getCategoriesById(state);

  const products = state.products.map(product => {
    const categories =  product.categories.map(id => categoriesById[id])

    return {
      ...product,
      categories
    };
  });

  return {
    products,
  }
};

export default connect(mapStateToProps)(ProductsContainer);
