import { combineReducers } from "redux";
import authReducer from "reducer/auth/authSlice";
import filtersReducer from "reducer/admin/filters/filtersSlice";
import selectedEnquiryReducer from "reducer/admin/enquiry/selectedEnquirySlice";
import { authApi } from "reducer/auth/authApiSlice";
import { branchApi } from "reducer/admin/branch/branchSliceApi";

const rootReducer = combineReducers({
  auth: authReducer,
  enquiryFilters: filtersReducer,
  selectedEnquiry: selectedEnquiryReducer,
  // rtk query
  [authApi.reducerPath]: authApi.reducer,
  [branchApi.reducerPath]: branchApi.reducer,
});

export default rootReducer;
