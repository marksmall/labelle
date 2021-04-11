import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import SubTotal from './subtotal.component';

import { LOGIN_URL } from 'accounts/accounts.constants';

import { SHIPPING_URL } from '../shop.constants';

const PROCEED_TO_CHECKOUT_BUTTON_TEXT = /proceed\sto\scheckout/i;

const renderComponent = ({ cartItems, user, history }) => {
  render(<SubTotal cartItems={cartItems} user={user} history={history} />, {
    wrapper: ({ children }) => <Router history={history}>{children}</Router>,
  });
};

describe('SubTotal Component', () => {
  let cartItems = null;
  let user = null;
  let history = null;

  beforeEach(() => {
    cartItems = [{ quantity: 2, price: 10.99 }];
    user = {};
    history = createMemoryHistory({ initialEntries: ['/'] });
  });

  it('should render the component', () => {
    renderComponent({
      cartItems,
      user,
      history,
    });

    expect(
      screen.getByRole('heading', { name: 'Subtotal (2) items' }),
    ).toBeInTheDocument();

    expect(screen.getByText('£21.98')).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'Proceed To Checkout' }),
    ).toBeInTheDocument();
  });

  it('should disable `Proceed To Checkout` button when there are no cart items', () => {
    renderComponent({
      cartItems: [],
      user,
      history,
    });

    expect(
      screen.getByRole('button', { name: PROCEED_TO_CHECKOUT_BUTTON_TEXT }),
    ).toBeDisabled();
  });

  it('should enable `Proceed To Checkout` button when there are cart items', () => {
    renderComponent({
      cartItems,
      user,
      history,
    });

    expect(
      screen.getByRole('button', { name: PROCEED_TO_CHECKOUT_BUTTON_TEXT }),
    ).not.toBeDisabled();
  });

  it('should redirect to `Login URL` when button clicked and user not logged in', () => {
    renderComponent({
      cartItems,
      history,
    });

    const proceedToCheckoutButton = screen.getByRole('button', {
      name: PROCEED_TO_CHECKOUT_BUTTON_TEXT,
    });

    userEvent.click(proceedToCheckoutButton);

    expect(history.location.pathname).toBe(LOGIN_URL);
  });

  it('should redirect to `Shipping URL` when button clicked and user logged in', () => {
    renderComponent({
      cartItems,
      user,
      history,
    });

    const proceedToCheckoutButton = screen.getByRole('button', {
      name: PROCEED_TO_CHECKOUT_BUTTON_TEXT,
    });

    userEvent.click(proceedToCheckoutButton);

    expect(history.location.pathname).toBe(SHIPPING_URL);
  });
});
