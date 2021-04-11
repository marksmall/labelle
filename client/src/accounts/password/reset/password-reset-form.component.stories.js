import { action } from '@storybook/addon-actions';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import PasswordResetForm, {
  PasswordResetSuccessView,
} from './password-reset-form.component';

const Screen = {
  title: 'Accounts/Password/Reset Confirm',
  args: {
    passwordMinLength: 2,
    passwordMaxLength: 255,
  },
  argTypes: {
    resetPassword: { action: 'Password Reset Confirmed' },
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

const Template = args => <PasswordResetForm {...args} />;

export const Default = Template.bind({});

export const IsLoading = Template.bind({});
IsLoading.args = { isLoading: true };

export const serverError = Template.bind({});
serverError.args = { serverErrors: ['Email Not valid', 'Email Required'] };

export const PasswordResetRequestSuccess = args => (
  <PasswordResetSuccessView {...args} />
);
