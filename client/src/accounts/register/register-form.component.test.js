import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import RegisterForm from './register-form.component';

const FIRST_NAME_LABEL = /first\sname/i;
const LAST_NAME_LABEL = /last\sname/i;
const EMAIL_LABEL = /email\saddress/i;
const PASSWORD_LABEL = /^password$/i;
const PASSWORD_CONFIRMATION_LABEL = /^password\sconfirmation$/i;
const REGISTER_BUTTON_TEXT = /register/i;
const FIRST_NAME_TEXT = 'John';
const LAST_NAME_TEXT = 'Smith';
const EMAIL_TEXT = 'test@test.com';
const PASSWORD_TEXT = 'asdf234£$%ASDRa4DDF';
const EXISTING_CUSTOMER_TEXT = /have\san\saccount\salready\\?/i;
const LOGIN_LINK_TEXT = /sign\sin/i;

const renderComponent = ({ registerUser, isLoading, serverErrors }) => {
  render(
    <RegisterForm
      isLoading={isLoading}
      registerUser={registerUser}
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

describe('Register Form Component', () => {
  let registerUser = null;

  beforeEach(() => {
    registerUser = jest.fn();
  });

  it('should render a form', () => {
    renderComponent({ registerUser });

    expect(
      screen.getByRole('textbox', { name: FIRST_NAME_LABEL }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: LAST_NAME_LABEL }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: EMAIL_LABEL }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(PASSWORD_LABEL)).toBeInTheDocument();
    expect(
      screen.getByLabelText(PASSWORD_CONFIRMATION_LABEL),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: REGISTER_BUTTON_TEXT }),
    ).toBeInTheDocument();
    expect(screen.getByText(EXISTING_CUSTOMER_TEXT)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: LOGIN_LINK_TEXT }),
    ).toBeInTheDocument();
  });

  it('should disable `Register` button when form is invalid', () => {
    renderComponent({ registerUser });

    expect(
      screen.getByRole('button', { name: REGISTER_BUTTON_TEXT }),
    ).toBeDisabled();
  });

  it('should enable `Register` button when form is valid', async () => {
    renderComponent({ registerUser });

    const registerButton = screen.getByRole('button', {
      name: REGISTER_BUTTON_TEXT,
    });

    expect(registerButton).toBeDisabled();

    userEvent.type(
      screen.getByRole('textbox', { name: FIRST_NAME_LABEL }),
      FIRST_NAME_TEXT,
    );
    userEvent.type(
      screen.getByRole('textbox', { name: LAST_NAME_LABEL }),
      LAST_NAME_TEXT,
    );
    userEvent.type(
      screen.getByRole('textbox', { name: EMAIL_LABEL }),
      EMAIL_TEXT,
    );
    userEvent.type(screen.getByLabelText(PASSWORD_LABEL), PASSWORD_TEXT);
    userEvent.type(
      screen.getByLabelText(PASSWORD_CONFIRMATION_LABEL),
      PASSWORD_TEXT,
    );

    await waitFor(() => expect(registerButton).not.toBeDisabled());
  });

  it('should not call `registerUser` function when form is invalid and `Register` button clicked', async () => {
    renderComponent({ registerUser });

    const registerButton = screen.getByRole('button', {
      name: REGISTER_BUTTON_TEXT,
    });

    userEvent.type(
      screen.getByRole('textbox', { name: EMAIL_LABEL }),
      EMAIL_TEXT,
    );

    userEvent.click(registerButton);

    await waitFor(() => expect(registerUser).not.toHaveBeenCalled());
  });

  it('should call `registerUser` function when form is valid and `Register` button clicked', async () => {
    renderComponent({ registerUser });

    userEvent.type(
      screen.getByRole('textbox', { name: FIRST_NAME_LABEL }),
      FIRST_NAME_TEXT,
    );
    userEvent.type(
      screen.getByRole('textbox', { name: LAST_NAME_LABEL }),
      LAST_NAME_TEXT,
    );
    userEvent.type(
      screen.getByRole('textbox', { name: EMAIL_LABEL }),
      EMAIL_TEXT,
    );
    userEvent.type(screen.getByLabelText(PASSWORD_LABEL), PASSWORD_TEXT);
    userEvent.type(
      screen.getByLabelText(PASSWORD_CONFIRMATION_LABEL),
      PASSWORD_TEXT,
    );

    userEvent.click(screen.getByRole('button', { name: REGISTER_BUTTON_TEXT }));

    await waitFor(() =>
      expect(registerUser).toHaveBeenCalledWith({
        firstName: FIRST_NAME_TEXT,
        lastName: LAST_NAME_TEXT,
        email: EMAIL_TEXT,
        password: PASSWORD_TEXT,
        newPasswordConfirm: PASSWORD_TEXT,
      }),
    );
  });

  it('should display error well if registration is unsuccessful', () => {
    const serverErrors = ['Test Error 1', 'Test Error 2', 'Test Error 3'];

    renderComponent({ registerUser, serverErrors });

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
