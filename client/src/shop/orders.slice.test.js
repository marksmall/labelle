import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import reducer, {
  fetchOrdersFailure,
  fetchOrdersSuccess,
  addOrderFailure,
  addOrderSuccess,
  updateOrderFailure,
  updateOrderSuccess,
  deleteOrderFailure,
  deleteOrderSuccess,
  setLoading,
  selectOrder,
  fetchOrders,
  addOrder,
  updateOrder,
  deleteOrder,
  isLoadingSelector,
  ordersSelector,
} from './orders.slice';

const mockStore = configureMockStore([thunk]);

describe('Orders slice', () => {
  describe('Order Actions', () => {
    let store = null;

    beforeEach(() => {
      fetch.resetMocks();

      store = mockStore({
        accounts: { userKey: 'Test-User-Key' },
        app: { apiUrl: 'http://test.com' },
      });
    });

    it('should dispatch fetch orders failure action', async () => {
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
          type: setLoading.type,
        },
        {
          type: fetchOrdersFailure.type,
          payload: { message: '401 Test Error' },
        },
      ];

      await store.dispatch(fetchOrders());

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch fetch orders success action', async () => {
      const orders = [
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
      fetch.mockResponse(JSON.stringify(orders));

      const expectedActions = [
        {
          type: setLoading.type,
        },
        { type: fetchOrdersSuccess.type, payload: orders },
      ];

      await store.dispatch(fetchOrders());

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch add order failure action', async () => {
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
          type: setLoading.type,
        },
        {
          type: addOrderFailure.type,
          payload: 'Add Order Error: 401 - Test Error',
        },
      ];

      const order = {
        id: 5,
      };
      await store.dispatch(addOrder(order));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch add order success action', async () => {
      const order = {
        id: 5,
      };
      fetch.mockResponse(JSON.stringify(order));

      const expectedActions = [
        {
          type: setLoading.type,
        },
        { type: addOrderSuccess.type, payload: order },
      ];

      await store.dispatch(addOrder(order));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch update order failure action', async () => {
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
          type: setLoading.type,
        },
        {
          type: updateOrderFailure.type,
          payload: 'Update Order Error: 401 - Test Error',
        },
      ];

      const order = {
        id: 5,
      };
      await store.dispatch(updateOrder(order));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch update order success action', async () => {
      const order = {
        id: 5,
      };
      fetch.mockResponse(JSON.stringify(order));

      const expectedActions = [
        {
          type: setLoading.type,
        },
        { type: updateOrderSuccess.type, payload: order },
      ];

      await store.dispatch(updateOrder(order));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch delete order failure action', async () => {
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
          type: setLoading.type,
        },
        {
          type: deleteOrderFailure.type,
          payload: 'Delete Order Error: 401 - Test Error',
        },
      ];

      const order = {
        id: 5,
      };
      await store.dispatch(deleteOrder(order));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch delete order success action', async () => {
      const order = {
        id: 5,
      };
      fetch.mockResponse(JSON.stringify(order));

      const expectedActions = [
        {
          type: setLoading.type,
        },
        { type: deleteOrderSuccess.type, payload: order },
      ];

      await store.dispatch(deleteOrder(order));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should set loading in state, when thunk enacted', async () => {
      await store.dispatch(setLoading());

      const expectedActions = [
        {
          type: setLoading.type,
        },
      ];

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch select order action.', async () => {
      const order = {
        id: 5,
      };

      const expectedActions = [{ type: selectOrder.type, payload: order }];

      await store.dispatch(selectOrder(order));

      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('Order Reducer', () => {
    let beforeState;

    beforeEach(() => {
      beforeState = {
        orders: null,
        selectedOrder: null,
        error: null,
        isLoading: false,
      };
    });

    it('should return the initial state', () => {
      const actualState = reducer(undefined, {});

      expect(actualState).toEqual(beforeState);
    });

    it('should update the orders in state, when successfully retrieved', () => {
      const orders = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

      const actualState = reducer(beforeState, {
        type: fetchOrdersSuccess.type,
        payload: orders,
      });

      expect(actualState.orders).toEqual(orders);
    });

    it('should update the error state, when failed to retrieve orders', () => {
      const error = { message: 'Test Orders Error' };

      const actualState = reducer(beforeState, {
        type: fetchOrdersFailure.type,
        payload: error,
      });

      expect(actualState.error).toEqual(error);
    });

    it('should update the orders in state, when successfully added new order', () => {
      const order = { id: 5 };
      beforeState.orders = [order];

      const actualState = reducer(beforeState, {
        type: updateOrderSuccess.type,
        payload: order,
      });

      expect(actualState.orders).toEqual([order]);
    });

    it('should update the error state, when failed to add a new order', () => {
      const error = { message: 'Test Orders Error' };

      const actualState = reducer(beforeState, {
        type: updateOrderFailure.type,
        payload: error,
      });

      expect(actualState.error).toEqual(error);
    });

    it('should update the orders in state, when successfully updated a order', () => {
      const order = { id: 1, name: 'Test' };
      beforeState.orders = [{ id: 1 }, { id: 2 }];

      const actualState = reducer(beforeState, {
        type: updateOrderSuccess.type,
        payload: order,
      });

      expect(actualState.orders).toEqual(
        beforeState.orders.map(prod =>
          prod.id === order.id ? order : prod,
        ),
      );
    });

    it('should update the error state, when failed to update a order', () => {
      const error = { message: 'Test Orders Error' };

      const actualState = reducer(beforeState, {
        type: updateOrderFailure.type,
        payload: error,
      });

      expect(actualState.error).toEqual(error);
    });

    it('should update the orders in state, when successfully deleted a order', () => {
      const order = { id: 1 };
      beforeState.orders = [{ id: 1 }, { id: 2 }];

      const actualState = reducer(beforeState, {
        type: deleteOrderSuccess.type,
        payload: order,
      });

      expect(actualState.orders).toEqual(
        beforeState.orders.filter(bm => bm.id !== order.id),
      );
    });

    it('should update the error state, when failed to delete a order', () => {
      const error = { message: 'Test Orders Error' };

      const actualState = reducer(beforeState, {
        type: deleteOrderFailure.type,
        payload: error,
      });

      expect(actualState.error).toEqual(error);
    });

    it('should update the selected order in state, when one selected', () => {
      const order = { id: 1 };
      beforeState.orders = [{ id: 1 }, { id: 2 }];

      const actualState = reducer(beforeState, {
        type: selectOrder.type,
        payload: order,
      });

      expect(actualState.selectedOrder).toEqual(order);
    });
  });

  describe('Order Selectors', () => {
    describe('isLoadingSelector', () => {
      it('should return undefined', () => {
        const state = { shop: {} };
        const result = isLoadingSelector(state);

        expect(result).not.toBeDefined();
        expect(result).toBeUndefined();
      });

      it('should return null', () => {
        const state = { shop: { isLoading: null } };
        const result = isLoadingSelector(state);

        expect(result).toBeNull();
      });

      it('should return false', () => {
        const state = { shop: { isLoading: false } };
        const result = isLoadingSelector(state);

        expect(result).not.toBeTruthy();
        expect(result).toBeFalsy();
      });

      it('should return true', () => {
        const state = { shop: { isLoading: true } };
        const result = isLoadingSelector(state);

        expect(result).toBeTruthy();
        expect(result).not.toBeFalsy();
      });
    });

    describe('ordersSelector', () => {
      it('should return undefined', () => {
        const state = { shop: {} };
        const result = ordersSelector(state);

        expect(result).not.toBeDefined();
        expect(result).toBeUndefined();
      });

      it('should return null', () => {
        const state = { shop: { orders: null } };
        const result = ordersSelector(state);

        expect(result).toBeNull();
      });

      it('should return empty array', () => {
        const state = { shop: { orders: [] } };
        const result = ordersSelector(state);

        expect(result).toStrictEqual([]);
      });

      it('should return populated array', () => {
        const orders = [{ id: 1 }, { id: 2 }];
        const state = { shop: { orders } };
        const result = ordersSelector(state);

        expect(result).toStrictEqual(orders);
      });
    });
  });
});
