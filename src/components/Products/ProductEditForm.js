import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { Input, FormGroup, Label, Button } from 'reactstrap'
import CategoryType from './CategoryType';

const ProductEditForm = ({ onSubmit, onCancel, product, categories = [] }) => (
  <Formik initialValues={product} onSubmit={onSubmit}>
    {(props) => (
      <Form>
        <FormGroup>
          <Label for="name">Name</Label>
          <Field name="name" placeholder="Name" component={Input} />
          <ErrorMessage name="name" />
        </FormGroup>

        <FormGroup>
          <Label for="band">Band</Label>
          <Field name="band" placeholder="Band" component={Input} />
          <ErrorMessage name="band" />
        </FormGroup>

        <FormGroup>
          <Label for="rating">Rating</Label>
          <Field name="rating" placeholder="Rating" component={Input} />
          <ErrorMessage name="rating" />
        </FormGroup>

        <FormGroup check>
          <Label check>
            <Field type="checkbox" name="featured" placeholder="Featured" component={Input} /> Featured
          </Label>
          <ErrorMessage name="Featured" />
        </FormGroup>

        <FormGroup>
          <Label for="itemsInStock">Items in stock</Label>
          <Field type="number" name="itemsInStock" placeholder="Items in stock" component={Input} />
          <ErrorMessage name="itemsInStock" />
        </FormGroup>

        <FormGroup>
          <Field as="select" name="category">
            {categories.map(category => (
              <option value={category.id} key={category.id} selected={category.id === product.category}>{category.name}</option>
            ))}
          </Field>
          <ErrorMessage name="category" />
        </FormGroup>

        <FormGroup>
          <Label for="receiptDate">Receipt date</Label>
          <Field type="date" name="receiptDate" placeholder="Receipt date" component={Input} />
          <ErrorMessage name="receiptDate" />
        </FormGroup>

        <FormGroup>
          <Label for="expirationDate">Expiration Date</Label>
          <Field type="date" name="expirationDate" placeholder="Expiration Date" component={Input} />
          <ErrorMessage name="expirationDate" />
        </FormGroup>

        <FormGroup>
          <Label for="receiptDate">Receipt date</Label>
          <Field type="date" name="receiptDate" placeholder="Receipt date" component={Input} />
          <ErrorMessage name="receiptDate" />
        </FormGroup>

        <Button type="submit" onSubmit={onCancel}>Cancel</Button>
        {' '}
        <Button type="submit" color="primary" onSubmit={onSubmit}>Submit</Button>
      </Form>
    )}
  </Formik>
);

ProductEditForm.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  product: PropTypes.object.isRequired,
  categories: PropTypes.arrayOf(CategoryType)
};

export default ProductEditForm;