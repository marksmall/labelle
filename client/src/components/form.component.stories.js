import { Form } from 'react-bootstrap';

import FormContainer from './form.component';

const Screen = {
  title: 'Components/Form',
};

export default Screen;

const Template = args => (
  <FormContainer {...args}>
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
  </FormContainer>
);

export const Default = Template.bind({});
