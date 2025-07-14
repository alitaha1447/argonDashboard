import { combineReducers } from "redux";
import authReducer from "reducer/auth/authSlice";
import filtersReducer from "reducer/admin/filters/filtersSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  enquiryFilters: filtersReducer,
});

export default rootReducer;
