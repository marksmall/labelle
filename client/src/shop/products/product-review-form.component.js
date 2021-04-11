import { useState } from 'react';

import { Form, Button } from 'react-bootstrap';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import LoadingSpinner from 'components/loading-spinner.component';
import Message from 'components/message.component';
import FormContainer from 'components/form.component';

import { FIELD_NAMES } from '../shop.constants';

import { rating, comment } from '../shop.validators';

const loginSchema = yup.object({
  [FIELD_NAMES.rating]: rating,
  [FIELD_NAMES.comment]: comment,
});

const ProductReviewForm = ({
  isLoading = false,
  createProductReview,
  serverErrors,
}) => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = form => {
    console.log('SUBMIT PRODUCT REVIEW FORM: ', form);
    createProductReview(form);
  };

  return (
    <FormContainer>
      <h1>Add Product Review</h1>

      {serverErrors && (
        <Message variant="danger">
          {serverErrors.map(err => (
            <div key={err}>{err}</div>
          ))}
        </Message>
      )}

      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Form.Group>
          <Form.Label htmlFor={FIELD_NAMES.rating}>Rating</Form.Label>
          <Form.Control
            as="select"
            {...register(FIELD_NAMES.rating)}
            id={FIELD_NAMES.rating}
            name={FIELD_NAMES.rating}
            value={rating}
            onChange={event => setRating(event.target.value)}
            autoFocus
          >
            <option value="">Select...</option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor={FIELD_NAMES.comment}>Review</Form.Label>
          <Form.Control
            as="textarea"
            {...register(FIELD_NAMES.comment)}
            id={FIELD_NAMES.comment}
            name={FIELD_NAMES.comment}
            placeholder="Enter provide feedback"
            value={comment}
            onChange={event => setComment(event.target.value)}
            isInvalid={!!errors.comment}
            rows="5"
          />
          <Form.Control.Feedback type="invalid">
            {errors?.comment?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          disabled={Object.keys(errors).length > 0 || !isDirty}
        >
          {isLoading ? <LoadingSpinner /> : 'Add Review'}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ProductReviewForm;
