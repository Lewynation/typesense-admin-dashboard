import z from "zod";

const BaseConversationModel = z.object({
  id: z.string().nonempty(),
  history_collection: z.string().optional(),
  system_prompt: z.string().optional(),
  max_bytes: z.number(),
  ttl: z.number().optional(),
});

const OpenAiConversationModelSchema = BaseConversationModel.extend({
  type: z.literal("openai"),
  model_name: z.string().startsWith("openai"),
  api_key: z.string().optional(),
  openai_url: z.string().optional(),
  openai_path: z.string().optional(),
});

const AzureConversationModelSchema = BaseConversationModel.extend({
  type: z.literal("azure"),
  model_name: z.string().startsWith("azure"),
  api_key: z.string().nonempty(),
  url: z.string().nonempty(),
});

const GoogleConversationModelSchema = BaseConversationModel.extend({
  type: z.literal("google"),
  model_name: z.string().startsWith("google"),
  api_key: z.string().nonempty(),
});

const CloudflareConversationModelSchema = BaseConversationModel.extend({
  type: z.literal("cloudflare"),
  model_name: z.string().startsWith("cloudflare"),
  api_key: z.string().nonempty(),
  account_id: z.string().nonempty(),
});

const VLLMConversationModelSchema = BaseConversationModel.extend({
  type: z.literal("vllm"),
  model_name: z.string().startsWith("vllm"),
  vllm_url: z.string().nonempty(),
});

export const LocalConversationModelSchema = z.discriminatedUnion("type", [
  OpenAiConversationModelSchema,
  AzureConversationModelSchema,
  GoogleConversationModelSchema,
  CloudflareConversationModelSchema,
  VLLMConversationModelSchema,
]);

export const ConversationModelTypeSchema = z.enum([
  "vllm",
  "openai",
  "cloudflare",
  "azure",
  "google",
]);
export type ConversationModelType = z.infer<typeof ConversationModelTypeSchema>;

export type LocalConversationModel = z.infer<
  typeof LocalConversationModelSchema
>;
