import { LocalConversationModel } from "@/zod/create_conversation_model";
import {
  ConversationModelCreateSchema,
  ConversationModelSchema,
} from "typesense/lib/Typesense/ConversationModel";

export const apiToLocalConversationalModel = (
  conversationalModel: ConversationModelSchema
): LocalConversationModel | ConversationModelSchema => {
  const modelName = conversationalModel.model_name;
  const provider = modelName.split("/")[0];

  if (provider === "openai") {
    return {
      type: "openai",
      model_name: conversationalModel.model_name,
      id: conversationalModel.id,
      history_collection: conversationalModel.history_collection,
      api_key: conversationalModel.api_key,
      openai_path: conversationalModel.openai_path,
      openai_url: conversationalModel.openai_url,
      system_prompt: conversationalModel.system_prompt,
      max_bytes: conversationalModel.max_bytes,
      ttl: conversationalModel.ttl,
    };
  } else if (provider === "azure") {
    return {
      type: "azure",
      model_name: conversationalModel.model_name,
      id: conversationalModel.id,
      history_collection: conversationalModel.history_collection,
      api_key: conversationalModel.api_key,
      system_prompt: conversationalModel.system_prompt,
      max_bytes: conversationalModel.max_bytes,
      ttl: conversationalModel.ttl,
      url: conversationalModel.url,
    };
  } else if (provider === "google") {
    return {
      type: "google",
      model_name: conversationalModel.model_name,
      id: conversationalModel.id,
      history_collection: conversationalModel.history_collection,
      api_key: conversationalModel.api_key,
      system_prompt: conversationalModel.system_prompt,
      max_bytes: conversationalModel.max_bytes,
      ttl: conversationalModel.ttl,
    };
  } else if (provider === "cloudflare") {
    return {
      type: "cloudflare",
      model_name: conversationalModel.model_name,
      id: conversationalModel.id,
      history_collection: conversationalModel.history_collection,
      api_key: conversationalModel.api_key,
      system_prompt: conversationalModel.system_prompt,
      max_bytes: conversationalModel.max_bytes,
      ttl: conversationalModel.ttl,
      account_id: conversationalModel.account_id,
    };
  } else if (provider === "vllm") {
    return {
      type: "vllm",
      model_name: conversationalModel.model_name,
      id: conversationalModel.id,
      history_collection: conversationalModel.history_collection,
      system_prompt: conversationalModel.system_prompt,
      max_bytes: conversationalModel.max_bytes,
      ttl: conversationalModel.ttl,
      vllm_url: conversationalModel.vllm_url,
    };
  } else {
    return conversationalModel;
  }
};

export const localToApiConversationModelCreate = (
  payload: LocalConversationModel
): ConversationModelCreateSchema => {
  const { type, ...other } = payload;
  return other;
};
