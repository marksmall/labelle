import { useState } from 'react';

import { useHistory, useParams } from 'react-router-dom';

import { Button, Col, Image, Row } from 'react-bootstrap';

import { createProductReview } from './products.slice';

import LoadingSpinner from 'components/loading-spinner.component';
import Message from 'components/message.component';

import ProductInfo from './product-info.component';
import ProductCosting from './product-costing.component';
import ProductReviews from './product-reviews.component';

import { CART_URL } from '../shop.constants';

const ProductDetail = ({
  isLoading,
  user,
  product,
  serverErrors,
  addToCart,
}) => {
  const params = useParams();
  const history = useHistory();

  const [quantity, setQuantity] = useState(1);

  const addToCartHandler = () => {
    console.log('PRODUCT QUANTITY: ', product, quantity);
    addToCart({ ...product, quantity });
    history.push(`${CART_URL}/${params.id}?qty=${quantity}`);
  };

  return (
    <>
      <Button onClick={() => history.goBack()} className="btn btn-light my-3">
        Go Back
      </Button>

      {isLoading ? (
        <LoadingSpinner />
      ) : serverErrors ? (
        <Message variant="danger">
          {serverErrors.map(err => (
            <div key={err}>{err}</div>
          ))}
        </Message>
      ) : (
        product && (
          <div>
            <Row>
              <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>

              <Col md={3}>
                <ProductInfo product={product} />
              </Col>

              <Col md={3}>
                <ProductCosting
                  product={product}
                  quantity={quantity}
                  setQuantity={setQuantity}
                  addToCart={addToCartHandler}
                />
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <ProductReviews
                  user={user}
                  product={product}
                  createProductReview={createProductReview}
                />
              </Col>
            </Row>
          </div>
        )
      )}
    </>
  );
};

export default ProductDetail;
