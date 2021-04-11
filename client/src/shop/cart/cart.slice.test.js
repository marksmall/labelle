import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import reducer, {
  addToCart,
  removeFromCart,
  clearCart,
  addShippingAddress,
  addPaymentMethod,
  cartItemsSelector,
  shippingAddressSelector,
  paymentMethodSelector,
} from './cart.slice';

const mockStore = configureMockStore([thunk]);

describe('Cart slice', () => {
  describe('Cart Reducer', () => {
    let beforeState;
    beforeEach(() => {
      beforeState = {
        items: [],
        shippingAddress: null,
        paymentMethod: null,
      };
    });

    it('should return the initial state', () => {
      const actualState = reducer(undefined, {});
      expect(actualState).toEqual(beforeState);
    });

    it('should add an item to an empty cart', () => {
      const item = { id: 4, quantity: 2 };

      const actualState = reducer(beforeState, {
        type: addToCart.type,
        payload: item,
      });

      expect(actualState.items).toEqual([item]);
    });

    it('should add an item to an already populated cart', () => {
      const item = { id: 4, quantity: 2 };
      beforeState.items = [{ id: 2, quantity: 3 }];

      const actualState = reducer(beforeState, {
        type: addToCart.type,
        payload: item,
      });

      expect(actualState.items).toEqual([...beforeState.items, item]);
    });

    it('should remove an item from an already populated cart', () => {
      const item = 4;
      beforeState.items = [
        { id: 2, quantity: 3 },
        { id: 4, quantity: 2 },
      ];

      const actualState = reducer(beforeState, {
        type: removeFromCart.type,
        payload: item,
      });

      expect(actualState.items).toEqual(
        beforeState.items.filter(itm => itm.id !== item),
      );
    });

    it("should do nothing when trying to remove an item that doesn't exist", () => {
      const item = 3;
      beforeState.items = [
        { id: 2, quantity: 3 },
        { id: 4, quantity: 2 },
      ];

      const actualState = reducer(beforeState, {
        type: removeFromCart.type,
        payload: item,
      });

      expect(actualState.items).toEqual(beforeState.items);
    });

    it('should add a shipping address', () => {
      const shippingAddress = 'Test Shipping Address';

      const actualState = reducer(beforeState, {
        type: addShippingAddress.type,
        payload: shippingAddress,
      });

      expect(actualState.shippingAddress).toEqual(shippingAddress);
    });

    it('should add a payment method', () => {
      const paymentMethod = 'Test Payment Method';

      const actualState = reducer(beforeState, {
        type: addPaymentMethod.type,
        payload: paymentMethod,
      });

      expect(actualState.paymentMethod).toEqual(paymentMethod);
    });
  });

  describe('Cart Selectors', () => {
    describe('cartItemsSelector', () => {
      it('should return undefined', () => {
        const state = { cart: {} };
        const result = cartItemsSelector(state);
        expect(result).not.toBeDefined();
        expect(result).toBeUndefined();
      });

      it('should return null', () => {
        const state = { cart: { items: null } };
        const result = cartItemsSelector(state);
        expect(result).toBeNull();
      });

      it('should return empty array', () => {
        const state = { cart: { items: [] } };
        const result = cartItemsSelector(state);
        expect(result).toStrictEqual([]);
      });

      it('should return populated array', () => {
        const items = [{ id: 1 }, { id: 2 }];
        const state = { cart: { items } };
        const result = cartItemsSelector(state);
        expect(result).toStrictEqual(items);
      });
    });

    describe('shippingAddressSelector', () => {
      it('should return undefined', () => {
        const state = { cart: {} };
        const result = shippingAddressSelector(state);
        expect(result).not.toBeDefined();
        expect(result).toBeUndefined();
      });

      it('should return null', () => {
        const state = { cart: { shippingAddress: null } };
        const result = shippingAddressSelector(state);
        expect(result).toBeNull();
      });

      it('should return empty string', () => {
        const shippingAddress = '';
        const state = { cart: { shippingAddress } };
        const result = shippingAddressSelector(state);
        expect(result).toStrictEqual(shippingAddress);
      });

      it('should return a populated string', () => {
        const shippingAddress = 'Test Shipping Address';
        const state = { cart: { shippingAddress } };
        const result = shippingAddressSelector(state);
        expect(result).toStrictEqual(shippingAddress);
      });
    });

    describe('paymentMethodSelector', () => {
      it('should return undefined', () => {
        const state = { cart: {} };
        const result = paymentMethodSelector(state);
        expect(result).not.toBeDefined();
        expect(result).toBeUndefined();
      });

      it('should return null', () => {
        const state = { cart: { paymentMethod: null } };
        const result = paymentMethodSelector(state);
        expect(result).toBeNull();
      });

      it('should return empty string', () => {
        const paymentMethod = '';
        const state = { cart: { paymentMethod } };
        const result = paymentMethodSelector(state);
        expect(result).toStrictEqual(paymentMethod);
      });

      it('should return a populated string', () => {
        const paymentMethod = 'Test Payment Method';
        const state = { cart: { paymentMethod } };
        const result = paymentMethodSelector(state);
        expect(result).toStrictEqual(paymentMethod);
      });
    });
  });
});
