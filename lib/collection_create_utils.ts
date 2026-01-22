import {
  CreateCollection,
  EmbedModelProviderType,
} from "@/zod/create_collection";
import {
  CollectionFieldSchema,
  CollectionSchema,
} from "typesense/lib/Typesense/Collection";
import { CollectionCreateSchema } from "typesense/lib/Typesense/Collections";

export const generateCollectionCreateSchemaFromZodModel = (
  zodModel: CreateCollection,
): CollectionCreateSchema => {
  const {
    fields,
    name,
    defaultSortField,
    metadata,
    symbolsToIndex,
    tokenSeparators,
    enableNestedFields,
  } = zodModel;

  const parsedFields: CollectionFieldSchema[] = fields.map((f) => {
    const provider = f.autoEmbeddingField?.provider;
    let modelConfig: unknown | undefined = undefined;
    if (provider) {
      const { type, ...other } = provider;
      modelConfig = other;
    }
    const embedFrom = f.autoEmbeddingField?.embedFrom;
    const embedFieldPresent = !!embedFrom && !!modelConfig;
    return {
      name: f.name,
      type: f.fieldType,
      facet: embedFieldPresent ? undefined : f.facet,
      index: embedFieldPresent ? undefined : f.index,
      infix: embedFieldPresent ? undefined : f.infix,
      locale: f.locale,
      num_dim: f.numberOfDimensions,
      optional: embedFieldPresent ? undefined : f.optional,
      range_index: f.rangeIndex,
      sort: embedFieldPresent ? undefined : f.sort,
      stem: embedFieldPresent ? undefined : f.stem,
      store: embedFieldPresent ? undefined : f.store,
      ...(embedFieldPresent && {
        embed: {
          from: embedFrom,
          model_config: modelConfig,
        },
      }),
    };
  });

  return {
    name,
    metadata: metadata as object | undefined,
    token_separators: tokenSeparators,
    default_sorting_field: defaultSortField,
    symbols_to_index: symbolsToIndex,
    fields: parsedFields,
    enable_nested_fields: enableNestedFields,
  };
};

export const generateZodModelFromCollectionSchema = (
  apiModel: CollectionSchema,
): CreateCollection => {
  const {
    fields = [],
    name,
    default_sorting_field,
    metadata,
    symbols_to_index,
    token_separators,
    enable_nested_fields,
  } = apiModel;

  const parsedFields = fields.map((f) => {
    const embedConfig = (f as any).embed;
    const hasEmbed = !!embedConfig?.from && !!embedConfig?.model_config;

    let autoEmbeddingField = undefined;

    if (hasEmbed) {
      const modelConfig = embedConfig.model_config;

      let providerType: EmbedModelProviderType = "_No Embedding_";

      if (modelConfig.model_name) {
        if (modelConfig.model_name.startsWith("openai")) {
          providerType = "openAI";
        } else if (modelConfig.model_name.startsWith("azure")) {
          providerType = "azure";
        } else if (modelConfig.model_name.startsWith("google")) {
          providerType = "googlePalm";
        } else if (modelConfig.model_name.startsWith("gcp")) {
          providerType = "GCPVertexAI";
        } else if (modelConfig.model_name.startsWith("ts")) {
          providerType = "builtIn";
        } else if (
          modelConfig.url &&
          !modelConfig.model_name.startsWith("azure")
        ) {
          providerType = "openAICompatible";
        } else {
          providerType = "ownModel";
        }
      }

      autoEmbeddingField = {
        embedFrom: embedConfig.from,
        provider: {
          type: providerType,
          ...modelConfig,
        },
      };
    }
    return {
      name: f.name,
      fieldType: f.type,
      optional: f.optional,
      facet: f.facet,
      index: f.index,
      sort: f.sort,
      infix: f.infix,
      locale: f.locale,
      stem: f.stem,
      numberOfDimensions: f.num_dim,
      rangeIndex: f.range_index,
      store: f.store,
      autoEmbeddingField,
    };
  });

  return {
    name,
    fields: parsedFields,
    defaultSortField: default_sorting_field,
    metadata,
    symbolsToIndex: symbols_to_index,
    tokenSeparators: token_separators,
    enableNestedFields: enable_nested_fields,
  };
};
