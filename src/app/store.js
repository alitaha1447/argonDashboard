import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import authReducer from "reducer/auth/authSlice.js";
import filtersReducer from "reducer/admin/filters/filtersSlice";
import { authApi } from "reducer/auth/authApiSlice";
import { branchApi } from "reducer/admin/branch/branchSliceApi";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import {
  persistStore,
  persistReducer,
  REHYDRATE,
  PAUSE,
  PERSIST,
  REGISTER,
} from "redux-persist";
// import { createStore } from "redux";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
// Redux store configuration
export const store = configureStore({
  reducer: persistedReducer, // ✅ correct way
  // reducer: {
  //   // slices
  //   auth: authReducer,
  //   enquiryFilters: filtersReducer,
  //   // RTK Query reducers (use their dynamic reducerPath)
  //   [authApi.reducerPath]: authApi.reducer,
  //   [branchApi.reducerPath]: branchApi.reducer,
  // },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(authApi.middleware, branchApi.middleware),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [REHYDRATE, PAUSE, PERSIST, REGISTER],
      },
    })
      .concat(authApi.middleware)
      .concat(branchApi.middleware),
});
// 🔄 Export persistor
export const persistor = persistStore(store);
