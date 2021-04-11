import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { LOGIN_URL } from 'accounts/accounts.constants';

import {
  SHIPPING_URL,
  PAYMENT_URL,
  PLACE_ORDER_URL,
} from 'shop/shop.constants';

import Checkout from './checkout.component';

const LOGIN_LABEL = /login/i;
const SHIPPING_LABEL = /shipping/i;
const PAYMENT_LABEL = /payment/i;
const PLACE_ORDER_LABEL = /place\sorder/i;

const renderComponent = ({ login, shipping, payment, order, history }) => {
  render(
    <Checkout
      login={login}
      shipping={shipping}
      payment={payment}
      order={order}
    />,
    {
      wrapper: ({ children }) => <Router history={history}>{children}</Router>,
    },
  );
};

describe('Checkout Component', () => {
  let history = null;

  beforeEach(() => {
    history = createMemoryHistory({ initialEntries: ['/'] });
  });

  it('should render Checkout', () => {
    renderComponent({ history });

    expect(
      screen.getByRole('button', { name: LOGIN_LABEL }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: SHIPPING_LABEL }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: PAYMENT_LABEL }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: PLACE_ORDER_LABEL }),
    ).toBeInTheDocument();
  });

  it('should render Checkout in `Login`', () => {
    renderComponent({ login: true, history });

    expect(screen.getByRole('link', { name: LOGIN_LABEL })).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: SHIPPING_LABEL }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: PAYMENT_LABEL }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: PLACE_ORDER_LABEL }),
    ).toBeInTheDocument();
  });

  it('should render Checkout in `Shipping`', () => {
    renderComponent({ login: true, shipping: true, history });

    expect(screen.getByRole('link', { name: LOGIN_LABEL })).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: SHIPPING_LABEL }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: PAYMENT_LABEL }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: PLACE_ORDER_LABEL }),
    ).toBeInTheDocument();
  });

  it('should render Checkout in `Payment`', () => {
    renderComponent({ login: true, shipping: true, payment: true, history });

    expect(screen.getByRole('link', { name: LOGIN_LABEL })).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: SHIPPING_LABEL }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: PAYMENT_LABEL }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: PLACE_ORDER_LABEL }),
    ).toBeInTheDocument();
  });

  it('should render Checkout in `Place Order`', () => {
    renderComponent({
      login: true,
      shipping: true,
      payment: true,
      order: true,
      history,
    });

    expect(screen.getByRole('link', { name: LOGIN_LABEL })).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: SHIPPING_LABEL }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: PAYMENT_LABEL }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: PLACE_ORDER_LABEL }),
    ).toBeInTheDocument();
  });

  it('should not redirect to `Login URL` when link clicked`', () => {
    renderComponent({
      login: false,
      shipping: false,
      payment: false,
      order: false,
      history,
    });

    userEvent.click(screen.getByRole('button', { name: LOGIN_LABEL }));

    expect(history.location.pathname).not.toBe(LOGIN_URL);
  });

  it('should redirect to `Login URL` when link clicked`', () => {
    renderComponent({
      login: true,
      shipping: true,
      payment: true,
      order: true,
      history,
    });

    userEvent.click(screen.getByRole('link', { name: LOGIN_LABEL }));

    expect(history.location.pathname).toBe(LOGIN_URL);
  });

  it('should not redirect to `Shipping URL` when link clicked`', () => {
    renderComponent({
      login: false,
      shipping: false,
      payment: false,
      order: false,
      history,
    });

    userEvent.click(screen.getByRole('button', { name: SHIPPING_LABEL }));

    expect(history.location.pathname).not.toBe(SHIPPING_URL);
  });

  it('should redirect to `Shipping URL` when link clicked`', () => {
    renderComponent({
      login: true,
      shipping: true,
      payment: true,
      order: true,
      history,
    });

    userEvent.click(screen.getByRole('link', { name: SHIPPING_LABEL }));

    expect(history.location.pathname).toBe(SHIPPING_URL);
  });

  it('should not redirect to `Payment URL` when link clicked`', () => {
    renderComponent({
      login: false,
      shipping: false,
      payment: false,
      order: false,
      history,
    });

    userEvent.click(screen.getByRole('button', { name: PAYMENT_LABEL }));

    expect(history.location.pathname).not.toBe(PAYMENT_URL);
  });

  it('should redirect to `Payment URL` when link clicked`', () => {
    renderComponent({
      login: true,
      shipping: true,
      payment: true,
      order: true,
      history,
    });

    userEvent.click(screen.getByRole('link', { name: PAYMENT_LABEL }));

    expect(history.location.pathname).toBe(PAYMENT_URL);
  });

  it('should not redirect to `Place Order URL` when link clicked`', () => {
    renderComponent({
      login: false,
      shipping: false,
      payment: false,
      order: false,
      history,
    });

    userEvent.click(screen.getByRole('button', { name: PLACE_ORDER_LABEL }));

    expect(history.location.pathname).not.toBe(PLACE_ORDER_URL);
  });

  it('should redirect to `Place Order URL` when link clicked`', () => {
    renderComponent({
      login: true,
      shipping: true,
      payment: true,
      order: true,
      history,
    });

    userEvent.click(screen.getByRole('link', { name: PLACE_ORDER_LABEL }));

    expect(history.location.pathname).toBe(PLACE_ORDER_URL);
  });
});
