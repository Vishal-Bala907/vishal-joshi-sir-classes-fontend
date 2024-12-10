import { createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import { RootState } from "../Store";

// Initial state with socket as null initially
const initialState = {
  socket: null as Socket | null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    clearSocket: (state) => {
      state.socket = null;
    },
  },
});

export const { setSocket, clearSocket } = socketSlice.actions;

export const selectSocket = (state: RootState) => state.socket.socket;

export default socketSlice.reducer;
