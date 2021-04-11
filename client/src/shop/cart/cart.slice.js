import { createSlice, createSelector } from '@reduxjs/toolkit';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const name = 'products';
// const API = `/api/${name}/`;

const initialState = {
  items: [],
  shippingAddress: null,
  paymentMethod: null,
};

const { actions, reducer } = createSlice({
  name,
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      state.items = [...state.items, payload];
    },
    removeFromCart: (state, { payload }) => {
      state.items = state.items.filter(item => item.id !== payload);
    },
    addShippingAddress: (state, { payload }) => {
      state.shippingAddress = payload;
    },
    addPaymentMethod: (state, { payload }) => {
      state.paymentMethod = payload;
    },
    clearCart: state => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  addShippingAddress,
  addPaymentMethod,
} = actions;

// Thunks
export const placeOrder = () => async (dispatch, getState) => {
  console.log('PLACING ORDER');
  // dispatch(setProductsLoading());
  // const headers = getJsonAuthHeaders(getState());
  // const response = await sendData(API, product, headers);
  // if (!response.ok) {
  //   const message = `Add Product Error: ${response.status} - ${response.statusText}`;
  //   return dispatch(addProductFailure(message));
  // }
  // const addedProduct = await response.json();
  // return dispatch(addProductSuccess(addedProduct));
};

// Selectors
const baseSelector = state => state?.cart;

export const cartSelector = createSelector(baseSelector, state => ({
  items: state?.items,
  shippingAddress: state?.shippingAddress,
  paymentMethod: state?.paymentMethod,
}));

export const cartItemsSelector = createSelector(
  baseSelector,
  state => state?.items,
);

export const shippingAddressSelector = createSelector(
  baseSelector,
  state => state?.shippingAddress,
);

export const paymentMethodSelector = createSelector(
  baseSelector,
  state => state?.paymentMethod,
);

const persistConfig = {
  key: 'items',
  whitelist: ['items'],
  storage,
};

export default persistReducer(persistConfig, reducer);
