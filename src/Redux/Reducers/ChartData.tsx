import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure of the data you're managing

interface ChartData {
  marks: number;
  questionId: string;
  questionIndex: number;
  questionStatus: string;
  subject: string;
  type: string;
  rightAnswer: []; // Array of objects for the right answer
  testId: string;
  userAnswer: []; // Array of objects for the user answer
  userId: string;
  __v: number;
  _id: string;
  timeTaken: number;
}

// Define the initial state
const initialState: ChartData[] = []; // Array of LiveTestData

const chartData = createSlice({
  name: "chartData",
  initialState,
  reducers: {
    setChartData(state, action: PayloadAction<ChartData[]>) {
      return [...action.payload]; // Add new data to the existing state
    },
    resetChartData() {
      return []; // Reset the state to an empty array
    },
  },
});

export const { setChartData, resetChartData } = chartData.actions;

export default chartData.reducer;
