import { ReadStream } from "fs";
import {
  CollectionAliasSchema,
  CollectionAliasesResponseSchema,
} from "typesense/lib/Typesense/Aliases";
import {
  AnalyticsRuleCreateSchema,
  AnalyticsRuleDeleteSchema,
  AnalyticsRuleSchema,
} from "typesense/lib/Typesense/AnalyticsRule";
import { AnalyticsRulesRetrieveSchema } from "typesense/lib/Typesense/AnalyticsRules";
import {
  CollectionSchema,
  CollectionUpdateSchema,
} from "typesense/lib/Typesense/Collection";
import { CollectionCreateSchema } from "typesense/lib/Typesense/Collections";
import {
  ConversationModelCreateSchema,
  ConversationModelDeleteSchema,
  ConversationModelSchema,
} from "typesense/lib/Typesense/ConversationModel";
import {
  DeleteResponse,
  DocumentImportParameters,
  DocumentSchema,
  ImportResponse,
} from "typesense/lib/Typesense/Documents";
import { HealthResponse } from "typesense/lib/Typesense/Health";
import {
  KeyCreateSchema,
  KeyDeleteSchema,
  KeySchema,
} from "typesense/lib/Typesense/Key";
import { KeysRetrieveSchema } from "typesense/lib/Typesense/Keys";
import { NLSearchModelDeleteSchema } from "typesense/lib/Typesense/NLSearchModel";
import {
  NLSearchModelCreateSchema,
  NLSearchModelSchema,
  NLSearchModelsRetrieveSchema,
} from "typesense/lib/Typesense/NLSearchModels";
import {
  OverrideDeleteSchema,
  OverrideSchema,
} from "typesense/lib/Typesense/Override";
import {
  OverrideCreateSchema,
  OverridesRetrieveSchema,
} from "typesense/lib/Typesense/Overrides";
import {
  PresetDeleteSchema,
  PresetSchema,
} from "typesense/lib/Typesense/Preset";
import {
  PresetCreateSchema,
  PresetsRetrieveSchema,
} from "typesense/lib/Typesense/Presets";
import { StemmingDictionariesRetrieveSchema } from "typesense/lib/Typesense/StemmingDictionaries";
import {
  StemmingDictionaryCreateSchema,
  StemmingDictionarySchema,
} from "typesense/lib/Typesense/StemmingDictionary";
import {
  StopwordDeleteSchema,
  StopwordSchema,
} from "typesense/lib/Typesense/Stopword";
import {
  StopwordCreateSchema,
  StopwordsRetrieveSchema,
} from "typesense/lib/Typesense/Stopwords";
import {
  SynonymDeleteSchema,
  SynonymSchema,
} from "typesense/lib/Typesense/Synonym";
import {
  SynonymCreateSchema,
  SynonymsRetrieveSchema,
} from "typesense/lib/Typesense/Synonyms";

export interface ITypesenseActions {
  getCollectionSchema(collectionName: string): Promise<CollectionSchema>;

  getCollections(): Promise<CollectionSchema[]>;

  getCollection(collectionName: string): Promise<CollectionSchema>;

  importDocuments(
    collectionName: string,
    documents: object[],
    options: DocumentImportParameters | undefined,
  ): Promise<ImportResponse<object>[]>;

  deleteDocument(collectionName: string, documentId: string): Promise<object>;

  updateCollection(
    collectionName: string,
    schema: CollectionUpdateSchema,
  ): Promise<CollectionSchema>;

  deleteCollection(
    collectionName: string,
    compactStore?: boolean,
  ): Promise<CollectionSchema>;

  truncateCollection(collectionName: string): Promise<DeleteResponse<object>>;

  getOverrides(collectionName: string): Promise<OverridesRetrieveSchema>;

  createOverride(
    collectionName: string,
    overrideName: string,
    overrideCreateSchema: OverrideCreateSchema,
  ): Promise<OverrideSchema>;

  getOverride(
    collectionName: string,
    overrideName: string,
  ): Promise<OverrideSchema>;

  deleteOverride(
    collectionName: string,
    overrideName: string,
  ): Promise<OverrideDeleteSchema>;

  getAPIKeys(): Promise<KeysRetrieveSchema>;

  createAPIKey(keySchema: KeyCreateSchema): Promise<KeySchema>;

  getHealth(): Promise<HealthResponse>;

  getSynonyms(collectionName: string): Promise<SynonymsRetrieveSchema>;

  getAliases(collectionName: string): Promise<CollectionAliasesResponseSchema>;

  createAlias(
    collectionName: string,
    aliasName: string,
  ): Promise<CollectionAliasSchema>;

  deleteAlias(collectionName: string): Promise<CollectionAliasSchema>;

  deleteAPIKey(keyId: number): Promise<KeyDeleteSchema>;

  retrieveAPIKeyDetails(keyId: number): Promise<KeySchema>;

  createCollection(schema: CollectionCreateSchema): Promise<CollectionSchema>;

  createSynonym(
    synonymId: string,
    collectionName: string,
    synonymCreateSchema: SynonymCreateSchema,
  ): Promise<SynonymSchema>;

  getSynonym(synonymId: string, collectionName: string): Promise<SynonymSchema>;

  deleteSynonym(
    synonymId: string,
    collectionName: string,
  ): Promise<SynonymDeleteSchema>;

  createAnalyticsRule(
    ruleName: string,
    schema: AnalyticsRuleCreateSchema,
  ): Promise<AnalyticsRuleSchema>;

  getAnalyticsRules(): Promise<AnalyticsRulesRetrieveSchema>;

  deleteAnalyticsRule(ruleName: string): Promise<AnalyticsRuleDeleteSchema>;

  getAnalyticsRule(ruleName: string): Promise<AnalyticsRuleSchema>;

  createSearchPreset(
    presetId: string,
    schema: PresetCreateSchema<DocumentSchema, string>,
  ): Promise<PresetSchema<DocumentSchema>>;

  getSearchPreset(presetId: string): Promise<PresetSchema<DocumentSchema>>;

  getSearchPresets(): Promise<PresetsRetrieveSchema<DocumentSchema>>;

  deleteSearchPreset(presetId: string): Promise<PresetDeleteSchema>;

  createStopWord(
    stopWordId: string,
    schema: StopwordCreateSchema,
  ): Promise<StopwordSchema>;

  deleteStopWord(stopWordId: string): Promise<StopwordDeleteSchema>;

  getStopWord(stopWordId: string): Promise<StopwordSchema>;

  getStopWords(): Promise<StopwordsRetrieveSchema>;

  createConversationalModel(
    schema: ConversationModelCreateSchema,
  ): Promise<ConversationModelCreateSchema>;

  updateConversationalModel(
    conversationalModelId: string,
    schema: ConversationModelCreateSchema,
  ): Promise<ConversationModelCreateSchema>;

  deleteConversationalModel(
    conversationalModelId: string,
  ): Promise<ConversationModelDeleteSchema>;

  getConversationalModel(
    conversationalModelId: string,
  ): Promise<ConversationModelSchema>;

  getConversationalModels(): Promise<ConversationModelSchema[]>;

  createNLSearchModel(
    schema: NLSearchModelCreateSchema,
  ): Promise<NLSearchModelSchema>;

  getNLSearchModels(): Promise<NLSearchModelsRetrieveSchema>;

  getNLSearchModel(nlSearchModelId: string): Promise<NLSearchModelSchema>;

  updateNLSearchModel(
    nlSearchModelId: string,
    schema: NLSearchModelCreateSchema,
  ): Promise<NLSearchModelSchema>;

  deleteNLSearchModel(
    nlSearchModelId: string,
  ): Promise<NLSearchModelDeleteSchema>;

  createStemmingDictionary(
    dictionaryId: string,
    schema: string | StemmingDictionaryCreateSchema[],
  ): Promise<StemmingDictionaryCreateSchema[] | string>;

  getStemmingDictionaries(): Promise<StemmingDictionariesRetrieveSchema>;

  getStemmingDictionary(stemmingId: string): Promise<StemmingDictionarySchema>;

  deleteStemmingDictionary(dictionaryId: string): Promise<void>;

  cloneCollectionSchema(
    existingCollection: string,
    newCollection: string,
  ): Promise<void>;

  exportCollectionDocuments(
    collectionName: string,
    filterBy?: string,
    excludeFields?: string,
    includeFields?: string,
  ): Promise<ReadStream>;
}
