import { Link } from 'react-router-dom';

import { ListGroup } from 'react-bootstrap';

import { LOGIN_URL } from 'accounts/accounts.constants';

import LoadingSpinner from 'components/loading-spinner.component';
import Message from 'components/message.component';
import Rating from 'components/rating.component';

import ProductReviewForm from './product-review-form.component';

const ProductReviews = ({
  isLoading,
  user,
  product,
  createProductReview,
  serverErrors,
}) => {
  const successProductReview = false;

  return (
    <>
      <h4>Reviews</h4>

      {product.reviews.length === 0 && (
        <Message variant="info">No Reviews</Message>
      )}

      <ListGroup variant="flush">
        <ListGroup.Item>
          <h4>Write a Review</h4>

          {isLoading && <LoadingSpinner />}
          {successProductReview && (
            <Message variant="success">Review Submitted</Message>
          )}
          {serverErrors && (
            <Message variant="danger">
              {serverErrors.map(err => (
                <div key={err}>{err}</div>
              ))}
            </Message>
          )}

          {user ? (
            <ProductReviewForm
              createProductReview={form =>
                createProductReview(product.id, form)
              }
            />
          ) : (
            <Message variant="info">
              Please <Link to={LOGIN_URL}>login</Link> to write a review
            </Message>
          )}
        </ListGroup.Item>

        {product.reviews
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map(review => (
            <ListGroup.Item key={review.id}>
              <strong>{review.name}</strong>
              <Rating value={review.rating} color="#f8e825" />
              <p>{review.created_at.substring(0, 10)}</p>
              <p>{review.comment}</p>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </>
  );
};

export default ProductReviews;
