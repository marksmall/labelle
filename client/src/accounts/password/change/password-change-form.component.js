import { useState } from 'react';
import { Form, Button, Row } from 'react-bootstrap';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import LoadingSpinner from 'components/loading-spinner.component';
import Message from 'components/message.component';
import FormContainer from 'components/form.component';

import { FIELD_NAMES } from 'accounts/accounts.constants';

import {
  password,
  newPasswordConfirm,
  oldPassword,
} from 'accounts/accounts.validators';

const loginSchema = yup.object({
  [FIELD_NAMES.oldPassword]: oldPassword,
  [FIELD_NAMES.password]: password,
  [FIELD_NAMES.newPasswordConfirm]: newPasswordConfirm,
});

export const PasswordChangeSuccessView = () => (
  <>
    <Row className="py-3">Thank you! Your password has been changed.</Row>

    <Row className="py-3">Click the button in order to continue.</Row>
  </>
);

const PasswordChangeForm = ({
  isLoading = false,
  changePassword,
  passwordMaxLength,
  passwordMinLength,
  serverErrors,
}) => {
  const [oldPassword, setOldPassword] = useState('');
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
    console.log('Password Change FORM: ', form);
    changePassword(form);
  };

  return (
    <FormContainer>
      <h1>Password Change</h1>

      {serverErrors && (
        <Message variant="danger">
          {serverErrors.map(err => (
            <div key={err}>{err}</div>
          ))}
        </Message>
      )}

      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Form.Group>
          <Form.Label htmlFor={FIELD_NAMES.oldPassword}>
            Old Password
          </Form.Label>
          <Form.Control
            {...register(FIELD_NAMES.oldPassword)}
            type="password"
            id={FIELD_NAMES.oldPassword}
            name={FIELD_NAMES.oldPassword}
            placeholder="Enter Old Password"
            value={oldPassword}
            onChange={event => setOldPassword(event.target.value)}
            isInvalid={!!errors.oldPassword}
            autoFocus
          />
          <Form.Control.Feedback type="invalid">
            {errors?.oldPassword?.message}
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
          {isLoading ? <LoadingSpinner /> : 'Change Password'}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PasswordChangeForm;
