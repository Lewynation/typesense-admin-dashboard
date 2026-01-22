"use client";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  generateKeySchema,
  getEpochTimes,
  validateSearchCheckBoxes,
} from "@/lib/search_api_keys_utils";
import { useSearchCheckBoxes } from "@/contexts/react_context/check_box_context";
import { createAPIKey } from "@/actions";
import { useDialog } from "@/components/dialogs/dialog_provider";
import { toast } from "sonner";
import SearchAPIKeysDataCollection from "./search_api_key_data_collection/search_api_key_data_collection";
import SearchApiKeysDataSubmisssion from "./search_api_key_data_submission/search_api_key_data_submission";
import CheckBoxesTree from "./check_boxes/check_boxes_tree";
import {
  CreateSearchApiKeyFormFields,
  CreateSearchApiKeyFormSchema,
} from "@/zod/create_api_key";

const SearchApiKeysHome = ({ serverId }: { serverId: string }) => {
  const methods = useForm<CreateSearchApiKeyFormFields>({
    defaultValues: {
      collections: [],
      expiration: "7days",
    },
    resolver: zodResolver(CreateSearchApiKeyFormSchema),
  });
  const { state } = useSearchCheckBoxes();
  const { showCreatedApiKeyDialog } = useDialog();

  const createSEarchApiKeySubmission: SubmitHandler<
    CreateSearchApiKeyFormFields
  > = async (formData) => {
    const isValid = validateSearchCheckBoxes(state.searchCheckBoxes);
    if (!isValid) {
      methods.setError("root", { message: "Select a scope to continue..." });
      return;
    }
    const keySchema = generateKeySchema({
      searchCheckBoxes: state.searchCheckBoxes,
      APIKeyDescription: formData.description,
      collectionList: formData.collections.length
        ? formData.collections
        : ["*"],
      expiryDate: Math.round(getEpochTimes(formData.expiration) / 1000),
    });

    try {
      const createdKey = await createAPIKey(serverId, keySchema);
      if (!createdKey.success) {
        methods.setError("root", {
          message: createdKey.error,
        });
        toast("Error", {
          description: createdKey.error,
        });
        return;
      }
      if (createdKey.value?.value) {
        showCreatedApiKeyDialog(true, createdKey.value.value);
      }
    } catch (error) {
      methods.setError("root", {
        message: "Something went wrong",
      });
      toast("Error", {
        description: "Uh oh! Something went wrong.",
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="relative flex flex-col items-center">
        <form onSubmit={methods.handleSubmit(createSEarchApiKeySubmission)}>
          <SearchAPIKeysDataCollection />
          <CheckBoxesTree />
          <SearchApiKeysDataSubmisssion />
        </form>
      </div>
    </FormProvider>
  );
};

export default SearchApiKeysHome;

export const useCreateSearchApiKeyForm = () =>
  useFormContext<CreateSearchApiKeyFormFields>();
