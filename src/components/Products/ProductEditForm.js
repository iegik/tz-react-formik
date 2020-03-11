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
const greaterNumber = (value, number) => value == null || parseInt(value) > number;
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

const ProductEditForm = ({ onSubmit, onCancel, onDelete, product, categories = [] }) => (
  <Formik initialValues={product} onSubmit={onSubmit}
    validate={(values) => [
      isRequired('name', 'Name is required'),
      greaterText200('name', 'Name length should not be greater then 200'),
      greaterNumber10('rating', 'Rating should not be greater than 10'),
      isRequired('rating', 'Rating is required'),
      greaterArray5('categories', 'A product should have from 1 to 5 categories'),
      isRequired('categories', 'A product should have from 1 to 5 categories'),
    ].reduce((errors, fn) => fn(errors, values), {})}
  >
    {(props) => (
      <Form onSubmit={props.handleSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <FastField name="name" placeholder="Name" as={Input}
            onChange={event => { props.setFieldValue('name', event.target.value); }}
            onBlur={props.handleBlur}
            value={props.values.name}
            valid={props.touched.name && props.errors.name == null}
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
            valid={props.touched.brand && props.errors.brand == null}
            invalid={props.errors.brand != null}
          />
          <ErrorMessage component={FormFeedback} name="brand" />
        </FormGroup>

        <FormGroup>
          <Label for="rating">Rating</Label>
          <FastField type="number" name="rating" id="rating1" placeholder="Rating" as={Input}
            onChange={event => { props.setFieldValue('rating', parseInt(event.target.value)); autoFeatured(props); }}
            onBlur={props.handleBlur}
            value={props.values.rating}
            max={10}
            min={0}
            valid={props.touched.rating && props.errors.rating == null}
            invalid={props.errors.rating != null}
          />
          <FastField type="range" name="rating" id="rating2" placeholder="Rating" as={CustomInput}
            onChange={event => { const value = parseInt(event.target.value); props.setFieldValue('rating', value); autoFeatured(props, value); }}
            onBlur={props.handleBlur}
            max={10}
            value={props.values.rating == null ? '' : props.values.rating}
            valid={props.touched.rating && props.errors.rating == null}
            invalid={props.errors.rating != null}
          />
          <FastField as={Ratings} name="rating" id="rating3"
            changeRating={ratings => { const value = parseInt(ratings) * 2; props.setFieldValue('rating', value); autoFeatured(props, value); }}
            onBlur={props.handleBlur}
            rating={(parseInt(props.values.rating) || 0) * 0.5}
            valid={props.touched.rating && props.errors.rating == null}
            invalid={props.errors.rating != null}
          >
            <Ratings.Widget/>
            <Ratings.Widget/>
            <Ratings.Widget/>
            <Ratings.Widget/>
            <Ratings.Widget/>
          </FastField>

          <ErrorMessage component={FormFeedback} name="rating" />
        </FormGroup>

        <FormGroup>
          <FormGroup check>
            <Label check>
              <FastField type="checkbox" name="featured" placeholder="Featured" as={Input}
                onChange={event => { props.setFieldValue('featured', event.target.checked); }}
                onBlur={props.handleBlur}
                checked={props.values.featured}
                valid={props.touched.featured && props.errors.featured == null}
                invalid={props.errors.featured != null}
              /> Featured
            </Label>

            <FastField type="switch" name="featured" id="featured1" placeholder="Featured" as={CustomInput}
              onChange={event => { props.setFieldValue('featured', event.target.checked); }}
              onBlur={props.handleBlur}
              checked={props.values.featured}
              valid={props.touched.featured && props.errors.featured == null}
              invalid={props.errors.featured != null}
              label="Featured"
            />

            <ErrorMessage component={FormFeedback} name="Featured" />
          </FormGroup>
        </FormGroup>

        <FormGroup>
          <Label for="itemsInStock">Items in stock</Label>
          <FastField type="number" name="itemsInStock" placeholder="Items in stock" as={Input}
            onChange={event => { props.setFieldValue('itemsInStock', parseInt(event.target.value)); }}
            onBlur={props.handleBlur}
            value={props.values.itemsInStock == null ? '' : props.values.itemsInStock}
            min={0}
            valid={props.touched.itemsInStock && props.errors.itemsInStock == null}
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
            valid={props.touched.categories && props.errors.categories == null}
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
            valid={props.touched.receiptDate && props.errors.receiptDate == null}
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
            valid={props.touched.expirationDate && props.errors.expirationDate == null}
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
            valid={props.touched.createdAt && props.errors.createdAt == null}
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