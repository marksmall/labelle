import { useState } from 'react';

import { Link } from 'react-router-dom';

import { Form, Button } from 'react-bootstrap';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import LoadingSpinner from 'components/loading-spinner.component';
import Message from 'components/message.component';
import FormContainer from 'components/form.component';

import { FIELD_NAMES } from 'accounts/accounts.constants';

import { email, firstName, lastName } from 'accounts/accounts.validators';

import { ADMIN_USERS_URL } from 'admin/admin.constants';

const formSchema = yup.object({
  [FIELD_NAMES.firstName]: firstName,
  [FIELD_NAMES.lastName]: lastName,
  [FIELD_NAMES.email]: email,
});

const UserForm = ({ isLoading = false, user, updateUser, serverErrors }) => {
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isAdmin, setIsAdmin] = useState(user?.isAdmin || false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(formSchema),
  });

  const onSubmit = form => {
    updateUser({ ...form, isAdmin });
  };

  return (
    <div>
      <Link to={ADMIN_USERS_URL}>Go Back</Link>

      <FormContainer>
        <h1>Edit User</h1>

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
              placeholder="Enter Last Name"
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
            <Form.Check
              type="checkbox"
              id={FIELD_NAMES.isAdmin}
              name={FIELD_NAMES.isAdmin}
              label="Is Admin"
              checked={isAdmin}
              value={isAdmin}
              onChange={e => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            disabled={Object.keys(errors).length > 0 || !isDirty}
          >
            {isLoading ? <LoadingSpinner /> : 'Update User'}
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default UserForm;
