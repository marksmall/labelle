import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import PasswordChangeForm from './password-change-form.component';

const OLD_PASSWORD_LABEL = /old\spassword/i;
const PASSWORD_LABEL = /^password$/i;
const PASSWORD_CONFIRMATION_LABEL = /^password\sconfirmation$/i;
const PASSWORD_CHANGE_BUTTON_TEXT = /change\spassword/i;
const OLD_PASSWORD_TEXT = 'OLDPASSWORDasdf234£$%ASDRa4DDF';
const PASSWORD_TEXT = 'asdf234£$%ASDRa4DDF';

const renderComponent = ({ changePassword, isLoading, serverErrors }) => {
  render(
    <PasswordChangeForm
      isLoading={isLoading}
      changePassword={changePassword}
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

describe('Password Change Form Component', () => {
  let changePassword = null;

  beforeEach(() => {
    changePassword = jest.fn();
  });

  it('should render a form', () => {
    renderComponent({ changePassword });

    expect(screen.getByLabelText(OLD_PASSWORD_LABEL)).toBeInTheDocument();
    expect(screen.getByLabelText(PASSWORD_LABEL)).toBeInTheDocument();
    expect(
      screen.getByLabelText(PASSWORD_CONFIRMATION_LABEL),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: PASSWORD_CHANGE_BUTTON_TEXT }),
    ).toBeInTheDocument();
  });

  it('should disable `Change Password` button when form is invalid', () => {
    renderComponent({ changePassword });

    expect(
      screen.getByRole('button', { name: PASSWORD_CHANGE_BUTTON_TEXT }),
    ).toBeDisabled();
  });

  it('should enable `Change Password` button when form is valid', async () => {
    renderComponent({ changePassword });

    const passwordChangeButton = screen.getByRole('button', {
      name: PASSWORD_CHANGE_BUTTON_TEXT,
    });

    expect(passwordChangeButton).toBeDisabled();

    userEvent.type(
      screen.getByLabelText(OLD_PASSWORD_LABEL),
      OLD_PASSWORD_TEXT,
    );
    userEvent.type(screen.getByLabelText(PASSWORD_LABEL), PASSWORD_TEXT);
    userEvent.type(
      screen.getByLabelText(PASSWORD_CONFIRMATION_LABEL),
      PASSWORD_TEXT,
    );

    await waitFor(() => expect(passwordChangeButton).not.toBeDisabled());
  });

  it('should not call `changePassword` function when form is invalid and `Change Password` button clicked', async () => {
    renderComponent({ changePassword });

    const passwordChangeButton = screen.getByRole('button', {
      name: PASSWORD_CHANGE_BUTTON_TEXT,
    });

    userEvent.type(screen.getByLabelText(PASSWORD_LABEL), PASSWORD_TEXT);

    userEvent.click(passwordChangeButton);

    await waitFor(() => expect(changePassword).not.toHaveBeenCalled());
  });

  it('should call `changePassword` function when form is valid and `Change Password` button clicked', async () => {
    renderComponent({ changePassword });

    userEvent.type(
      screen.getByLabelText(OLD_PASSWORD_LABEL),
      OLD_PASSWORD_TEXT,
    );
    userEvent.type(screen.getByLabelText(PASSWORD_LABEL), PASSWORD_TEXT);
    userEvent.type(
      screen.getByLabelText(PASSWORD_CONFIRMATION_LABEL),
      PASSWORD_TEXT,
    );

    userEvent.click(
      screen.getByRole('button', { name: PASSWORD_CHANGE_BUTTON_TEXT }),
    );

    await waitFor(() =>
      expect(changePassword).toHaveBeenCalledWith({
        oldPassword: OLD_PASSWORD_TEXT,
        password: PASSWORD_TEXT,
        newPasswordConfirm: PASSWORD_TEXT,
      }),
    );
  });

  it('should display error well if `Change Password` is unsuccessful', () => {
    const serverErrors = ['Test Error 1', 'Test Error 2', 'Test Error 3'];

    renderComponent({ changePassword, serverErrors });

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
