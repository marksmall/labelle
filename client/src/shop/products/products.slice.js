import { createSlice, createSelector } from '@reduxjs/toolkit';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import { getData, sendData, getJsonAuthHeaders } from 'utils/http';

const name = 'products';
const API = `/api/${name}/`;

const initialState = {
  products: null,
  selectedProduct: null,
  error: null,
  isLoading: false,
};

const { actions, reducer } = createSlice({
  name,
  initialState,
  reducers: {
    fetchProductsSuccess: (state, { payload }) => {
      state.products = payload;
      state.error = null;
      state.isLoading = false;
    },
    fetchProductsFailure: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    addProductSuccess: (state, { payload }) => {
      state.products = [...state.products, payload];
      state.error = null;
      state.isLoading = false;
    },
    addProductFailure: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    updateProductSuccess: (state, { payload }) => {
      state.products = state.products.map(product =>
        product.id === payload.id ? payload : product,
      );
      state.error = null;
      state.isLoading = false;
    },
    updateProductFailure: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    deleteProductSuccess: (state, { payload }) => {
      state.products = state.products.filter(
        product => product.id !== payload.id,
      );
      state.error = null;
      state.isLoading = false;
    },
    deleteProductFailure: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    createProductReviewSuccess: state => {
      state.error = null;
      state.isLoading = false;
    },
    createProductReviewFailure: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    setProductsLoading: state => {
      state.isLoading = true;
    },
    selectProduct: (state, { payload }) => {
      if (payload !== state.selectedBookmark) {
        state.selectedProduct = payload;
      }
    },
  },
});

export const {
  fetchProductsSuccess,
  fetchProductsFailure,
  addProductSuccess,
  addProductFailure,
  updateProductSuccess,
  updateProductFailure,
  deleteProductSuccess,
  deleteProductFailure,
  createProductReviewSuccess,
  createProductReviewFailure,
  setProductsLoading,
  selectProduct,
} = actions;

/// Thunks
export const fetchProducts = () => async (dispatch, getState) => {
  dispatch(setProductsLoading());

  const headers = getJsonAuthHeaders(getState());

  const response = await getData(API, headers);

  if (!response.ok) {
    const message = `${response.status} ${response.statusText}`;

    return dispatch(fetchProductsFailure({ message }));
  }

  const products = await response.json();

  return dispatch(fetchProductsSuccess(products));
};

export const addProduct = product => async (dispatch, getState) => {
  dispatch(setProductsLoading());

  const headers = getJsonAuthHeaders(getState());

  const response = await sendData(API, product, headers);

  if (!response.ok) {
    const message = `Add Product Error: ${response.status} - ${response.statusText}`;

    return dispatch(addProductFailure(message));
  }

  const addedProduct = await response.json();

  return dispatch(addProductSuccess(addedProduct));
};

export const updateProduct = product => async (dispatch, getState) => {
  dispatch(setProductsLoading());

  const headers = getJsonAuthHeaders(getState());

  const response = await sendData(API, product, headers, 'PUT');

  if (!response.ok) {
    const message = `Update Product Error: ${response.status} - ${response.statusText}`;

    return dispatch(updateProductFailure(message));
  }

  const updatedProduct = await response.json();

  return dispatch(updateProductSuccess(updatedProduct));
};

export const deleteProduct = id => async (dispatch, getState) => {
  dispatch(setProductsLoading());

  const headers = getJsonAuthHeaders(getState());

  const response = await sendData(API, id, headers, 'DELETE');

  if (!response.ok) {
    const message = `Delete Product Error: ${response.status} - ${response.statusText}`;

    return dispatch(deleteProductFailure(message));
  }

  const deletedProduct = await response.json();

  return dispatch(deleteProductSuccess(deletedProduct));
};

export const createProductReview = (productId, review) => async (
  dispatch,
  getState,
) => {
  dispatch(setProductsLoading());

  const headers = getJsonAuthHeaders(getState());

  const response = await sendData(
    `${API}${productId}/review/`,
    review,
    headers,
  );

  if (!response.ok) {
    const message = `Product Review Error: ${response.status} - ${response.statusText}`;

    return dispatch(createProductReviewFailure(message));
  }

  await response.json();

  return dispatch(createProductReviewSuccess());
};

// Selectors
const baseSelector = state => state?.products;

export const isLoadingSelector = createSelector(
  baseSelector,
  state => state?.isLoading,
);

export const serverErrorsSelector = createSelector(
  baseSelector,
  state => state?.error,
);

export const productsSelector = createSelector(
  baseSelector,
  state => state?.products,
);

export const selectedProductSelector = createSelector(
  baseSelector,
  state => state?.selectedProduct,
);

// export const getSelectedProductSelector = id =>
//   createSelector(productsSelector, state => state.products[id - 1]);

export const getSelectedProductSelector = id =>
  createSelector(baseSelector, state => {
    // console.log('PASSED PARAM: ', id);
    // console.log(
    //   'STATE: ',
    //   state,
    //   state?.products[id - 1],
    //   // state.products.find(product => product.id === id),
    // );
    // return state?.products?.find(product => product.id === id);
    return state?.products[id - 1];
  });

const persistConfig = {
  key: 'products',
  whitelist: ['products'],
  storage,
};

export default persistReducer(persistConfig, reducer);
