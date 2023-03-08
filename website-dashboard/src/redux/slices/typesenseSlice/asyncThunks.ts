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

export const getDocumentTemplate = createAsyncThunk(
  "typesense/getDocumentTemplate",
  async (collectionName: string) => {
    const typesenseAPI = new TypesenseActions(); // Handle this more gracefully
    const response = await typesenseAPI.getCollectionSchema(collectionName);
    return response;
  }
);

export const getCollections = createAsyncThunk(
  "typesense/getCollections",
  async () => {
    const typesenseAPI = new TypesenseActions(); // Handle this more gracefully
    const response = await typesenseAPI.getCollections();
    return response;
  }
);

export const getCurations = createAsyncThunk(
  "typesense/getCurations",
  async (collectionName: string) => {
    const typesenseAPI = new TypesenseActions(); // Handle this more gracefully
    const response = await typesenseAPI.getCurations(collectionName);
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
