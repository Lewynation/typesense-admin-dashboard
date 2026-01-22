import { Controller } from "react-hook-form";
import { useCreateCollectConversationModelFieldForm } from "./create_conversation_model_dialog";
import LabelledInput from "../add_collection_field/labelled_input";
import { useCollections } from "@/swr/use_collections";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ConversationProviderFields = () => {
  const { control } = useCreateCollectConversationModelFieldForm();
  return (
    <div>
      <Controller
        name="type"
        control={control}
        render={({ field }) => {
          return (
            <>
              {field.value === "openai" && <OpenAiProviderConfig />}
              {field.value === "azure" && <AzureProviderConfig />}
              {field.value === "google" && <GoogleProviderConfig />}
              {field.value === "cloudflare" && <CloudflareProviderConfig />}
              {field.value === "vllm" && <VLLMProviderConfig />}
            </>
          );
        }}
      />
    </div>
  );
};

const AzureProviderConfig = () => {
  const { register } = useCreateCollectConversationModelFieldForm();

  return (
    <>
      <ModelNameField />
      <ApiKeyField />
      <SystemPromptField />
      <MaxBytesField />
      <TTLField />
      <HistoryCollectionField />
      <LabelledInput
        id="url"
        placeHolder="Enter Url"
        title="Url"
        {...register("url")}
      />
    </>
  );
};

const OpenAiProviderConfig = () => {
  const { register } = useCreateCollectConversationModelFieldForm();
  return (
    <>
      <ModelNameField />
      <ApiKeyField />
      <SystemPromptField />
      <MaxBytesField />
      <TTLField />
      <HistoryCollectionField />
      <LabelledInput
        id="openai_url"
        placeHolder="Enter OpenAi Url"
        title="OpenAi Url (optional)"
        {...register("openai_url", {
          setValueAs: (v) => (v === "" ? undefined : v),
        })}
      />
      <LabelledInput
        id="openai_path"
        placeHolder="Enter OpenAi Path"
        title="OpenAi Path (optional)"
        {...register("openai_path", {
          setValueAs: (v) => (v === "" ? undefined : v),
        })}
      />
    </>
  );
};

const CloudflareProviderConfig = () => {
  const { register } = useCreateCollectConversationModelFieldForm();
  return (
    <>
      <ModelNameField />
      <ApiKeyField />
      <SystemPromptField />
      <HistoryCollectionField />
      <MaxBytesField />
      <TTLField />
      <LabelledInput
        id="account_id"
        placeHolder="Enter Account Id"
        title="Account Id"
        {...register("account_id")}
      />
    </>
  );
};

const GoogleProviderConfig = () => {
  return (
    <>
      <ModelNameField />
      <ApiKeyField />
      <SystemPromptField />
      <HistoryCollectionField />
      <MaxBytesField />
      <TTLField />
    </>
  );
};

const VLLMProviderConfig = () => {
  const { register } = useCreateCollectConversationModelFieldForm();
  return (
    <>
      <ModelNameField />
      <SystemPromptField />
      <HistoryCollectionField />
      <MaxBytesField />
      <TTLField />
      <LabelledInput
        id="vllm_url"
        placeHolder="Enter vLLM url"
        title="vLLM Url"
        {...register("vllm_url")}
      />
    </>
  );
};

const HistoryCollectionField = () => {
  const { control } = useCreateCollectConversationModelFieldForm();
  const { collections } = useCollections();

  return (
    <>
      <div className="grid gap-3 mb-3">
        <Label className="font-mono">History Collection</Label>
        <Controller
          name="history_collection"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(val) => {
                field.onChange(val);
              }}
            >
              <SelectTrigger className="w-full font-mono">
                <SelectValue placeholder="Select history collection" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {collections && (
                    <SelectLabel className="font-mono">Collections</SelectLabel>
                  )}
                  {!collections && (
                    <SelectLabel className="font-mono">
                      Your other collections will show up here
                    </SelectLabel>
                  )}
                  {collections &&
                    collections?.map((collection, index) => {
                      return (
                        <SelectItem
                          key={index}
                          className="font-mono"
                          value={collection.name}
                        >
                          {collection.name}
                        </SelectItem>
                      );
                    })}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>
    </>
  );
};

const SystemPromptField = () => {
  const { register } = useCreateCollectConversationModelFieldForm();

  return (
    <>
      <div className="grid gap-3 my-3">
        <Label htmlFor="system_prompt" className="font-mono">
          System Prompt (optional)
        </Label>
        <Textarea
          {...register("system_prompt", {
            setValueAs: (v) => (v === "" ? undefined : v),
          })}
          id="system_prompt"
          name="system_prompt"
          placeholder="Enter System Prompt"
          className="font-mono"
        />
      </div>
    </>
  );
};

const TTLField = () => {
  const { register } = useCreateCollectConversationModelFieldForm();

  return (
    <>
      <LabelledInput
        id="ttl"
        placeHolder="Enter TTL"
        title="TTL (optional)"
        type="number"
        {...register("ttl", {
          required: false,
          setValueAs: (v) => (v === "" ? undefined : Number(v)),
        })}
      />
    </>
  );
};

const MaxBytesField = () => {
  const { register } = useCreateCollectConversationModelFieldForm();

  return (
    <>
      <LabelledInput
        id="max_bytes"
        placeHolder="Enter Max Bytes"
        title="MaxBytes"
        type="number"
        {...register("max_bytes", {
          required: true,
          setValueAs: (v) => (v === "" ? undefined : Number(v)),
        })}
      />
    </>
  );
};

const ModelNameField = () => {
  const { register } = useCreateCollectConversationModelFieldForm();

  return (
    <>
      <LabelledInput
        id="model_name"
        placeHolder="Enter Model Name"
        title="Model Name"
        {...register("model_name")}
      />
    </>
  );
};

const ApiKeyField = () => {
  const { register } = useCreateCollectConversationModelFieldForm();

  return (
    <>
      <LabelledInput
        id="api_key"
        placeHolder="Enter Api Key"
        title="Api Key"
        {...register("api_key", {
          setValueAs: (v) => (v === "" ? undefined : v),
        })}
      />
    </>
  );
};

export default ConversationProviderFields;
