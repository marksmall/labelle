import { createSlice, createSelector } from '@reduxjs/toolkit';

import { getData, sendData, getJsonAuthHeaders } from 'utils/http';

const name = 'booking';
const API = `/api/${name}/`;

const initialState = {
  services: null,
  selectedService: null,
  employees: null,
  selectedEmployee: null,
  error: null,
  isLoading: false,
};

const { actions, reducer } = createSlice({
  name,
  initialState,
  reducers: {
    fetchServicesSuccess: (state, { payload }) => {
      state.services = payload;
      state.error = null;
      state.isLoading = false;
    },
    fetchServicesFailure: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    addServiceSuccess: (state, { payload }) => {
      state.services = [...state.services, payload];
      state.error = null;
      state.isLoading = false;
    },
    addServiceFailure: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    updateServiceSuccess: (state, { payload }) => {
      state.services = state.services.map(service =>
        service.id === payload.id ? payload : service,
      );
      state.error = null;
      state.isLoading = false;
    },
    updateServiceFailure: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    deleteServiceSuccess: (state, { payload }) => {
      state.services = state.services.filter(
        service => service.id !== payload.id,
      );
      state.error = null;
      state.isLoading = false;
    },
    deleteServiceFailure: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    fetchEmployeesSuccess: (state, { payload }) => {
      state.employees = payload;
      state.error = null;
      state.isLoading = false;
    },
    fetchEmployeesFailure: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    addEmployeeSuccess: (state, { payload }) => {
      state.employees = [...state.employees, payload];
      state.error = null;
      state.isLoading = false;
    },
    addEmployeeFailure: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    updateEmployeeSuccess: (state, { payload }) => {
      state.employees = state.employees.map(employee =>
        employee.id === payload.id ? payload : employee,
      );
      state.error = null;
      state.isLoading = false;
    },
    updateEmployeeFailure: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    deleteEmployeeSuccess: (state, { payload }) => {
      state.employees = state.employees.filter(
        staff => staff.id !== payload.id,
      );
      state.error = null;
      state.isLoading = false;
    },
    deleteEmployeeFailure: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    setServicesLoading: state => {
      state.isLoading = true;
    },
    selectService: (state, { payload }) => {
      if (payload !== state.selectedService) {
        state.selectedService = payload;
      }
    },
    selectEmployee: (state, { payload }) => {
      if (payload !== state.selectedEmployee) {
        state.selectedEmployee = payload;
      }
    },
  },
});

export const {
  fetchServicesSuccess,
  fetchServicesFailure,
  addServiceSuccess,
  addServiceFailure,
  updateServiceSuccess,
  updateServiceFailure,
  deleteServiceSuccess,
  deleteServiceFailure,
  fetchEmployeesSuccess,
  fetchEmployeesFailure,
  addEmployeeSuccess,
  addEmployeeFailure,
  updateEmployeeSuccess,
  updateEmployeeFailure,
  deleteEmployeeSuccess,
  deleteEmployeeFailure,
  setServicesLoading,
  selectService,
  selectEmployee,
} = actions;

// Thunks
export const fetchServices = () => async (dispatch, getState) => {
  console.log('fetchServices');
  dispatch(setServicesLoading());

  const headers = getJsonAuthHeaders(getState());

  const response = await getData(`${API}services/`, headers);

  if (!response.ok) {
    const message = `${response.status} ${response.statusText}`;

    return dispatch(fetchServicesFailure({ message }));
  }

  const services = await response.json();

  return dispatch(fetchServicesSuccess(services));
};

export const addService = service => async (dispatch, getState) => {
  dispatch(setServicesLoading());

  const headers = getJsonAuthHeaders(getState());

  const response = await sendData(`${API}services/`, service, headers);

  if (!response.ok) {
    const message = `Add Service Error: ${response.status} - ${response.statusText}`;

    return dispatch(addServiceFailure(message));
  }

  const addedService = await response.json();

  return dispatch(addServiceSuccess(addedService));
};

export const updateService = service => async (dispatch, getState) => {
  dispatch(setServicesLoading());

  const headers = getJsonAuthHeaders(getState());

  const response = await sendData(`${API}services/`, service, headers, 'PUT');

  if (!response.ok) {
    const message = `Update Service Error: ${response.status} - ${response.statusText}`;

    return dispatch(updateServiceFailure(message));
  }

  const updatedService = await response.json();

  return dispatch(updateServiceSuccess(updatedService));
};

export const deleteService = id => async (dispatch, getState) => {
  dispatch(setServicesLoading());

  const headers = getJsonAuthHeaders(getState());

  const response = await sendData(`${API}services/`, id, headers, 'DELETE');

  if (!response.ok) {
    const message = `Delete Service Error: ${response.status} - ${response.statusText}`;

    return dispatch(deleteServiceFailure(message));
  }

  const deletedService = await response.json();

  return dispatch(deleteServiceSuccess(deletedService));
};

export const fetchEmployees = () => async (dispatch, getState) => {
  dispatch(setServicesLoading());

  const headers = getJsonAuthHeaders(getState());

  const response = await getData(`${API}employees/`, headers);

  if (!response.ok) {
    const message = `${response.status} ${response.statusText}`;

    return dispatch(fetchEmployeesFailure({ message }));
  }

  const staff = await response.json();

  return dispatch(fetchEmployeesSuccess(staff));
};

export const addEmployee = employee => async (dispatch, getState) => {
  dispatch(setServicesLoading());

  const headers = getJsonAuthHeaders(getState());

  const response = await sendData(`${API}employees/`, employee, headers);

  if (!response.ok) {
    const message = `Add Employee Error: ${response.status} - ${response.statusText}`;

    return dispatch(addEmployeeFailure(message));
  }

  const addedEmployee = await response.json();

  return dispatch(addEmployeeSuccess(addedEmployee));
};

export const updateEmployee = employee => async (dispatch, getState) => {
  dispatch(setServicesLoading());

  const headers = getJsonAuthHeaders(getState());

  const response = await sendData(`${API}employees/`, employee, headers, 'PUT');

  if (!response.ok) {
    const message = `Update Employee Error: ${response.status} - ${response.statusText}`;

    return dispatch(updateEmployeeFailure(message));
  }

  const updatedEmployee = await response.json();

  return dispatch(updateEmployeeSuccess(updatedEmployee));
};

export const deleteEmployee = id => async (dispatch, getState) => {
  dispatch(setServicesLoading());

  const headers = getJsonAuthHeaders(getState());

  const response = await sendData(`${API}employees/`, id, headers, 'DELETE');

  if (!response.ok) {
    const message = `Delete Employee Error: ${response.status} - ${response.statusText}`;

    return dispatch(deleteEmployeeFailure(message));
  }

  const deletedEmployee = await response.json();

  return dispatch(deleteEmployeeSuccess(deletedEmployee));
};

// Selectors
const baseSelector = state => state?.bookings;

export const servicesSelector = createSelector(
  baseSelector,
  state => state?.services,
);

export const selectedServiceSelector = createSelector(
  baseSelector,
  state => state?.selectedService,
);

export const employeesSelector = createSelector(
  baseSelector,
  state => state?.employees,
);

export const isLoadingSelector = createSelector(
  baseSelector,
  state => state?.isLoading,
);

export const serverErrorsSelector = createSelector(
  baseSelector,
  state => state?.error,
);

export default reducer;
