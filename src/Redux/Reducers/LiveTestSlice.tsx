import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Question {
  questionId: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  marks: number;
}

interface LiveTestFormData {
  testName: string;
  description: string;
  timeDuration: string;
  time: string;
  date: string;
  category: string;
  instructions: string;
  positiveMarking: number;
  negativeMarking: number;
  Questions: Question[]; // Array of Question objects
  canAttempt: boolean;
  _id: string;
}

const initialState: LiveTestFormData = {
  testName: "",
  description: "",
  timeDuration: "",
  time: "",
  date: "",
  category: "",
  instructions: "",
  positiveMarking: 0,
  negativeMarking: 0,
  Questions: [], // Initialize as an empty array
  _id: "", // Initialize as an empty string
  canAttempt: false,
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
    addQuestion(state, action: PayloadAction<Question>) {
      state.Questions = [...state.Questions, action.payload];
    },
  },
});

export const { setTestDetails, resetFormData, addQuestion } =
  liveTestSlice.actions;

export default liveTestSlice.reducer;
