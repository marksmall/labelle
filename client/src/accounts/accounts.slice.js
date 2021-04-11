import { createSlice, createSelector } from '@reduxjs/toolkit';

import { push } from 'connected-react-router';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import { getData, sendData, getJsonAuthHeaders } from 'utils/http';

import { RESEND_EMAIL_VERIFICATION_URL } from './accounts.constants';

const name = 'products';
const API_PREFIX = '/api/authentication/';
const API = {
  registerUser: API_PREFIX + 'registration/',
  activate: API_PREFIX + 'registration/verify-email/',
  resendVerificationEmail: API_PREFIX + 'send-email-verification/',
  login: API_PREFIX + 'login/',
  changePassword: API_PREFIX + 'password/change/',
  resetPassword: API_PREFIX + 'password/reset/',
  verifyResetPassword: API_PREFIX + 'password/verify-reset/',
  logout: API_PREFIX + 'logout/',
  user: '/api/users/',
};

export const status = {
  NONE: 'None',
  PENDING: 'Pending',
  COMPLETE: 'Complete',
};

// Shape error data into a single array of only error strings.
const errorTransformer = errorObject => {
  if (errorObject.detail || !errorObject.errors) {
    return;
  } else {
    const errors = errorObject.errors;

    let errorMessages = [];
    for (const key of Object.keys(errors)) {
      for (const index in errors[key]) {
        const array = errors[key];
        errorMessages = [...errorMessages, array[index]];
      }
    }
    return errorMessages;
  }
};

const initialState = {
  userKey: null,
  user: null,
  error: null,
  isLoading: false,
  resetStatus: status.NONE,
  changeStatus: status.NONE,
};

const { actions, reducer } = createSlice({
  name,
  initialState,
  reducers: {
    registerUserSuccess: (state, { payload }) => {
      state.user = payload;
      state.error = null;
      state.isLoading = false;
    },
    registerUserFailure: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    loginUserSuccess: (state, { payload }) => {
      state.userKey = payload.userKey;
      state.user = payload.user;
      state.error = null;
      state.isLoading = false;
    },
    loginUserFailure: (state, { payload }) => {
      // state.user = payload.user;
      state.userKey = null;
      state.error = payload.errors;
      state.isLoading = false;
    },
    resendVerificationEmailSuccess: state => {
      state.error = null;
      state.isLoading = false;
    },
    resendVerificationEmailFailure: (state, payload) => {
      state.error = payload;
      state.isLoading = false;
    },
    fetchUserSuccess: (state, { payload }) => {
      state.user = payload;
      state.error = null;
      state.isLoading = false;
    },
    fetchUserFailure: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    updateUserSuccess: (state, { payload }) => {
      state.user = payload;
      state.error = null;
      state.isLoading = false;
    },
    updateUserFailure: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    logoutUserSuccess: state => {
      state.userKey = null;
      state.user = null;
      state.error = null;
      state.isLoading = false;
    },
    logoutUserFailure: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    activateAccountSuccess: (state, { payload }) => {
      state.user = payload.user;
      state.userKey = null;
      state.error = null;
      state.isLoading = false;
    },
    activateAccountFailure: (state, { payload }) => {
      state.error = payload;
      state.userKey = null;
      state.isLoading = false;
    },
    changePasswordSuccess: state => {
      state.changeStatus = status.PENDING;
      state.error = null;
    },
    changePasswordFailure: (state, { payload }) => {
      state.error = payload;
    },
    resetPasswordSuccess: state => {
      state.resetStatus = status.PENDING;
      state.error = null;
    },
    resetPasswordFailure: (state, { payload }) => {
      state.error = payload;
    },
    passwordResetRequestedSuccess: (state, { payload }) => {
      state.resetStatus = status.COMPLETE;
      state.user = payload;
      state.error = null;
    },
    passwordResetRequestedFailure: (state, { payload }) => {
      state.error = payload;
    },
    setAccountsLoading: state => {
      console.log('ACCOUNTS STATE: ', { ...state });
      state.isLoading = true;
    },
  },
});

export const {
  registerUserSuccess,
  registerUserFailure,
  loginUserSuccess,
  loginUserFailure,
  resendVerificationEmailSuccess,
  resendVerificationEmailFailure,
  fetchUserSuccess,
  fetchUserFailure,
  updateUserSuccess,
  updateUserFailure,
  logoutUserSuccess,
  logoutUserFailure,
  activateAccountSuccess,
  activateAccountFailure,
  changePasswordSuccess,
  changePasswordFailure,
  resetPasswordSuccess,
  resetPasswordFailure,
  passwordResetRequestedSuccess,
  passwordResetRequestedFailure,
  fetchRequested,
  setAccountsLoading,
} = actions;

// Thunks
export const registerUser = form => async (dispatch, getState) => {
  dispatch(setAccountsLoading());

  const headers = getJsonAuthHeaders(getState());

  const response = await sendData(API.registerUser, form, headers);

  if (!response.ok) {
    const errorObject = await response.json();

    return dispatch(registerUserFailure(errorTransformer(errorObject)));
  }

  const user = await response.json();

  dispatch(registerUserSuccess(user));

  return dispatch(push(RESEND_EMAIL_VERIFICATION_URL));
};

export const resendVerificationEmail = email => async (dispatch, getState) => {
  dispatch(setAccountsLoading());

  const headers = getJsonAuthHeaders(getState());

  const response = await sendData(
    API.resendVerificationEmail,
    { email },
    headers,
  );

  if (!response.ok) {
    const errorObject = await response.json();

    return dispatch(resendVerificationEmailFailure(errorObject));
  }

  return dispatch(resendVerificationEmailSuccess());
};

export const activateAccount = form => async (dispatch, getState) => {
  dispatch(setAccountsLoading());

  const headers = getJsonAuthHeaders(getState());

  const response = await sendData(API.activate, form, headers);

  if (!response.ok) {
    const errorObject = await response.json();

    return dispatch(activateAccountFailure(errorTransformer(errorObject)));
  }

  const { user } = await response.json();

  return dispatch(activateAccountSuccess({ user }));
};

export const fetchUser = (email = 'current') => async (dispatch, getState) => {
  dispatch(setAccountsLoading());

  const headers = getJsonAuthHeaders(getState());

  const response = await getData(`API.user}${email}/`, headers);

  if (!response.ok) {
    const errorObject = await response.json();

    return dispatch(fetchUserFailure(errorTransformer(errorObject)));
  }

  const user = await response.json();

  return dispatch(fetchUserSuccess(user));
};

export const login = form => async (dispatch, getState) => {
  dispatch(setAccountsLoading());

  const headers = getJsonAuthHeaders(getState());

  const response = await sendData(API.login, form, headers);

  if (!response.ok) {
    const responseObject = await response.json();

    if (responseObject.user?.is_verified === false)
      dispatch(push(RESEND_EMAIL_VERIFICATION_URL));
    return dispatch(
      loginUserFailure({
        ...responseObject,
        errors: errorTransformer(responseObject),
      }),
    );
  }
  const userKey = (await response.json()).key;
  console.log('USER KEY: ', userKey);

  const fetchUserResponse = await getData(`${API.user}current/`, headers);

  if (!fetchUserResponse.ok) {
    const responseObject = await fetchUserResponse.json();

    return dispatch(
      loginUserFailure({
        errors: errorTransformer(responseObject),
      }),
    );
  }

  const user = await fetchUserResponse.json();

  dispatch(loginUserSuccess({ userKey, user }));

  return dispatch(push('/'));
};

export const logout = () => async (dispatch, getState) => {
  dispatch(setAccountsLoading());

  const headers = getJsonAuthHeaders(getState());

  const response = await sendData(API.logout, {}, headers);

  if (!response.ok) {
    const errorObject = await response.json();

    return dispatch(logoutUserFailure(errorTransformer(errorObject)));
  }

  return dispatch(logoutUserSuccess());
};

export const changePassword = form => async (dispatch, getState) => {
  const headers = getJsonAuthHeaders(getState());

  const response = await sendData(API.changePassword, form, headers);

  if (!response.ok) {
    const errorObject = await response.json();

    return dispatch(changePasswordFailure(errorTransformer(errorObject)));
  }

  return dispatch(changePasswordSuccess());
};

export const confirmPasswordReset = (form, { uid, token }) => async (
  dispatch,
  getState,
) => {
  const headers = getJsonAuthHeaders(getState());

  const response = await sendData(
    API.verifyResetPassword,
    { ...form, uid, token },
    headers,
  );

  if (!response.ok) {
    const errorObject = await response.json();

    return dispatch(
      passwordResetRequestedFailure(errorTransformer(errorObject)),
    );
  }

  const { user } = await response.json();

  return dispatch(passwordResetRequestedSuccess(user));
};

export const resetPassword = form => async (dispatch, getState) => {
  const headers = getJsonAuthHeaders(getState());

  const response = await sendData(API.resetPassword, form, headers);

  if (!response.ok) {
    const errorObject = await response.json();

    return dispatch(resetPasswordFailure(errorTransformer(errorObject)));
  }

  return dispatch(resetPasswordSuccess());
};

export const updateUser = form => async (dispatch, getState) => {
  dispatch(setAccountsLoading());

  const headers = getJsonAuthHeaders(getState());

  const {
    accounts: { user },
  } = getState();

  const response = await sendData(
    `${API.user}${user.id}/`,
    { ...user, ...form },
    headers,
    'PUT',
  );

  if (!response.ok) {
    const error = await response.json();
    const errorObject = errorTransformer(error);

    return dispatch(updateUserFailure(errorObject));
  }

  const userObj = await response.json();

  return dispatch(updateUserSuccess(userObj));
};

// Selectors
const baseSelector = state => state?.accounts;

export const isLoadingSelector = createSelector(
  baseSelector,
  state => state?.isLoading,
);

export const serverErrorsSelector = createSelector(
  baseSelector,
  accounts => accounts?.error,
);

export const userSelector = createSelector(
  baseSelector,
  accounts => accounts?.user,
);

export const userKeySelector = createSelector(
  baseSelector,
  accounts => accounts?.userKey,
);

export const isLoggedInSelector = createSelector(
  [userSelector, userKeySelector],
  (user, userKey) => !!user && !!userKey,
);

const persistConfig = {
  key: 'accounts',
  whitelist: ['userKey'],
  storage,
};

export default persistReducer(persistConfig, reducer);
