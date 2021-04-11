import { useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { Col, Row } from 'react-bootstrap';

import { productsSelector } from './products.slice';

import LoadingSpinner from 'components/loading-spinner.component';
import Message from 'components/message.component';
import Paginate from 'components/paginate.component';

import ProductCarousel from './products-carousel.component';
import Product from './product.component';

const ProductList = () => {
  const location = useLocation();

  const loading = false;
  const error = false;
  const page = 1;
  const pages = 5;
  const keyword = location.search;

  const products = useSelector(productsSelector);

  return (
    <>
      {!keyword && <ProductCarousel />}
      <h1>Latest Products</h1>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products &&
              products.map(product => (
                <Col key={product.id} xs={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
          </Row>

          <Paginate page={page} pages={pages} keyword={keyword} />
        </>
      )}
    </>
  );
};

export default ProductList;
