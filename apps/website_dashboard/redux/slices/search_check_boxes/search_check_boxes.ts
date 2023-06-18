/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import SearchState from "./initial_state";

export interface ChildCheckbox {
  value: string;
  enabledBySelf: boolean;
  enabledByTitle: boolean;
}

export interface Searches {
  value: string;
  selected: boolean;
  children: ChildCheckbox[];
}

export interface SearchCheckBoxesState {
  searchCheckBoxes: Searches[];
}

const initialState: SearchCheckBoxesState = {
  searchCheckBoxes: SearchState,
};

const searchCheckBoxesSlice = createSlice({
  name: "searchCheckBoxes",
  initialState,
  reducers: {
    toggleTitleCheckbox(state, action) {
      const { value } = action.payload;
      const titleCheckbox = state.searchCheckBoxes.findIndex(
        (checkbox) => checkbox.value === value
      );
      if (titleCheckbox === -1) {
        return;
      }
      state.searchCheckBoxes[titleCheckbox].selected =
        !state.searchCheckBoxes[titleCheckbox].selected;
      const titleState = state.searchCheckBoxes[titleCheckbox].selected;
      state.searchCheckBoxes[titleCheckbox].children.forEach((child) => {
        child.enabledByTitle = titleState;
      });
    },
    toggleChildCheckbox(state, action) {
      const { value, parent } = action.payload;
      const titleCheckbox = state.searchCheckBoxes.findIndex(
        (checkbox) => checkbox.value === parent
      );
      if (titleCheckbox === -1) {
        return;
      }
      const node = state.searchCheckBoxes[titleCheckbox].children.findIndex(
        (child) => child.value === value
      );
      if (node === -1) {
        return;
      }
      if (state.searchCheckBoxes[titleCheckbox].selected === true) {
        state.searchCheckBoxes[titleCheckbox].selected = false;
      }
      if (
        state.searchCheckBoxes[titleCheckbox].children[node].enabledByTitle ===
        true
      ) {
        state.searchCheckBoxes[titleCheckbox].children[node].enabledByTitle =
          false;
      } else {
        state.searchCheckBoxes[titleCheckbox].children[node].enabledBySelf =
          !state.searchCheckBoxes[titleCheckbox].children[node].enabledBySelf;
      }
    },
  },
});

export default searchCheckBoxesSlice.reducer;
export const { toggleTitleCheckbox, toggleChildCheckbox } =
  searchCheckBoxesSlice.actions;
