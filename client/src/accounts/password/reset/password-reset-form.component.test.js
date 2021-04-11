import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import PasswordResetForm from './password-reset-form.component';

const PASSWORD_LABEL = /^password$/i;
const PASSWORD_CONFIRMATION_LABEL = /^password\sconfirmation$/i;
const PASSWORD_RESET_BUTTON_TEXT = /reset\spassword/i;
const PASSWORD_TEXT = 'asdf234£$%ASDRa4DDF';
const EXISTING_CUSTOMER_TEXT = /have\san\saccount\salready\\?/i;
const LOGIN_LINK_TEXT = /sign\sin/i;

const renderComponent = ({ confirmPasswordReset, isLoading, serverErrors }) => {
  render(
    <PasswordResetForm
      isLoading={isLoading}
      confirmPasswordReset={confirmPasswordReset}
      passwordMaxLength={255}
      passwordMinLength={2}
      serverErrors={serverErrors}
    />,
    {
      wrapper: ({ children }) => (
        <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
          {children}
        </Router>
      ),
    },
  );
};

describe('Password Reset Form Component', () => {
  let confirmPasswordReset = null;

  beforeEach(() => {
    confirmPasswordReset = jest.fn();
  });

  it('should render a form', () => {
    renderComponent({ confirmPasswordReset });

    expect(screen.getByLabelText(PASSWORD_LABEL)).toBeInTheDocument();
    expect(
      screen.getByLabelText(PASSWORD_CONFIRMATION_LABEL),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: PASSWORD_RESET_BUTTON_TEXT }),
    ).toBeInTheDocument();
    expect(screen.getByText(EXISTING_CUSTOMER_TEXT)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: LOGIN_LINK_TEXT }),
    ).toBeInTheDocument();
  });

  it('should disable `Register` button when form is invalid', () => {
    renderComponent({ confirmPasswordReset });

    expect(
      screen.getByRole('button', { name: PASSWORD_RESET_BUTTON_TEXT }),
    ).toBeDisabled();
  });

  it('should enable `Register` button when form is valid', async () => {
    renderComponent({ confirmPasswordReset });

    const passwordResetButton = screen.getByRole('button', {
      name: PASSWORD_RESET_BUTTON_TEXT,
    });

    expect(passwordResetButton).toBeDisabled();

    userEvent.type(screen.getByLabelText(PASSWORD_LABEL), PASSWORD_TEXT);
    userEvent.type(
      screen.getByLabelText(PASSWORD_CONFIRMATION_LABEL),
      PASSWORD_TEXT,
    );

    await waitFor(() => expect(passwordResetButton).not.toBeDisabled());
  });

  it('should not call `confirmPasswordReset` function when form is invalid and `Register` button clicked', async () => {
    renderComponent({ confirmPasswordReset });

    const passwordResetButton = screen.getByRole('button', {
      name: PASSWORD_RESET_BUTTON_TEXT,
    });

    userEvent.type(screen.getByLabelText(PASSWORD_LABEL), PASSWORD_TEXT);

    userEvent.click(passwordResetButton);

    await waitFor(() => expect(confirmPasswordReset).not.toHaveBeenCalled());
  });

  it('should call `confirmPasswordReset` function when form is valid and `Register` button clicked', async () => {
    renderComponent({ confirmPasswordReset });

    userEvent.type(screen.getByLabelText(PASSWORD_LABEL), PASSWORD_TEXT);
    userEvent.type(
      screen.getByLabelText(PASSWORD_CONFIRMATION_LABEL),
      PASSWORD_TEXT,
    );

    userEvent.click(
      screen.getByRole('button', { name: PASSWORD_RESET_BUTTON_TEXT }),
    );

    await waitFor(() =>
      expect(confirmPasswordReset).toHaveBeenCalledWith({
        password: PASSWORD_TEXT,
        newPasswordConfirm: PASSWORD_TEXT,
      }),
    );
  });

  it('should display error well if registration is unsuccessful', () => {
    const serverErrors = ['Test Error 1', 'Test Error 2', 'Test Error 3'];

    renderComponent({ confirmPasswordReset, serverErrors });

    expect(screen.getByRole('alert')).toBeInTheDocument();
    serverErrors.forEach(error =>
      expect(screen.getByText(error)).toBeInTheDocument(),
    );
  });

  it('shows a loading spinner if loading', () => {
    renderComponent({ isLoading: true });
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
