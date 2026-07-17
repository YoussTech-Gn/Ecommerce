import type {
  CategoriesType,
  InitialCategoriesType, // تم تصحيح الإملاء هنا وفي الأسفل
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
    getCategories: (state, action: PayloadAction<CategoriesType[]>) => {
      state.categories = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(actGetCategories.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(actGetCategories.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.categories = action.payload;
      })
      .addCase(actGetCategories.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = "failed";
      });
  },
});

export const { getCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
