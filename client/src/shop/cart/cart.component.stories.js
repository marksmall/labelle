import { action } from '@storybook/addon-actions';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Cart from './cart.component';

import products from 'products';

const mockStore = configureStore();

const history = createMemoryHistory({ initialEntries: ['/'] });

const Screen = {
  title: 'Shop/Cart',
  args: {
    cartItems: [],
    match: { params: { id: 1 } },
    location: { search: 'quantity=2' },
    history,
  },
  argTypes: {
    addToCart: { action: 'addToCart' },
    removeFromCart: { action: 'removeFromCart' },
  },
  decorators: [
    Story => {
      const store = mockStore({});
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
    <Cart {...args} />
  </Provider>
);

export const EmptyCart = Template.bind({});

export const NonEmptyCart = Template.bind({});
const cartItems = products.slice(3);
cartItems.forEach(item => (item.quantity = Math.floor(Math.random() * 6)));
NonEmptyCart.args = { cartItems };
