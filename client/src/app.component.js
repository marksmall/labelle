import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { Container } from 'react-bootstrap';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { fetchAppConfig } from './app.slice';

import {
  addToCart,
  removeFromCart,
  cartSelector,
  addShippingAddress,
  addPaymentMethod,
  placeOrder,
} from 'shop/cart/cart.slice';

import Header from 'layout/header.component';
import Footer from 'layout/footer.component';

import PrivateRoute from 'components/private-route.component';

import Home from 'layout/home.component';

import { userSelector, logout } from 'accounts/accounts.slice';
import Accounts from 'accounts/accounts.component';

import Booking from 'booking/booking.component';

import Contact from 'contact/contact.component';

import Shop from 'shop/shop.component';
import Cart from 'shop/cart/cart.component';
import ShippingForm from 'shop/cart/shipping-form.component';
import PaymentForm from 'shop/cart/payment-form.component';
import PlaceOrder from 'shop/cart/place-order.component';

library.add(fas);

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector(userSelector);
  const cart = useSelector(cartSelector);
  // const cartItems = cart.items;
  // const cartItems = useSelector(cartItemsSelector);
  // console.log('APP COMP CART ITEMS: ', cartItems);

  // Always fetch app config regardless of logged in status
  useEffect(() => {
    dispatch(fetchAppConfig());
  }, [dispatch]);

  return (
    <Router>
      <Header user={user} logout={() => dispatch(logout())} />

      <main>
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />

            <Route path="/accounts" component={Accounts} />

            <Route
              path="/cart"
              render={({ match, location, history }) => (
                <Cart
                  cartItems={cart.items}
                  // addToCart={(productId, quantity) =>
                  //   dispatch(addToCart(productId, quantity))
                  // }
                  user={user}
                  removeFromCart={id => dispatch(removeFromCart(id))}
                  match={match}
                  location={location}
                  history={history}
                />
              )}
            />

            <Route path="/bookings" render={() => <Booking />} />

            <Route path="/contact" render={() => <Contact />} />

            <Route
              path="/shop"
              render={() => (
                <Shop addToCart={product => dispatch(addToCart(product))} />
              )}
            />

            <PrivateRoute
              exact
              path="/shipping"
              user={user}
              component={ShippingForm}
              addShippingAddress={form => dispatch(addShippingAddress(form))}
            />

            <PrivateRoute
              exact
              path="/payment"
              user={user}
              component={PaymentForm}
              addPaymentMethod={form => dispatch(addPaymentMethod(form))}
            />

            <PrivateRoute
              exact
              path="/placeOrder"
              user={user}
              component={PlaceOrder}
              cart={cart}
              placeOrder={() => dispatch(placeOrder())}
            />
          </Switch>
        </Container>
      </main>

      <Footer />
    </Router>
  );
};

export default App;
