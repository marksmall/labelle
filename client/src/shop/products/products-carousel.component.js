import LoadingSpinner from 'components/loading-spinner.component';
import { Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Message from 'components/message.component';

import products from 'products';

import './products-carousel.css';

const ProductsCarousel = () => {
  const loading = false;
  // const error = 'Some error message';
  const error = false;

  return loading ? (
    <LoadingSpinner />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {products.map(product => (
        <Carousel.Item key={product.id}>
          <Link to={`/products/${product.id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption>
              <h4>
                {product.name} (£{product.price})
              </h4>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductsCarousel;
