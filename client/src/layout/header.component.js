import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { LOGIN_URL, PROFILE_URL } from 'accounts/accounts.constants';

import { BOOKINGS_URL } from 'booking/booking.constants';

import { CART_URL, PRODUCTS_URL } from 'shop/shop.constants';

import {
  ADMIN_USERS_URL,
  ADMIN_PRODUCTS_URL,
  ADMIN_ORDERS_URL,
} from 'admin/admin.constants';

import Search from './search.component';

const Header = ({ user, logout }) => (
  <header>
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Labelle Beauty</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Search />
          <Nav className="ml-auto">
            <LinkContainer to={BOOKINGS_URL}>
              <Nav.Link>
                <FontAwesomeIcon icon={['fas', 'calendar-alt']} />
                Bookings
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to={PRODUCTS_URL}>
              <Nav.Link>
                <FontAwesomeIcon icon={['fas', 'gifts']} />
                Shop
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to={CART_URL}>
              <Nav.Link>
                <FontAwesomeIcon icon={['fas', 'shopping-cart']} />
                Cart
              </Nav.Link>
            </LinkContainer>

            {user ? (
              <NavDropdown
                title={user.first_name ? user.first_name : 'Profile'}
                id="username"
              >
                <LinkContainer to={PROFILE_URL}>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>

                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to={LOGIN_URL}>
                <Nav.Link>
                  <FontAwesomeIcon icon={['fas', 'user']} />
                  Login
                </Nav.Link>
              </LinkContainer>
            )}

            {user && user.is_admin && (
              <NavDropdown title="Admin" id="adminmenu">
                <LinkContainer to={ADMIN_USERS_URL}>
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to={ADMIN_PRODUCTS_URL}>
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to={ADMIN_ORDERS_URL}>
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </header>
);

export default Header;
