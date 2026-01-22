"use server";
import { revalidatePath } from "next/cache";
import typesense from "../typesense/instance";
import { CollectionCreateSchema } from "typesense/lib/Typesense/Collections";
import { KeyCreateSchema } from "typesense/lib/Typesense/Key";
import { auth } from "@/auth/server";
import { headers } from "next/headers";
import { GetTypesenseServerResponse } from "@/better_auth_plugins/typesense_plugin/typings";
import { CreateTypesenseServerFormFields } from "@/zod/create_typesense_server";
import { SynonymCreateSchema } from "typesense/lib/Typesense/Synonyms";
import { OverrideCreateSchema } from "typesense/lib/Typesense/Overrides";
import { AnalyticsRuleCreateSchema } from "typesense/lib/Typesense/AnalyticsRule";
import { PresetCreateSchema } from "typesense/lib/Typesense/Presets";
import {
  DocumentImportParameters,
  DocumentSchema,
} from "typesense/lib/Typesense/Documents";
import { StopwordCreateSchema } from "typesense/lib/Typesense/Stopwords";
import { ConversationModelCreateSchema } from "typesense/lib/Typesense/ConversationModel";
import { NLSearchModelCreateSchema } from "typesense/lib/Typesense/NLSearchModels";
import { StemmingDictionaryCreateSchema } from "typesense/lib/Typesense/StemmingDictionary";
import { CollectionUpdateSchema } from "typesense/lib/Typesense/Collection";
import { createServerAction } from "./create_server_action";

export const createServer = createServerAction(
  async (data: CreateTypesenseServerFormFields) => {
    const server = await typesense.createSingleInstance({
      apiKey: data.apiKey,
      host: data.host,
      name: data.name,
      path: data.path ?? undefined,
      port: data.port != null ? Number(data.port) : 8108,
      protocol: data.protocol ?? "http",
      userId: "",
    });
    await server?.getHealth();
    const createRes = await auth.api.createTypesenseServer({
      headers: await headers(),
      body: {
        apiKey: data.apiKey,
        host: data.host,
        name: data.name,
        path: data.path ?? undefined,
        port: data.port != null ? data.port : undefined,
        protocol: data.protocol ?? undefined,
      },
    });
    revalidatePath("/");
    return createRes;
  },
);

export const deleteServerById = createServerAction(async (serverId: string) => {
  const response = await auth.api.deleteTypesenseServer({
    headers: await headers(),
    params: {
      id: serverId,
    },
  });
  revalidatePath("/");
  return response;
});

export const getAllServers = async () => {
  const servers = await auth.api.getAllTypesenseServers({
    headers: await headers(),
  });
  return servers;
};

export async function fetchServerById(
  serverId: string,
): Promise<GetTypesenseServerResponse> {
  const server = await auth.api.getTypesenseServer({
    headers: await headers(),
    params: {
      id: serverId,
    },
  });
  return server;
}

export async function getCollections(serverId: string) {
  const client = await typesense.getInstance(serverId);
  return client?.getCollections();
}

export const importDocuments = createServerAction(
  async (
    serverId: string,
    collectionName: string,
    documents: object[],
    options: DocumentImportParameters | undefined,
  ) => {
    const client = await typesense.getInstance(serverId);
    return client?.importDocuments(collectionName, documents, options);
  },
);

export const deleteDocument = createServerAction(
  async (serverId: string, collectionName: string, documentId: string) => {
    const client = await typesense.getInstance(serverId);
    return client?.deleteDocument(collectionName, documentId);
  },
);

export async function getCollection(serverId: string, collectionName: string) {
  const client = await typesense.getInstance(serverId);
  return client?.getCollection(collectionName);
}

export const updateCollection = createServerAction(
  async (
    serverId: string,
    collectionName: string,
    schema: CollectionUpdateSchema,
  ) => {
    const client = await typesense.getInstance(serverId);
    // revalidatePath(`/server/${serverId}/collections`);
    revalidatePath(`/server/${serverId}/collections/${collectionName}/schema`);
    return client?.updateCollection(collectionName, schema);
  },
);

export async function getApiKeys(serverId: string) {
  const client = await typesense.getInstance(serverId);
  return client?.getAPIKeys();
}

export const createCollection = createServerAction(
  async (serverId: string, schema: CollectionCreateSchema) => {
    const client = await typesense.getInstance(serverId);
    const collection = await client?.createCollection(schema);
    revalidatePath(`/server/${serverId}/collections`);
    return collection;
  },
);

export const deleteCollection = createServerAction(
  async (serverId: string, collectionName: string, compactStore?: boolean) => {
    const client = await typesense.getInstance(serverId);
    const collection = await client?.deleteCollection(
      collectionName,
      compactStore,
    );
    revalidatePath(`/server/${serverId}/collections`);
    return collection;
  },
);

export const truncateCollection = createServerAction(
  async (serverId: string, collectionName: string) => {
    const client = await typesense.getInstance(serverId);
    const collection = await client?.truncateCollection(collectionName);
    revalidatePath(`/server/${serverId}/collections`);
    return collection;
  },
);

export const createAPIKey = createServerAction(
  async (serverId: string, schema: KeyCreateSchema) => {
    const client = await typesense.getInstance(serverId);
    const key = await client?.createAPIKey(schema);
    revalidatePath(`/server/${serverId}/api-keys`);
    return key;
  },
);

export const createSynonym = createServerAction(
  async (
    serverId: string,
    synonymId: string,
    collectionName: string,
    synonymCreateSchema: SynonymCreateSchema,
  ) => {
    const client = await typesense.getInstance(serverId);
    const synonym = await client?.createSynonym(
      synonymId,
      collectionName,
      synonymCreateSchema,
    );
    revalidatePath(`/server/${serverId}/collections${collectionName}/synonyms`);
    return synonym;
  },
);

export async function getSynonym(
  serverId: string,
  synonymId: string,
  collectionName: string,
) {
  const client = await typesense.getInstance(serverId);
  const synonym = await client?.getSynonym(synonymId, collectionName);
  return synonym;
}

export async function getSynonyms(serverId: string, collectionName: string) {
  const client = await typesense.getInstance(serverId);
  const synonyms = await client?.getSynonyms(collectionName);
  return synonyms;
}

export const deleteSynonym = createServerAction(
  async (serverId: string, synonymId: string, collectionName: string) => {
    const client = await typesense.getInstance(serverId);
    const synonyms = await client?.deleteSynonym(synonymId, collectionName);
    revalidatePath(`/server/${serverId}/collections${collectionName}/synonyms`);
    return synonyms;
  },
);

export const deleteAPIKey = createServerAction(
  async (serverId: string, keyId: number) => {
    const client = await typesense.getInstance(serverId);
    const key = await client?.deleteAPIKey(keyId);
    revalidatePath(`/server/${serverId}/api-keys`);
    return key;
  },
);

export async function retrieveApiKeyDetails(serverId: string, keyId: number) {
  const client = await typesense.getInstance(serverId);
  return client?.retrieveAPIKeyDetails(keyId);
}

export async function getOverrides(serverId: string, collectionName: string) {
  const client = await typesense.getInstance(serverId);
  const overrides = await client?.getOverrides(collectionName);
  return overrides;
}

export async function getOverride(
  serverId: string,
  collectionName: string,
  overrideName: string,
) {
  const client = await typesense.getInstance(serverId);
  const overrides = await client?.getOverride(collectionName, overrideName);
  return overrides;
}

export const createOverride = createServerAction(
  async (
    serverId: string,
    collectionName: string,
    overrideName: string,
    overrideCreateSchema: OverrideCreateSchema,
  ) => {
    const client = await typesense.getInstance(serverId);
    const overrides = await client?.createOverride(
      collectionName,
      overrideName,
      overrideCreateSchema,
    );
    revalidatePath(
      `/server/${serverId}/collections${collectionName}/curations`,
    );
    return overrides;
  },
);

export const deleteOverride = createServerAction(
  async (serverId: string, collectionName: string, overrideName: string) => {
    const client = await typesense.getInstance(serverId);
    const overrides = await client?.deleteOverride(
      collectionName,
      overrideName,
    );
    revalidatePath(
      `/server/${serverId}/collections${collectionName}/curations`,
    );
    return overrides;
  },
);

export const createAlias = createServerAction(
  async (serverId: string, collectionName: string, aliasName: string) => {
    const client = await typesense.getInstance(serverId);
    const alias = await client?.createAlias(aliasName, collectionName);
    revalidatePath(`/server/${serverId}/aliases`);
    return alias;
  },
);

export async function getAliases(serverId: string) {
  const client = await typesense.getInstance(serverId);
  const aliases = await client?.getAliases();
  return aliases;
}

export const deleteAlias = createServerAction(
  async (serverId: string, aliasName: string) => {
    const client = await typesense.getInstance(serverId);
    const aliasDelete = await client?.deleteAlias(aliasName);
    revalidatePath(`/server/${serverId}/aliases`);
    return aliasDelete;
  },
);

export const createAnalyticsRule = createServerAction(
  async (
    serverId: string,
    ruleName: string,
    schema: AnalyticsRuleCreateSchema,
  ) => {
    const client = await typesense.getInstance(serverId);
    const analyticsRule = await client?.createAnalyticsRule(ruleName, schema);
    revalidatePath(`/server/${serverId}/analytics-rules`);
    return analyticsRule;
  },
);

export const deleteAnalyticsRule = createServerAction(
  async (serverId: string, ruleName: string) => {
    const client = await typesense.getInstance(serverId);
    const analyticsRule = await client?.deleteAnalyticsRule(ruleName);
    revalidatePath(`/server/${serverId}/analytics-rules`);
    return analyticsRule;
  },
);

export async function getAnalyticsRule(serverId: string, ruleName: string) {
  const client = await typesense.getInstance(serverId);
  const analyticsRule = await client?.getAnalyticsRule(ruleName);
  return analyticsRule;
}

export async function getAnalyticsRules(serverId: string) {
  const client = await typesense.getInstance(serverId);
  const analyticsRule = await client?.getAnalyticsRules();
  return analyticsRule;
}

export const createSearchPreset = createServerAction(
  async (
    serverId: string,
    presetId: string,
    schema: PresetCreateSchema<DocumentSchema, string>,
  ) => {
    const client = await typesense.getInstance(serverId);
    const analyticsRule = await client?.createSearchPreset(presetId, schema);
    revalidatePath(`/server/${serverId}/search-presets`);
    return analyticsRule;
  },
);
export const deleteSearchPreset = createServerAction(
  async (serverId: string, presetId: string) => {
    const client = await typesense.getInstance(serverId);
    const analyticsRule = await client?.deleteSearchPreset(presetId);
    revalidatePath(`/server/${serverId}/search-presets`);
    return analyticsRule;
  },
);

export async function getSearchPreset(serverId: string, presetId: string) {
  const client = await typesense.getInstance(serverId);
  const analyticsRule = await client?.getSearchPreset(presetId);
  return analyticsRule;
}

export async function getSearchPresets(serverId: string) {
  const client = await typesense.getInstance(serverId);
  const analyticsRule = await client?.getSearchPresets();
  return analyticsRule;
}

export const createStopWord = createServerAction(
  async (
    serverId: string,
    stopWordId: string,
    schema: StopwordCreateSchema,
  ) => {
    const client = await typesense.getInstance(serverId);
    const analyticsRule = await client?.createStopWord(stopWordId, schema);
    revalidatePath(`/server/${serverId}/stop-words`);
    return analyticsRule;
  },
);

export const deleteStopWord = createServerAction(
  async (serverId: string, stopWordId: string) => {
    const client = await typesense.getInstance(serverId);
    const analyticsRule = await client?.deleteStopWord(stopWordId);
    revalidatePath(`/server/${serverId}/stop-words`);
    return analyticsRule;
  },
);

export async function getStopWord(serverId: string, stopWordId: string) {
  const client = await typesense.getInstance(serverId);
  const analyticsRule = await client?.getStopWord(stopWordId);
  return analyticsRule;
}

export async function getStopWords(serverId: string) {
  const client = await typesense.getInstance(serverId);
  const analyticsRule = await client?.getStopWords();
  return analyticsRule;
}

export const createConversationalModel = createServerAction(
  async (serverId: string, schema: ConversationModelCreateSchema) => {
    const client = await typesense.getInstance(serverId);
    const analyticsRule = await client?.createConversationalModel(schema);
    revalidatePath(`/server/${serverId}/conversational-models`);
    return analyticsRule;
  },
);

export const deleteConversationalModel = createServerAction(
  async (serverId: string, conversationalModelId: string) => {
    const client = await typesense.getInstance(serverId);
    const analyticsRule = await client?.deleteConversationalModel(
      conversationalModelId,
    );
    revalidatePath(`/server/${serverId}/conversational-models`);
    return analyticsRule;
  },
);

export const updateConversationalModel = createServerAction(
  async (
    serverId: string,
    conversationalModelId: string,
    schema: ConversationModelCreateSchema,
  ) => {
    const client = await typesense.getInstance(serverId);
    const analyticsRule = await client?.updateConversationalModel(
      conversationalModelId,
      schema,
    );
    revalidatePath(`/server/${serverId}/conversational-models`);
    return analyticsRule;
  },
);

export async function getConversationalModel(
  serverId: string,
  conversationalModelId: string,
) {
  const client = await typesense.getInstance(serverId);
  const analyticsRule = await client?.getConversationalModel(
    conversationalModelId,
  );
  return analyticsRule;
}

export async function getConversationalModels(serverId: string) {
  const client = await typesense.getInstance(serverId);
  const analyticsRule = await client?.getConversationalModels();
  return analyticsRule;
}

export const createNLSearchModel = createServerAction(
  async (serverId: string, schema: NLSearchModelCreateSchema) => {
    const client = await typesense.getInstance(serverId);
    const analyticsRule = await client?.createNLSearchModel(schema);
    revalidatePath(`/server/${serverId}/nl-search-models`);
    return analyticsRule;
  },
);

export const deleteNLSearchModel = createServerAction(
  async (serverId: string, nlSearchModelId: string) => {
    const client = await typesense.getInstance(serverId);
    const analyticsRule = await client?.deleteNLSearchModel(nlSearchModelId);
    revalidatePath(`/server/${serverId}/nl-search-models`);
    return analyticsRule;
  },
);

export const updateNLSearchModel = createServerAction(
  async (
    serverId: string,
    nlSearchModelId: string,
    schema: NLSearchModelCreateSchema,
  ) => {
    const client = await typesense.getInstance(serverId);
    const analyticsRule = await client?.updateNLSearchModel(
      nlSearchModelId,
      schema,
    );
    revalidatePath(`/server/${serverId}/conversational-models`);
    return analyticsRule;
  },
);

export async function getNLSearchModel(
  serverId: string,
  nlSearchModelId: string,
) {
  const client = await typesense.getInstance(serverId);
  const analyticsRule = await client?.getNLSearchModel(nlSearchModelId);
  return analyticsRule;
}

export async function getNLSearchModels(serverId: string) {
  const client = await typesense.getInstance(serverId);
  const analyticsRule = await client?.getNLSearchModels();
  return analyticsRule;
}

export const createStemmingDictionary = createServerAction(
  async (
    serverId: string,
    dictionaryId: string,
    schema: string | StemmingDictionaryCreateSchema[],
  ) => {
    const client = await typesense.getInstance(serverId);
    const analyticsRule = await client?.createStemmingDictionary(
      dictionaryId,
      schema,
    );
    revalidatePath(`/server/${serverId}/stemming`);
    return analyticsRule;
  },
);

export async function getStemmingDictionaries(serverId: string) {
  const client = await typesense.getInstance(serverId);
  const analyticsRule = await client?.getStemmingDictionaries();
  return analyticsRule;
}

export async function getStemmingDictionary(
  serverId: string,
  stemmingId: string,
) {
  const client = await typesense.getInstance(serverId);
  const analyticsRule = await client?.getStemmingDictionary(stemmingId);
  return analyticsRule;
}

export const deleteStemmingDictionary = createServerAction(
  async (serverId: string, stemmingDictionaryId: string) => {
    const client = await typesense.getInstance(serverId);
    await client?.deleteStemmingDictionary(stemmingDictionaryId);
    revalidatePath(`/server/${serverId}/stemming`);
  },
);

export const cloneCollectionSchema = createServerAction(
  async (
    serverId: string,
    existingCollection: string,
    newCollection: string,
  ) => {
    const client = await typesense.getInstance(serverId);
    await client?.cloneCollectionSchema(existingCollection, newCollection);
    revalidatePath(`/server/${serverId}/collections`);
  },
);
