import React from 'react';
import PropTypes from 'prop-types';
import Product from './Product';
import { Container, Row, Col, Button } from 'reactstrap'
import { chunk } from 'lodash'

const ProductList = ({ products, onEdit, onCreate, onDelete }) => {
  const productsGroups = chunk(products, 3)

  return (
    <Container>
      {productsGroups.map((productsGroup, index) => (
        <Row key={index} className="mb-5">
          {productsGroup.map(product => (
            <Col sm="4" key={product.id} >
              <Product product={product} onEdit={() => { onEdit(product.id); }} onDelete={() => { onDelete(product); }} />
            </Col>
          ))}
        </Row>
      ))}
      <hr/>
      <center>
        <Button onClick={onCreate} size="medium" color="primary" >Add product</Button>
      </center>
      <br/>
      <center>
        <p className="text-muted">Note: Products can be deleted by press and holding mouse click over the card</p>
      </center>
      <br/>
    </Container>
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  onEdit: PropTypes.func,
  onCreate: PropTypes.func,
  onDelete: PropTypes.func,
};

export default ProductList;
