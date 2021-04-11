import { action } from '@storybook/addon-actions';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import PasswordResetRequestForm, {
  PasswordResetRequestSuccessView,
} from './password-reset-request-form.component';

const Screen = {
  title: 'Accounts/Password/Reset Request',
  args: {
    passwordMinLength: 2,
    passwordMaxLength: 255,
  },
  argTypes: {
    resetPassword: { action: 'Password Reset Requested' },
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

const Template = args => <PasswordResetRequestForm {...args} />;

export const Default = Template.bind({});

export const IsLoading = Template.bind({});
IsLoading.args = { isLoading: true };

export const serverError = Template.bind({});
serverError.args = { serverErrors: ['Email Not valid', 'Email Required'] };

export const PasswordResetRequestSuccess = args => (
  <PasswordResetRequestSuccessView {...args} />
);
