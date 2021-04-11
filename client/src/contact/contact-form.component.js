import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import LoadingSpinner from 'components/loading-spinner.component';
import Message from 'components/message.component';
import FormContainer from 'components/form.component';

import { FIELD_NAMES } from './contact.constants';

import {
  email,
  firstName,
  lastName,
  phone,
  message,
} from './contact.validators';

const registerSchema = yup.object({
  [FIELD_NAMES.firstName]: firstName,
  [FIELD_NAMES.lastName]: lastName,
  [FIELD_NAMES.email]: email,
  [FIELD_NAMES.phone]: phone,
  [FIELD_NAMES.message]: message,
});

const ContactForm = ({ isLoading = false, contactUs, serverErrors, user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = form => {
    console.log('Contact Us FORM: ', form);
    contactUs(form);
  };

  return (
    <FormContainer>
      <h1>Contact Us</h1>

      {serverErrors && (
        <Message variant="danger">
          {serverErrors.map(err => (
            <div key={err}>{err}</div>
          ))}
        </Message>
      )}

      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label htmlFor={FIELD_NAMES.firstName}>First Name</Form.Label>
            <Form.Control
              {...register(FIELD_NAMES.firstName)}
              type="text"
              id={FIELD_NAMES.firstName}
              name={FIELD_NAMES.firstName}
              placeholder="Enter First Name"
              value={firstName}
              onChange={event => setFirstName(event.target.value)}
              isInvalid={!!errors.firstName}
              autoFocus
            />
            <Form.Control.Feedback type="invalid">
              {errors?.firstName?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label htmlFor={FIELD_NAMES.lastName}>Last Name</Form.Label>
            <Form.Control
              {...register(FIELD_NAMES.lastName)}
              type="text"
              id={FIELD_NAMES.lastName}
              name={FIELD_NAMES.lastName}
              placeholder="Enter First Name"
              value={lastName}
              onChange={event => setLastName(event.target.value)}
              isInvalid={!!errors.lastName}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.lastName?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label htmlFor={FIELD_NAMES.email}>Email Address</Form.Label>
            <Form.Control
              {...register(FIELD_NAMES.email)}
              type="email"
              id={FIELD_NAMES.email}
              name={FIELD_NAMES.email}
              placeholder="Enter Email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.email?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label htmlFor={FIELD_NAMES.phone}>Phone</Form.Label>
            <Form.Control
              {...register(FIELD_NAMES.phone)}
              type="tel"
              id={FIELD_NAMES.phone}
              name={FIELD_NAMES.phone}
              placeholder="Enter Phone"
              value={phone}
              onChange={event => setPhone(event.target.value)}
              isInvalid={!!errors.phone}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.phone?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Form.Group>
          <Form.Label htmlFor={FIELD_NAMES.message}>Message</Form.Label>
          <Form.Control
            as="textarea"
            {...register(FIELD_NAMES.message)}
            id={FIELD_NAMES.message}
            name={FIELD_NAMES.message}
            placeholder="Enter Message"
            value={message}
            onChange={event => setMessage(event.target.value)}
            isInvalid={!!errors.message}
            rows="5"
          />
          <Form.Control.Feedback type="invalid">
            {errors?.message?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          disabled={Object.keys(errors).length > 0 || !isDirty}
        >
          {isLoading ? <LoadingSpinner /> : 'Contact Us'}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ContactForm;
