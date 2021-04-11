import { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import FormContainer from 'components/form.component';
import LoadingSpinner from 'components/loading-spinner.component';
import Message from 'components/message.component';
import Checkout from './checkout.component';

import { FIELD_NAMES } from '../shop.constants';

import { paymentMethod } from '../shop.validators';

const loginSchema = yup.object({
  [FIELD_NAMES.paymentMethod]: paymentMethod,
});

const Payment = ({
  isLoading = false,
  addPaymentMethod,
  serverErrors,
  history,
}) => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(loginSchema),
    // context: { passwordMinLength, passwordMaxLength },
  });

  const onSubmit = form => {
    console.log('SUBMIT PAYMENT METHOD FORM: ', form);
    addPaymentMethod(form.paymentMethod);

    history.push('/placeorder');
  };

  return (
    <FormContainer>
      <Checkout login shipping payment />

      {serverErrors && (
        <Message variant="danger">
          {serverErrors.map(err => (
            <div key={err}>{err}</div>
          ))}
        </Message>
      )}

      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Form.Group>
          <Form.Label as="legend" htmlFor={FIELD_NAMES.paymentMethod}>
            Select Method
          </Form.Label>
          <Col>
            <Form.Check
              {...register(FIELD_NAMES.paymentMethod)}
              type="radio"
              id={FIELD_NAMES.paymentMethod}
              name={FIELD_NAMES.paymentMethod}
              label="PayPal or Credit Card"
              value={paymentMethod}
              onChange={event => setPaymentMethod(event.target.value)}
              checked
            />
          </Col>
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          disabled={Object.keys(errors).length}
        >
          {isLoading ? <LoadingSpinner /> : 'Continue'}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Payment;
