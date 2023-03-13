import Typesense, { Client } from "typesense";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";
import { HealthResponse } from "typesense/lib/Typesense/Health";
import { KeyCreateSchema, KeySchema } from "typesense/lib/Typesense/Key";
import { KeysRetrieveSchema } from "typesense/lib/Typesense/Keys";
import { MetricsResponse } from "typesense/lib/Typesense/Metrics";
import { OverridesRetrieveSchema } from "typesense/lib/Typesense/Overrides";

export interface ITypesenseAuthData {
  apiKey: string;
  protocol: string;
  port: number;
  host: string;
  path: string;
}

interface ITypesenseActions {
  getCollectionSchema(collectionName: string): Promise<CollectionSchema>;

  getCollections(): Promise<CollectionSchema[]>;

  getCurations(collectionName: string): Promise<OverridesRetrieveSchema>;

  getAPIKeys(): Promise<KeysRetrieveSchema>;

  createAPIKey(keySchema: KeyCreateSchema): Promise<KeySchema>;

  getHealth(): Promise<HealthResponse>;
}

export default class TypesenseActions implements ITypesenseActions {
  private client: Client;

  constructor(public AuthData: ITypesenseAuthData) {
    this.client = new Typesense.Client({
      nodes: [
        {
          host: AuthData.host,
          port: AuthData.port,
          protocol: AuthData.protocol,
        },
      ],
      apiKey: AuthData.apiKey,
      connectionTimeoutSeconds: 2,
    });
  }

  async getHealth(): Promise<HealthResponse> {
    // const url = `${this.AuthData.protocol}://${this.AuthData.host}:${this.AuthData.port}${this.AuthData.path}/metrics.json`;
    try {
      const healthResponse = await this.client.health.retrieve();
      await this.client.metrics.retrieve();
      // const options = {
      //   method: "GET",
      //   headers: {
      //     "X-TYPESENSE-API-KEY": this.AuthData.apiKey,
      //   },
      // };
      // const res = await fetch(url, options);
      // const newres = res.json();

      return healthResponse;
    } catch (error) {
      console.log(error);
      throw new Error();
    }
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
