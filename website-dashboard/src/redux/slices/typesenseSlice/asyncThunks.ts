import { createAsyncThunk } from "@reduxjs/toolkit";
import { KeyCreateSchema } from "typesense/lib/Typesense/Key";
import TypesenseActions, {
  ITypesenseAuthData,
} from "../../../utils/typesenseActions";

interface ICreateAPIKey {
  schema: KeyCreateSchema;
  authData: ITypesenseAuthData;
}
export const createAPIKey = createAsyncThunk(
  "typesense/createAPIKey",
  async ({ schema, authData }: ICreateAPIKey) => {
    const typesenseAPI = new TypesenseActions(authData); // Handle this more gracefully
    const response = await typesenseAPI.createAPIKey(schema);
    return response;
  }
);

interface ICreateSearchOnlyAPIKey {
  keySchema: KeyCreateSchema;
  authData: ITypesenseAuthData;
}
export const createSearchOnlyAPIKey = createAsyncThunk(
  "typesense/createSearchOnlyAPIKey",
  async ({ keySchema, authData }: ICreateSearchOnlyAPIKey) => {
    const typesenseAPI = new TypesenseActions(authData); // Handle this more gracefully
    const response = await typesenseAPI.createAPIKey(keySchema);
    return response;
  }
);

export const confirmHealth = createAsyncThunk(
  "typesense/confirmHealth",
  async (typesenseAuthData: ITypesenseAuthData) => {
    const typesenseAPI = new TypesenseActions(typesenseAuthData); // Handle this more gracefully
    try {
      const response = await typesenseAPI.getHealth();
      return response;
    } catch (error) {
      throw new Error("Could not connect to Typesense");
    }
  }
);
