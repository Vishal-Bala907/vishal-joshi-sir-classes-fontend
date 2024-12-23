import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Attending {
  status: boolean;
}

const initialState: Attending = {
  status: false, // Initialize as an empty array
};

const AttendStatus = createSlice({
  name: "ATTENDING",
  initialState,
  reducers: {
    setAttending(state) {
      state.status = true;
    },
    resetAttending(state) {
      state.status = false;
    },
  },
});

export const { setAttending, resetAttending } = AttendStatus.actions;

export default AttendStatus.reducer;
