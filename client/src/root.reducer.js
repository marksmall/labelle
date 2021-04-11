import { combineReducers } from 'redux';

import { createBrowserHistory } from 'history';

import { connectRouter } from 'connected-react-router';

import app from './app.slice';
import accounts from 'accounts/accounts.slice';
import bookings from 'booking/bookings.slice';
import products from 'shop/products/products.slice';
import orders from 'shop/orders.slice';
import cart from 'shop/cart/cart.slice';

export const history = createBrowserHistory();

const createRootReducer = history =>
  combineReducers({
    app,
    accounts,
    bookings,
    products,
    cart,
    orders,
    router: connectRouter(history),
  });

const rootReducer = createRootReducer(history);

export default rootReducer;
