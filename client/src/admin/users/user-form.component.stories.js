import { action } from '@storybook/addon-actions';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import User from './user-form.component';

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

const Screen = {
  title: 'Admin/User',
  args: { user: users[1] },
  argTypes: { updateUser: { action: 'updateUser' } },
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

const Template = args => <User {...args} />;

export const Default = Template.bind({});

// export const HasUsers = Template.bind({});
// HasUsers.args = { users };

// export const IsLoading = Template.bind({});
// IsLoading.args = { isLoading: true };

// export const serverError = Template.bind({});
// serverError.args = { serverErrors: ['Email not valid', 'Password Required'] };
