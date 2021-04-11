import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import ProductList from './product-list.component';

import products from 'products';

const PAGE_HEADING_LABEL = /admin\sproducts\slist/i;
const PRODUCT_LIST_LABEL = /user\slist/i;
const PRODUCT_LIST_HEADINGS = [
  'ID',
  'Name',
  'Price',
  'Category',
  'Brand',
  'Actions',
];

const user = {
  id: 1,
  firstName: 'John',
  lastName: 'Smith',
  email: 'john@test.com',
  isAdmin: true,
};

const renderComponent = ({
  isLoading = false,
  user,
  products,
  fetchProducts,
  createProduct,
  deleteProduct,
  serverErrors,
  history,
}) => {
  render(
    <ProductList
      isLoading={isLoading}
      user={user}
      products={products}
      fetchProducts={fetchProducts}
      createProduct={createProduct}
      deleteProduct={deleteProduct}
      serverErrors={serverErrors}
    />,
    {
      wrapper: ({ children }) => <Router history={history}>{children}</Router>,
    },
  );
};

describe('Users List Component', () => {
  let fetchProducts = null;
  let createProduct = null;
  let deleteProduct = null;
  let history = null;

  beforeEach(() => {
    fetchProducts = jest.fn();
    createProduct = jest.fn();
    deleteProduct = jest.fn();
    history = createMemoryHistory({ initialEntries: ['/'] });
  });

  it('should render UserList', () => {
    renderComponent({
      user,
      products,
      fetchProducts,
      createProduct,
      deleteProduct,
      history,
    });

    expect(
      screen.getByRole('heading', { name: PAGE_HEADING_LABEL }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('table', { name: PRODUCT_LIST_LABEL }),
    ).toBeInTheDocument();

    PRODUCT_LIST_HEADINGS.forEach(heading =>
      expect(
        screen.getByRole('columnheader', { name: heading }),
      ).toBeInTheDocument(),
    );

    products.forEach(product => {
      expect(
        screen.getByRole('row', {
          name: `${product.id} ${product.name} £${product.price} ${product.category} ${product.brand} Edit ${product.id} Delete ${product.id}`,
        }),
      ).toBeInTheDocument();

      const link = screen.getByRole('link', {
        name: `Edit ${product.id}`,
      });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute(
        'href',
        `/admin/products/${product.id}/edit`,
      );

      expect(
        screen.getByRole('button', {
          name: `Delete ${product.id}`,
        }),
      ).toBeInTheDocument();
    });
  });

  it('should redirect to `Product Edit` page when button clicked', () => {
    renderComponent({
      user,
      products,
      fetchProducts,
      createProduct,
      deleteProduct,
      history,
    });

    const product = products[0];

    userEvent.click(
      screen.getByRole('link', {
        name: `Edit ${product.id}`,
      }),
    );

    expect(history.location.pathname).toBe(
      `/admin/products/${product.id}/edit`,
    );
  });

  it('should call to `createProduct` when button clicked', () => {
    renderComponent({
      user,
      products,
      fetchProducts,
      createProduct,
      deleteProduct,
      history,
    });
  });

  it('should call `deleteProduct` when button clicked', () => {
    renderComponent({
      user,
      products,
      fetchProducts,
      createProduct,
      deleteProduct,
      history,
    });

    const product = products[0];

    userEvent.click(
      screen.getByRole('button', {
        name: `Delete ${product.id}`,
      }),
    );

    expect(deleteProduct).toHaveBeenCalledWith(product.id);
  });
});
