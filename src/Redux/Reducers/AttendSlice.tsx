import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LiveTestFormData {
  testName: string;
  description: string;
  timeDuration: string;
  time: string;
  date: string;
  category: string;
  instructions: string;
  positiveMarking: string;
  negativeMarking: string;
  Questions: any[]; // Array of any type to store questions
}

const initialState: LiveTestFormData = {
  testName: "",
  description: "",
  timeDuration: "",
  time: "",
  date: "",
  category: "",
  instructions: "",
  positiveMarking: "",
  negativeMarking: "",
  Questions: [], // Initialize as an empty array
};

const attendTestSlice = createSlice({
  name: "liveTest",
  initialState,
  reducers: {
    setAttendTestDetails(state, action) {
      return { ...state, ...action.payload };
    },
    resetAttendFormData() {
      return initialState;
    },
  },
});

export const { setAttendTestDetails, resetAttendFormData } =
  attendTestSlice.actions;

export default attendTestSlice.reducer;
