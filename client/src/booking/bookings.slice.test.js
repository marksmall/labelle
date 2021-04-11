import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import reducer, {
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
  fetchServices,
  fetchEmployees,
  selectEmployee,
  servicesSelector,
  selectedServiceSelector,
  employeesSelector,
  isLoadingSelector,
  serverErrorsSelector,
} from './bookings.slice';

const mockStore = configureMockStore([thunk]);

describe('Bookings slice', () => {
  describe('Bookings Actions', () => {
    let store = null;

    beforeEach(() => {
      fetch.resetMocks();

      store = mockStore({
        accounts: { userKey: 'Test-User-Key' },
      });
    });

    it('should dispatch fetch services failure action', async () => {
      fetch.mockResponse(
        JSON.stringify({
          message: 'Test error message',
        }),
        {
          ok: false,
          status: 401,
          statusText: 'Test Error',
        },
      );

      const expectedActions = [
        {
          type: setServicesLoading.type,
        },
        {
          type: fetchServicesFailure.type,
          payload: { message: '401 Test Error' },
        },
      ];

      await store.dispatch(fetchServices());

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch fetch services success action', async () => {
      const services = [
        {
          id: 1,
        },
        {
          id: 2,
        },
        {
          id: 3,
        },
        {
          id: 4,
        },
      ];
      fetch.mockResponse(JSON.stringify(services));

      const expectedActions = [
        {
          type: setServicesLoading.type,
        },
        { type: fetchServicesSuccess.type, payload: services },
      ];

      await store.dispatch(fetchServices());

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch fetch Employees failure action', async () => {
      fetch.mockResponse(
        JSON.stringify({
          message: 'Test error message',
        }),
        {
          ok: false,
          status: 401,
          statusText: 'Test Error',
        },
      );

      const expectedActions = [
        {
          type: setServicesLoading.type,
        },
        {
          type: fetchEmployeesFailure.type,
          payload: { message: '401 Test Error' },
        },
      ];

      await store.dispatch(fetchEmployees());

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch fetch Employees success action', async () => {
      const employees = [
        {
          id: 1,
        },
        {
          id: 2,
        },
        {
          id: 3,
        },
        {
          id: 4,
        },
      ];
      fetch.mockResponse(JSON.stringify(employees));

      const expectedActions = [
        {
          type: setServicesLoading.type,
        },
        { type: fetchEmployeesSuccess.type, payload: employees },
      ];

      await store.dispatch(fetchEmployees());

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should set loading in state, when thunk enacted', async () => {
      await store.dispatch(setServicesLoading());

      const expectedActions = [
        {
          type: setServicesLoading.type,
        },
      ];

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch select service action.', async () => {
      const service = {
        id: 5,
      };

      const expectedActions = [{ type: selectService.type, payload: service }];

      await store.dispatch(selectService(service));

      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('Bookings Reducer', () => {
    let beforeState;

    beforeEach(() => {
      beforeState = {
        services: null,
        selectedService: null,
        employees: null,
        selectedEmployee: null,
        error: null,
        isLoading: false,
      };
    });

    it('should return the initial state', () => {
      const actualState = reducer(undefined, {});

      expect(actualState).toEqual(beforeState);
    });

    describe('Services', () => {
      it('should update the services in state, when successfully retrieved', () => {
        const services = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

        const actualState = reducer(beforeState, {
          type: fetchServicesSuccess.type,
          payload: services,
        });

        expect(actualState.services).toEqual(services);
      });

      it('should update the error state, when failed to retrieve services', () => {
        const error = { message: 'Test Services Error' };

        const actualState = reducer(beforeState, {
          type: fetchServicesFailure.type,
          payload: error,
        });

        expect(actualState.error).toEqual(error);
      });

      it('should update the services in state, when successfully added new service', () => {
        const service = { id: 5 };
        beforeState.services = [];

        const actualState = reducer(beforeState, {
          type: addServiceSuccess.type,
          payload: service,
        });

        expect(actualState.services).toEqual([service]);
      });

      it('should update the error state, when failed to add a new service', () => {
        const error = { message: 'Test Services Error' };

        const actualState = reducer(beforeState, {
          type: addServiceFailure.type,
          payload: error,
        });

        expect(actualState.error).toEqual(error);
      });

      it('should update the services in state, when successfully updated a service', () => {
        const service = { id: 1, name: 'Test' };
        beforeState.services = [{ id: 1 }, { id: 2 }];

        const actualState = reducer(beforeState, {
          type: updateServiceSuccess.type,
          payload: service,
        });

        expect(actualState.services).toEqual(
          beforeState.services.map(prod =>
            prod.id === service.id ? service : prod,
          ),
        );
      });

      it('should update the error state, when failed to update a service', () => {
        const error = { message: 'Test Services Error' };

        const actualState = reducer(beforeState, {
          type: updateServiceFailure.type,
          payload: error,
        });

        expect(actualState.error).toEqual(error);
      });

      it('should update the services in state, when successfully deleted a service', () => {
        const service = { id: 1 };
        beforeState.services = [{ id: 1 }, { id: 2 }];

        const actualState = reducer(beforeState, {
          type: deleteServiceSuccess.type,
          payload: service,
        });

        expect(actualState.services).toEqual(
          beforeState.services.filter(bm => bm.id !== service.id),
        );
      });

      it('should update the error state, when failed to delete a service', () => {
        const error = { message: 'Test Services Error' };

        const actualState = reducer(beforeState, {
          type: deleteServiceFailure.type,
          payload: error,
        });

        expect(actualState.error).toEqual(error);
      });

      it('should update the selected service in state, when one selected', () => {
        const service = { id: 1 };
        beforeState.services = [{ id: 1 }, { id: 2 }];

        const actualState = reducer(beforeState, {
          type: selectService.type,
          payload: service,
        });

        expect(actualState.selectedService).toEqual(service);
      });
    });

    describe('Employees', () => {
      it('should update the employees in state, when successfully retrieved', () => {
        const employees = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

        const actualState = reducer(beforeState, {
          type: fetchEmployeesSuccess.type,
          payload: employees,
        });

        expect(actualState.employees).toEqual(employees);
      });

      it('should update the error state, when failed to retrieve employees', () => {
        const error = { message: 'Test employees Error' };

        const actualState = reducer(beforeState, {
          type: fetchEmployeesFailure.type,
          payload: error,
        });

        expect(actualState.error).toEqual(error);
      });

      it('should update the employees in state, when successfully added new employee', () => {
        const employee = { id: 5 };
        beforeState.employees = [];

        const actualState = reducer(beforeState, {
          type: addEmployeeSuccess.type,
          payload: employee,
        });

        expect(actualState.employees).toEqual([employee]);
      });

      it('should update the error state, when failed to add a new employee', () => {
        const error = { message: 'Test Employees Error' };

        const actualState = reducer(beforeState, {
          type: addEmployeeFailure.type,
          payload: error,
        });

        expect(actualState.error).toEqual(error);
      });

      it('should update the employees in state, when successfully updated a employee', () => {
        const employee = { id: 1, name: 'Test' };
        beforeState.employees = [{ id: 1 }, { id: 2 }];

        const actualState = reducer(beforeState, {
          type: updateEmployeeSuccess.type,
          payload: employee,
        });

        expect(actualState.employees).toEqual(
          beforeState.employees.map(prod =>
            prod.id === employee.id ? employee : prod,
          ),
        );
      });

      it('should update the error state, when failed to update a employee', () => {
        const error = { message: 'Test Employees Error' };

        const actualState = reducer(beforeState, {
          type: updateEmployeeFailure.type,
          payload: error,
        });

        expect(actualState.error).toEqual(error);
      });

      it('should update the employees in state, when successfully deleted a employee', () => {
        const employee = { id: 1 };
        beforeState.employees = [{ id: 1 }, { id: 2 }];

        const actualState = reducer(beforeState, {
          type: deleteEmployeeSuccess.type,
          payload: employee,
        });

        expect(actualState.employees).toEqual(
          beforeState.employees.filter(bm => bm.id !== employee.id),
        );
      });

      it('should update the error state, when failed to delete a employee', () => {
        const error = { message: 'Test Employees Error' };

        const actualState = reducer(beforeState, {
          type: deleteEmployeeFailure.type,
          payload: error,
        });

        expect(actualState.error).toEqual(error);
      });

      it('should update the selected employee in state, when one selected', () => {
        const employee = { id: 1 };
        beforeState.employees = [{ id: 1 }, { id: 2 }];

        const actualState = reducer(beforeState, {
          type: selectEmployee.type,
          payload: employee,
        });

        expect(actualState.selectedEmployee).toEqual(employee);
      });
    });
  });

  describe('Bookings Selectors', () => {
    describe('servicesSelector', () => {
      it('should return undefined', () => {
        const state = { bookings: {} };
        const result = servicesSelector(state);

        expect(result).not.toBeDefined();
        expect(result).toBeUndefined();
      });

      it('should return null', () => {
        const state = { bookings: { services: null } };
        const result = servicesSelector(state);

        expect(result).toBeNull();
      });

      it('should return empty array', () => {
        const state = { bookings: { services: [] } };
        const result = servicesSelector(state);

        expect(result).toStrictEqual([]);
      });

      it('should return populated array', () => {
        const services = [{ id: 1 }, { id: 2 }];
        const state = { bookings: { services } };
        const result = servicesSelector(state);

        expect(result).toStrictEqual(services);
      });
    });

    describe('selectedServiceSelector', () => {
      it('should return undefined', () => {
        const state = { bookings: {} };
        const result = selectedServiceSelector(state);

        expect(result).not.toBeDefined();
        expect(result).toBeUndefined();
      });

      it('should return null', () => {
        const state = { bookings: { selectedService: null } };
        const result = selectedServiceSelector(state);

        expect(result).toBeNull();
      });

      it('should return populated object', () => {
        const selectedService = { id: 1 };
        const state = { bookings: { selectedService } };
        const result = selectedServiceSelector(state);

        expect(result).toStrictEqual(selectedService);
      });
    });

    describe('employeesSelector', () => {
      it('should return undefined', () => {
        const state = { bookings: {} };
        const result = employeesSelector(state);

        expect(result).not.toBeDefined();
        expect(result).toBeUndefined();
      });

      it('should return null', () => {
        const state = { bookings: { employees: null } };
        const result = employeesSelector(state);

        expect(result).toBeNull();
      });

      it('should return empty array', () => {
        const state = { bookings: { employees: [] } };
        const result = employeesSelector(state);

        expect(result).toStrictEqual([]);
      });

      it('should return populated array', () => {
        const employees = [{ id: 1 }, { id: 2 }];
        const state = { bookings: { employees } };
        const result = employeesSelector(state);

        expect(result).toStrictEqual(employees);
      });
    });

    describe('isLoadingSelector', () => {
      it('should return undefined', () => {
        const state = { bookings: {} };
        const result = isLoadingSelector(state);

        expect(result).not.toBeDefined();
        expect(result).toBeUndefined();
      });

      it('should return null', () => {
        const state = { bookings: { isLoading: null } };
        const result = isLoadingSelector(state);

        expect(result).toBeNull();
      });

      it('should return false', () => {
        const state = { bookings: { isLoading: false } };
        const result = isLoadingSelector(state);

        expect(result).not.toBeTruthy();
        expect(result).toBeFalsy();
      });

      it('should return true', () => {
        const state = { bookings: { isLoading: true } };
        const result = isLoadingSelector(state);

        expect(result).toBeTruthy();
        expect(result).not.toBeFalsy();
      });
    });

    describe('serverErrorsSelector', () => {
      it('should return undefined', () => {
        const state = { bookings: {} };
        const result = serverErrorsSelector(state);

        expect(result).not.toBeDefined();
        expect(result).toBeUndefined();
      });

      it('should return null', () => {
        const state = { bookings: { error: null } };
        const result = serverErrorsSelector(state);

        expect(result).toBeNull();
      });
    });
  });
});
