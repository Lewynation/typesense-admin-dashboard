import { createSlice } from "@reduxjs/toolkit";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";
import { KeySchema } from "typesense/lib/Typesense/Key";
import { OverridesRetrieveSchema } from "typesense/lib/Typesense/Overrides";
import getOutput from "../../../utils/typesenseFields";

import * as Thunks from "./asyncThunks";

interface IInitialState {
  collectionSchema: CollectionSchema;
  documentTemplate: any;
  collections: CollectionSchema[];
  curations: OverridesRetrieveSchema;
  adminApiKeys: KeySchema;
  keysReturned: boolean;
}

const initialState: IInitialState = {
  collectionSchema: {} as CollectionSchema,
  documentTemplate: [],
  collections: [] as CollectionSchema[],
  curations: {} as OverridesRetrieveSchema,
  adminApiKeys: {} as KeySchema,
  keysReturned: false,
};

const typesenseSlice = createSlice({
  name: "typesense",
  initialState,
  reducers: {
    closeAPIKeyModal(state) {
      // eslint-disable-next-line no-param-reassign
      state.keysReturned = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(Thunks.getCollectionSchema.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.collectionSchema = action.payload;
    });
    builder.addCase(Thunks.createAPIKey.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.keysReturned = true;
      // eslint-disable-next-line no-param-reassign
      state.adminApiKeys = action.payload;
    });
  },
});

export default typesenseSlice.reducer;
export const { closeAPIKeyModal } = typesenseSlice.actions;
