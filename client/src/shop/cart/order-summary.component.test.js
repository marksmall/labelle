import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import OrderSummary from './order-summary.component';

const PLACE_ORDER_BUTTON_TEXT = /place\sorder/i;

const renderComponent = ({ cart, placeOrder, history }) => {
  render(<OrderSummary cart={cart} placeOrder={placeOrder} />, {
    wrapper: ({ children }) => <Router history={history}>{children}</Router>,
  });
};

describe('OrderSummary Component', () => {
  let cart = null;
  let placeOrder = null;
  let history = null;

  beforeEach(() => {
    cart = {
      items: [{ price: 10.99, quantity: 2 }],
      itemsPrice: 20.99,
      shippingPrice: 10.99,
      taxPrice: 17.99,
    };
    placeOrder = jest.fn();
    history = createMemoryHistory({ initialEntries: ['/'] });
  });

  it('should render the OrderSummary', () => {
    renderComponent({
      cart,
      placeOrder,
      history,
    });

    expect(
      screen.getByRole('heading', { name: 'Order Summary' }),
    ).toBeInTheDocument();

    expect(screen.getByText('Items:')).toBeInTheDocument();
    expect(screen.getByText('£21.98')).toBeInTheDocument();

    expect(screen.getByText('Shipping:')).toBeInTheDocument();
    expect(screen.getByText(`£${cart.shippingPrice}`)).toBeInTheDocument();

    expect(screen.getByText('Tax:')).toBeInTheDocument();
    expect(screen.getByText(`£${cart.taxPrice}`)).toBeInTheDocument();

    expect(screen.getByText('Total:')).toBeInTheDocument();
    expect(screen.getByText('£33.78')).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'Place Order' }),
    ).toBeInTheDocument();
  });

  it('should disable `Place Order` button when there are no cart items', () => {
    renderComponent({
      cart: { items: [] },
      placeOrder,
      history,
    });

    expect(
      screen.getByRole('button', { name: PLACE_ORDER_BUTTON_TEXT }),
    ).toBeDisabled();
  });

  it('should enable `Place Order` button when there are cart items', () => {
    renderComponent({
      cart,
      placeOrder,
      history,
    });

    expect(
      screen.getByRole('button', { name: PLACE_ORDER_BUTTON_TEXT }),
    ).not.toBeDisabled();
  });

  it('should not call `placeOrder` function when there are no cart items and the `Place Order` button clicked', () => {
    renderComponent({
      cart: { items: [] },
      placeOrder,
      history,
    });

    const placeOrderButton = screen.getByRole('button', {
      name: PLACE_ORDER_BUTTON_TEXT,
    });

    userEvent.click(placeOrderButton);

    expect(placeOrder).not.toHaveBeenCalled();
  });

  it('should call `placeOrder` function when there are cart items and the `Place Order` button clicked', () => {
    renderComponent({
      cart,
      placeOrder,
      history,
    });

    const placeOrderButton = screen.getByRole('button', {
      name: PLACE_ORDER_BUTTON_TEXT,
    });

    userEvent.click(placeOrderButton);

    expect(placeOrder).toHaveBeenCalled();
  });
});
