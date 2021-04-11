import { render, screen } from '@testing-library/react';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Cart from './cart.component';

import products from 'products';

const renderComponent = ({
  cartItems,
  addToCart,
  removeFromCart,
  match,
  location,
  history,
}) => {
  render(
    <Cart
      cartItems={cartItems}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      match={match}
      location={location}
      history={history}
    />,
    {
      wrapper: ({ children }) => <Router history={history}>{children}</Router>,
    },
  );
};

describe('Cart Component', () => {
  let cartItems = null;
  let addToCart = null;
  let removeFromCart = null;
  let match = null;
  let location = null;
  let history = null;

  beforeEach(() => {
    cartItems = products.slice(3);
    cartItems.forEach(item => (item.quantity = 2));
    addToCart = jest.fn();
    removeFromCart = jest.fn();
    match = { params: { id: 1 } };
    location = { search: 'quantity=2' };
    history = createMemoryHistory({ initialEntries: ['/'] });
  });

  it('should render the Cart', () => {
    renderComponent({
      cartItems,
      addToCart,
      removeFromCart,
      match,
      location,
      history,
    });

    expect(
      screen.getByRole('heading', { name: /shopping\scart/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('img', {
        name: /sony\splaystation\s4\spro\swhite\sversion/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', {
        name: /sony\splaystation\s4\spro\swhite\sversion/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/£399.99/i)).toBeInTheDocument();

    expect(
      screen.getByRole('img', {
        name: /logitech\sg-series\sgaming\smouse/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', {
        name: /logitech\sg-series\sgaming\smouse/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/£49.99/i)).toBeInTheDocument();

    expect(
      screen.getByRole('img', {
        name: /amazon\secho\sdot\s3rd\sgeneration/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', {
        name: /amazon\secho\sdot\s3rd\sgeneration/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/£29.99/i)).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /subtotal\s\(6\)\sitems/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/£959\.94/i)).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /proceed\sto\scheckout/i }),
    ).toBeInTheDocument();
  });

  xit('should render `Go Back` link only when no items in cart', () => {});

  xit('should call `addToCart` when items in cart', () => {});

  xit('should call `removeFromCart` when remove item button clicked', () => {});

  xit('should redirect to `products` view, when `Go Back` link clicked', () => {});

  xit('should disable `Proceed to Checkout` button when no items in cart', () => {});

  xit('should enable `Proceed to Checkout` button when items in cart', () => {});

  xit('should not redirect to `XXXXXX` view, when `Proceed to Checkout` button clicked and items in cart', () => {});

  xit('should redirect to `XXXXXX` view, when `Proceed to Checkout` button clicked and items in cart', () => {});
});
