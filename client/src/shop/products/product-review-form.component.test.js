import { render, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import ProductReviewForm from './product-review-form.component';

const FORM_HEADING = /add\sproduct\sreview/i;
const RATING_LABEL = /rating/i;
const RATING_OPTIONS = [
  'Select...',
  '1 - Poor',
  '2 - Fair',
  '3 - Good',
  '4 - Very Good',
  '5 - Excellent',
];
const COMMENT_LABEL = /review/i;
const ADD_REVIEW_BUTTON_TEXT = /add\sreview/i;

const COMMENT_TEXT = 'This is a test comment';

const renderComponent = ({ isLoading, createProductReview, serverErrors }) => {
  render(
    <ProductReviewForm
      isLoading={isLoading}
      createProductReview={createProductReview}
      serverErrors={serverErrors}
    />,
  );
};

describe('Product Review Form Component', () => {
  let createProductReview = null;

  beforeEach(() => {
    createProductReview = jest.fn();
  });

  it('should render the Form', () => {
    renderComponent({});

    expect(
      screen.getByRole('heading', { name: FORM_HEADING }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('combobox', { name: RATING_LABEL }),
    ).toBeInTheDocument();

    RATING_OPTIONS.forEach(rating =>
      expect(screen.getByRole('option', { name: rating })).toBeInTheDocument(),
    );

    expect(
      screen.getByRole('textbox', { name: COMMENT_LABEL }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: ADD_REVIEW_BUTTON_TEXT }),
    ).toBeInTheDocument();
  });

  it('should disable `Add Review` button when form is invalid', () => {
    renderComponent({});

    expect(
      screen.getByRole('button', { name: ADD_REVIEW_BUTTON_TEXT }),
    ).toBeDisabled();
  });

  it('should enable `Add Review` button when form is valid', async () => {
    renderComponent({});

    const addReviewButton = screen.getByRole('button', {
      name: ADD_REVIEW_BUTTON_TEXT,
    });

    userEvent.selectOptions(screen.getByRole('combobox'), RATING_OPTIONS[2]);

    expect(addReviewButton).toBeDisabled();

    userEvent.type(
      screen.getByRole('textbox', { name: COMMENT_LABEL }),
      COMMENT_TEXT,
    );

    await waitFor(() => expect(addReviewButton).not.toBeDisabled());
  });

  it('should not call `createProductReview` function when form is invalid and `Add Review` button clicked', () => {
    renderComponent({ createProductReview });

    userEvent.click(
      screen.getByRole('button', { name: ADD_REVIEW_BUTTON_TEXT }),
    );

    expect(createProductReview).not.toHaveBeenCalled();
  });

  it('should call `createProductReview` function when form is valid and `Add Review` button clicked', async () => {
    renderComponent({ createProductReview });

    userEvent.type(
      screen.getByRole('textbox', { name: COMMENT_LABEL }),
      COMMENT_TEXT,
    );

    userEvent.selectOptions(screen.getByRole('combobox'), RATING_OPTIONS[2]);

    userEvent.click(
      screen.getByRole('button', { name: ADD_REVIEW_BUTTON_TEXT }),
    );

    await waitFor(() =>
      expect(createProductReview).toHaveBeenCalledWith({
        rating: '2',
        comment: COMMENT_TEXT,
      }),
    );
  });

  it('should display error well if `createProductReview` is unsuccessful', () => {
    const serverErrors = ['Test Error 1', 'Test Error 2', 'Test Error 3'];

    renderComponent({ createProductReview, serverErrors });

    expect(screen.getByRole('alert')).toBeInTheDocument();
    serverErrors.forEach(error =>
      expect(screen.getByText(error)).toBeInTheDocument(),
    );
  });

  it('shows a loading spinner if loading', () => {
    renderComponent({ isLoading: true });
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
