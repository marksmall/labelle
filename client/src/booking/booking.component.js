import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Route, Switch } from 'react-router-dom';

import {
  fetchServices,
  fetchEmployees,
  isLoadingSelector,
  serverErrorsSelector,
  servicesSelector,
  selectedServiceSelector,
  employeesSelector,
  selectedEmployeeSelector,
} from './bookings.slice';

import { BOOKINGS_URL } from './booking.constants';

// import ProductList from './products/product-list.component';
import Service from './service.component';

const Booking = ({ addToCart }) => {
  const dispatch = useDispatch();

  // Fetch list of products available
  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchEmployees());
  }, [dispatch]);

  const isLoading = useSelector(isLoadingSelector);
  const serverErrors = useSelector(serverErrorsSelector);
  const services = useSelector(servicesSelector);
  const employees = useSelector(employeesSelector);

  return (
    <Switch>
      <Route
        exact
        path={BOOKINGS_URL}
        render={() => (
          <Service
            services={services}
            employees={employees}
            isLoading={isLoading}
            serverErrors={serverErrors}
          />
        )}
      />

      {/* <Route
        exact
        path={`${PRODUCTS_URL}/:id`}
        render={() => (
          <ProductDetail
            isLoading={isLoading}
            product={selectedProduct}
            serverErrors={serverErrors}
            addToCart={addToCart}
          />
        )}
      /> */}
    </Switch>
  );
};

export default Booking;
