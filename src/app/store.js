import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import authReducer from "reducer/auth/authSlice.js";
import filtersReducer from "reducer/admin/filters/filtersSlice";
import { authApi } from "reducer/auth/authApiSlice";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistStore, persistReducer } from "redux-persist";
// import { createStore } from "redux";

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: [auth],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);
// Redux store configuration
export const store = configureStore({
  // reducer: persistReducer,
  reducer: {
    // slices
    auth: authReducer,
    enquiryFilters: filtersReducer,
    // RTK Query reducers (use their dynamic reducerPath)
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
// 🔄 Export persistor
// export const persistor = persistStore(store);
