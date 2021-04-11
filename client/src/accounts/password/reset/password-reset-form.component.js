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

import { password, newPasswordConfirm } from 'accounts/accounts.validators';

const loginSchema = yup.object({
  [FIELD_NAMES.password]: password,
  [FIELD_NAMES.newPasswordConfirm]: newPasswordConfirm,
});

export const PasswordResetSuccessView = () => (
  <>
    <Row className="py-3">
      Your password has successfully been reset. Click the button to continue.
    </Row>

    <Row className="py-3">
      <Link to={LOGIN_URL}>Continue</Link>
    </Row>
  </>
);

const PasswordResetForm = ({
  isLoading = false,
  confirmPasswordReset,
  passwordMaxLength,
  passwordMinLength,
  serverErrors,
}) => {
  const [password, setPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(loginSchema),
    context: { passwordMinLength, passwordMaxLength },
  });

  const onSubmit = form => {
    console.log('Password Reset FORM: ', form);
    confirmPasswordReset(form);
  };

  return (
    <FormContainer>
      <h1>Password Reset</h1>

      {serverErrors && (
        <Message variant="danger">
          {serverErrors.map(err => (
            <div key={err}>{err}</div>
          ))}
        </Message>
      )}

      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Form.Group>
          <Form.Label htmlFor={FIELD_NAMES.password}>Password</Form.Label>
          <Form.Control
            {...register(FIELD_NAMES.password)}
            type="password"
            id={FIELD_NAMES.password}
            name={FIELD_NAMES.password}
            placeholder="Enter Password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            isInvalid={!!errors.password}
            autoFocus
          />
          <Form.Control.Feedback type="invalid">
            {errors?.password?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor={FIELD_NAMES.newPasswordConfirm}>
            Password Confirmation
          </Form.Label>
          <Form.Control
            {...register(FIELD_NAMES.newPasswordConfirm)}
            type="password"
            id={FIELD_NAMES.newPasswordConfirm}
            name={FIELD_NAMES.newPasswordConfirm}
            placeholder="Enter Password Confirmation"
            value={newPasswordConfirm}
            onChange={event => setNewPasswordConfirm(event.target.value)}
            isInvalid={!!errors.newPasswordConfirm}
          />
          <Form.Control.Feedback type="invalid">
            {errors?.newPasswordConfirm?.message}
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
          Have an account already? <Link to={LOGIN_URL}>Sign In</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default PasswordResetForm;
