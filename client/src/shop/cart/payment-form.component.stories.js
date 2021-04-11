import { action } from '@storybook/addon-actions';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Payment from './payment-form.component';

const mockStore = configureStore();

const Screen = {
  title: 'Shop/Payment',
  args: {},
  argTypes: { addPaymentMethod: { action: 'addPaymentMethod' } },
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
    <Payment {...args} />
  </Provider>
);

export const Default = Template.bind({});
