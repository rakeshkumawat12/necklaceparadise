import { createSlice } from "@reduxjs/toolkit";
// import { updateLocalStorage } from "../utils/updateLocalStorage";

const initialState = {
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, data) => {
      state.token = data.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem("token", data.payload.token);
    },
    logoutSuccess: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("token");
    },
    setUser: (state, data) => {
      state.user = data.payload;
    },
  },
});

export const {loginSuccess, logoutSuccess, setUser} = authSlice.actions;

export default authSlice.reducer;
