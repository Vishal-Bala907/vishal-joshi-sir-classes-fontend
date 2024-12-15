// Import necessary functions from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  questions: [
    {
      questionIndex: 0,
      questionId: "",
      testId: "",
      userId: "",
      userAnswer: "",
      rightAnswer: "",
      questionStatus: "", // 'correct' or 'incorrect'
      marks: 0,
    },
  ],
};

// Create a slice
const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    addQuestion: (state, action) => {
      state.questions.push(action.payload);
    },
    updateQuestion: (state, action) => {
      const { questionIndex, updates } = action.payload;
      const question = state.questions.find(
        (q) => q.questionIndex === questionIndex
      );
      if (question) {
        Object.assign(question, updates);
      }
    },
    resetQuestions: (state) => {
      state.questions = [
        {
          questionIndex: 0,
          questionId: "",
          testId: "",
          userId: "",
          userAnswer: "",
          rightAnswer: "",
          questionStatus: "",
          marks: 0,
        },
      ];
    },
  },
});

// Export actions
export const { addQuestion, updateQuestion, resetQuestions } =
  questionSlice.actions;

// Export reducer
export default questionSlice.reducer;
