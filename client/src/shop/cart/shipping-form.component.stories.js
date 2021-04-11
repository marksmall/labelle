import { action } from '@storybook/addon-actions';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Shipping from './shipping-form.component';

const mockStore = configureStore();

const Screen = {
  title: 'Shop/Shipping',
  args: {},
  argTypes: { addShippingAddress: { action: 'addShippingAddress' } },
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
    <Shipping {...args} />
  </Provider>
);

export const Default = Template.bind({});
