import { createAsyncThunk } from "@reduxjs/toolkit";
import { KeyCreateSchema } from "typesense/lib/Typesense/Key";
import TypesenseActions from "../../../utils/typesenseActions";

export const getCollectionSchema = createAsyncThunk(
  "typesense/getCollectionSchema",
  async (collectionName: string) => {
    const typesenseAPI = new TypesenseActions(); // Handle this more gracefully
    const response = await typesenseAPI.getCollectionSchema(collectionName);
    return response;
  }
);

export const createAPIKey = createAsyncThunk(
  "typesense/createAPIKey",
  async (keySchema: KeyCreateSchema) => {
    const typesenseAPI = new TypesenseActions(); // Handle this more gracefully
    const response = await typesenseAPI.createAPIKey(keySchema);
    return response;
  }
);

export const createSearchOnlyAPIKey = createAsyncThunk(
  "typesense/createSearchOnlyAPIKey",
  async (keySchema: KeyCreateSchema) => {
    const typesenseAPI = new TypesenseActions(); // Handle this more gracefully
    const response = await typesenseAPI.createAPIKey(keySchema);
    return response;
  }
);
