const { v4: uuidv4 } = require('uuid');

let users = [
  {
    id: '5edd4615-34a7-4c55-9243-0092671ef9d8',
    email: 'user@test.com',
    password: 'pandaconcretespoon',
    first_name: null,
    last_name: null,
    avatar: '',
    description: '',
    is_verified: true,
    is_approved: true,
    is_admin: false,
    profiles: {},
  },
  {
    id: '6e5ac533-0245-4031-ab65-b1eff4d30a1f',
    email: 'admin@test.com',
    password: 'pandaconcretespoon',
    first_name: 'Harry',
    last_name: 'Callahan',
    avatar:
      'https://www.bfi.org.uk/sites/bfi.org.uk/files/styles/full/public/image/dirty-harry-1971-002-clint-eastwood-medium-shot.jpg?itok=Gt8uYZDg',
    description: '',
    is_verified: true,
    is_approved: true,
    is_admin: true,
    profiles: {},
  },
  {
    id: 'e3e7cd24-cfc7-49b3-837c-332dde8f1033',
    email: 'verified@test.com',
    password: 'pandaconcretespoon',
    first_name: null,
    last_name: null,
    avatar: '',
    description: '',
    is_verified: true,
    is_approved: false,
    is_admin: false,
    profiles: {},
  },
  {
    id: '14247edb-5e41-4770-aa91-d652466880be',
    email: 'approved@test.com',
    password: 'pandaconcretespoon',
    first_name: null,
    last_name: null,
    avatar: '',
    description: '',
    is_verified: false,
    is_approved: true,
    is_admin: false,
    profiles: {},
  },
];

const getUsers = () => users;
const addUser = user => (users = [...users, { ...user, id: uuidv4() }]);
const updateUser = user =>
  (users = users.map(usr => (usr.id === user.id ? user : usr)));
const deleteUser = id => (users = users.filter(user => user.id !== id));

module.exports = { getUsers, addUser, updateUser, deleteUser };
