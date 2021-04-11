import { action } from '@storybook/addon-actions';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import ProductDetail from './product-detail.component';

import products from 'products';

const mockStore = configureStore();

const user = {
  id: 1,
  firstName: 'John',
  lastName: 'Smith',
  email: 'john@test.com',
};

const Screen = {
  title: 'Shop/Product Detail',
  args: {
    product: products[1],
  },
  argTypes: {},
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
    <ProductDetail {...args} />
  </Provider>
);

export const NotLoggingIn = Template.bind({});

export const LoggedIn = Template.bind({});
LoggedIn.args = { user };
