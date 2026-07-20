import {
  getCartTotalQuantitySelector,
  getCartTotalPriceSelector,
} from "@/redux/selectors";
import type { InitialCartStateType } from "@/types/cartTypes";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: InitialCartStateType = {
  items: {},
  productsFullInfo: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // تم تصحيح الاسم وتحديد نوع الـ id الممرر كـ number
    addToCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.items[productId] = (state.items[productId] || 0) + 1; // تُسمى Short-circuit evaluation
    },
  },
});

export { getCartTotalPriceSelector, getCartTotalQuantitySelector };
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
