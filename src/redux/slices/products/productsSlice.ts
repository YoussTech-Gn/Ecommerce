import { createSlice, isAnyOf, type PayloadAction } from "@reduxjs/toolkit";
import type { InitialProductsType, ProductTypes } from "@/types/productsTypes";
import actGetProductByCatPrefix from "./act/actGetProductByPrefix";
import actGetAllProduct from "./act/actGetAllProducts";

const initialState: InitialProductsType = {
  loading: "idle",
  products: [],
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsCleanUp: (state) => {
      state.products = [];
      state.error = null;
      state.loading = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(
        isAnyOf(actGetProductByCatPrefix.pending, actGetAllProduct.pending),
        (state) => {
          state.loading = "pending";
        },
      )
      .addMatcher(
        isAnyOf(actGetProductByCatPrefix.fulfilled, actGetAllProduct.fulfilled),
        (state, action: PayloadAction<ProductTypes[]>) => {
          state.loading = "succeeded";
          state.products = action.payload;
        },
      )
      .addMatcher(
        isAnyOf(actGetProductByCatPrefix.rejected, actGetAllProduct.rejected),
        (state, action) => {
          state.error = action.payload as string;
          state.loading = "failed";
        },
      );
  },
});

export const { productsCleanUp } = productsSlice.actions;
export default productsSlice.reducer;
