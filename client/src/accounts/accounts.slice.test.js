import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { push } from 'connected-react-router';

import reducer, {
  registerUserFailure,
  registerUserSuccess,
  registerUser,
  fetchUserSuccess,
  fetchUserFailure,
  fetchUser,
  loginUserFailure,
  loginUserSuccess,
  login,
  logoutUserSuccess,
  logoutUserFailure,
  logout,
  updateUserSuccess,
  updateUserFailure,
  updateUser,
  status,
  setAccountsLoading,
  isLoadingSelector,
} from './accounts.slice';

import { RESEND_EMAIL_VERIFICATION_URL } from './accounts.constants';

const mockStore = configureMockStore([thunk]);

describe('Accounts Slice', () => {
  describe('Accounts Actions', () => {
    let store = null;
    const errorMessages = {
      error_1: ['First error relating to failed request.'],
      error_2: ['Second error relating to failed request.'],
      error_3: ['Third error relating to failed request.'],
    };

    beforeEach(() => {
      fetch.resetMocks();

      store = mockStore({
        accounts: {
          userKey: 'testkey',
          user: {
            username: 'testusername',
            email: 'testusername@test.com',
          },
        },
      });
    });

    it('should dispatch register failure action.', async () => {
      fetch.mockResponse(
        JSON.stringify({
          errors: errorMessages,
        }),
        {
          ok: false,
          status: 401,
          statusText: 'Test Error',
        },
      );

      const expectedActions = [
        { type: setAccountsLoading.type, payload: undefined },
        {
          type: registerUserFailure.type,
          payload: [
            'First error relating to failed request.',
            'Second error relating to failed request.',
            'Third error relating to failed request.',
          ],
        },
      ];

      const form = {
        username: 'testusername',
        email: 'testusername@test.com',
        password1: 'password1',
        password2: 'password2',
      };

      await store.dispatch(registerUser(form));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch register success action.', async () => {
      fetch.mockResponse(JSON.stringify({}));

      const expectedActions = [
        { type: setAccountsLoading.type, payload: undefined },
        { payload: {}, type: registerUserSuccess.type },
        {
          payload: { args: [RESEND_EMAIL_VERIFICATION_URL], method: 'push' },
          type: '@@router/CALL_HISTORY_METHOD',
        },
      ];

      const form = {
        username: 'testusername',
        email: 'testusername@test.com',
        password1: 'password1',
        password2: 'password2',
      };

      await store.dispatch(registerUser(form));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch fetch user failure action.', async () => {
      fetch.mockResponse(
        JSON.stringify({
          errors: errorMessages,
        }),
        {
          ok: false,
          status: 401,
          statusText: 'Test Error',
        },
      );

      const expectedActions = [
        { type: setAccountsLoading.type, payload: undefined },
        {
          type: fetchUserFailure.type,
          payload: [
            'First error relating to failed request.',
            'Second error relating to failed request.',
            'Third error relating to failed request.',
          ],
        },
      ];

      await store.dispatch(fetchUser());

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch fetch user success action.', async () => {
      const user = {
        username: 'testusername',
        email: 'testusername@test.com',
      };
      fetch.mockResponse(JSON.stringify(user));

      const expectedActions = [
        { type: setAccountsLoading.type, payload: undefined },
        { type: fetchUserSuccess.type, payload: user },
      ];

      await store.dispatch(fetchUser());

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch login failure action.', async () => {
      fetch.mockResponse(
        JSON.stringify({
          errors: errorMessages,
        }),
        {
          ok: false,
          status: 401,
          statusText: 'Test Error',
        },
      );

      const expectedActions = [
        { type: setAccountsLoading.type, payload: undefined },
        {
          type: loginUserFailure.type,
          payload: {
            errors: [
              'First error relating to failed request.',
              'Second error relating to failed request.',
              'Third error relating to failed request.',
            ],
          },
        },
      ];

      const form = {
        email: 'testusername@test.com',
        password: 'password',
      };

      await store.dispatch(login(form));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch login success action.', async () => {
      fetch.mockResponse(JSON.stringify({}));

      const expectedActions = [
        { type: setAccountsLoading.type, payload: undefined },
        {
          payload: { user: {}, userkey: undefined },
          type: loginUserSuccess.type,
        },
        {
          payload: { args: ['/'], method: 'push' },
          type: '@@router/CALL_HISTORY_METHOD',
        },
      ];

      const form = {
        email: 'testusername@test.com',
        password: 'password',
      };

      await store.dispatch(login(form));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch logout failure action.', async () => {
      fetch.mockResponse(
        JSON.stringify({
          errors: errorMessages,
        }),
        {
          ok: false,
          status: 401,
          statusText: 'Test Error',
        },
      );

      const expectedActions = [
        { type: setAccountsLoading.type, payload: undefined },
        {
          type: logoutUserFailure.type,
          payload: [
            'First error relating to failed request.',
            'Second error relating to failed request.',
            'Third error relating to failed request.',
          ],
        },
      ];

      await store.dispatch(logout());

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch logout success action.', async () => {
      const userKey = { token: 'testkey' };
      const user = {
        username: 'testusername',
        email: 'testusername@test.com',
      };

      fetch.once(JSON.stringify(userKey)).once(JSON.stringify(user));

      const expectedActions = [
        { type: setAccountsLoading.type, payload: undefined },
        { type: logoutUserSuccess.type },
      ];

      await store.dispatch(logout());

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch update user failure action.', async () => {
      fetch.mockResponse(
        JSON.stringify({
          errors: errorMessages,
        }),
        {
          ok: false,
          status: 401,
          statusText: 'Test Error',
        },
      );

      const expectedActions = [
        { type: setAccountsLoading.type, payload: undefined },
        {
          type: updateUserFailure.type,
          payload: [
            'First error relating to failed request.',
            'Second error relating to failed request.',
            'Third error relating to failed request.',
          ],
        },
      ];

      const form = {
        email: 'testusername@test.com',
        password: 'password2',
      };

      await store.dispatch(updateUser(form));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch update user success action.', async () => {
      const userKey = { token: 'testkey' };

      fetch.mockResponse(JSON.stringify(userKey));

      const expectedActions = [
        { type: setAccountsLoading.type, payload: undefined },
        { type: updateUserSuccess.type, payload: userKey },
      ];

      const form = {
        email: 'testusername@test.com',
        password: 'password2',
      };

      await store.dispatch(updateUser(form));

      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('Accounts Reducer', () => {
    let beforeState;

    beforeEach(() => {
      beforeState = {
        userKey: null,
        user: null,
        error: null,
        isLoading: false,
        resetStatus: status.NONE,
        changeStatus: status.NONE,
      };
    });

    it('should return the initial state', () => {
      const actualState = reducer(undefined, {});

      expect(actualState).toEqual(beforeState);
    });

    it('should update the error state, on successful `register`', () => {
      const userKey = { token: 'Test Register Error' };

      const actualState = reducer(beforeState, {
        type: registerUserSuccess.type,
        payload: userKey,
      });

      expect(actualState.error).toEqual(null);
    });

    it('should update the error state, when failed to `register`', () => {
      const error = 'Test Register Error';

      const actualState = reducer(beforeState, {
        type: registerUserFailure.type,
        payload: error,
      });

      expect(actualState.error).toEqual(error);
    });

    it('should update the user and key state, on successful login', () => {
      const userKey = { token: 'Test Login Error' };
      const user = { name: 'Test spammington' };

      const actualState = reducer(beforeState, {
        type: loginUserSuccess.type,
        payload: { userKey, user },
      });

      expect(actualState.userKey).toEqual(userKey);
      expect(actualState.user).toEqual(user);
    });

    it('should update the error state, when failed to `login`', () => {
      const error = 'Test Login Error';

      const actualState = reducer(beforeState, {
        type: loginUserFailure.type,
        payload: { errors: error },
      });

      expect(actualState.error).toEqual(error);
    });

    it('should update the user state, when successfully fetched user', () => {
      const user = { id: 1, name: 'Test Fetch User Name' };

      const actualState = reducer(beforeState, {
        type: fetchUserSuccess.type,
        payload: user,
      });

      expect(actualState.user).toEqual(user);
    });

    it('should update the error state, when failed to fetch user', () => {
      const error = 'Test Fetch User Error';

      const actualState = reducer(beforeState, {
        type: fetchUserFailure.type,
        payload: error,
      });

      expect(actualState.error).toEqual(error);
    });

    it('should update the user state, when successfully updated user', () => {
      const user = { id: 1, name: 'Test Update User' };

      expect(beforeState.user).not.toEqual(user);

      const actualState = reducer(beforeState, {
        type: updateUserSuccess.type,
        payload: user,
      });

      expect(actualState.user).toEqual(user);
    });

    it('should update the error state, when failed to update user', () => {
      const error = 'Test Update User Error';

      const actualState = reducer(beforeState, {
        type: updateUserFailure.type,
        payload: error,
      });

      expect(actualState.error).toEqual(error);
    });

    it('should update the user state, on successful logout', () => {
      const user = { id: 1, name: 'Test Update User' };

      expect(beforeState.user).not.toEqual(user);

      const actualState = reducer(beforeState, {
        type: logoutUserSuccess.type,
      });

      expect(actualState.user).toEqual(null);
      expect(actualState.userKey).toEqual(null);
    });

    it('should update the error state, when failed to logout', () => {
      const error = 'Test Update User Error';

      const actualState = reducer(beforeState, {
        type: logoutUserFailure.type,
        payload: error,
      });

      expect(actualState.error).toEqual(error);
    });
  });

  describe('Accounts Selectors', () => {
    describe('isLoadingSelector', () => {
      it('should return undefined', () => {
        const state = { accounts: {} };
        const result = isLoadingSelector(state);

        expect(result).not.toBeDefined();
        expect(result).toBeUndefined();
      });

      it('should return null', () => {
        const state = { accounts: { isLoading: null } };
        const result = isLoadingSelector(state);

        expect(result).toBeNull();
      });

      it('should return false', () => {
        const state = { accounts: { isLoading: false } };
        const result = isLoadingSelector(state);

        expect(result).not.toBeTruthy();
        expect(result).toBeFalsy();
      });

      it('should return true', () => {
        const state = { accounts: { isLoading: true } };
        const result = isLoadingSelector(state);

        expect(result).toBeTruthy();
        expect(result).not.toBeFalsy();
      });
    });
  });
});
