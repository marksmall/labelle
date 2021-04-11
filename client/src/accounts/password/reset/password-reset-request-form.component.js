import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import LoadingSpinner from 'components/loading-spinner.component';
import Message from 'components/message.component';
import FormContainer from 'components/form.component';

import { FIELD_NAMES, LOGIN_URL } from 'accounts/accounts.constants';

import { email } from 'accounts/accounts.validators';

const loginSchema = yup.object({
  [FIELD_NAMES.email]: email,
});

export const PasswordResetRequestSuccessView = ({ email, onSubmit }) => (
  <>
    <Row className="py-3">
      <strong>Check your email</strong>
    </Row>
    <Row className="py-3">
      An email has been sent to <strong>{email}</strong>. It contains
      instructions on how to create a new password.
    </Row>
    <Row className="py-3">
      If <strong>You haven't received the email?</strong> Please check your spam
      or bulk folders.
    </Row>
    <Row className="py-3">
      <Button theme="secondary" onClick={() => onSubmit(email)}>
        Resend email
      </Button>
    </Row>
    <Row className="py-3">
      <Link to={LOGIN_URL}>Return to login</Link>
    </Row>
  </>
);

const PasswordResetRequestForm = ({
  isLoading = false,
  resetPassword,
  serverErrors,
}) => {
  const [email, setEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = form => {
    console.log('REQUEST PASSWORD RESET FORM: ', form);
    resetPassword(form);
  };

  return (
    <FormContainer>
      <h1>Reset Password</h1>

      {serverErrors && (
        <Message variant="danger">
          {serverErrors.map(err => (
            <div key={err}>{err}</div>
          ))}
        </Message>
      )}

      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Form.Group>
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
            autoFocus
          />
          <Form.Control.Feedback type="invalid">
            {errors?.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          disabled={Object.keys(errors).length > 0 || !isDirty}
        >
          {isLoading ? <LoadingSpinner /> : 'Reset Password'}
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Back to <Link to={LOGIN_URL}>Sign In</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default PasswordResetRequestForm;
