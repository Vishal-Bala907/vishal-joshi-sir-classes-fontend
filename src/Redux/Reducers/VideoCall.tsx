// src/store/userSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VideoState {
  CHANNEL_NAME: string;
  ROLE: number;
  USER_ID: string;
  privilegeExpireTime: number;
  token: string | null; // Use null initially for token
}

const initialState: VideoState = {
  CHANNEL_NAME: "",
  ROLE: 0,
  USER_ID: "",
  privilegeExpireTime: 0,
  token: null,
};

const VideoCall = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideoCallState(state, action: PayloadAction<VideoState>) {
      return action.payload;
    },
    resetVideoCallState() {
      return initialState;
    },
    updateToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
});

export const { setVideoCallState, resetVideoCallState, updateToken } =
  VideoCall.actions;

export default VideoCall.reducer;
