import { createSlice, createSelector } from '@reduxjs/toolkit';
import { getJsonAuthHeaders, getData } from 'utils/http';

const initialState = {
  config: {},
  error: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    appConfigSuccess: (state, { payload }) => {
      state.config = payload;
      state.error = null;
    },
    appConfigFailure: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { appConfigSuccess, appConfigFailure } = appSlice.actions;

export const fetchAppConfig = authenticated => async (dispatch, getState) => {
  const response = await getData(
    '/api/app/config',
    authenticated && getJsonAuthHeaders(getState()),
  );
  if (!response.ok) {
    const message = `${response.status} ${response.statusText}`;
    return dispatch(appConfigFailure({ message }));
  }
  const config = await response.json();

  return dispatch(appConfigSuccess(config));
};

const baseSelector = state => state?.app || {};

export const appConfigSelector = createSelector(
  baseSelector,
  app => app.config || {},
);

export const passwordConfigSelector = createSelector(
  appConfigSelector,
  config => ({
    passwordMaxLength: config.passwordMaxLength,
    passwordMinLength: config.passwordMinLength,
    passwordMinStrength: config.passwordMinStrength,
  }),
);

export default appSlice.reducer;
