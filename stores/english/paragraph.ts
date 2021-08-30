import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ParagraphItem } from "../../services/english";

type InitialState = {
  loading: boolean;
  data: Array<ParagraphItem>;
  currentParagraph: string;
};
const initialState: InitialState = {
  loading: false,
  data: [],
  currentParagraph: "",
};

export const paragraphSlice = createSlice({
  // 1
  name: "paragraph", // 1
  initialState,
  reducers: {
    request: (state) => {
      state.loading = true;
    },
    add: (state, action) => {
      state.currentParagraph = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.paragraph, // 1
      };
    },
  },
});

// export const { add } = slice.actions;

// export const settingsReducer = slice.reducer;
