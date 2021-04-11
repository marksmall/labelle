import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';

const OrderSummary = ({ cart, placeOrder }) => {
  // console.log('CART: ', cart);
  cart.itemsPrice = cart?.items?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 10;
  cart.taxPrice = +(0.082 * cart.itemsPrice).toFixed(2);
  cart.totalPrice = +(
    cart.itemsPrice +
    cart.shippingPrice +
    cart.taxPrice
  ).toFixed(2);
  // console.log('UPDATED CART: ', cart);

  return (
    <Card>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <h2>Order Summary</h2>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>Items:</Col>
            <Col>£{cart.itemsPrice}</Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>Shipping:</Col>
            <Col>£{cart.shippingPrice}</Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>Tax:</Col>
            <Col>£{cart.taxPrice}</Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>Total:</Col>
            <Col>£{cart.totalPrice}</Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Button
            type="button"
            className="btn-block"
            disabled={cart.items.length === 0}
            onClick={placeOrder}
          >
            Place Order
          </Button>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default OrderSummary;
