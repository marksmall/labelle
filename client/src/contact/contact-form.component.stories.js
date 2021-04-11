import { action } from '@storybook/addon-actions';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import ContactForm from './contact-form.component';

const Screen = {
  title: 'Contact/Contact Form',
  args: {},
  argTypes: {
    contactUs: { action: 'contactUs' },
  },
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

const Template = args => <ContactForm {...args} />;

export const Default = Template.bind({});

export const IsLoading = Template.bind({});
IsLoading.args = { isLoading: true };

export const ServerError = Template.bind({});
ServerError.args = { serverErrors: ['Email Not valid', 'Phone wrong format'] };

export const PrePopulated = Template.bind({});
PrePopulated.args = {
  user: {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@test.com',
    phone: null,
  },
};
