import { Client } from "typesense";
import {
  CollectionSchema,
  CollectionUpdateSchema,
} from "typesense/lib/Typesense/Collection";
import { HealthResponse } from "typesense/lib/Typesense/Health";
import {
  KeyCreateSchema,
  KeyDeleteSchema,
  KeySchema,
} from "typesense/lib/Typesense/Key";
import { KeysRetrieveSchema } from "typesense/lib/Typesense/Keys";
// import { MetricsResponse } from "typesense/lib/Typesense/Metrics";
import {
  OverrideCreateSchema,
  OverridesRetrieveSchema,
} from "typesense/lib/Typesense/Overrides";
import {
  SynonymCreateSchema,
  SynonymsRetrieveSchema,
} from "typesense/lib/Typesense/Synonyms";
import {
  CollectionAliasSchema,
  CollectionAliasesResponseSchema,
} from "typesense/lib/Typesense/Aliases";
import { CollectionCreateSchema } from "typesense/lib/Typesense/Collections";
import { ITypesenseActions } from "./typesense_actions.interface";
import {
  SynonymDeleteSchema,
  SynonymSchema,
} from "typesense/lib/Typesense/Synonym";
import {
  OverrideDeleteSchema,
  OverrideSchema,
} from "typesense/lib/Typesense/Override";
import { AnalyticsRuleCreateSchema } from "typesense/lib/Typesense/AnalyticsRule";
import { PresetCreateSchema } from "typesense/lib/Typesense/Presets";
import {
  DocumentImportParameters,
  DocumentSchema,
  ImportResponse,
} from "typesense/lib/Typesense/Documents";
import { StopwordCreateSchema } from "typesense/lib/Typesense/Stopwords";
import { ConversationModelCreateSchema } from "typesense/lib/Typesense/ConversationModel";
import { NLSearchModelCreateSchema } from "typesense/lib/Typesense/NLSearchModels";
import { StemmingDictionaryCreateSchema } from "typesense/lib/Typesense/StemmingDictionary";
import { getTypesenseUrl } from "./get_typesense_url";
import {
  CollectionImportAction,
  CollectionImportDealingWithDirtyData,
} from "@/zod/enums/document_import_actions";

export class TypesenseClientActions implements ITypesenseActions {
  private client: Client;

  constructor(public typesenseClientInstance: Client) {
    this.client = typesenseClientInstance;
  }

  async getHealth(): Promise<HealthResponse> {
    const healthResponse = await this.client.health.retrieve();
    await this.client.metrics.retrieve();
    return healthResponse;
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

  getCollection(collectionName: string): Promise<CollectionSchema> {
    return this.client.collections(collectionName).retrieve();
  }

  importDocuments(
    collectionName: string,
    documents: object[],
    options: DocumentImportParameters | undefined,
  ): Promise<ImportResponse<object>[]> {
    return this.client
      .collections(collectionName)
      .documents()
      .import(documents, {
        return_id: true,
        ...options,
      });
  }

  deleteDocument(collectionName: string, documentId: string): Promise<object> {
    return this.client
      .collections(collectionName)
      .documents(documentId)
      .delete();
  }

  updateCollection(
    collectionName: string,
    schema: CollectionUpdateSchema,
  ): Promise<CollectionSchema> {
    return this.client.collections(collectionName).update(schema);
  }

  deleteCollection(collectionName: string, compactStore?: boolean) {
    return this.client
      .collections(collectionName)
      .delete({ compact_store: compactStore });
  }

  truncateCollection(collectionName: string) {
    return this.client
      .collections(collectionName)
      .documents()
      .delete({ truncate: true });
  }

  getCollectionSchema(collectionName: string): Promise<CollectionSchema> {
    return this.client.collections(collectionName).retrieve();
  }

  getOverrides(collectionName: string): Promise<OverridesRetrieveSchema> {
    return this.client.collections(collectionName).overrides().retrieve();
  }

  async createOverride(
    collectionName: string,
    overrideName: string,
    overrideCreateSchema: OverrideCreateSchema,
  ): Promise<OverrideSchema> {
    return this.client
      .collections(collectionName)
      .overrides()
      .upsert(overrideName, overrideCreateSchema);
  }

  async getOverride(
    collectionName: string,
    overrideName: string,
  ): Promise<OverrideSchema> {
    return this.client
      .collections(collectionName)
      .overrides(overrideName)
      .retrieve();
  }

  async deleteOverride(
    collectionName: string,
    overrideName: string,
  ): Promise<OverrideDeleteSchema> {
    return this.client
      .collections(collectionName)
      .overrides(overrideName)
      .delete();
  }

  async getSynonyms(collectionName: string): Promise<SynonymsRetrieveSchema> {
    return this.client.collections(collectionName).synonyms().retrieve();
  }

  async createSynonym(
    synonymId: string,
    collectionName: string,
    synonymCreateSchema: SynonymCreateSchema,
  ): Promise<SynonymSchema> {
    return this.client
      .collections(collectionName)
      .synonyms()
      .upsert(synonymId, synonymCreateSchema);
  }

  async getSynonym(
    synonymId: string,
    collectionName: string,
  ): Promise<SynonymSchema> {
    return this.client
      .collections(collectionName)
      .synonyms(synonymId)
      .retrieve();
  }

  async deleteSynonym(
    synonymId: string,
    collectionName: string,
  ): Promise<SynonymDeleteSchema> {
    return this.client.collections(collectionName).synonyms(synonymId).delete();
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
    schema: CollectionCreateSchema,
  ): Promise<CollectionSchema> {
    return this.client.collections().create(schema);
  }

  async createAnalyticsRule(
    ruleName: string,
    schema: AnalyticsRuleCreateSchema,
  ) {
    return this.client.analytics.rules().upsert(ruleName, schema);
  }

  async getAnalyticsRules() {
    return this.client.analytics.rules().retrieve();
  }

  async deleteAnalyticsRule(ruleName: string) {
    return this.client.analytics.rules(ruleName).delete();
  }

  async getAnalyticsRule(ruleName: string) {
    return this.client.analytics.rules(ruleName).retrieve();
  }

  async createSearchPreset(
    presetId: string,
    schema: PresetCreateSchema<DocumentSchema, string>,
  ) {
    return this.client.presets().upsert(presetId, schema);
  }

  async getSearchPreset(presetId: string) {
    return this.client.presets(presetId).retrieve();
  }

  async getSearchPresets() {
    return this.client.presets().retrieve();
  }

  async deleteSearchPreset(presetId: string) {
    return this.client.presets(presetId).delete();
  }

  async createStopWord(stopWordId: string, schema: StopwordCreateSchema) {
    return this.client.stopwords().upsert(stopWordId, schema);
  }

  async deleteStopWord(stopWordId: string) {
    return this.client.stopwords(stopWordId).delete();
  }

  async getStopWord(stopWordId: string) {
    return this.client.stopwords(stopWordId).retrieve();
  }

  async getStopWords() {
    return this.client.stopwords().retrieve();
  }

  async createConversationalModel(schema: ConversationModelCreateSchema) {
    return this.client.conversations().models().create(schema);
  }

  async updateConversationalModel(
    conversationalModelId: string,
    schema: ConversationModelCreateSchema,
  ) {
    return this.client
      .conversations()
      .models(conversationalModelId)
      .update(schema);
  }

  async deleteConversationalModel(conversationalModelId: string) {
    return this.client.conversations().models(conversationalModelId).delete();
  }

  async getConversationalModel(conversationalModelId: string) {
    return this.client.conversations().models(conversationalModelId).retrieve();
  }

  async getConversationalModels() {
    return this.client.conversations().models().retrieve();
  }

  async createNLSearchModel(schema: NLSearchModelCreateSchema) {
    return this.client.nlSearchModels().create(schema);
  }

  async getNLSearchModels() {
    return this.client.nlSearchModels().retrieve();
  }

  async getNLSearchModel(nlSearchModelId: string) {
    return this.client.nlSearchModels(nlSearchModelId).retrieve();
  }

  async updateNLSearchModel(
    nlSearchModelId: string,
    schema: NLSearchModelCreateSchema,
  ) {
    return this.client.nlSearchModels(nlSearchModelId).update(schema);
  }

  async deleteNLSearchModel(nlSearchModelId: string) {
    return this.client.nlSearchModels(nlSearchModelId).delete();
  }

  async createStemmingDictionary(
    dictionaryId: string,
    schema: string | StemmingDictionaryCreateSchema[],
  ) {
    return this.client.stemming.dictionaries().upsert(dictionaryId, schema);
  }

  async getStemmingDictionaries() {
    return this.client.stemming.dictionaries().retrieve();
  }

  async getStemmingDictionary(stemmingId: string) {
    return this.client.stemming.dictionaries(stemmingId).retrieve();
  }

  async deleteStemmingDictionary(dictionaryId: string) {
    const baseUrl = getTypesenseUrl(this.client.configuration);
    await fetch(`${baseUrl}/stemming/dictionaries/${dictionaryId}`, {
      method: "DELETE",
      headers: {
        "X-TYPESENSE-API-KEY": this.client.configuration.apiKey,
      },
    });
  }

  async cloneCollectionSchema(
    existingCollection: string,
    newCollection: string,
  ) {
    const baseUrl = getTypesenseUrl(this.client.configuration);
    await fetch(`${baseUrl}/collections?src_name=${existingCollection}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-TYPESENSE-API-KEY": this.client.configuration.apiKey,
      },
      body: JSON.stringify({
        name: newCollection,
      }),
    });
  }

  async exportCollectionDocuments(
    collectionName: string,
    filterBy?: string,
    excludeFields?: string,
    includeFields?: string,
  ) {
    return this.client.collections(collectionName).documents().exportStream({
      filter_by: filterBy,
      exclude_fields: excludeFields,
      include_fields: includeFields,
    });
  }
}
