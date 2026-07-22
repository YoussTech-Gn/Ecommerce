import {
  getCartTotalQuantitySelector,
  getCartTotalPriceSelector,
} from "@/redux/selectors";
import type { InitialCartStateType } from "@/types/cartTypes";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import actGetProductsByItems from "./act/actGetProductsyItems";

const initialState: InitialCartStateType = {
  items: {},
  productsFullInfo: [],
  error: null,
  loading: "idle",
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
    removeToCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;

      if (state.items[productId] > 1) {
        state.items[productId] -= 1;
      } else {
        delete state.items[productId]; // حذف المنتج من السلة إذا وصل رقمه إلى صفر
      }
    },
    cleanUpCart: (state) => {
      state.productsFullInfo = [];
    },
    removeCart: (state, action) => {
      state.productsFullInfo = state.productsFullInfo.filter(
        (cart) => cart.id !== action.payload,
      );
      delete state.items[action.payload];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(actGetProductsByItems.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(actGetProductsByItems.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.productsFullInfo = action.payload;
      })
      .addCase(actGetProductsByItems.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });
  },
});

export { getCartTotalPriceSelector, getCartTotalQuantitySelector };
export const { addToCart, cleanUpCart, removeCart, removeToCart } =
  cartSlice.actions;
export default cartSlice.reducer;
