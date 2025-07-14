import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  name: "",
  email: "",
  mobileno: "",
  isorganisational: 0,
  isLoggedIn: false,
};
// console.log("-----------------");
// console.log(initialState);
// console.log("-----------------");

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // login: (state, action) => {
    //   const { id, name, email, mobileno, isorganisational } = action.payload;

    //   console.log("-----------------");
    //   console.log(action.payload);
    //   console.log("-----------------");
    //   state.id = id;
    //   state.name = name;
    //   state.email = email;
    //   state.mobileno = mobileno;
    //   state.isorganisational = isorganisational;
    //   state.isLoggedIn = true;
    // },
    login: (state, action) => {
      Object.assign(state, action.payload);
    },
    // logout: (state) => {
    //   state.id = null;
    //   state.name = "";
    //   state.email = "";
    //   state.mobileno = "";
    //   state.isorganisational = 0;
    //   state.isLoggedIn = false;
    // },
    logout: (state) => {
      Object.assign(state, initialState);
      localStorage.removeItem("user");
      localStorage.removeItem("branches");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
