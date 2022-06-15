import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie } from "../api/api";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    isSuccess: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.currentUser = action.payload;
      // state.errorMsg = null;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.isSuccess = false;
      // state.errorMsg = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("jg_user");
      state.currentUser = null;
      state.isSuccess = false;
      try {
        const res = await deleteCookie()
        console.log("delete cookie res", res);
      } catch (error) {
        console.log("delete cookie error", error);
      }
    }
  }
})

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions
export default userSlice.reducer;