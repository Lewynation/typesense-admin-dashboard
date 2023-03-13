/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  theme: string;
}

const initialState: IInitialState = {
  theme: "",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme(state, action) {
      state.theme = action.payload;
    },
  },
});

export default themeSlice.reducer;
export const { changeTheme } = themeSlice.actions;
