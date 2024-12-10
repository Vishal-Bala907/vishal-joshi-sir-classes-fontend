import ConfigDB from "@/Config/ThemeConfig";
import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  layout_type: "ltr",
  openCus: false,
  sidebar_types: "compact-wrapper",
  mix_background_layout: "light-only",
  sideBarIconType: "stroke-svg",
  colors: {
    primary_color: "",
    secondary_color: "",
  },
  mixLayout: false,
  sideBarToggle: false,
  margin: 0,
};

const ThemeCustomizerSlice = createSlice({
  name: "themeCustomizer",
  initialState: initialState,
  reducers: {
    setLayoutType: (state, action) => {
      state.layout_type = action.payload;
      if (action.payload === "rtl") {
        document.body.classList.add("rtl");
        document.body.classList.remove("box-layout","ltr");
        document.documentElement.dir = "rtl";
        state.sideBarToggle = false;
      } else if (action.payload === "ltr") {
        document.body.classList.add("ltr");
        document.body.classList.remove("box-layout","rtl");
        document.documentElement.dir = "ltr";
        state.sideBarToggle = false;
      } else if (action.payload === "box-layout") {
        document.body.classList.add("box-layout");
        document.body.classList.remove("offcanvas","ltr","rtl");
        document.documentElement.dir = "ltr";
        state.sideBarToggle = true;
      }
    },
    setOpenCus: (state, action) => {
      state.openCus = action.payload;
    },
    addSidebarTypes: (state, action) => {
      ConfigDB.settings.sidebar.type = action.payload;
      state.sidebar_types = action.payload;
    },
    setSideBarToggle: (state, action) => {
      state.sideBarToggle = action.payload;
    },
    addSideBarBackGround: (state, action) => {
      ConfigDB.color.mix_background_layout = action.payload;
      state.mix_background_layout = action.payload;
    },
    addSidebarIconType: (state, action) => {
      ConfigDB.settings.sidebar.iconType = action.payload;
      state.sideBarIconType = action.payload;
    },
    addColor: (state, action) => {
      const colorBackground1 = action.payload;
      const colorBackground2 = action.payload;
      ConfigDB.color.primary_color = colorBackground1;
      ConfigDB.color.secondary_color = colorBackground2;
      state.colors.primary_color = colorBackground1;
      state.colors.secondary_color = colorBackground2;
    },
    setMixLayout: (state, action) => {
      state.mixLayout = action.payload;
    },
    scrollToLeft: (state) => {
      state.margin += 500;
    },
    scrollToRight: (state) => {
      state.margin -= 500;
    },
  },
});

export const { setLayoutType, setSideBarToggle, addSidebarTypes, addSideBarBackGround, addSidebarIconType, addColor, setOpenCus, scrollToLeft, scrollToRight } = ThemeCustomizerSlice.actions;

export default ThemeCustomizerSlice.reducer;
