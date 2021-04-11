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

import {
  email,
  firstName,
  lastName,
  password,
  newPasswordConfirm,
} from 'accounts/accounts.validators';

const registerSchema = yup.object({
  [FIELD_NAMES.firstName]: firstName,
  [FIELD_NAMES.lastName]: lastName,
  [FIELD_NAMES.email]: email,
  [FIELD_NAMES.password]: password,
  [FIELD_NAMES.newPasswordConfirm]: newPasswordConfirm,
});

const RegisterForm = ({
  isLoading = false,
  registerUser,
  passwordMaxLength,
  passwordMinLength,
  serverErrors,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(registerSchema),
    context: { passwordMinLength, passwordMaxLength },
  });

  const onSubmit = form => {
    console.log('REGISTER FORM: ', form);
    registerUser(form);
  };

  return (
    <FormContainer>
      <h1>Registration</h1>

      {serverErrors && (
        <Message variant="danger">
          {serverErrors.map(err => (
            <div key={err}>{err}</div>
          ))}
        </Message>
      )}

      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Form.Group>
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

        <Form.Group>
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
          />
          <Form.Control.Feedback type="invalid">
            {errors?.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

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
          {isLoading ? <LoadingSpinner /> : 'Register'}
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

export default RegisterForm;
