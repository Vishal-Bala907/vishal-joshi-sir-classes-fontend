import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const UserSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { setUser } = UserSlice.actions;

export default UserSlice.reducer;
