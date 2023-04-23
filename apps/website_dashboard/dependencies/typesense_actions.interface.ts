import { CollectionSchema } from "typesense/lib/Typesense/Collection";
import { HealthResponse } from "typesense/lib/Typesense/Health";
import { KeyCreateSchema, KeySchema } from "typesense/lib/Typesense/Key";
import { KeysRetrieveSchema } from "typesense/lib/Typesense/Keys";
import { OverridesRetrieveSchema } from "typesense/lib/Typesense/Overrides";

export interface ITypesenseActions {
  getCollectionSchema(collectionName: string): Promise<CollectionSchema>;

  getCollections(): Promise<CollectionSchema[]>;

  getCurations(collectionName: string): Promise<OverridesRetrieveSchema>;

  getAPIKeys(): Promise<KeysRetrieveSchema>;

  createAPIKey(keySchema: KeyCreateSchema): Promise<KeySchema>;

  getHealth(): Promise<HealthResponse>;
}
