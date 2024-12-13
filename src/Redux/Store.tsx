import { configureStore } from "@reduxjs/toolkit";
import BookmarkHeaderSlice from "./Reducers/BookmarkHeaderSlice";
import LayoutSlice from "./Reducers/LayoutSlice";
import ThemeCustomizerReducer from "./Reducers/ThemeCustomizerReducer";
import UserReducer from "./Reducers/userSlice";
import StudyReducer from "./Reducers/StudyReducer";
import ChatSlice from "./Reducers/ChatSlice";
import socketReducer from "./Reducers/SocketSlice";
import liveTestReducer from "./Reducers/LiveTestSlice";
import testDetailsSlice from "./Reducers/TestCounterSlice";
import attendDetailsSlice from "./Reducers/AttendSlice";

const Store = configureStore({
  reducer: {
    chat: ChatSlice,
    user: UserReducer,
    layout: LayoutSlice,
    studyMode: StudyReducer,
    bookmarkHeader: BookmarkHeaderSlice,
    themeCustomizer: ThemeCustomizerReducer,
    socket: socketReducer,
    liveTest: liveTestReducer,
    testCounter: testDetailsSlice,
    attend: attendDetailsSlice,
  },
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
