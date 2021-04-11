import { useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

import { PRODUCTS_URL } from 'shop/shop.constants';
import { selectProduct } from './products.slice';

import Rating from 'components/rating.component';

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Card className="my-3 p-3 rounded">
      <Button
        variant="link"
        onClick={() => {
          dispatch(selectProduct(product));
          history.push(`${PRODUCTS_URL}/${product.id}`);
        }}
      >
        <Card.Img src={product.image} />

        <Card.Body>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>

          <Card.Text as="div">
            <div className="my-3">
              <Rating
                value={product.rating}
                text={`${product.number_of_reviews} reviews`}
                color="#f8e825"
              />
            </div>
          </Card.Text>

          <Card.Text as="h3">£{product.price}</Card.Text>
        </Card.Body>
      </Button>
    </Card>
  );
};

export default Product;
