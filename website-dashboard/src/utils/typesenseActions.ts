import Typesense, { Client } from "typesense";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";

interface ITypesenseActions {
  getCollectionSchema(collectionName: string): Promise<CollectionSchema>;
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

  getCollectionSchema(collectionName: string): Promise<CollectionSchema> {
    return this.client.collections(collectionName).retrieve();
  }
}
