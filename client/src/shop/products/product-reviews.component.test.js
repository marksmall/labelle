import { render, screen } from '@testing-library/react';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import ProductReviews from './product-reviews.component';

import products from '../../products';

const TOP_HEADING_LABEL = /reviews/i;
const SUB_HEADING_LABEL = /write\sa\sreview/i;
const REVIEW_SUBMITTED_LABEL = /review\ssubmitted/i;
const PRODUCT_HEADING_LABEL = /add\sproduct\sreview/i;
const PRODUCT_RATING_LABEL = /rating/i;

const PRODUCT_RATING_OPTIONS = [
  'Select...',
  '1 - Poor',
  '2 - Fair',
  '3 - Good',
  '4 - Very Good',
  '5 - Excellent',
];

const PRODUCT_REVIEW_LABEL = /review/i;
const CREATE_PRODUCT_REVIEW_BUTTON_TEXT = /add\sreview/i;

const LOGIN_LINK_TEXT = /login/i;

const renderComponent = ({ user, product, createProductReview, history }) => {
  render(
    <ProductReviews
      user={user}
      product={product}
      createProductReview={createProductReview}
    />,
    {
      wrapper: ({ children }) => <Router history={history}>{children}</Router>,
    },
  );
};

describe('Product Reviews Component', () => {
  let user = null;
  let product = null;
  let createProductReview = null;
  let history = null;

  beforeEach(() => {
    user = {
      id: 1,
      firstName: 'John',
      lastName: 'Smith',
      email: 'john@test.com',
      isAdmin: true,
    };
    product = products[3];
    createProductReview = jest.fn();
    history = createMemoryHistory({ initialEntries: ['/'] });
  });

  it('should render ProductReviews when there are some', () => {
    renderComponent({ user, product, createProductReview, history });

    expect(
      screen.getByRole('heading', { name: TOP_HEADING_LABEL }),
    ).toBeInTheDocument();

    expect(screen.queryByText('No Reviews')).not.toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: SUB_HEADING_LABEL }),
    ).toBeInTheDocument();

    // expect(screen.getByText(REVIEW_SUBMITTED_LABEL)).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: PRODUCT_HEADING_LABEL }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('combobox', { name: PRODUCT_RATING_LABEL }),
    ).toBeInTheDocument();

    PRODUCT_RATING_OPTIONS.forEach(rating =>
      expect(screen.getByRole('option', { name: rating })).toBeInTheDocument(),
    );

    expect(
      screen.getByRole('textbox', { name: PRODUCT_REVIEW_LABEL }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: CREATE_PRODUCT_REVIEW_BUTTON_TEXT }),
    ).toBeInTheDocument();

    expect(document.querySelectorAll('.list-group-item').length).toBe(
      product.reviews.length + 1, // There is an extra list item outside the review list.
    );
  });

  it('should render `No Reviews` when there are none', () => {
    renderComponent({
      user,
      product: products[2],
      createProductReview,
      history,
    });

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('No Reviews')).toBeInTheDocument();
  });

  it('should render link to `login` when user not logged in', () => {
    renderComponent({
      user: null,
      product: products[2],
      createProductReview,
      history,
    });

    expect(screen.queryAllByRole('alert')[1]).toHaveTextContent(
      /please.*login.*to.*write.*a.*review/i,
    );

    expect(
      screen.queryByRole('link', { name: LOGIN_LINK_TEXT }),
    ).toBeInTheDocument();
  });

  it('should not render link to `login` when user logged in', () => {
    renderComponent({
      user,
      product: products[2],
      createProductReview,
      history,
    });

    expect(screen.getAllByRole('alert').length).toBe(1);

    expect(
      screen.queryByRole('link', { name: LOGIN_LINK_TEXT }),
    ).not.toBeInTheDocument();
  });

  it('should render error message when review unsuccessfully submitted', () => {});

  it('should render `Review Submitted` message when review successfully submitted', () => {});

  it('should show a loading spinner if loading', () => {});
});
