import { createSlice } from "@reduxjs/toolkit";

type State = {
  sidebarVisible: boolean;
};
const initialState: State = {
  sidebarVisible: false,
};

export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebarVisible: (state) => {
      state.sidebarVisible = !state.sidebarVisible;
    },
  },
});

export const { toggleSidebarVisible } = slice.actions;

export const settingsReducer = slice.reducer;
