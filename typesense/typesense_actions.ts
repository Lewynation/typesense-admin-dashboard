import { Client } from "typesense";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";
import { HealthResponse } from "typesense/lib/Typesense/Health";
import {
  KeyCreateSchema,
  KeyDeleteSchema,
  KeySchema,
} from "typesense/lib/Typesense/Key";
import { KeysRetrieveSchema } from "typesense/lib/Typesense/Keys";
// import { MetricsResponse } from "typesense/lib/Typesense/Metrics";
import { OverridesRetrieveSchema } from "typesense/lib/Typesense/Overrides";
import { SynonymsRetrieveSchema } from "typesense/lib/Typesense/Synonyms";
import {
  CollectionAliasSchema,
  CollectionAliasesResponseSchema,
} from "typesense/lib/Typesense/Aliases";
import { CollectionCreateSchema } from "typesense/lib/Typesense/Collections";
import { ITypesenseActions } from "./typesense_actions.interface";

export class TypesenseClientActions implements ITypesenseActions {
  private client: Client;

  constructor(public typesenseClientInstance: Client) {
    this.client = typesenseClientInstance;
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

  async getSynonyms(collectionName: string): Promise<SynonymsRetrieveSchema> {
    return this.client.collections(collectionName).synonyms().retrieve();
  }

  async getAliases(): Promise<CollectionAliasesResponseSchema> {
    return this.client.aliases().retrieve();
  }

  async createAlias(aliasName: string, collectionName: string) {
    return this.client.aliases().upsert(aliasName, {
      collection_name: collectionName,
    });
  }

  async deleteAlias(aliasName: string): Promise<CollectionAliasSchema> {
    return this.client.aliases(aliasName).delete();
  }

  async deleteAPIKey(keyId: number): Promise<KeyDeleteSchema> {
    return this.client.keys(keyId).delete();
  }

  async retrieveAPIKeyDetails(keyId: number): Promise<KeySchema> {
    return this.client.keys(keyId).retrieve();
  }

  async createCollection(
    schema: CollectionCreateSchema
  ): Promise<CollectionSchema> {
    return this.client.collections().create(schema);
  }
}
