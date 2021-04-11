import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import reducer, {
  fetchAppConfig,
  appConfigSuccess,
  appConfigFailure,
  appConfigSelector,
  passwordConfigSelector,
} from './app.slice';

const mockStore = configureMockStore([thunk]);

describe('App Slice', () => {
  describe('App Actions', () => {
    beforeEach(() => {
      fetch.resetMocks();
    });

    it('should dispatch fetch app config failure action.', async () => {
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
        { type: appConfigFailure.type, payload: { message: '401 Test Error' } },
      ];

      const store = mockStore({});

      await store.dispatch(fetchAppConfig());

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch fetch app config success action.', async () => {
      const config = {
        isRegistrationOpen: true,
        trackingId: 'Test-Tracking-ID',
      };

      fetch.mockResponse(JSON.stringify(config));

      const expectedActions = [
        { type: appConfigSuccess.type, payload: config },
      ];

      const store = mockStore({});

      await store.dispatch(fetchAppConfig());

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('fetches secrets if the call is authenticated', async () => {
      const config = {
        isRegistrationOpen: true,
        trackingId: 'Test-Tracking-ID',
        secretThing: 'xxxxxxx',
      };
      fetch.once(JSON.stringify(config));
      const expectedActions = [appConfigSuccess(config)];

      const store = mockStore({ accounts: { userKey: '123' } });

      await store.dispatch(fetchAppConfig(true));

      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('App Reducer', () => {
    let beforeState;

    beforeEach(() => {
      beforeState = {
        config: {},
        error: null,
      };
    });

    it('should return the initial state', () => {
      const actualState = reducer(undefined, {});

      expect(actualState).toEqual(beforeState);
    });

    it('should update the app config in state, when successfully retrieved app config', () => {
      const config = { message: 'Test App Config' };

      const actualState = reducer(beforeState, {
        type: appConfigSuccess.type,
        payload: config,
      });

      expect(actualState.config).toEqual(config);
    });

    it('should update the error state, when failed to retrieve app config', () => {
      const error = { message: 'Test App Config Error' };

      const actualState = reducer(beforeState, {
        type: appConfigFailure.type,
        payload: error,
      });

      expect(actualState.error).toEqual(error);
    });
  });

  describe('selectors', () => {
    describe('appConfigSelector', () => {
      it('returns an empty object if state is undefined', () => {
        const result = appConfigSelector();
        expect(result).toEqual({});
      });
      it('returns an empty object if app is undefined', () => {
        const result = appConfigSelector({});
        expect(result).toEqual({});
      });
      it('returns an empty object if config is undefined', () => {
        const result = appConfigSelector({ app: {} });
        expect(result).toEqual({});
      });
      it('returns config', () => {
        const state = {
          app: { config: { test: 'hello' } },
        };
        const result = appConfigSelector(state);
        expect(result).toEqual(state.app.config);
      });
    });

    describe('passwordConfigSelector', () => {
      it('returns an empty object if state is undefined', () => {
        const result = passwordConfigSelector();
        expect(result).toEqual({});
      });
      it('returns an empty object if app is undefined', () => {
        const result = passwordConfigSelector({});
        expect(result).toEqual({});
      });
      it('returns an empty object if config is undefined', () => {
        const result = passwordConfigSelector({ app: {} });
        expect(result).toEqual({});
      });

      it('includes the min/max and strength config', () => {
        const state = {
          app: {
            config: {
              passwordMaxLength: 5,
              passwordMinLength: 10,
              passwordMinStrength: 3,
            },
          },
        };

        const expected = {
          passwordMaxLength: state.app.config.passwordMaxLength,
          passwordMinLength: state.app.config.passwordMinLength,
          passwordMinStrength: state.app.config.passwordMinStrength,
        };

        const result = passwordConfigSelector(state);
        expect(result).toEqual(expected);
      });
    });
  });
});
