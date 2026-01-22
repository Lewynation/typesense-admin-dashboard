import { LocalNLSearchModel } from "@/zod/create_nl_search_model";
import {
  NLSearchModelCreateSchema,
  NLSearchModelSchema,
} from "typesense/lib/Typesense/NLSearchModels";

export const apiToLocalNLSearchModel = (
  nlSearchModelSchema: NLSearchModelSchema,
): LocalNLSearchModel | NLSearchModelSchema => {
  const modelName = nlSearchModelSchema.model_name;
  const provider = modelName.split("/")[0];

  if (provider === "openai") {
    return {
      type: "openai",
      model_name: nlSearchModelSchema.model_name,
      id: nlSearchModelSchema.id,
      api_key: nlSearchModelSchema.api_key,
      system_prompt: nlSearchModelSchema.system_prompt,
      max_bytes: nlSearchModelSchema.max_bytes,
      temperature: nlSearchModelSchema.temperature,
    };
  } else if (provider === "cloudflare") {
    return {
      type: "cloudflare",
      model_name: nlSearchModelSchema.model_name,
      id: nlSearchModelSchema.id,
      api_key: nlSearchModelSchema.api_key,
      system_prompt: nlSearchModelSchema.system_prompt,
      max_bytes: nlSearchModelSchema.max_bytes,
      account_id: nlSearchModelSchema.account_id,
    };
  } else if (provider === "google") {
    return {
      type: "google",
      model_name: nlSearchModelSchema.model_name,
      id: nlSearchModelSchema.id,
      api_key: nlSearchModelSchema.api_key,
      system_prompt: nlSearchModelSchema.system_prompt,
      max_bytes: nlSearchModelSchema.max_bytes,
      top_k: nlSearchModelSchema.top_k,
      top_p: nlSearchModelSchema.top_p,
      stop_sequences: nlSearchModelSchema.stop_sequences,
      api_version: nlSearchModelSchema.api_version,
      temperature: nlSearchModelSchema.temperature,
    };
  } else if (provider === "gcp") {
    return {
      type: "gcp",
      model_name: nlSearchModelSchema.model_name,
      id: nlSearchModelSchema.id,
      api_key: nlSearchModelSchema.api_key,
      system_prompt: nlSearchModelSchema.system_prompt,
      max_bytes: nlSearchModelSchema.max_bytes,
      client_id: nlSearchModelSchema.client_id,
      client_secret: nlSearchModelSchema.client_secret,
      access_token: nlSearchModelSchema.access_token,
      refresh_token: nlSearchModelSchema.refresh_token,
      region: nlSearchModelSchema.region,
      top_k: nlSearchModelSchema.top_k,
      top_p: nlSearchModelSchema.top_p,
      temperature: nlSearchModelSchema.temperature,
      max_output_tokens: nlSearchModelSchema.max_output_tokens,
    };
  } else if (provider === "vllm") {
    return {
      type: "vllm",
      model_name: nlSearchModelSchema.model_name,
      id: nlSearchModelSchema.id,
      system_prompt: nlSearchModelSchema.system_prompt,
      max_bytes: nlSearchModelSchema.max_bytes,
      temperature: nlSearchModelSchema.temperature,
      api_url: nlSearchModelSchema.api_url,
    };
  } else {
    return nlSearchModelSchema;
  }
};

export const localToApiNLSearchModelCreate = (
  payload: LocalNLSearchModel,
): NLSearchModelCreateSchema => {
  const { type, ...other } = payload;
  return other;
};
