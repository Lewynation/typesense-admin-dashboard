import { createSlice } from "@reduxjs/toolkit";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";
import { OverridesRetrieveSchema } from "typesense/lib/Typesense/Overrides";
import getOutput from "../../../utils/typesenseFields";

import * as Thunks from "./asyncThunks";

interface IInitialState {
  collectionSchema: CollectionSchema;
  documentTemplate: any;
  collections: CollectionSchema[];
  curations: OverridesRetrieveSchema;
}

const initialState: IInitialState = {
  collectionSchema: {} as CollectionSchema,
  documentTemplate: [],
  collections: [] as CollectionSchema[],
  curations: {} as OverridesRetrieveSchema,
};

const typesenseSlice = createSlice({
  name: "typesense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(Thunks.getCollectionSchema.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.collectionSchema = action.payload;
    });
    builder.addCase(Thunks.getDocumentTemplate.fulfilled, (state, action) => {
      const docObject: any = {};
      action.payload.fields?.forEach((field: any) => {
        docObject[field.name] = getOutput(field.type);
      });
      // eslint-disable-next-line no-param-reassign
      state.documentTemplate = [docObject];
    });
    builder.addCase(Thunks.getCollections.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.collections = action.payload;
    });
    builder.addCase(Thunks.getCurations.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.curations = action.payload;
    });
  },
});

export default typesenseSlice.reducer;
