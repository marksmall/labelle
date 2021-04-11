import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { LOGIN_URL } from 'accounts/accounts.constants';
import {
  SHIPPING_URL,
  PAYMENT_URL,
  PLACE_ORDER_URL,
} from 'shop/shop.constants';

const CheckoutSteps = ({ login, shipping, payment, order }) => (
  <Nav className="justify-content-center mb-4">
    <Nav.Item>
      {login ? (
        <LinkContainer to={LOGIN_URL}>
          <Nav.Link>Login</Nav.Link>
        </LinkContainer>
      ) : (
        <Nav.Link disabled>Login</Nav.Link>
      )}
    </Nav.Item>

    <Nav.Item>
      {shipping ? (
        <LinkContainer to={SHIPPING_URL}>
          <Nav.Link>Shipping</Nav.Link>
        </LinkContainer>
      ) : (
        <Nav.Link disabled>Shipping</Nav.Link>
      )}
    </Nav.Item>

    <Nav.Item>
      {payment ? (
        <LinkContainer to={PAYMENT_URL}>
          <Nav.Link>Payment</Nav.Link>
        </LinkContainer>
      ) : (
        <Nav.Link disabled>Payment</Nav.Link>
      )}
    </Nav.Item>

    <Nav.Item>
      {order ? (
        <LinkContainer to={PLACE_ORDER_URL}>
          <Nav.Link>Place Order</Nav.Link>
        </LinkContainer>
      ) : (
        <Nav.Link disabled>Place Order</Nav.Link>
      )}
    </Nav.Item>
  </Nav>
);

export default CheckoutSteps;
