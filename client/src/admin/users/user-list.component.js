import { useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import { Button, Table } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import LoadingSpinner from 'components/loading-spinner.component';
import Message from 'components/message.component';

import { LOGIN_URL } from 'accounts/accounts.constants';

import { ADMIN_USERS_URL } from 'admin/admin.constants';

const UserList = ({
  isLoading = false,
  user,
  users,
  fetchUsers,
  deleteUser,
  serverErrors,
}) => {
  const history = useHistory();

  useEffect(() => {
    if (user && user.isAdmin) {
      fetchUsers();
    } else {
      history.push(LOGIN_URL);
    }
  }, [user, fetchUsers, history]);

  return (
    <div>
      <h1>Admin User List</h1>

      {isLoading ? (
        <LoadingSpinner />
      ) : serverErrors ? (
        <Message variant="danger">
          {serverErrors.map(err => (
            <div key={err}>{err}</div>
          ))}
        </Message>
      ) : (
        <Table
          id="tableId"
          striped
          bordered
          hover
          responsive
          className="table-sm"
        >
          <caption className="hidden">User List</caption>

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>EMail</th>
              <th>Admin</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{`${user.firstName} ${user.lastName}`}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <FontAwesomeIcon icon={['fas', 'check']} color="green" />
                  ) : (
                    <FontAwesomeIcon icon={['fas', 'times']} color="red" />
                  )}
                </td>
                <td>
                  <LinkContainer to={`${ADMIN_USERS_URL}/${user.id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <>
                        <span className="hidden">Edit {user.id}</span>
                        <FontAwesomeIcon icon={['fas', 'edit']} />
                      </>
                    </Button>
                  </LinkContainer>

                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteUser(user.id)}
                  >
                    <>
                      <span className="hidden">Delete {user.id}</span>
                      <FontAwesomeIcon icon={['fas', 'trash']} />
                    </>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default UserList;
