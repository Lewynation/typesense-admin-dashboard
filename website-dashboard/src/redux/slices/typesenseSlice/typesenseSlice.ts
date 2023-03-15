/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { KeySchema } from "typesense/lib/Typesense/Key";

import * as Thunks from "./asyncThunks";

interface IInitialState {
  adminApiKeys: KeySchema;
  keysReturned: boolean;
  searchKeysReturned: boolean;
  searchAPIKeys: KeySchema;
  healthy: boolean;
  curationCreated: boolean;
  curationCreationError: boolean;
}

const initialState: IInitialState = {
  adminApiKeys: {} as KeySchema,
  keysReturned: false,
  searchAPIKeys: {} as KeySchema,
  searchKeysReturned: false,
  healthy: false,
  curationCreated: true,
  curationCreationError: false,
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
    restoreCurationCreatedOrError(state) {
      state.curationCreated = false;
      state.curationCreationError = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(Thunks.createAPIKey.fulfilled, (state, action) => {
      state.keysReturned = true;
      state.adminApiKeys = action.payload;
    });
    builder.addCase(
      Thunks.createSearchOnlyAPIKey.fulfilled,
      (state, action) => {
        state.searchKeysReturned = true;
        state.searchAPIKeys = action.payload;
      }
    );
    builder.addCase(Thunks.confirmHealth.fulfilled, (state, action) => {
      state.healthy = action.payload.ok;
    });
    builder.addCase(Thunks.confirmHealth.rejected, (state) => {
      state.healthy = false;
    });
    builder.addCase(Thunks.createCuration.fulfilled, (state) => {
      state.curationCreated = true;
    });
    builder.addCase(Thunks.createCuration.rejected, (state) => {
      state.curationCreationError = true;
    });
  },
});

export default typesenseSlice.reducer;
export const { closeAPIKeyModal, restoreCurationCreatedOrError } =
  typesenseSlice.actions;
