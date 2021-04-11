import { render, screen } from '@testing-library/react';

import { Form } from 'react-bootstrap';

import FormContainer from './form.component';

describe('Form Component', () => {
  it('should display a form', async () => {
    render(
      <FormContainer>
        <Form.Group>
          <Form.Label htmlFor="email">Email Address</Form.Label>
          <Form.Control
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email"
            autoFocus
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            name="password"
            placeholder="Enter Password"
          />
        </Form.Group>
      </FormContainer>,
    );

    expect(
      screen.getByRole('textbox', { name: /email\saddress/i }),
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });
});
