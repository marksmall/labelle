import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import reducer, {
  fetchProductsFailure,
  fetchProductsSuccess,
  addProductFailure,
  addProductSuccess,
  updateProductFailure,
  updateProductSuccess,
  deleteProductFailure,
  deleteProductSuccess,
  setProductsLoading,
  selectProduct,
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  isLoadingSelector,
  productsSelector,
} from './products.slice';

const mockStore = configureMockStore([thunk]);

describe('Products slice', () => {
  describe('Product Actions', () => {
    let store = null;

    beforeEach(() => {
      fetch.resetMocks();

      store = mockStore({
        accounts: { userKey: 'Test-User-Key' },
      });
    });

    it('should dispatch fetch products failure action', async () => {
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
          type: setProductsLoading.type,
        },
        {
          type: fetchProductsFailure.type,
          payload: { message: '401 Test Error' },
        },
      ];

      await store.dispatch(fetchProducts());

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch fetch products success action', async () => {
      const products = [
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
      fetch.mockResponse(JSON.stringify(products));

      const expectedActions = [
        {
          type: setProductsLoading.type,
        },
        { type: fetchProductsSuccess.type, payload: products },
      ];

      await store.dispatch(fetchProducts());

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch add product failure action', async () => {
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
          type: setProductsLoading.type,
        },
        {
          type: addProductFailure.type,
          payload: 'Add Product Error: 401 - Test Error',
        },
      ];

      const product = {
        id: 5,
      };
      await store.dispatch(addProduct(product));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch add product success action', async () => {
      const product = {
        id: 5,
      };
      fetch.mockResponse(JSON.stringify(product));

      const expectedActions = [
        {
          type: setProductsLoading.type,
        },
        { type: addProductSuccess.type, payload: product },
      ];

      await store.dispatch(addProduct(product));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch update product failure action', async () => {
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
          type: setProductsLoading.type,
        },
        {
          type: updateProductFailure.type,
          payload: 'Update Product Error: 401 - Test Error',
        },
      ];

      const product = {
        id: 5,
      };
      await store.dispatch(updateProduct(product));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch update product success action', async () => {
      const product = {
        id: 5,
      };
      fetch.mockResponse(JSON.stringify(product));

      const expectedActions = [
        {
          type: setProductsLoading.type,
        },
        { type: updateProductSuccess.type, payload: product },
      ];

      await store.dispatch(updateProduct(product));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch delete product failure action', async () => {
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
          type: setProductsLoading.type,
        },
        {
          type: deleteProductFailure.type,
          payload: 'Delete Product Error: 401 - Test Error',
        },
      ];

      const product = {
        id: 5,
      };
      await store.dispatch(deleteProduct(product));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch delete product success action', async () => {
      const product = {
        id: 5,
      };
      fetch.mockResponse(JSON.stringify(product));

      const expectedActions = [
        {
          type: setProductsLoading.type,
        },
        { type: deleteProductSuccess.type, payload: product },
      ];

      await store.dispatch(deleteProduct(product));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should set loading in state, when thunk enacted', async () => {
      await store.dispatch(setProductsLoading());

      const expectedActions = [
        {
          type: setProductsLoading.type,
        },
      ];

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch select product action.', async () => {
      const product = {
        id: 5,
      };

      const expectedActions = [{ type: selectProduct.type, payload: product }];

      await store.dispatch(selectProduct(product));

      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('Product Reducer', () => {
    let beforeState;

    beforeEach(() => {
      beforeState = {
        products: null,
        selectedProduct: null,
        error: null,
        isLoading: false,
      };
    });

    it('should return the initial state', () => {
      const actualState = reducer(undefined, {});

      expect(actualState).toEqual(beforeState);
    });

    it('should update the products in state, when successfully retrieved', () => {
      const products = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

      const actualState = reducer(beforeState, {
        type: fetchProductsSuccess.type,
        payload: products,
      });

      expect(actualState.products).toEqual(products);
    });

    it('should update the error state, when failed to retrieve products', () => {
      const error = { message: 'Test Products Error' };

      const actualState = reducer(beforeState, {
        type: fetchProductsFailure.type,
        payload: error,
      });

      expect(actualState.error).toEqual(error);
    });

    it('should update the products in state, when successfully added new product', () => {
      const product = { id: 5 };
      beforeState.products = [];

      const actualState = reducer(beforeState, {
        type: addProductSuccess.type,
        payload: product,
      });

      expect(actualState.products).toEqual([product]);
    });

    it('should update the error state, when failed to add a new product', () => {
      const error = { message: 'Test Products Error' };

      const actualState = reducer(beforeState, {
        type: addProductFailure.type,
        payload: error,
      });

      expect(actualState.error).toEqual(error);
    });

    it('should update the products in state, when successfully updated a product', () => {
      const product = { id: 1, name: 'Test' };
      beforeState.products = [{ id: 1 }, { id: 2 }];

      const actualState = reducer(beforeState, {
        type: updateProductSuccess.type,
        payload: product,
      });

      expect(actualState.products).toEqual(
        beforeState.products.map(prod =>
          prod.id === product.id ? product : prod,
        ),
      );
    });

    it('should update the error state, when failed to update a product', () => {
      const error = { message: 'Test Products Error' };

      const actualState = reducer(beforeState, {
        type: updateProductFailure.type,
        payload: error,
      });

      expect(actualState.error).toEqual(error);
    });

    it('should update the products in state, when successfully deleted a product', () => {
      const product = { id: 1 };
      beforeState.products = [{ id: 1 }, { id: 2 }];

      const actualState = reducer(beforeState, {
        type: deleteProductSuccess.type,
        payload: product,
      });

      expect(actualState.products).toEqual(
        beforeState.products.filter(bm => bm.id !== product.id),
      );
    });

    it('should update the error state, when failed to delete a product', () => {
      const error = { message: 'Test Products Error' };

      const actualState = reducer(beforeState, {
        type: deleteProductFailure.type,
        payload: error,
      });

      expect(actualState.error).toEqual(error);
    });

    it('should update the selected product in state, when one selected', () => {
      const product = { id: 1 };
      beforeState.products = [{ id: 1 }, { id: 2 }];

      const actualState = reducer(beforeState, {
        type: selectProduct.type,
        payload: product,
      });

      expect(actualState.selectedProduct).toEqual(product);
    });
  });

  describe('Product Selectors', () => {
    describe('isLoadingSelector', () => {
      it('should return undefined', () => {
        const state = { products: {} };
        const result = isLoadingSelector(state);

        expect(result).not.toBeDefined();
        expect(result).toBeUndefined();
      });

      it('should return null', () => {
        const state = { products: { isLoading: null } };
        const result = isLoadingSelector(state);

        expect(result).toBeNull();
      });

      it('should return false', () => {
        const state = { products: { isLoading: false } };
        const result = isLoadingSelector(state);

        expect(result).not.toBeTruthy();
        expect(result).toBeFalsy();
      });

      it('should return true', () => {
        const state = { products: { isLoading: true } };
        const result = isLoadingSelector(state);

        expect(result).toBeTruthy();
        expect(result).not.toBeFalsy();
      });
    });

    describe('productsSelector', () => {
      it('should return undefined', () => {
        const state = { products: {} };
        const result = productsSelector(state);

        expect(result).not.toBeDefined();
        expect(result).toBeUndefined();
      });

      it('should return null', () => {
        const state = { products: { products: null } };
        const result = productsSelector(state);

        expect(result).toBeNull();
      });

      it('should return empty array', () => {
        const state = { products: { products: [] } };
        const result = productsSelector(state);

        expect(result).toStrictEqual([]);
      });

      it('should return populated array', () => {
        const products = [{ id: 1 }, { id: 2 }];
        const state = { products: { products } };
        const result = productsSelector(state);

        expect(result).toStrictEqual(products);
      });
    });
  });
});
