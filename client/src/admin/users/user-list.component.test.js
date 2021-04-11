import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import UserList from './user-list.component';

const PAGE_HEADING_LABEL = /admin\suser\slist/i;
const USER_LIST_LABEL = /user\slist/i;
const USER_LIST_HEADINGS = ['ID', 'Name', 'EMail', 'Admin', 'Actions'];

const users = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Smith',
    email: 'john@test.com',
    isAdmin: true,
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@test.com',
    isAdmin: false,
  },
];

const renderComponent = ({ user, users, fetchUsers, deleteUser, history }) => {
  render(
    <UserList
      user={user}
      users={users}
      fetchUsers={fetchUsers}
      deleteUser={deleteUser}
    />,
    {
      wrapper: ({ children }) => <Router history={history}>{children}</Router>,
    },
  );
};

describe('Users List Component', () => {
  let fetchUsers = null;
  let deleteUser = null;
  let history = null;

  beforeEach(() => {
    fetchUsers = jest.fn();
    deleteUser = jest.fn();
    history = createMemoryHistory({ initialEntries: ['/'] });
  });

  it('should render UserList', () => {
    renderComponent({ user: users[0], users, fetchUsers, deleteUser, history });

    expect(
      screen.getByRole('heading', { name: PAGE_HEADING_LABEL }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('table', { name: USER_LIST_LABEL }),
    ).toBeInTheDocument();

    USER_LIST_HEADINGS.forEach(heading =>
      expect(
        screen.getByRole('columnheader', { name: heading }),
      ).toBeInTheDocument(),
    );

    users.forEach(user => {
      expect(
        screen.getByRole('row', {
          name: `${user.id} ${user.firstName} ${user.lastName} ${user.email} Edit ${user.id} Delete ${user.id}`,
        }),
      ).toBeInTheDocument();

      const link = screen.getByRole('link', {
        name: `Edit ${user.id}`,
      });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', `/admin/users/${user.id}/edit`);

      expect(
        screen.getByRole('button', {
          name: `Delete ${user.id}`,
        }),
      ).toBeInTheDocument();
    });
  });

  it('should redirect to `User Edit` page when button clicked', () => {
    const user = users[0];
    renderComponent({ user, users, fetchUsers, deleteUser, history });

    userEvent.click(
      screen.getByRole('link', {
        name: `Edit ${users[0].id}`,
      }),
    );

    expect(history.location.pathname).toBe(`/admin/users/${user.id}/edit`);
  });

  it('should call `deleteUser` on user when button clicked', () => {
    renderComponent({ user: users[0], users, fetchUsers, deleteUser, history });

    userEvent.click(
      screen.getByRole('button', {
        name: `Delete ${users[0].id}`,
      }),
    );

    expect(deleteUser).toHaveBeenCalledWith(users[0].id);
  });
});
