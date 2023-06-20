import Typesense, { Client } from "typesense";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";
import { HealthResponse } from "typesense/lib/Typesense/Health";
import { KeyCreateSchema, KeySchema } from "typesense/lib/Typesense/Key";
import { KeysRetrieveSchema } from "typesense/lib/Typesense/Keys";
// import { MetricsResponse } from "typesense/lib/Typesense/Metrics";
import { OverridesRetrieveSchema } from "typesense/lib/Typesense/Overrides";
import { ITypesenseActions } from "./typesense_actions.interface";
import { ITypesenseAuthData } from "./typesense_auth_data.interface";

export class TypesenseActions implements ITypesenseActions {
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
      //   healthcheckIntervalSeconds: 10,
      //   timeoutSeconds: 2,
    });
  }

  async getHealth(): Promise<HealthResponse> {
    try {
      const healthResponse = await this.client.health.retrieve();
      await this.client.metrics.retrieve();
      return healthResponse;
    } catch (error) {
      console.log(error);
      throw new Error("Something went ");
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
