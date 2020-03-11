import React from 'react';
import PropTypes from 'prop-types';
import { FastField, Form, Formik, ErrorMessage } from 'formik';
import { Input, CustomInput, FormGroup, Label, Button } from 'reactstrap';
import Ratings from 'react-ratings-declarative';
import { Grid, Row, Col } from 'react-flexbox-grid';
import CategoryType from './CategoryType';
import MultiSelect from './MultiSelect';
import { parseDateIn, parseDateOut } from './parsers';

const ProductEditForm = ({ onSubmit, onCancel, onDelete, product, categories = [] }) => (
  <Formik initialValues={product} onSubmit={onSubmit}>
    {(props) => (
      <Form onSubmit={props.handleSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <FastField name="name" placeholder="Name" as={Input}
            onChange={event => { props.setFieldValue('name', event.target.value); }}
            onBlur={props.handleBlur}
            value={props.values.name}
          />
          <ErrorMessage name="name" />
        </FormGroup>

        <FormGroup>
          <Label for="brand">Brand</Label>
          <FastField name="brand" placeholder="Brand" as={Input}
            onChange={event => { props.setFieldValue('brand', event.target.value); }}
            onBlur={props.handleBlur}
            value={props.values.brand}
          />
          <ErrorMessage name="brand" />
        </FormGroup>

        <FormGroup>
          <Label for="rating">Rating</Label>
          <FastField type="number" name="rating" id="rating1" placeholder="Rating" as={Input}
            onChange={event => { props.setFieldValue('rating', parseInt(event.target.value)); }}
            onBlur={props.handleBlur}
            value={props.values.rating}
            max={10}
            min={0}
          />
          <FastField type="range" name="rating" id="rating2" placeholder="Rating" as={CustomInput}
            onChange={event => { props.setFieldValue('rating', parseInt(event.target.value)); }}
            onBlur={props.handleBlur}
            max={10}
            value={props.values.rating == null ? '' : props.values.rating}
          />
          <FastField as={Ratings} name="rating" id="rating3"
            changeRating={value => { props.setFieldValue('rating', parseInt(value) * 2); }}
            onBlur={props.handleBlur}
            rating={(parseInt(props.values.rating) || 0) * 0.5}
          >
            <Ratings.Widget/>
            <Ratings.Widget/>
            <Ratings.Widget/>
            <Ratings.Widget/>
            <Ratings.Widget/>
          </FastField>

          <ErrorMessage name="rating" />
        </FormGroup>

        <FormGroup>
          <FormGroup check>
            <Label check>
              <FastField type="checkbox" name="featured" placeholder="Featured" as={Input}
                onChange={event => { props.setFieldValue('featured', event.target.checked); }}
                onBlur={props.handleBlur}
                checked={props.values.featured}
              /> Featured
            </Label>

            <FastField type="switch" name="featured" id="featured1" placeholder="Featured" as={CustomInput}
              onChange={event => { props.setFieldValue('featured', event.target.checked); }}
              onBlur={props.handleBlur}
              checked={props.values.featured}
              label="Featured"
            />

            <ErrorMessage name="Featured" />
          </FormGroup>
        </FormGroup>

        <FormGroup>
          <Label for="itemsInStock">Items in stock</Label>
          <FastField type="number" name="itemsInStock" placeholder="Items in stock" as={Input}
            onChange={event => { props.setFieldValue('itemsInStock', parseInt(event.target.value)); }}
            onBlur={props.handleBlur}
            value={props.values.itemsInStock == null ? '' : props.values.itemsInStock}
            min={0}
          />
          <ErrorMessage name="itemsInStock" />
        </FormGroup>

        <FormGroup>
          <FastField
            as={MultiSelect}
            name="categories"
            options={categories.map(({ id, name }) => ({ value: id, label: name }))}
            onChange={option => { props.setFieldValue('categories', option.map(({ value }) => value)); }}
            value={props.values.categories || []}
          />
          <ErrorMessage name="categories" />
        </FormGroup>

        <FormGroup>
          <Label for="receiptDate">Receipt date</Label>
          <FastField type="date" name="receiptDate" placeholder="Receipt date" as={Input}
            onChange={event => { props.setFieldValue('receiptDate', parseDateIn(event.target.value)); }}
            onBlur={props.handleBlur}
            value={parseDateOut(props.values.receiptDate)}
          />
          <ErrorMessage name="receiptDate" />
        </FormGroup>

        <FormGroup>
          <Label for="expirationDate">Expiration Date</Label>
          <FastField type="date" name="expirationDate" placeholder="Expiration Date" as={Input}
            onChange={event => { props.setFieldValue('expirationDate', parseDateIn(event.target.value)); }}
            onBlur={props.handleBlur}
            value={parseDateOut(props.values.expirationDate)}
          />
          <ErrorMessage name="expirationDate" />
        </FormGroup>

        {/* <FormGroup>
          <Label for="createdAt">Created At</Label>
          <FastField type="date" name="createdAt" placeholder="Created At" as={Input}
            onChange={event => { props.setFieldValue('createdAt', parseDateIn(event.target.value)); }}
            onBlur={props.handleBlur}
            value={parseDateOut(props.values.createdAt)}
          />
          <ErrorMessage name="createdAt" />
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
  product: PropTypes.object.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape(CategoryType))
};

export default ProductEditForm;