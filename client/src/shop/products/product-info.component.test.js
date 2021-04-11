import { render, screen } from '@testing-library/react';

import ProductInfo from './product-info.component';

import products from '../../products';

const renderComponent = ({ product }) => {
  render(<ProductInfo product={product} />);
};

describe('Product Info Component', () => {
  let product = null;

  beforeEach(() => {
    product = products[3];
  });

  it('should render ProductInfo', () => {
    renderComponent({ product });

    expect(
      screen.getByRole('heading', { name: product.name }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(`${product.number_of_reviews} reviews`),
    ).toBeInTheDocument();

    expect(screen.getByText(`Price: £${product.price}`)).toBeInTheDocument();

    expect(
      screen.getByText(`Description: ${product.description}`),
    ).toBeInTheDocument();
  });
});
