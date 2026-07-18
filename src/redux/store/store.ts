import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "../slices/categories/categoriesSlice";
import productsSlice from "../slices/products/productsSlice";

const store = configureStore({
  reducer: {
    categoriesSlice,
    productsSlice,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
