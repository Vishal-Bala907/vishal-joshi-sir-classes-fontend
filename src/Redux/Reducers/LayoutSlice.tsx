import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  responsiveSearch: false,
  pinedMenu: [""],
  flip: false,
};

const LayoutSlice = createSlice({
  name: "LayoutSlice",
  initialState,
  reducers: {
    setPinedMenu: (state, action) => {
      state.pinedMenu = action.payload;
    },
    handlePined: (state, action) => {
      if (action.payload) {
        if (state.pinedMenu.includes(action.payload)) {
          let filterMenu = state.pinedMenu.filter(
            (item) => item !== action.payload
          );
          state.pinedMenu = filterMenu;
        } else {
          state.pinedMenu = [...state.pinedMenu, action.payload];
        }
      }
    },
    setResponsiveSearch: (state) => {
      state.responsiveSearch = !state.responsiveSearch;
    },
    setFlip: (state) => {
      state.flip = !state.flip;
    },
  },
});

export const { setPinedMenu, handlePined, setResponsiveSearch, setFlip } =
  LayoutSlice.actions;

export default LayoutSlice.reducer;
