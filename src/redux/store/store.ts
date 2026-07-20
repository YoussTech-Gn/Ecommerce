import { configureStore, combineReducers } from "@reduxjs/toolkit";
import categoriesSlice from "../slices/categories/categoriesSlice";
import productsSlice from "../slices/products/productsSlice";
import cartSlice from "../slices/add-to-cart/cartSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items"],
};

// 💡 The keys defined here ('categories', 'products', 'cart') dictate the global state structure
const rootReducer = combineReducers({
  categories: categoriesSlice,
  products: productsSlice,
  cart: persistReducer(cartPersistConfig, cartSlice),
});

const store = configureStore({
  reducer: rootReducer,
  // 🛡️ Safety Guard: Mute Redux Toolkit's serializability warnings for redux-persist actions
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export default { store, persistor };

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
