import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";

// 💡 Input selectors retrieving specific raw slices
const getCartProductsFullInfo = (state: RootState) =>
  state.cart.productsFullInfo;
const getCartItems = (state: RootState) => state.cart.items;

/**
 * 1. Selector to calculate the total quantity of items in the cart.
 * Only requires the cart items map.
 */
export const getCartTotalQuantitySelector = createSelector(
  [getCartItems],
  (items) => {
    // Implicit return without curly braces for cleaner code
    return Object.values(items).reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0,
    );
  },
);

/**
 * 2. Selector to calculate the total price of the cart.
 * 💡 This is where combining both products and cart items becomes powerful!
 */
export const getCartTotalPriceSelector = createSelector(
  [getCartProductsFullInfo, getCartItems],
  (productsFullInfo, items) => {
    return productsFullInfo.reduce((totalPrice, item) => {
      // 💡 جلب الكمية المحدثة مباشرة من الـ items (التي تتغير فوراً مع الـ Reducer والـ Actions)
      const currentQuantity = items[item.id] || item.quantity || 1;

      return totalPrice + +item.price * currentQuantity;
    }, 0);
  },
);
