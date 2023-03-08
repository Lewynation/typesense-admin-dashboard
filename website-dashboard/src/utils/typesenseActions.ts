import Typesense, { Client } from "typesense";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";
import { KeyCreateSchema, KeySchema } from "typesense/lib/Typesense/Key";
import { KeysRetrieveSchema } from "typesense/lib/Typesense/Keys";
import { OverridesRetrieveSchema } from "typesense/lib/Typesense/Overrides";

interface ITypesenseActions {
  getCollectionSchema(collectionName: string): Promise<CollectionSchema>;

  getCollections(): Promise<CollectionSchema[]>;

  getCurations(collectionName: string): Promise<OverridesRetrieveSchema>;

  getAPIKeys(): Promise<KeysRetrieveSchema>;

  createAPIKey(keySchema: KeyCreateSchema): Promise<KeySchema>;
}

export default class TypesenseActions implements ITypesenseActions {
  private client: Client;

  constructor() {
    this.client = new Typesense.Client({
      nodes: [
        {
          host: "localhost",
          port: 8108,
          protocol: "http",
        },
      ],
      apiKey: "abc",
      connectionTimeoutSeconds: 2,
    });
  }

  createAPIKey(keySchema: KeyCreateSchema): Promise<KeySchema> {
    return this.client.keys().create(keySchema);
  }

  getAPIKeys(): Promise<KeysRetrieveSchema> {
    return this.client.keys().retrieve();
  }

  getCollections(): Promise<CollectionSchema[]> {
    return this.client.collections().retrieve();
  }

  getCollectionSchema(collectionName: string): Promise<CollectionSchema> {
    return this.client.collections(collectionName).retrieve();
  }

  getCurations(collectionName: string): Promise<OverridesRetrieveSchema> {
    return this.client.collections(collectionName).overrides().retrieve();
  }
}
