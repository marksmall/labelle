import { Link } from 'react-router-dom';

import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Message from 'components/message.component';

import { PRODUCTS_URL } from 'shop/shop.constants';

import SubTotal from './subtotal.component';
import { addToCart } from './cart.slice';

const Cart = ({
  cartItems,
  // addToCart,
  user,
  removeFromCart,
  history,
}) => (
  <Row>
    <Col md={8}>
      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <Message variant="info">
          Your cart is empty <Link to={PRODUCTS_URL}>Go back</Link>
        </Message>
      ) : (
        <ListGroup variant="flush">
          {cartItems.map(item => (
            <ListGroup.Item key={item.name}>
              <Row>
                <Col md={2}>
                  <Image src={item.image} alt={item.name} fluid rounded />
                </Col>

                <Col md={3}>
                  <Link to={`${PRODUCTS_URL}/${item.id}`}>{item.name}</Link>
                </Col>

                <Col md={2}>£{item.price}</Col>

                <Col md={3}>
                  <Form.Control
                    as="select"
                    value={+item.quantity}
                    onChange={event =>
                      addToCart(item, Number(event.target.value))
                    }
                  >
                    {[...Array(item.number_in_stock).keys()].map(x => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Col>

                <Col md={1}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FontAwesomeIcon icon={['fas', 'trash']} />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Col>

    <Col md={4}>
      <SubTotal cartItems={cartItems} user={user} history={history} />
    </Col>
  </Row>
);

export default Cart;
