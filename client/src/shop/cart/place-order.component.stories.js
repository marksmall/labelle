import { action } from '@storybook/addon-actions';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import PlaceOrder from './place-order.component';

const mockStore = configureStore();

const shippingAddress = {
  address: 'Test Address',
  city: 'Test City',
  postalCode: 'Test PostalCode',
  country: 'Test Country',
};

const Screen = {
  title: 'Shop/Place Order',
  args: {
    cart: {
      shippingAddress,
      paymentMethod: 'Test Payment Method',
      items: [
        {
          name: 'Test Item',
          image: 'Test Image',
          product: 'Test Product',
          price: 10.99,
          quantity: 2,
        },
      ],
    },
  },
  argTypes: { placeOrder: { action: 'placeOrder' } },
  decorators: [
    Story => {
      const store = mockStore({});
      const history = createMemoryHistory({ initialEntries: ['/'] });
      history.push = action('history.push');

      return (
        <Provider store={store}>
          <Router history={history}>
            <Story />
          </Router>
        </Provider>
      );
    },
  ],
};

export default Screen;

const Template = args => (
  <Provider store={mockStore({})}>
    <PlaceOrder {...args} />
  </Provider>
);

export const Default = Template.bind({});
