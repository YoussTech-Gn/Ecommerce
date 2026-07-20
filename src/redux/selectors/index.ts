import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";

// 💡 Input selectors retrieving specific raw slices
const checkProduct = (state: RootState) => state.products.products;
const checkCart = (state: RootState) => state.cart.items;

/**
 * 1. Selector to calculate the total quantity of items in the cart.
 * Only requires the cart items map.
 */
export const getCartTotalQuantitySelector = createSelector(
  [checkCart],
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
  [checkProduct, checkCart],
  (products, items) => {
    return Object.entries(items).reduce((totalPrice, [productId, quantity]) => {
      // Find the full product info matching the cart item ID
      const product = products.find((p) => p.id === +productId);
      // If the product exists, multiply its price by the quantity in cart
      return totalPrice + (product ? product.price * quantity : 0);
    }, 0);
  },
);
