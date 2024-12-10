import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    started: false,
    timeStarted: 0,
};

const StudySlice = createSlice({
    name: "StudySlice",
    initialState,
    reducers: {
        setStudyModeOn: (state) => {
            state.started = true;
            state.timeStarted = new Date().getTime();
        },
        setStudyModeOff: (state) => {
            state.started = false;
        },
        setStudyModeState: (state, action) => {
            return action.payload;
        },
    },
});

export const { setStudyModeOn, setStudyModeOff, setStudyModeState } = StudySlice.actions;

export default StudySlice.reducer;
