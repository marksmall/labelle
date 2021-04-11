import { render, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import ShippingForm from './shipping-form.component';

const LOGIN_LINK_LABEL = /login/i;
const SHIPPING_LINK_LABEL = /shipping/i;
const PAYMENT_HEADING_LABEL = /payment/i;
const ORDER_HEADING_LABEL = /place\sorder/i;

const SHIPPING_HEADING = SHIPPING_LINK_LABEL;
const ADDRESS_LABEL = /address/i;
const CITY_LABEL = /city/i;
const POSTAL_CODE_LABEL = /postal\scode/i;
const COUNTRY_LABEL = /country/i;

const ADD_SHIPPING_BUTTON_LABEL = /continue/i;

const ADDRESS_TEXT = '1 Test Address';
const CITY_TEXT = 'Edinburgh';
const POSTAL_CODE_TEXT = 'EH7 5QG';
const COUNTRY_TEXT = 'Scotland';

const renderComponent = ({
  isLoading = false,
  addShippingAddress,
  serverErrors,
  history,
}) => {
  render(
    <ShippingForm
      isLoading={isLoading}
      addShippingAddress={addShippingAddress}
      serverErrors={serverErrors}
      history={history}
    />,
    {
      wrapper: ({ children }) => <Router history={history}>{children}</Router>,
    },
  );
};

describe('Shipping Address Form Component', () => {
  let addShippingAddress = null;
  let history = null;

  beforeEach(() => {
    addShippingAddress = jest.fn();
    history = createMemoryHistory({ initialEntries: ['/'] });
  });

  it('should render Shipping Address Form', () => {
    renderComponent({ addShippingAddress, history });

    expect(
      screen.getByRole('link', { name: LOGIN_LINK_LABEL }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: SHIPPING_LINK_LABEL }),
    ).toBeInTheDocument();

    expect(screen.getByText(PAYMENT_HEADING_LABEL)).toBeInTheDocument();

    expect(screen.getByText(ORDER_HEADING_LABEL)).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: SHIPPING_HEADING }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('textbox', { name: ADDRESS_LABEL }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('textbox', { name: CITY_LABEL }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('textbox', { name: POSTAL_CODE_LABEL }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('textbox', { name: COUNTRY_LABEL }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: ADD_SHIPPING_BUTTON_LABEL }),
    ).toBeInTheDocument();
  });

  it('should disable `Continue` button when form is invalid', () => {
    renderComponent({ addShippingAddress, history });

    expect(
      screen.getByRole('button', { name: ADD_SHIPPING_BUTTON_LABEL }),
    ).toBeDisabled();
  });

  it('should enable `Continue` button when form is valid', async () => {
    renderComponent({ addShippingAddress, history });

    const addShippingAddressButton = screen.getByRole('button', {
      name: ADD_SHIPPING_BUTTON_LABEL,
    });

    expect(addShippingAddressButton).toBeDisabled();

    userEvent.type(
      screen.getByRole('textbox', { name: ADDRESS_LABEL }),
      ADDRESS_TEXT,
    );
    userEvent.type(
      screen.getByRole('textbox', { name: CITY_LABEL }),
      CITY_TEXT,
    );
    userEvent.type(
      screen.getByRole('textbox', { name: POSTAL_CODE_LABEL }),
      POSTAL_CODE_TEXT,
    );
    userEvent.type(
      screen.getByRole('textbox', { name: COUNTRY_LABEL }),
      COUNTRY_TEXT,
    );

    await waitFor(() => expect(addShippingAddressButton).not.toBeDisabled());
  });

  it('should not call `addShippingAddress` function when form is invalid and `Continue` button clicked', async () => {
    renderComponent({ addShippingAddress, history });

    const addShippingAddressButton = screen.getByRole('button', {
      name: ADD_SHIPPING_BUTTON_LABEL,
    });

    userEvent.type(
      screen.getByRole('textbox', { name: CITY_LABEL }),
      CITY_TEXT,
    );

    userEvent.click(addShippingAddressButton);

    await waitFor(() => expect(addShippingAddress).not.toHaveBeenCalled());
  });

  it('should call `addShippingAddress` function when form is valid and `Continue` button clicked', async () => {
    renderComponent({ addShippingAddress, history });

    userEvent.type(
      screen.getByRole('textbox', { name: ADDRESS_LABEL }),
      ADDRESS_TEXT,
    );
    userEvent.type(
      screen.getByRole('textbox', { name: CITY_LABEL }),
      CITY_TEXT,
    );
    userEvent.type(
      screen.getByRole('textbox', { name: POSTAL_CODE_LABEL }),
      POSTAL_CODE_TEXT,
    );
    userEvent.type(
      screen.getByRole('textbox', { name: COUNTRY_LABEL }),
      COUNTRY_TEXT,
    );

    userEvent.click(
      screen.getByRole('button', { name: ADD_SHIPPING_BUTTON_LABEL }),
    );

    await waitFor(() =>
      expect(addShippingAddress).toHaveBeenCalledWith({
        address: ADDRESS_TEXT,
        city: CITY_TEXT,
        postalCode: POSTAL_CODE_TEXT,
        country: COUNTRY_TEXT,
      }),
    );
  });

  it('should display error well if `addShippingAddress` is unsuccessful', () => {
    const serverErrors = ['Test Error 1', 'Test Error 2', 'Test Error 3'];

    renderComponent({ addShippingAddress, serverErrors, history });

    expect(screen.getByRole('alert')).toBeInTheDocument();
    serverErrors.forEach(error =>
      expect(screen.getByText(error)).toBeInTheDocument(),
    );
  });

  it('shows a loading spinner if loading', () => {
    renderComponent({ isLoading: true, history });
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
