import { createSlice, createSelector } from '@reduxjs/toolkit';

import { getData, sendData, getJsonAuthHeaders } from 'utils/http';

const name = 'orders';
const API = `/api/${name}/`;

const initialState = {
  orders: null,
  selectedOrder: null,
  error: null,
  isLoading: false,
};

const { actions, reducer } = createSlice({
  name,
  initialState,
  reducers: {
    fetchOrdersSuccess: (state, { payload }) => {
      state.orders = payload;
      state.error = null;
      state.isLoading = false;
    },
    fetchOrdersFailure: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    addOrderSuccess: (state, { payload }) => {
      state.orders = [...state.orders, payload];
      state.error = null;
      state.isLoading = false;
    },
    addOrderFailure: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    updateOrderSuccess: (state, { payload }) => {
      state.orders = state.orders.map(order =>
        order.id === payload.id ? payload : order,
      );
      state.error = null;
      state.isLoading = false;
    },
    updateOrderFailure: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    deleteOrderSuccess: (state, { payload }) => {
      state.orders = state.orders.filter(order => order.id !== payload.id);
      state.error = null;
      state.isLoading = false;
    },
    deleteOrderFailure: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    setLoading: state => {
      state.isLoading = true;
    },
    selectOrder: (state, { payload }) => {
      if (payload !== state.selectedBookmark) {
        state.selectedOrder = payload;
      }
    },
  },
});

export const {
  fetchOrdersSuccess,
  fetchOrdersFailure,
  addOrderSuccess,
  addOrderFailure,
  updateOrderSuccess,
  updateOrderFailure,
  deleteOrderSuccess,
  deleteOrderFailure,
  setLoading,
  selectOrder,
} = actions;

/// Thunks
export const fetchOrders = () => async (dispatch, getState) => {
  dispatch(setLoading());

  const headers = getJsonAuthHeaders(getState());

  const response = await getData(API, headers);

  if (!response.ok) {
    const message = `${response.status} ${response.statusText}`;

    return dispatch(fetchOrdersFailure({ message }));
  }

  const orders = await response.json();

  return dispatch(fetchOrdersSuccess(orders));
};

export const addOrder = order => async (dispatch, getState) => {
  dispatch(setLoading());

  const headers = getJsonAuthHeaders(getState());

  const response = await sendData(API, order, headers);

  if (!response.ok) {
    const message = `Add Order Error: ${response.status} - ${response.statusText}`;

    return dispatch(addOrderFailure(message));
  }

  const addedOrder = await response.json();

  return dispatch(addOrderSuccess(addedOrder));
};

export const updateOrder = order => async (dispatch, getState) => {
  dispatch(setLoading());

  const headers = getJsonAuthHeaders(getState());

  const response = await sendData(API, order, headers, 'PUT');

  if (!response.ok) {
    const message = `Update Order Error: ${response.status} - ${response.statusText}`;

    return dispatch(updateOrderFailure(message));
  }

  const updatedOrder = await response.json();

  return dispatch(updateOrderSuccess(updatedOrder));
};

export const deleteOrder = id => async (dispatch, getState) => {
  dispatch(setLoading());

  const headers = getJsonAuthHeaders(getState());

  const response = await sendData(API, id, headers, 'DELETE');

  if (!response.ok) {
    const message = `Delete Order Error: ${response.status} - ${response.statusText}`;

    return dispatch(deleteOrderFailure(message));
  }

  const deletedOrder = await response.json();

  return dispatch(deleteOrderSuccess(deletedOrder));
};

// Selectors
const baseSelector = state => state?.shop;

export const isLoadingSelector = createSelector(
  baseSelector,
  state => state?.isLoading,
);

export const ordersSelector = createSelector(
  baseSelector,
  state => state?.orders,
);

export default reducer;
