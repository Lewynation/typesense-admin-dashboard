/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";
import { KeySchema } from "typesense/lib/Typesense/Key";
import { OverridesRetrieveSchema } from "typesense/lib/Typesense/Overrides";

import * as Thunks from "./asyncThunks";

interface IInitialState {
  collectionSchema: CollectionSchema;
  documentTemplate: any;
  collections: CollectionSchema[];
  curations: OverridesRetrieveSchema;
  adminApiKeys: KeySchema;
  keysReturned: boolean;
  searchKeysReturned: boolean;
  searchAPIKeys: KeySchema;
  healthy: boolean;
}

const initialState: IInitialState = {
  collectionSchema: {} as CollectionSchema,
  documentTemplate: [],
  collections: [] as CollectionSchema[],
  curations: {} as OverridesRetrieveSchema,
  adminApiKeys: {} as KeySchema,
  keysReturned: false,
  searchAPIKeys: {} as KeySchema,
  searchKeysReturned: false,
  healthy: true,
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
    builder.addCase(Thunks.getCollectionSchema.fulfilled, (state, action) => {
      state.collectionSchema = action.payload;
    });
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
      console.log("TypesenseSlice", action.payload);
      state.healthy = action.payload.ok;
    });
  },
});

export default typesenseSlice.reducer;
export const { closeAPIKeyModal } = typesenseSlice.actions;
