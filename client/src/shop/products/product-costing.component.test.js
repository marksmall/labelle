import { render, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import ProductCosting from './product-costing.component';

import products from '../../products';

const PRICE_LABEL = /price/i;
const STATUS_LABEL = /status/i;
const QUANTITY_LABEL = /quantity/i;
const ADD_TO_CART_BUTTON_TEXT = /add\sto\scart/i;

const IN_STOCK_TEXT = /in\sstock/i;
const OUT_OF_STOCK_TEXT = /out\sof\sstock/i;

const renderComponent = ({ product, quantity, setQuantity, addToCart }) => {
  render(
    <ProductCosting
      product={product}
      quantity={quantity}
      setQuantity={setQuantity}
      addToCart={addToCart}
    />,
  );
};

describe('Product Costing Component', () => {
  let product = null;
  let quantity = null;
  let setQuantity = null;
  let addToCart = null;

  beforeEach(() => {
    product = products[3];
    quantity = 3;
    setQuantity = jest.fn();
    addToCart = jest.fn();
  });

  it('should render ProductCosting in stock', () => {
    renderComponent({ product, quantity, setQuantity });

    expect(screen.getByText(PRICE_LABEL)).toBeInTheDocument();
    expect(screen.getByText(/£399.99/i)).toBeInTheDocument();

    expect(screen.getByText(STATUS_LABEL)).toBeInTheDocument();
    expect(screen.getByText(IN_STOCK_TEXT)).toBeInTheDocument();

    expect(
      screen.getByRole('combobox', { name: QUANTITY_LABEL }),
    ).toBeInTheDocument();

    [...Array(product.number_in_stock).keys()].forEach(no =>
      expect(screen.getByRole('option', { name: no + 1 })).toBeInTheDocument(),
    );

    expect(
      screen.getByRole('button', { name: ADD_TO_CART_BUTTON_TEXT }),
    ).toBeInTheDocument();
  });

  it('should render ProductCosting out of stock', () => {
    renderComponent({ product: products[5], quantity, setQuantity });

    expect(screen.getByText(PRICE_LABEL)).toBeInTheDocument();
    expect(screen.getByText(/£29.99/i)).toBeInTheDocument();

    expect(screen.getByText(STATUS_LABEL)).toBeInTheDocument();
    expect(screen.getByText(OUT_OF_STOCK_TEXT)).toBeInTheDocument();

    expect(
      screen.queryByRole('combobox', { name: QUANTITY_LABEL }),
    ).not.toBeInTheDocument();

    [...Array(products[5].number_in_stock).keys()].forEach(no =>
      expect(
        screen.queryByRole('option', { name: no + 1 }),
      ).not.toBeInTheDocument(),
    );

    expect(
      screen.getByRole('button', { name: ADD_TO_CART_BUTTON_TEXT }),
    ).toBeInTheDocument();
  });

  it('should disable `Add to Cart` button when product out of stock', () => {
    renderComponent({ product: products[5], quantity, setQuantity });

    expect(
      screen.getByRole('button', { name: ADD_TO_CART_BUTTON_TEXT }),
    ).toBeDisabled();
  });

  it('should enable `Add to Cart` button when product in stock', () => {
    renderComponent({ product, quantity, setQuantity });

    const addReviewButton = screen.getByRole('button', {
      name: ADD_TO_CART_BUTTON_TEXT,
    });

    expect(addReviewButton).not.toBeDisabled();
  });

  it('should not call `addToCart` function when product out of stock and `Add to Cart` button clicked', () => {
    renderComponent({ product: products[5], quantity, setQuantity, addToCart });

    userEvent.click(
      screen.getByRole('button', { name: ADD_TO_CART_BUTTON_TEXT }),
    );

    expect(addToCart).not.toHaveBeenCalled();
  });

  it('should call `addToCart` function when product in stock and `Add to Cart` button clicked', async () => {
    renderComponent({ product, quantity, setQuantity, addToCart });

    userEvent.click(
      screen.getByRole('button', { name: ADD_TO_CART_BUTTON_TEXT }),
    );

    await waitFor(() =>
      expect(addToCart).toHaveBeenCalledWith({
        ...product,
        quantity,
      }),
    );
  });
});
