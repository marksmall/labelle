import { action } from '@storybook/addon-actions';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import ProductList from './product-list.component';

import products from 'products';

const user = {
  id: 1,
  firstName: 'John',
  lastName: 'Smith',
  email: 'john@test.com',
  isAdmin: true,
};

const Screen = {
  title: 'Admin/Product List',
  args: { user, products },
  argTypes: {
    fetchProducts: { action: 'fetchProducts' },
    createProduct: { action: 'createProduct' },
    deleteProduct: { action: 'deleteProduct' },
  },
  decorators: [
    Story => {
      const history = createMemoryHistory({ initialEntries: ['/'] });
      history.push = action('history.push');

      return (
        <Router history={history}>
          <Story />
        </Router>
      );
    },
  ],
};

export default Screen;

const Template = args => <ProductList {...args} />;

export const Default = Template.bind({});

// export const HasProducts = Template.bind({});
// HasProducts.args = { products };

// export const IsLoading = Template.bind({});
// IsLoading.args = { isLoading: true };

// export const serverError = Template.bind({});
// serverError.args = { serverErrors: ['Bad Request', 'Server not found'] };
