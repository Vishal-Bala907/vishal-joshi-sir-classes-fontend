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

const liveTestSlice = createSlice({
  name: "liveTest",
  initialState,
  reducers: {
    setTestDetails(state, action: PayloadAction<Partial<LiveTestFormData>>) {
      return { ...state, ...action.payload };
    },
    resetFormData() {
      return initialState;
    },
    addQuestion(state, action: PayloadAction<any>) {
      state.Questions.push(action.payload);
    },
  },
});

export const { setTestDetails, resetFormData, addQuestion } =
  liveTestSlice.actions;

export default liveTestSlice.reducer;
