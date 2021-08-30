import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

type State = {
  currentParagraph: string;
};
const initialState: State = {
  currentParagraph: "",
};

export const paragraphSlice = createSlice({
  // 1
  name: "paragraph", // 1
  initialState,
  reducers: {
    add: (state, action) => {
      state.currentParagraph = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.root, // 1
      };
    },
  },
});
