import {
  CollectionAliasSchema,
  CollectionAliasesResponseSchema,
} from "typesense/lib/Typesense/Aliases";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";
import { CollectionCreateSchema } from "typesense/lib/Typesense/Collections";
import { HealthResponse } from "typesense/lib/Typesense/Health";
import {
  KeyCreateSchema,
  KeyDeleteSchema,
  KeySchema,
} from "typesense/lib/Typesense/Key";
import { KeysRetrieveSchema } from "typesense/lib/Typesense/Keys";
import { OverridesRetrieveSchema } from "typesense/lib/Typesense/Overrides";
import { SynonymsRetrieveSchema } from "typesense/lib/Typesense/Synonyms";

export interface ITypesenseActions {
  getCollectionSchema(collectionName: string): Promise<CollectionSchema>;

  getCollections(): Promise<CollectionSchema[]>;

  getCurations(collectionName: string): Promise<OverridesRetrieveSchema>;

  getAPIKeys(): Promise<KeysRetrieveSchema>;

  createAPIKey(keySchema: KeyCreateSchema): Promise<KeySchema>;

  getHealth(): Promise<HealthResponse>;

  getSynonyms(collectionName: string): Promise<SynonymsRetrieveSchema>;

  getAliases(collectionName: string): Promise<CollectionAliasesResponseSchema>;

  createAlias(
    collectionName: string,
    aliasName: string
  ): Promise<CollectionAliasSchema>;

  deleteAlias(collectionName: string): Promise<CollectionAliasSchema>;

  deleteAPIKey(keyId: number): Promise<KeyDeleteSchema>;

  retrieveAPIKeyDetails(keyId: number): Promise<KeySchema>;

  createCollection(schema: CollectionCreateSchema): Promise<CollectionSchema>;
}
