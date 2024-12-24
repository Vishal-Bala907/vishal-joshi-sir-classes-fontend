import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IsLiveState {
  isLive: boolean;
}

const initialState: IsLiveState = {
  isLive: false,
};

const isLiveSlice = createSlice({
  name: "isLive",
  initialState,
  reducers: {
    setIsLive(state, action: PayloadAction<boolean>) {
      state.isLive = action.payload;
    },
    toggleIsLive(state) {
      state.isLive = !state.isLive;
    },
  },
});

export const { setIsLive, toggleIsLive } = isLiveSlice.actions;

export default isLiveSlice.reducer;
