import { render, screen } from '@testing-library/react';

import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import ProductDetail from './product-detail.component';

import products from 'products';

const product = products[0];

const GO_BACK_BUTTON_LABEL = /go\sback/i;

const renderComponent = ({
  isLoading = false,
  product,
  serverErrors,
  addToCart,
  history,
}) => {
  render(
    <ProductDetail
      isLoading={isLoading}
      product={product}
      addToCart={addToCart}
      serverErrors={serverErrors}
    />,
    {
      wrapper: ({ children }) => <Router history={history}>{children}</Router>,
    },
  );
};

describe('Product Detail Component', () => {
  let addToCart = null;
  let history = null;

  beforeEach(() => {
    addToCart = jest.fn();
    history = createMemoryHistory({ initialEntries: ['/'] });
  });

  it('should renders ProductDetail', () => {
    renderComponent({ product, addToCart, history });

    expect(
      screen.getByRole('button', { name: GO_BACK_BUTTON_LABEL }),
    ).toBeInTheDocument();
  });

  it('should display error well if `createProductReview` is unsuccessful', () => {
    const serverErrors = ['Test Error 1', 'Test Error 2', 'Test Error 3'];

    renderComponent({ addToCart, serverErrors, history });

    expect(screen.getByRole('alert')).toBeInTheDocument();
    serverErrors.forEach(error =>
      expect(screen.getByText(error)).toBeInTheDocument(),
    );
  });

  it('shows a loading spinner if loading', () => {
    renderComponent({ isLoading: true, history });
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
