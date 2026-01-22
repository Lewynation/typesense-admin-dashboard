import z from "zod";

const BaseNLSearchModel = z.object({
  id: z.string().nonempty(),
  max_bytes: z.number(),
  system_prompt: z.string().optional(),
});

const OpenAiNLSearchModelSchema = BaseNLSearchModel.extend({
  type: z.literal("openai"),
  model_name: z.string().startsWith("openai"),
  api_key: z.string().nonempty(),
  temperature: z.number().optional(),
});

const CloudflareWorkersNLSearchModelSchema = BaseNLSearchModel.extend({
  type: z.literal("cloudflare"),
  model_name: z.string().startsWith("cloudflare"),
  api_key: z.string().nonempty(),
  account_id: z.string().nonempty(),
});

const VLLMNLSearchModelSchema = BaseNLSearchModel.extend({
  type: z.literal("vllm"),
  model_name: z.string().startsWith("vllm"),
  api_url: z.string().nonempty(),
  temperature: z.number().optional(),
});

const GoogleGeminiNLSearchModelSchema = BaseNLSearchModel.extend({
  type: z.literal("google"),
  api_key: z.string(),
  model_name: z.string().startsWith("google"),
  temperature: z.number().optional(),
  top_p: z.number().optional(),
  top_k: z.number().optional(),
  stop_sequences: z.array(z.string()).optional(),
  api_version: z.string().optional(),
});

const GCPVertexNLSearchModelSchema = BaseNLSearchModel.extend({
  type: z.literal("gcp"),
  model_name: z.string().startsWith("gcp"),
  temperature: z.number().optional(),
  project_id: z.string().nonempty(),
  access_token: z.string().nonempty(),
  refresh_token: z.string().nonempty(),
  client_id: z.string().nonempty(),
  client_secret: z.string().nonempty(),
  region: z.string().optional(),
  top_p: z.number().optional(),
  top_k: z.number().optional(),
  max_output_tokens: z.number().optional(),
});

export const LocalNLSearchModelSchema = z.discriminatedUnion("type", [
  OpenAiNLSearchModelSchema,
  CloudflareWorkersNLSearchModelSchema,
  VLLMNLSearchModelSchema,
  GoogleGeminiNLSearchModelSchema,
  GCPVertexNLSearchModelSchema,
]);

export const NLSearchModelTypeSchema = z.enum([
  "vllm",
  "openai",
  "cloudflare",
  "google",
  "gcp",
]);
export type NLSearchModelType = z.infer<typeof NLSearchModelTypeSchema>;

export type LocalNLSearchModel = z.infer<typeof LocalNLSearchModelSchema>;
