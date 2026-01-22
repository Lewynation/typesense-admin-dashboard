import z from "zod";

export const FIELD_TYPES = [
  "string",
  "int32",
  "int64",
  "float",
  "bool",
  "geopoint",
  "geopolygon",
  "geopoint[]",
  "string[]",
  "int32[]",
  "int64[]",
  "float[]",
  "bool[]",
  "object",
  "object[]",
  "auto",
  "string*",
  "image",
] as const;

export const FieldTypeSchema = z.enum(FIELD_TYPES);

export const EmbedModelProviderTypeSchema = z.enum([
  "openAI",
  "builtIn",
  "azure",
  "openAICompatible",
  "googlePalm",
  "GCPVertexAI",
  "ownModel",
  "_No Embedding_",
]);

export type EmbedModelProviderType = z.infer<
  typeof EmbedModelProviderTypeSchema
>;

const OpenAIEmbedModelProviderSchema = z.object({
  type: z.literal("openAI"),
  model_name: z.string().startsWith("openai").nonempty(),
  api_key: z.string().nonempty(),
});

const AzureOpenAIEmbedModelProviderSchema = z.object({
  type: z.literal("azure"),
  model_name: z.string().startsWith("azure").nonempty(),
  api_key: z.string().nonempty(),
  url: z.string().nonempty(),
});

const OpenAICompatibleEmbedModelProviderSchema = z.object({
  type: z.literal("openAICompatible"),
  model_name: z.string().nonempty(),
  api_key: z.string().nonempty(),
  url: z.string().nonempty(),
});

const GooglePalmEmbedModelProviderSchema = z.object({
  type: z.literal("googlePalm"),
  model_name: z.string().startsWith("google").nonempty(),
  api_key: z.string().nonempty(),
});

const GCPVertexAIEmbedModelProviderSchema = z.object({
  type: z.literal("GCPVertexAI"),
  model_name: z.string().startsWith("gcp").nonempty(),
  access_token: z.string().nonempty(),
  refresh_token: z.string().nonempty(),
  client_id: z.string().nonempty(),
  client_secret: z.string().nonempty(),
  project_id: z.string().nonempty(),
  document_task: z.string().nonempty(),
  query_task: z.string().nonempty(),
  region: z.string().nonempty(),
});

const OwnEmbedModelProviderSchema = z.object({
  type: z.literal("ownModel"),
  model_name: z.string().nonempty(),
  indexing_prefix: z.string().optional(),
  query_prefix: z.string().optional(),
});

const BuiltInModelProviderSchema = z.object({
  type: z.literal("builtIn"),
  model_name: z.string().startsWith("ts").nonempty(),
});

const NoAutoEmbedding = z.object({
  type: z.literal("_No Embedding_"),
});

const AutoEmbeddingFieldSchema = z
  .object({
    embedFrom: z.array(z.string()).nonempty(),
    provider: z.discriminatedUnion("type", [
      OpenAIEmbedModelProviderSchema,
      AzureOpenAIEmbedModelProviderSchema,
      OpenAICompatibleEmbedModelProviderSchema,
      GooglePalmEmbedModelProviderSchema,
      GCPVertexAIEmbedModelProviderSchema,
      OwnEmbedModelProviderSchema,
      BuiltInModelProviderSchema,
      NoAutoEmbedding,
    ]),
  })
  .partial()
  .optional();

export type AutoEmbeddingField = z.infer<typeof AutoEmbeddingFieldSchema>;

export const CreateCollectionFieldSchema = z
  .object({
    name: z.string().nonempty(),
    fieldType: FieldTypeSchema,
    optional: z.boolean().optional(),
    facet: z.boolean().optional(),
    index: z.boolean().optional(),
    sort: z.boolean().optional(),
    infix: z.boolean().optional(),
    stem: z.boolean().optional(),
    rangeIndex: z.boolean().optional(),
    store: z.boolean().optional(),
    locale: z.string().optional(),
    stemDictionary: z.string().optional(),
    numberOfDimensions: z.number().optional(),
    vectorDistance: z.string().optional(),
    reference: z.string().optional(),
    autoEmbeddingField: AutoEmbeddingFieldSchema,
  })
  .refine(
    (data) => {
      if (!!data.autoEmbeddingField) {
        if (data.autoEmbeddingField.provider?.type === "_No Embedding_") {
          return true;
        }
        return data.fieldType === "float[]";
      }
      return true;
    },
    {
      error:
        "When auto embedding field is provided then the field type must be a float[]",
      path: ["fieldType"],
    }
  )
  .refine(
    (data) => {
      if (!!data.autoEmbeddingField) {
        if (data.autoEmbeddingField.provider?.type === "_No Embedding_") {
          return true;
        }
        return (data.autoEmbeddingField.embedFrom?.length ?? 0) > 0;
      }
      return true;
    },
    {
      error:
        "When auto embedding provider is provided then embed from should not be empty",
      path: ["autoEmbeddingField.embedFrom"],
    }
  );

export type CreateCollectionField = z.infer<typeof CreateCollectionFieldSchema>;

export const CreateCollectionSchema = z.object({
  name: z.string().nonempty(),
  defaultSortField: z.string().optional(),
  symbolsToIndex: z.array(z.string()).optional(),
  tokenSeparators: z.array(z.string()).optional(),
  fields: z.array(CreateCollectionFieldSchema).nonempty(),
  metadata: z.unknown().optional(),
  enableNestedFields: z.boolean().optional(),
});

export type CreateCollection = z.infer<typeof CreateCollectionSchema>;
