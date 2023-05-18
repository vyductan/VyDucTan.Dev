import { createSlice } from '@reduxjs/toolkit'
// import { HYDRATE } from 'next-redux-wrapper'

type State = {
  sidebarVisible: boolean
}
const initialState: State = {
  sidebarVisible: false,
}

export const settingsSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleSidebarVisible: (state) => {
      state.sidebarVisible = !state.sidebarVisible
    },
  },
  // extraReducers: {
  //   [HYDRATE]: (state, action) => {
  //     return {
  //       ...state,
  //       ...action.payload.groups,
  //     }
  //   },
  // },
})

// export const { toggleSidebarVisible } = settingsSlice.actions;

// export const settingsReducer = settingsSlice.reducer;
