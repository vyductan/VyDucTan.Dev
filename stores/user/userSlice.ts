import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PartialNull } from "../../typings";
import { UserItem } from "../../services/user";

const initialState: UserItem = {
  name: "No Name",
  email: "noname@noname.com",
  avatar: "/logo.png",
};

export const slice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<PartialNull<UserItem>>) => {
      state.name = action.payload.name || initialState.name;
      state.email = action.payload.email || initialState.email;
      state.avatar = action.payload.avatar || initialState.avatar;
    },
    getUser: (state) => {},
  },
});

// Action creators are generated for each case reducer function
export const { setUser, getUser } = slice.actions;

export const userReducer = slice.reducer;
