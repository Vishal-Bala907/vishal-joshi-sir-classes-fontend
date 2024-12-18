import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LiveTestFormData {
  _id: string;
  testName: string;
  description: string;
  timeDuration: string;
  time: string;
  date: string;
  category: string;
  instructions: string;
  positiveMarking: string;
  negativeMarking: string;
  testId: string;
  type: string;
  subject: string;
  Questions: any[]; // Array of any type to store questions
}

const initialState: LiveTestFormData = {
  _id: "",
  testName: "",
  description: "",
  timeDuration: "",
  testId: "",
  time: "",
  date: "",
  category: "",
  instructions: "",
  positiveMarking: "",
  negativeMarking: "",
  type: "",
  subject: "",
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
