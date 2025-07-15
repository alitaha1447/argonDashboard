import { createSlice } from "@reduxjs/toolkit";
import { persistor } from "app/store";
const initialState = {
  id: null,
  name: "",
  email: "",
  mobileno: "",
  isorganisational: 0,
  isLoggedIn: false,
  branchSelected: false, // ✅ NEW
  selectedBranch: null, // ✅ NEW
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { id, name, email, mobileno, isorganisational } = action.payload;

      state.id = id;
      state.name = name;
      state.email = email;
      state.mobileno = mobileno;
      state.isorganisational = isorganisational;
      state.isLoggedIn = true;
    },

    logout: (state) => {
      state.id = null;
      state.name = "";
      state.email = "";
      state.mobileno = "";
      state.isorganisational = 0;
      state.isLoggedIn = false;
      state.branchSelected = false;
      state.selectedBranch = null; // ✅ Clears persisted branch
    },

    selectBranch: (state, action) => {
      state.selectedBranch = action.payload;
      state.branchSelected = !!action.payload; // true if selectedBranch exists
    },
  },
});

export const { login, logout, selectBranch } = authSlice.actions;
export default authSlice.reducer;
