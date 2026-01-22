import { Controller } from "react-hook-form";
import { useCreateNLSearchModelFieldForm } from "./create_nl_search_model_dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import LabelledInput from "../add_collection_field/labelled_input";
import MultiValueInput from "@/components/ui/multi_value_input";

const NLModelPlatformFields = () => {
  const { control } = useCreateNLSearchModelFieldForm();
  return (
    <div>
      <Controller
        name="type"
        control={control}
        render={({ field }) => {
          return (
            <>
              {field.value === "openai" && <OpenAiPlatformConfig />}
              {field.value === "gcp" && <GCPPlatformConfig />}
              {field.value === "google" && <GooglePlatformConfig />}
              {field.value === "cloudflare" && <CloudflarePlatformConfig />}
              {field.value === "vllm" && <VLLMPlatformConfig />}
            </>
          );
        }}
      />
    </div>
  );
};

const OpenAiPlatformConfig = () => {
  return (
    <>
      <ModelNameField />
      <ApiKeyField />
      <SystemPromptField />
      <MaxBytesField />
      <TemperatureField />
    </>
  );
};

const VLLMPlatformConfig = () => {
  const { register } = useCreateNLSearchModelFieldForm();
  return (
    <>
      <ModelNameField />
      <SystemPromptField />
      <MaxBytesField />
      <TemperatureField />
      <LabelledInput
        id="api_url"
        placeHolder="Enter Api Url"
        title="Api Url"
        {...register("api_url")}
      />
    </>
  );
};

const CloudflarePlatformConfig = () => {
  const { register } = useCreateNLSearchModelFieldForm();
  return (
    <>
      <ModelNameField />
      <ApiKeyField />
      <SystemPromptField />
      <MaxBytesField />
      <LabelledInput
        id="account_id"
        placeHolder="Enter Account Id"
        title="Account Id"
        {...register("account_id")}
      />
    </>
  );
};

const GooglePlatformConfig = () => {
  const { register, control } = useCreateNLSearchModelFieldForm();
  return (
    <>
      <ModelNameField />
      <ApiKeyField />
      <SystemPromptField />
      <MaxBytesField />
      <TemperatureField />
      <TopPField />
      <TopKField />
      <LabelledInput
        id="api_version"
        placeHolder="Enter Api Version"
        title="Api Version (optional)"
        {...register("api_version", {
          setValueAs: (v) => (v === "" ? undefined : v),
        })}
      />
      <Controller
        name="stop_sequences"
        control={control}
        render={({ field }) => (
          <MultiValueInput
            initialValue={field.value}
            label="Stop Sequences (optional)"
            onValueChange={(values) => {
              field.onChange(values);
            }}
          />
        )}
      />
    </>
  );
};

const GCPPlatformConfig = () => {
  const { register } = useCreateNLSearchModelFieldForm();
  return (
    <>
      <ModelNameField />
      <LabelledInput
        id="project_id"
        placeHolder="Enter Project Id"
        title="Project Id"
        {...register("project_id")}
      />
      <LabelledInput
        id="access_token"
        placeHolder="Enter Access Token"
        title="Access Token"
        {...register("access_token")}
      />
      <LabelledInput
        id="refresh_token"
        placeHolder="Enter Refresh Token"
        title="Refresh Token"
        {...register("refresh_token")}
      />
      <LabelledInput
        id="client_id"
        placeHolder="Enter Client Id"
        title="Client Id"
        {...register("client_id")}
      />
      <LabelledInput
        id="client_secret"
        placeHolder="Enter Client Secret"
        title="Client Secret"
        {...register("client_secret")}
      />
      <LabelledInput
        id="region"
        placeHolder="Enter Region"
        title="Region (optional)"
        {...register("region", {
          setValueAs: (v) => (v === "" ? undefined : v),
        })}
      />
      <SystemPromptField />
      <LabelledInput
        id="max_output_tokens"
        placeHolder="Enter Max Output Tokens"
        title="Max Output Tokens (optional)"
        type="number"
        {...register("max_output_tokens", {
          setValueAs: (v) => (v === "" ? undefined : Number(v)),
        })}
      />
      <TopPField />
      <TopKField />
      <MaxBytesField />
      <TemperatureField />
    </>
  );
};

const ModelNameField = () => {
  const { register } = useCreateNLSearchModelFieldForm();

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

const SystemPromptField = () => {
  const { register } = useCreateNLSearchModelFieldForm();

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

const MaxBytesField = () => {
  const { register } = useCreateNLSearchModelFieldForm();

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

const ApiKeyField = () => {
  const { register } = useCreateNLSearchModelFieldForm();

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

const TemperatureField = () => {
  const { register } = useCreateNLSearchModelFieldForm();

  return (
    <>
      <LabelledInput
        id="temperature"
        placeHolder="Enter Temperature"
        title="Temperature (optional)"
        type="number"
        {...register("temperature", {
          setValueAs: (v) => (v === "" ? undefined : Number(v)),
        })}
      />
    </>
  );
};

const TopPField = () => {
  const { register } = useCreateNLSearchModelFieldForm();

  return (
    <>
      <LabelledInput
        id="top_p"
        placeHolder="Enter top_p"
        title="top_p (optional)"
        type="number"
        {...register("top_p", {
          setValueAs: (v) => (v === "" ? undefined : Number(v)),
        })}
      />
    </>
  );
};

const TopKField = () => {
  const { register } = useCreateNLSearchModelFieldForm();

  return (
    <>
      <LabelledInput
        id="top_k"
        placeHolder="Enter top_k"
        title="top_k (optional)"
        type="number"
        {...register("top_k", {
          setValueAs: (v) => (v === "" ? undefined : Number(v)),
        })}
      />
    </>
  );
};

export default NLModelPlatformFields;
