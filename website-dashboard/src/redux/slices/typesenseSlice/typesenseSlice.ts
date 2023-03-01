import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";
import TypesenseActions from "../../../utils/typesenseActions";
import getOutput from "../../../utils/typesenseFields";

interface IInitialState {
  collectionSchema: CollectionSchema;
  documentTemplate: any;
}

const initialState: IInitialState = {
  collectionSchema: {} as CollectionSchema,
  documentTemplate: [],
};

export const getCollectionSchema = createAsyncThunk(
  "typesense/getCollectionSchema",
  async (collectionName: string) => {
    const typesenseAPI = new TypesenseActions(); // Handle this more gracefully
    const response = await typesenseAPI.getCollectionSchema(collectionName);
    return response;
  }
);

export const getDocumentTemplate = createAsyncThunk(
  "typesense/getDocumentTemplate",
  async (collectionName: string) => {
    const typesenseAPI = new TypesenseActions(); // Handle this more gracefully
    const response = await typesenseAPI.getCollectionSchema(collectionName);
    return response;
  }
);

const typesenseSlice = createSlice({
  name: "typesense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCollectionSchema.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.collectionSchema = action.payload;
    });
    builder.addCase(getDocumentTemplate.fulfilled, (state, action) => {
      const docObject: any = {};
      action.payload.fields?.forEach((field: any) => {
        docObject[field.name] = getOutput(field.type);
      });
      // eslint-disable-next-line no-param-reassign
      state.documentTemplate = [docObject];
    });
  },
});

export default typesenseSlice.reducer;
