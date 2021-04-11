import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import ContactForm from './contact-form.component';

const FIRST_NAME_LABEL = /first\sname/i;
const LAST_NAME_LABEL = /last\sname/i;
const EMAIL_LABEL = /email\saddress/i;
const PHONE_LABEL = /phone/i;
const MESSAGE_LABEL = /message/i;
const CONTACT_TEXT = /contact\sus/i;
const FIRST_NAME_TEXT = 'John';
const LAST_NAME_TEXT = 'Smith';
const EMAIL_TEXT = 'test@test.com';
const PHONE_TEXT = '0131 555 1111';
const MESSAGE_TEXT = 'Some test message text';

const renderComponent = ({ isLoading, contactUs, serverErrors, user }) => {
  render(
    <ContactForm
      isLoading={isLoading}
      contactUs={contactUs}
      user={user}
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

describe('Contact Form Component', () => {
  let contactUs = null;
  const user = {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@test.com',
    phone: null,
  };

  beforeEach(() => {
    contactUs = jest.fn();
  });

  it('should render an empty form', () => {
    renderComponent({ contactUs });

    expect(
      screen.getByRole('heading', { name: CONTACT_TEXT }),
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
      screen.getByRole('textbox', { name: PHONE_LABEL }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: MESSAGE_LABEL }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: CONTACT_TEXT }),
    ).toBeInTheDocument();
  });

  it('should render a pre-populated form', () => {
    renderComponent({
      contactUs,
      user,
    });

    expect(screen.getByRole('textbox', { name: FIRST_NAME_LABEL })).toHaveValue(
      user.firstName,
    );
    expect(screen.getByRole('textbox', { name: LAST_NAME_LABEL })).toHaveValue(
      user.lastName,
    );
    expect(screen.getByRole('textbox', { name: EMAIL_LABEL })).toHaveValue(
      user.email,
    );
    expect(screen.getByRole('textbox', { name: PHONE_LABEL })).toHaveValue('');
    expect(screen.getByRole('textbox', { name: MESSAGE_LABEL })).toHaveValue(
      '',
    );
  });

  it('should disable `Contact Us` button when form is invalid', () => {
    renderComponent({ contactUs });

    expect(screen.getByRole('button', { name: CONTACT_TEXT })).toBeDisabled();
  });

  it('should enable `Contact Us` button when form is valid', async () => {
    renderComponent({ contactUs });

    const contactButton = screen.getByRole('button', {
      name: CONTACT_TEXT,
    });

    expect(contactButton).toBeDisabled();

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
    userEvent.type(
      screen.getByRole('textbox', { name: PHONE_LABEL }),
      PHONE_TEXT,
    );
    userEvent.type(
      screen.getByRole('textbox', { name: MESSAGE_LABEL }),
      MESSAGE_TEXT,
    );

    await waitFor(() => expect(contactButton).not.toBeDisabled());
  });

  it('should not call `contactUs` function when form is invalid and `Contact Us` button clicked', async () => {
    renderComponent({ contactUs });

    const contactButton = screen.getByRole('button', {
      name: CONTACT_TEXT,
    });

    userEvent.type(
      screen.getByRole('textbox', { name: EMAIL_LABEL }),
      EMAIL_TEXT,
    );

    userEvent.click(contactButton);

    await waitFor(() => expect(contactUs).not.toHaveBeenCalled());
  });

  it('should call `contactUs` function when form is valid and `Contact Us` button clicked', async () => {
    renderComponent({ contactUs });

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
    userEvent.type(
      screen.getByRole('textbox', { name: PHONE_LABEL }),
      PHONE_TEXT,
    );
    userEvent.type(
      screen.getByRole('textbox', { name: MESSAGE_LABEL }),
      MESSAGE_TEXT,
    );

    userEvent.click(screen.getByRole('button', { name: CONTACT_TEXT }));

    await waitFor(() =>
      expect(contactUs).toHaveBeenCalledWith({
        firstName: FIRST_NAME_TEXT,
        lastName: LAST_NAME_TEXT,
        email: EMAIL_TEXT,
        phone: PHONE_TEXT,
        message: MESSAGE_TEXT,
      }),
    );
  });

  it('should display error well if form submission is unsuccessful', () => {
    const serverErrors = ['Test Error 1', 'Test Error 2', 'Test Error 3'];

    renderComponent({ contactUs, serverErrors });

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
