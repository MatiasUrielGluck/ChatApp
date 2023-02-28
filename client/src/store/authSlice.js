import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "not-auth", // "not-auth" | "auth" | "checking-auth"
    token: "",
    user: {},
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.status = "not-auth";
      state.token = "";
      state.user = {};
    },
    startLogin: (state) => {
      state.status = "checking-auth";
    },
    completeLogin: (state, action) => {
      state.status = "auth";
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
  },
});

// Action creators are generated for each case reducer function
export const { logout, startLogin, completeLogin } = authSlice.actions;

export default authSlice.reducer;
