import { action } from '@storybook/addon-actions';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import OrderSummary from './order-summary.component';

import products from 'products';

const items = products.slice(3, 5);
items.forEach(item => (item.quantity = Math.floor(Math.random() * 6)));

const mockStore = configureStore();

const Screen = {
  title: 'Shop/Order Summary',
  args: {
    cart: {
      items,
      shippingAddress: {
        address: '1 Test Street',
        city: 'Edinburgh',
        postalCode: 'EH7 5JA',
        country: 'Scotland',
      },
      paymentMethod: 'PayPal',
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
    <OrderSummary {...args} />
  </Provider>
);

export const Default = Template.bind({});
