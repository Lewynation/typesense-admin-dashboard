import { Controller } from "react-hook-form";
import { useCreateCollectionFieldForm } from "./add_collection_field_dialog";
import LabelledInput from "./labelled_input";

const AutoEmbeddingFields = () => {
  const { control } = useCreateCollectionFieldForm();
  return (
    <div>
      <Controller
        name="autoEmbeddingField.provider.type"
        control={control}
        render={({ field }) => {
          return (
            <>
              {field.value === "openAI" && <OpenAiProviderConfig />}
              {field.value === "azure" && <AzureProviderConfig />}
              {field.value === "openAICompatible" && <AzureProviderConfig />}
              {field.value === "googlePalm" && <OpenAiProviderConfig />}
              {field.value === "GCPVertexAI" && (
                <GCPVertexAIEmbedProviderConfig />
              )}
              {field.value === "ownModel" && <OwnModelProviderConfig />}
              {field.value === "builtIn" && <BuiltInProviderConfig />}
            </>
          );
        }}
      />
    </div>
  );
};

const GCPVertexAIEmbedProviderConfig = () => {
  const { control } = useCreateCollectionFieldForm();

  return (
    <>
      <Controller
        name="autoEmbeddingField.provider.model_name"
        control={control}
        render={({ field }) => (
          <LabelledInput
            id="modelName"
            placeHolder="Enter Model Name"
            title="Model Name"
            value={field.value}
            onChange={(e) => {
              field.onChange(e.target.value);
            }}
          />
        )}
      />
      <Controller
        name="autoEmbeddingField.provider.access_token"
        control={control}
        render={({ field }) => (
          <LabelledInput
            onChange={(e) => {
              field.onChange(e.target.value);
            }}
            value={field.value}
            id="accessToken"
            placeHolder="Enter Access Token"
            title="Access Token"
          />
        )}
      />
      <Controller
        name="autoEmbeddingField.provider.refresh_token"
        control={control}
        render={({ field }) => (
          <LabelledInput
            onChange={(e) => {
              field.onChange(e.target.value);
            }}
            value={field.value}
            id="refreshToken"
            placeHolder="Enter Refresh Token"
            title="Refresh Token"
          />
        )}
      />
      <Controller
        name="autoEmbeddingField.provider.client_id"
        control={control}
        render={({ field }) => (
          <LabelledInput
            onChange={(e) => {
              field.onChange(e.target.value);
            }}
            value={field.value}
            id="clientId"
            placeHolder="Enter Client Id"
            title="Client Id"
          />
        )}
      />
      <Controller
        name="autoEmbeddingField.provider.client_secret"
        control={control}
        render={({ field }) => (
          <LabelledInput
            onChange={(e) => {
              field.onChange(e.target.value);
            }}
            value={field.value}
            id="clientSecret"
            placeHolder="Enter Client Secret"
            title="Client Secret"
          />
        )}
      />
      <Controller
        name="autoEmbeddingField.provider.project_id"
        control={control}
        render={({ field }) => (
          <LabelledInput
            onChange={(e) => {
              field.onChange(e.target.value);
            }}
            value={field.value}
            id="projectId"
            placeHolder="Enter Project Id"
            title="Project Id"
          />
        )}
      />
      <Controller
        name="autoEmbeddingField.provider.document_task"
        control={control}
        render={({ field }) => (
          <LabelledInput
            onChange={(e) => {
              field.onChange(e.target.value);
            }}
            value={field.value}
            id="documentTask"
            placeHolder="Enter Document Task"
            title="Document Task"
          />
        )}
      />
      <Controller
        name="autoEmbeddingField.provider.query_task"
        control={control}
        render={({ field }) => (
          <LabelledInput
            onChange={(e) => {
              field.onChange(e.target.value);
            }}
            value={field.value}
            id="queryTask"
            placeHolder="Enter Query Task"
            title="Query Task"
          />
        )}
      />
      <Controller
        name="autoEmbeddingField.provider.region"
        control={control}
        render={({ field }) => (
          <LabelledInput
            onChange={(e) => {
              field.onChange(e.target.value);
            }}
            value={field.value}
            id="region"
            placeHolder="Enter Region"
            title="Region"
          />
        )}
      />
    </>
  );
};

const OwnModelProviderConfig = () => {
  const { control } = useCreateCollectionFieldForm();

  return (
    <>
      <Controller
        name="autoEmbeddingField.provider.model_name"
        control={control}
        render={({ field }) => (
          <LabelledInput
            id="modelName"
            placeHolder="Enter Model Name"
            title="Model Name"
            value={field.value}
            onChange={(e) => {
              field.onChange(e.target.value);
            }}
          />
        )}
      />
      <Controller
        name="autoEmbeddingField.provider.indexing_prefix"
        control={control}
        render={({ field }) => (
          <LabelledInput
            onChange={(e) => {
              const val = e.target.value;
              field.onChange(val === "" ? undefined : val);
            }}
            value={field.value}
            id="indexingPrefix"
            placeHolder="Enter Indexing Prefix"
            title="Indexing Prefix (optional)"
          />
        )}
      />
      <Controller
        name="autoEmbeddingField.provider.query_prefix"
        control={control}
        render={({ field }) => (
          <LabelledInput
            onChange={(e) => {
              const val = e.target.value;
              field.onChange(val === "" ? undefined : val);
            }}
            value={field.value}
            id="queryPrefix"
            placeHolder="Enter Query Prefix"
            title="Query Prefix (optional)"
          />
        )}
      />
    </>
  );
};

const OpenAiProviderConfig = () => {
  const { control } = useCreateCollectionFieldForm();

  return (
    <>
      <Controller
        name="autoEmbeddingField.provider.model_name"
        control={control}
        render={({ field }) => (
          <LabelledInput
            id="modelName"
            placeHolder="Enter Model Name"
            title="Model Name"
            value={field.value}
            onChange={(e) => {
              field.onChange(e.target.value);
            }}
          />
        )}
      />
      <Controller
        name="autoEmbeddingField.provider.api_key"
        control={control}
        render={({ field }) => (
          <LabelledInput
            onChange={(e) => {
              field.onChange(e.target.value);
            }}
            value={field.value}
            id="apiKey"
            placeHolder="Enter Api Key"
            title="Api Key"
          />
        )}
      />
    </>
  );
};

const BuiltInProviderConfig = () => {
  const { control } = useCreateCollectionFieldForm();

  return (
    <>
      <Controller
        name="autoEmbeddingField.provider.model_name"
        control={control}
        render={({ field }) => (
          <LabelledInput
            id="modelName"
            placeHolder="Enter Model Name"
            title="Model Name"
            value={field.value}
            onChange={(e) => {
              field.onChange(e.target.value);
            }}
          />
        )}
      />
    </>
  );
};

const AzureProviderConfig = () => {
  const { control } = useCreateCollectionFieldForm();

  return (
    <>
      <Controller
        name="autoEmbeddingField.provider.model_name"
        control={control}
        render={({ field }) => (
          <LabelledInput
            id="modelName"
            placeHolder="Enter Model Name"
            title="Model Name"
            value={field.value}
            onChange={(e) => {
              field.onChange(e.target.value);
            }}
          />
        )}
      />
      <Controller
        name="autoEmbeddingField.provider.api_key"
        control={control}
        render={({ field }) => (
          <LabelledInput
            onChange={(e) => {
              field.onChange(e.target.value);
            }}
            value={field.value}
            id="apiKey"
            placeHolder="Enter Api Key"
            title="Api Key"
          />
        )}
      />
      <Controller
        name="autoEmbeddingField.provider.url"
        control={control}
        render={({ field }) => (
          <LabelledInput
            onChange={(e) => {
              field.onChange(e.target.value);
            }}
            value={field.value}
            id="url"
            placeHolder="Enter Url"
            title="Url"
          />
        )}
      />
    </>
  );
};

export default AutoEmbeddingFields;
