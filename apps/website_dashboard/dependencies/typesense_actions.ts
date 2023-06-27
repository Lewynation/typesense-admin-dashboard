import Typesense, { Client } from "typesense";
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
import { ITypesenseActions } from "./typesense_actions.interface";
import { ITypesenseAuthData } from "./typesense_auth_data.interface";
import { SynonymsRetrieveSchema } from "typesense/lib/Typesense/Synonyms";
import { TypesenseError } from "typesense/lib/Typesense/Errors";
import { type } from "os";
import {
  CollectionAliasSchema,
  CollectionAliasesResponseSchema,
} from "typesense/lib/Typesense/Aliases";

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

  async getSynonyms(collectionName: string): Promise<SynonymsRetrieveSchema> {
    const url = `${this.AuthData.protocol}://${this.AuthData.host}:${this.AuthData.port}${this.AuthData.path}/collections/${collectionName}/synonyms`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "X-TYPESENSE-API-KEY": this.AuthData.apiKey,
        },
      });

      if (response.status !== 200) {
        throw new TypesenseError("Something went wrong");
      }

      const synonyms = await response.json();
      return {
        synonyms: synonyms.synonyms.map((synonym) => {
          return {
            id: synonym["id"],
            synonyms: synonym["synonyms"],
            root: synonym["root"] || "",
          };
        }),
      };
    } catch (error) {
      const typesenseError = new TypesenseError("something went wrong");
      typesenseError.httpStatus = 404;
      typesenseError.cause = "unkown";
      throw typesenseError;
    }
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
}

// const response = await fetch(url, {
//   method: "PUT",
//   headers: {
//     "content-type": "application/json",
//     "X-TYPESENSE-API-KEY": this.AuthData.apiKey,
//   },
//   body: JSON.stringify({
//     synonyms: ["iphone", "ipad"],
//     root: "apple",
//   }),
// });
