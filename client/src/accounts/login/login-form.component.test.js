import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import LoginForm from './login-form.component';

const EMAIL_LABEL = /email\saddress/i;
const PASSWORD_LABEL = /password/i;
const LOGIN_BUTTON_TEXT = /sign\sin/i;
const EMAIL_TEXT = 'test@test.com';
const PASSWORD_TEXT = 'testpassword';
const FORGOT_PASSWORD_LINK_TEXT = /forgot\spassword\\?/i;
const NEW_CUSTOMER_TEXT = /new\sCustomer\\?/i;
const REGISTER_LINK_TEXT = /register/i;

const renderComponent = ({ login, isLoading, serverErrors }) => {
  render(
    <LoginForm
      isLoading={isLoading}
      login={login}
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

describe('Login Form Component', () => {
  let login = null;

  beforeEach(() => {
    login = jest.fn();
  });

  it('should render a form', () => {
    renderComponent({ login });

    expect(
      screen.getByRole('textbox', { name: EMAIL_LABEL }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(PASSWORD_LABEL)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: FORGOT_PASSWORD_LINK_TEXT }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: LOGIN_BUTTON_TEXT }),
    ).toBeInTheDocument();
    expect(screen.getByText(NEW_CUSTOMER_TEXT)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: REGISTER_LINK_TEXT }),
    ).toBeInTheDocument();
  });

  it('should disable `Sign In` button when form is invalid', () => {
    renderComponent({ login });

    expect(
      screen.getByRole('button', { name: LOGIN_BUTTON_TEXT }),
    ).toBeDisabled();
  });

  it('should enable `Sign In` button when form is valid', async () => {
    renderComponent({ login });

    const loginButton = screen.getByRole('button', {
      name: LOGIN_BUTTON_TEXT,
    });

    expect(loginButton).toBeDisabled();

    userEvent.type(
      screen.getByRole('textbox', { name: EMAIL_LABEL }),
      EMAIL_TEXT,
    );

    expect(loginButton).toBeDisabled();

    userEvent.type(screen.getByLabelText(PASSWORD_LABEL), PASSWORD_TEXT);

    await waitFor(() => expect(loginButton).not.toBeDisabled());
  });

  it('should not call `login` function when form is invalid and `Sign In` button clicked', async () => {
    renderComponent({ login });

    const loginButton = screen.getByRole('button', { name: LOGIN_BUTTON_TEXT });

    userEvent.type(
      screen.getByRole('textbox', { name: EMAIL_LABEL }),
      EMAIL_TEXT,
    );

    userEvent.click(loginButton);

    await waitFor(() => expect(login).not.toHaveBeenCalled());
  });

  it('should call `login` function when form is valid and `Sign In` button clicked', async () => {
    renderComponent({ login });

    userEvent.type(
      screen.getByRole('textbox', { name: EMAIL_LABEL }),
      EMAIL_TEXT,
    );

    userEvent.type(screen.getByLabelText(PASSWORD_LABEL), PASSWORD_TEXT);

    userEvent.click(screen.getByRole('button', { name: LOGIN_BUTTON_TEXT }));

    await waitFor(() =>
      expect(login).toHaveBeenCalledWith({
        email: EMAIL_TEXT,
        password: PASSWORD_TEXT,
      }),
    );
  });

  it('should display error well if `login` is unsuccessful', () => {
    const serverErrors = ['Test Error 1', 'Test Error 2', 'Test Error 3'];

    renderComponent({ login, serverErrors });

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
