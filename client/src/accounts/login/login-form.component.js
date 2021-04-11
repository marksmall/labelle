import { useEffect, useState } from 'react';

// import { useDispatch, useSelector } from 'react-redux';

import { Link, useHistory } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

// import { serverErrorsSelector, userSelector } from 'accounts/accounts.slice';

import LoadingSpinner from 'components/loading-spinner.component';
import Message from 'components/message.component';
import FormContainer from 'components/form.component';

import {
  FIELD_NAMES,
  PASSWORD_RESET_REQUEST_URL,
  REGISTER_URL,
} from 'accounts/accounts.constants';

import { email, password } from 'accounts/accounts.validators';

const loginSchema = yup.object({
  [FIELD_NAMES.email]: email,
  [FIELD_NAMES.password]: password,
});

const LoginForm = ({
  isLoading = false,
  user,
  login,
  passwordMaxLength,
  passwordMinLength,
  serverErrors,
}) => {
  const history = useHistory();

  useEffect(() => {
    if (user) {
      // Return back to the page, you came here from.
      history.goBack();
    }
  }, [history, user]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    login(form);
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>

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

        <Row className="py-3">
          <Col>
            <Link to={PASSWORD_RESET_REQUEST_URL}>Forgot password?</Link>
          </Col>
        </Row>

        <Button
          type="submit"
          variant="primary"
          disabled={Object.keys(errors).length > 0 || !isDirty}
        >
          {isLoading ? <LoadingSpinner /> : 'Sign In'}
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer? <Link to={REGISTER_URL}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginForm;
