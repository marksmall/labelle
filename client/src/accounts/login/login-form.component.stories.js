import { action } from '@storybook/addon-actions';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import LoginForm from './login-form.component';

const Screen = {
  title: 'Accounts/Sign In',
  args: {
    passwordMinLength: 2,
    passwordMaxLength: 255,
  },
  argTypes: {
    login: { action: 'login' },
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

const Template = args => <LoginForm {...args} />;

export const Default = Template.bind({});

export const IsLoading = Template.bind({});
IsLoading.args = { isLoading: true };

export const serverError = Template.bind({});
serverError.args = { serverErrors: ['Email not valid', 'Password Required'] };
