import { action } from '@storybook/addon-actions';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Checkout from './checkout.component';

const history = createMemoryHistory({ initialEntries: ['/'] });

const Screen = {
  title: 'Shop/Checkout',
  args: {
    login: true,
  },
  argTypes: {},
  decorators: [
    Story => {
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

const Template = args => <Checkout {...args} />;

export const Login = Template.bind({});

export const Shipping = Template.bind({});
Shipping.args = { shipping: true };

export const Payment = Template.bind({});
Payment.args = { shipping: true, payment: true };

export const PlaceOrder = Template.bind({});
PlaceOrder.args = { shipping: true, payment: true, order: true };
