import React from 'react';
import PropTypes from 'prop-types';

const ProductEditForm = ({ onSubmit, product }) => (
  <>
    EditForm
  </>
);

ProductEditForm.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  product: PropTypes.object.isRequired,
};

export default ProductEditForm;