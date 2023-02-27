import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";
import TypesenseActions from "../../../utils/typesenseActions";

interface IInitialState {
  collectionSchema: CollectionSchema;
}

const initialState: IInitialState = {
  collectionSchema: {} as CollectionSchema,
};

export const getCollectionSchema = createAsyncThunk(
  "typesense/getCollectionSchema",
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
      // return action.payload;
    });
  },
});

export default typesenseSlice.reducer;
