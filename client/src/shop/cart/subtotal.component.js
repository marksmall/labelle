import { Button, Card, ListGroup } from 'react-bootstrap';

import { LOGIN_URL } from 'accounts/accounts.constants';

import { SHIPPING_URL } from '../shop.constants';

const SubTotal = ({ cartItems, user, history }) => (
  <Card>
    <ListGroup variant="flush">
      <ListGroup.Item>
        <h2>
          Subtotal ({cartItems.reduce((acc, item) => acc + +item.quantity, 0)})
          items
        </h2>
        £
        {cartItems
          .reduce((acc, item) => acc + +item.quantity * item.price, 0)
          .toFixed(2)}
      </ListGroup.Item>
    </ListGroup>

    <ListGroup.Item>
      <Button
        type="button"
        className="btn-block"
        disabled={cartItems.length === 0}
        onClick={() =>
          user ? history.push(SHIPPING_URL) : history.push(LOGIN_URL)
        }
      >
        Proceed To Checkout
      </Button>
    </ListGroup.Item>
  </Card>
);

export default SubTotal;
