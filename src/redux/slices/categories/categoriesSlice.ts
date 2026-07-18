import type {
  CategoriesType,
  InitialCategoriesType,
} from "@/types/categoriesTypes";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import actGetCategories from "./act/actGetCategories";

const initialState: InitialCategoriesType = {
  loading: "idle",
  categories: [],
  error: null,
};

const categoriesSlice = createSlice({
  name: "categoriesSlice",
  initialState,
  reducers: {
    categoriesCleanUp: (state) => {
      state.categories = [];
      state.error = null;
      state.loading = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(actGetCategories.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(
        actGetCategories.fulfilled,
        (state, action: PayloadAction<CategoriesType[]>) => {
          state.loading = "succeeded";
          state.categories = action.payload;
        },
      )
      .addCase(actGetCategories.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = "failed";
      });
  },
});

export const { categoriesCleanUp } = categoriesSlice.actions;
export default categoriesSlice.reducer;
