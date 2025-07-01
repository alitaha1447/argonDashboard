import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  name: "",
  email: "",
  mobileno: "",
  isorganisational: 0,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
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
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
