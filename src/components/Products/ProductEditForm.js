import React from 'react';
import PropTypes from 'prop-types';
import { FastField, Form, Formik, ErrorMessage } from 'formik';
import { Input, CustomInput, FormGroup, Label, Button, FormFeedback } from 'reactstrap';
import Ratings from 'react-ratings-declarative';
import { Grid, Row, Col } from 'react-flexbox-grid';
import CategoryType from './CategoryType';
import MultiSelect from './MultiSelect';
import { parseDateIn, parseDateOut } from './parsers';

// Can use another public available library for validation/schema
const compareByFn = fn => (name, message) => (errors, values) => fn(values[name])
  ? { ...errors, [name]: message }
  : errors;

const isEmpty = value =>  value == null || value === '';
const greaterNumber = (value, number) => parseInt(value || 0) > number;
const greaterArray = (value, number) => value == null || value.length > number;
const greaterText = (value, number) => value == null || value.length > number;

const isRequired = compareByFn(isEmpty)
const greaterText200 = compareByFn(value => greaterText(value, 200));
const greaterNumber10 = compareByFn(value => greaterNumber(value, 10));
const greaterArray5 = compareByFn(value => greaterArray(value, 5));

const autoFeatured = (props, rating) => {
  if (!props.values.featured && rating && rating > 8) {
    props.setFieldValue('featured', true);
  }
};

const validate = (values) => [
  isRequired('name', 'Name is required'),
  greaterText200('name', 'Name length should not be greater then 200'),
  greaterNumber10('rating', 'Rating should not be greater than 10'),
  isRequired('rating', 'Rating is required'),
  greaterArray5('categories', 'A product should have from 1 to 5 categories'),
  isRequired('categories', 'A product should have from 1 to 5 categories'),
].reduce((errors, fn) => fn(errors, values), {});

const ProductEditForm = ({ onSubmit, onCancel, onDelete, product, categories = [] }) => (
  <Formik initialValues={product} onSubmit={onSubmit} validate={validate}>
    {(props) => (
      <Form onSubmit={props.handleSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <FastField name="name" placeholder="Name" as={Input}
            onChange={event => { props.setFieldValue('name', event.target.value); }}
            onBlur={props.handleBlur}
            value={props.values.name}
            invalid={props.errors.name != null}
          />
          <ErrorMessage component={FormFeedback} name="name" />
        </FormGroup>

        <FormGroup>
          <Label for="brand">Brand</Label>
          <FastField name="brand" placeholder="Brand" as={Input}
            onChange={event => { props.setFieldValue('brand', event.target.value); }}
            onBlur={props.handleBlur}
            value={props.values.brand}
            invalid={props.errors.brand != null}
          />
          <ErrorMessage component={FormFeedback} name="brand" />
        </FormGroup>

        <FormGroup>
          {/* <Label for="rating">Rating</Label> */}
          {/* <FastField type="number" name="rating" id="rating1" placeholder="Rating" as={Input}
            onChange={event => { const value = parseInt(event.target.value || 0); props.setFieldValue('rating', value); autoFeatured(props, value); }}
            onBlur={props.handleBlur}
            value={props.values.rating}
            max={10}
            min={0}
            invalid={props.errors.rating}
          />
          <FastField type="range" name="rating" id="rating2" placeholder="Rating" as={CustomInput}
            onChange={event => { const value = parseInt(event.target.value || 0); props.setFieldValue('rating', value); autoFeatured(props, value); }}
            onBlur={props.handleBlur}
            max={10}
            value={props.values.rating == null ? '' : props.values.rating}
            invalid={props.errors.rating}
          /> */}
          <div className={props.errors.rating != null ? 'is-invalid  ' : ''}>
          <FastField as={Ratings} name="rating" id="rating3"
            changeRating={ratings => { const value = parseInt(ratings || 0) * 2; props.setFieldValue('rating', value); autoFeatured(props, value); }}
            onBlur={props.handleBlur}
            rating={parseInt(props.values.rating || 0) * 0.5}
            invalid={props.errors.rating != null}
            widgetRatedColors="#007bff"
          >
            <Ratings.Widget/>
            <Ratings.Widget/>
            <Ratings.Widget/>
            <Ratings.Widget/>
            <Ratings.Widget/>
          </FastField>
          </div>

          <ErrorMessage component={FormFeedback} name="rating" />
        </FormGroup>

        <FormGroup>
          <FormGroup check>
            {/* <Label check>
              <FastField type="checkbox" name="featured" placeholder="Featured" as={Input}
                onChange={event => { props.setFieldValue('featured', event.target.checked); }}
                onBlur={props.handleBlur}
                checked={props.values.featured}
                invalid={props.errors.featured != null}
              /> Featured
            </Label> */}

            <FastField type="switch" name="featured" id="featured1" placeholder="Featured" as={CustomInput}
              onChange={event => { props.setFieldValue('featured', event.target.checked); }}
              onBlur={props.handleBlur}
              checked={props.values.featured}
              invalid={props.errors.featured != null}
              label="Featured"
            />

            <ErrorMessage component={FormFeedback} name="Featured" />
          </FormGroup>
        </FormGroup>

        <FormGroup>
          <Label for="itemsInStock">Items in stock</Label>
          <FastField type="number" name="itemsInStock" placeholder="Items in stock" as={Input}
            onChange={event => { props.setFieldValue('itemsInStock', parseInt(event.target.value || 0) || ''); }}
            onBlur={props.handleBlur}
            value={props.values.itemsInStock}
            min={0}
            invalid={props.errors.itemsInStock != null}
          />
          <ErrorMessage component={FormFeedback} name="itemsInStock" />
        </FormGroup>

        <FormGroup>
          <FastField
            as={MultiSelect}
            name="categories"
            options={categories.map(({ id, name }) => ({ value: id, label: name }))}
            onChange={option => { props.setFieldValue('categories', option && option.map(({ value }) => value)); }}
            value={props.values.categories == null ? [] : props.values.categories}
            invalid={props.errors.categories != null}
          />
          <ErrorMessage component={FormFeedback} name="categories" />
        </FormGroup>

        <FormGroup>
          <Label for="receiptDate">Receipt date</Label>
          <FastField type="date" name="receiptDate" placeholder="Receipt date" as={Input}
            onChange={event => { props.setFieldValue('receiptDate', parseDateIn(event.target.value)); }}
            onBlur={props.handleBlur}
            value={parseDateOut(props.values.receiptDate)}
            invalid={props.errors.receiptDate != null}
          />
          <ErrorMessage component={FormFeedback} name="receiptDate" />
        </FormGroup>

        <FormGroup>
          <Label for="expirationDate">Expiration Date</Label>
          <FastField type="date" name="expirationDate" placeholder="Expiration Date" as={Input}
            onChange={event => { props.setFieldValue('expirationDate', parseDateIn(event.target.value)); }}
            onBlur={props.handleBlur}
            value={parseDateOut(props.values.expirationDate)}
            invalid={props.errors.expirationDate != null}
          />
          <ErrorMessage component={FormFeedback} name="expirationDate" />
        </FormGroup>

        {/* <FormGroup>
          <Label for="createdAt">Created At</Label>
          <FastField type="date" name="createdAt" placeholder="Created At" as={Input}
            onChange={event => { props.setFieldValue('createdAt', parseDateIn(event.target.value)); }}
            onBlur={props.handleBlur}
            value={parseDateOut(props.values.createdAt)}
            invalid={props.errors.createdAt != null}
          />
          <ErrorMessage component={FormFeedback} name="createdAt" />
        </FormGroup> */}

        <hr/>
        <Grid>
          <Row between="xs">
            <Col xs={2}><Button onClick={onDelete} color="danger">Delete</Button></Col>
            <Col xs={2}>
              <Button onClick={onCancel} color="link">Back</Button>
              {' '}
              <Button type="submit" color="primary">Submit</Button>
            </Col>
          </Row>
        </Grid>
      </Form>
    )}
  </Formik>
);

ProductEditForm.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
  validate: PropTypes.func,
  product: PropTypes.object.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape(CategoryType))
};

export default ProductEditForm;