import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import PasswordResetRequestForm from './password-reset-request-form.component';

const EMAIL_LABEL = /email\saddress/i;
const RESET_PASSWORD_BUTTON_TEXT = /reset\spassword/i;
const EMAIL_TEXT = 'test@test.com';
const BACK_TEXT = /back\sto/i;
const LOGIN_LINK_TEXT = /sign\sin/i;

const renderComponent = ({ resetPassword, isLoading, serverErrors }) => {
  render(
    <PasswordResetRequestForm
      isLoading={isLoading}
      resetPassword={resetPassword}
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

describe('Password Reset Request Form Component', () => {
  let resetPassword = null;

  beforeEach(() => {
    resetPassword = jest.fn();
  });

  it('should render a form', () => {
    renderComponent({ resetPassword });

    expect(
      screen.getByRole('textbox', { name: EMAIL_LABEL }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: RESET_PASSWORD_BUTTON_TEXT }),
    ).toBeInTheDocument();
    expect(screen.getByText(BACK_TEXT)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: LOGIN_LINK_TEXT }),
    ).toBeInTheDocument();
  });

  it('should disable `Reset Password` button when form is invalid', () => {
    renderComponent({ resetPassword });

    expect(
      screen.getByRole('button', { name: RESET_PASSWORD_BUTTON_TEXT }),
    ).toBeDisabled();
  });

  it('should enable `Reset Password` button when form is valid', async () => {
    renderComponent({ resetPassword });

    const resetPasswordButton = screen.getByRole('button', {
      name: RESET_PASSWORD_BUTTON_TEXT,
    });

    expect(resetPasswordButton).toBeDisabled();

    userEvent.type(
      screen.getByRole('textbox', { name: EMAIL_LABEL }),
      EMAIL_TEXT,
    );

    userEvent.tab();

    await waitFor(() => expect(resetPasswordButton).not.toBeDisabled());
  });

  it('should not call `resetPassword` function when form is invalid and `Sign In` button clicked', async () => {
    renderComponent({ resetPassword });

    const resetPasswordButton = screen.getByRole('button', {
      name: RESET_PASSWORD_BUTTON_TEXT,
    });

    userEvent.click(resetPasswordButton);

    expect(resetPassword).not.toHaveBeenCalled();
  });

  it('should call `resetPassword` function when form is valid and `Sign In` button clicked', async () => {
    renderComponent({ resetPassword });

    userEvent.type(
      screen.getByRole('textbox', { name: EMAIL_LABEL }),
      EMAIL_TEXT,
    );

    userEvent.tab();

    const resetPasswordButton = screen.getByRole('button', {
      name: RESET_PASSWORD_BUTTON_TEXT,
    });
    await waitFor(() => expect(resetPasswordButton).not.toBeDisabled());
    userEvent.click(resetPasswordButton);

    await waitFor(() =>
      expect(resetPassword).toHaveBeenCalledWith({
        email: EMAIL_TEXT,
      }),
    );
  });

  it('should display error well if password reset request is unsuccessful', () => {
    const serverErrors = ['Test Error 1', 'Test Error 2', 'Test Error 3'];

    renderComponent({ resetPassword, serverErrors });

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
