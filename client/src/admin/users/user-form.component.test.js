import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import UserForm from './user-form.component';

const GO_BACK_LINK_TEXT = /go\sback/i;
const EDIT_USER_TEXT = /edit\suser\\?/i;
const FIRST_NAME_LABEL = /first\sname/i;
const LAST_NAME_LABEL = /last\sname/i;
const EMAIL_LABEL = /email\saddress/i;
const IS_ADMIN_LABEL = /is\sadmin/i;
const UPDATE_USER_BUTTON_LABEL = /update\suser/i;

const renderComponent = ({ user, updateUser, isLoading, serverErrors }) => {
  render(
    <UserForm
      isLoading={isLoading}
      user={user}
      updateUser={updateUser}
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

describe('User Form Component', () => {
  let user = null;
  let updateUser = null;

  beforeEach(() => {
    user = {
      id: 1,
      firstName: 'John',
      lastName: 'Smith',
      email: 'john@test.com',
      isAdmin: true,
    };
    updateUser = jest.fn();
  });

  it('should render a form', () => {
    renderComponent({ updateUser });

    expect(
      screen.getByRole('link', { name: GO_BACK_LINK_TEXT }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: EDIT_USER_TEXT }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('textbox', { name: FIRST_NAME_LABEL }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: LAST_NAME_LABEL }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: EMAIL_LABEL }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('checkbox', { name: IS_ADMIN_LABEL }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: UPDATE_USER_BUTTON_LABEL }),
    ).toBeInTheDocument();
  });

  it('should render a populated form', () => {
    renderComponent({ user, updateUser });

    expect(screen.getByRole('textbox', { name: FIRST_NAME_LABEL })).toHaveValue(
      user.firstName,
    );
    expect(screen.getByRole('textbox', { name: LAST_NAME_LABEL })).toHaveValue(
      user.lastName,
    );
    expect(screen.getByRole('textbox', { name: EMAIL_LABEL })).toHaveValue(
      user.email,
    );
    expect(
      screen.getByRole('checkbox', { name: IS_ADMIN_LABEL }),
    ).toBeChecked();
  });

  it('should disable `Update User` button when form is invalid', () => {
    renderComponent({ user, updateUser });

    expect(
      screen.getByRole('button', { name: UPDATE_USER_BUTTON_LABEL }),
    ).toBeDisabled();
  });

  it('should enable `Update User` button when form is valid', async () => {
    renderComponent({ user, updateUser });

    const updateUserButton = screen.getByRole('button', {
      name: UPDATE_USER_BUTTON_LABEL,
    });

    expect(updateUserButton).toBeDisabled();

    userEvent.type(
      screen.getByRole('textbox', { name: FIRST_NAME_LABEL }),
      'James',
    );

    userEvent.type(
      screen.getByRole('textbox', { name: LAST_NAME_LABEL }),
      'Bond',
    );

    await waitFor(() => expect(updateUserButton).not.toBeDisabled());
  });

  it('should not call `updateUser` function when form is invalid and `Update User` button clicked', async () => {
    renderComponent({ user, updateUser });

    const updateUserButton = screen.getByRole('button', {
      name: UPDATE_USER_BUTTON_LABEL,
    });

    userEvent.type(
      screen.getByRole('textbox', { name: EMAIL_LABEL }),
      'user.com',
    );

    userEvent.click(updateUserButton);

    await waitFor(() => expect(updateUser).not.toHaveBeenCalled());
  });

  it('should call `updateUser` function when form is valid and `Update User` button clicked', async () => {
    renderComponent({ user, updateUser });

    userEvent.click(screen.getByRole('checkbox', { name: IS_ADMIN_LABEL }));

    userEvent.click(
      screen.getByRole('button', { name: UPDATE_USER_BUTTON_LABEL }),
    );

    await waitFor(() =>
      expect(updateUser).toHaveBeenCalledWith({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: !user.isAdmin,
      }),
    );
  });

  it('should display error well if `updateUser` is unsuccessful', () => {
    const serverErrors = ['Test Error 1', 'Test Error 2', 'Test Error 3'];

    renderComponent({ user, serverErrors });

    expect(screen.getByRole('alert')).toBeInTheDocument();
    serverErrors.forEach(error =>
      expect(screen.getByText(error)).toBeInTheDocument(),
    );
  });

  it('shows a loading spinner if loading', () => {
    renderComponent({ user, isLoading: true });
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
