/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import * as Thunks from "./asyncThunks";

interface IInitialState {
  keysReturned: boolean;
  searchKeysReturned: boolean;
  healthy: boolean;
}

const initialState: IInitialState = {
  keysReturned: false,
  searchKeysReturned: false,
  healthy: false,
};

const typesenseSlice = createSlice({
  name: "typesense",
  initialState,
  reducers: {
    closeAPIKeyModal(state, action) {
      const { value } = action.payload;
      switch (value) {
        case "admin":
          state.keysReturned = false;
          break;
        case "search":
          state.searchKeysReturned = false;
          break;
        default:
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(Thunks.confirmHealth.fulfilled, (state, action) => {
      state.healthy = action.payload.ok;
    });
    builder.addCase(Thunks.confirmHealth.rejected, (state) => {
      state.healthy = false;
    });
  },
});

export default typesenseSlice.reducer;
export const { closeAPIKeyModal } = typesenseSlice.actions;
