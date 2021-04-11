import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Route, Switch } from 'react-router-dom';

import { userSelector } from 'accounts/accounts.slice';

import {
  fetchProducts,
  isLoadingSelector,
  serverErrorsSelector,
  selectedProductSelector,
} from './products/products.slice';

import { PRODUCTS_URL } from './shop.constants';

import ProductList from './products/product-list.component';
import ProductDetail from './products/product-detail.component';

const Shop = ({ addToCart }) => {
  const dispatch = useDispatch();

  // Fetch list of products available
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const isLoading = useSelector(isLoadingSelector);
  const serverErrors = useSelector(serverErrorsSelector);
  const selectedProduct = useSelector(selectedProductSelector);
  const user = useSelector(userSelector);

  return (
    <Switch>
      <Route exact path={PRODUCTS_URL} render={() => <ProductList />} />

      <Route
        exact
        path={`${PRODUCTS_URL}/:id`}
        render={() => (
          <ProductDetail
            isLoading={isLoading}
            user={user}
            product={selectedProduct}
            serverErrors={serverErrors}
            addToCart={addToCart}
          />
        )}
      />
    </Switch>
  );
};

export default Shop;
