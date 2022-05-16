import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
  },
  reducers: {
    signin: (state, action) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("jg_user");
      state.currentUser = null;
    }
  }
})

export const { signin, logout } = userSlice.actions
export default userSlice.reducer;