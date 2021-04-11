import { useState } from 'react';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { Button, Form } from 'react-bootstrap';

import FormContainer from 'components/form.component';
import LoadingSpinner from 'components/loading-spinner.component';
import Message from 'components/message.component';

import Checkout from './checkout.component';

import { FIELD_NAMES } from '../shop.constants';

import { address, city, postalCode, country } from '../shop.validators';

const loginSchema = yup.object({
  [FIELD_NAMES.address]: address,
  [FIELD_NAMES.city]: city,
  [FIELD_NAMES.postalCode]: postalCode,
  [FIELD_NAMES.country]: country,
});

const Shipping = ({
  isLoading = false,
  addShippingAddress,
  serverErrors,
  history,
}) => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = form => {
    console.log('SUBMIT SHIPPING FORM: ', form);
    addShippingAddress(form);

    history.push('/payment');
  };

  return (
    <FormContainer>
      <Checkout login shipping />

      <h1>Shipping</h1>

      {serverErrors && (
        <Message variant="danger">
          {serverErrors.map(err => (
            <div key={err}>{err}</div>
          ))}
        </Message>
      )}

      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Form.Group>
          <Form.Label htmlFor={FIELD_NAMES.address}>Address</Form.Label>
          <Form.Control
            {...register(FIELD_NAMES.address)}
            type="text"
            id={FIELD_NAMES.address}
            name={FIELD_NAMES.address}
            placeholder="Enter shipping address"
            value={address}
            onChange={event => setAddress(event.target.value)}
            isInvalid={!!errors.address}
            autoFocus
          />
          <Form.Control.Feedback type="invalid">
            {errors?.address?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor={FIELD_NAMES.city}>City</Form.Label>
          <Form.Control
            {...register(FIELD_NAMES.city)}
            type="text"
            id={FIELD_NAMES.city}
            name={FIELD_NAMES.city}
            placeholder="Enter city"
            value={city}
            onChange={event => setCity(event.target.value)}
            isInvalid={!!errors.city}
          />
          <Form.Control.Feedback type="invalid">
            {errors?.city?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor={FIELD_NAMES.postalCode}>Postal Code</Form.Label>
          <Form.Control
            {...register(FIELD_NAMES.postalCode)}
            type="text"
            id={FIELD_NAMES.postalCode}
            name={FIELD_NAMES.postalCode}
            placeholder="Enter postal code"
            value={postalCode}
            onChange={event => setPostalCode(event.target.value)}
            isInvalid={!!errors.postalCode}
          />
          <Form.Control.Feedback type="invalid">
            {errors?.postalCode?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor={FIELD_NAMES.country}>Country</Form.Label>
          <Form.Control
            {...register(FIELD_NAMES.country)}
            type="text"
            id={FIELD_NAMES.country}
            name={FIELD_NAMES.country}
            placeholder="Enter country"
            value={country}
            onChange={event => setCountry(event.target.value)}
            isInvalid={!!errors.country}
          />
          <Form.Control.Feedback type="invalid">
            {errors?.country?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          disabled={Object.keys(errors).length > 0 || !isDirty}
        >
          {isLoading ? <LoadingSpinner /> : 'Continue'}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Shipping;
