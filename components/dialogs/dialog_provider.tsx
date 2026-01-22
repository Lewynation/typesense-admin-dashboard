"use client";

import { createContext, ReactNode, useContext } from "react";
import { useShowGeneratedApiKeyModal } from "./show_created_api_key_dialog";
import { useCreateSynonymDialog } from "./create_synonym_dialog";
import { SynonymSchema } from "typesense/lib/Typesense/Synonym";
import { OverrideSchema } from "typesense/lib/Typesense/Override";
import { useCreateCurationDialog } from "./create_curation_dialog";
import { useCreatePresetDialog } from "./create_preset_dialog";
import { PresetSchema } from "typesense/lib/Typesense/Preset";
import { DocumentSchema } from "typesense/lib/Typesense/Documents";
import { StopwordSchema } from "typesense/lib/Typesense/Stopword";
import { useCreateStopWordsDialog } from "./create_stop_words_dialog";
import {
  useCreateCollectConversationModelFieldForm,
  useCreateConversationModelDialog,
} from "./create_conversation_model/create_conversation_model_dialog";
import { LocalConversationModel } from "@/zod/create_conversation_model";
import { ConversationModelSchema } from "typesense/lib/Typesense/ConversationModel";
import { useCreateNLSearchModelDialog } from "./create_nl_search_model/create_nl_search_model_dialog";
import { NLSearchModelSchema } from "typesense/lib/Typesense/NLSearchModels";
import { LocalNLSearchModel } from "@/zod/create_nl_search_model";
import { useCreateStemmingDictionaryDialog } from "./create_stemming_dictionary_dialog";
import { useCloneCollectionSchemaDialog } from "./clone_collection_schema_dialog";
import { useShowApiResponseInEditorModal } from "./show_api_response_in_editor_dialog";

export const DialogContext = createContext<{
  showCreatedApiKeyDialog: (show: boolean, apiKey: string) => void;
  showCreateSynonymDialog: (show: boolean, synonym?: SynonymSchema) => void;
  showCreateStopWordsDialog: (
    show: boolean,
    stopWords?: StopwordSchema,
  ) => void;
  showCreateCurationDialog: (
    show: boolean,
    override?: OverrideSchema,
    readonly?: boolean,
  ) => void;
  showCreatePresetDialog: (
    show: boolean,
    preset?: PresetSchema<DocumentSchema>,
    readonly?: boolean,
  ) => void;
  showCreateConversationModelDialog: (
    show: boolean,
    preset?: ConversationModelSchema | LocalConversationModel,
    readonly?: boolean,
  ) => void;
  showCreateNLSearchModelDialog: (
    show: boolean,
    preset?: NLSearchModelSchema | LocalNLSearchModel,
    readonly?: boolean,
  ) => void;
  showCreateStemmingDictionaryDialog: (
    show: boolean,
    stemmingId?: string,
    readonly?: boolean,
  ) => void;
  showCloneCollectionSchemaDialog: (
    show: boolean,
    fromCollectionName: string,
  ) => void;
  showApiResponseInEditorDialog: (show: boolean, response: string) => void;
}>({
  showCreatedApiKeyDialog: () => {},
  showCreateSynonymDialog: () => {},
  showCreateStopWordsDialog: () => {},
  showCreateCurationDialog: () => {},
  showCreatePresetDialog: () => {},
  showCreateConversationModelDialog: () => {},
  showCreateNLSearchModelDialog: () => {},
  showCreateStemmingDictionaryDialog: () => {},
  showCloneCollectionSchemaDialog: () => {},
  showApiResponseInEditorDialog: () => {},
});

const DialogProvider = ({ children }: { children: ReactNode }) => {
  const { CreatedApiKeyDialog, setShowDialogWithApiKey } =
    useShowGeneratedApiKeyModal();
  const { CreateSynonymDialog, setShowCreateSynonymDialog } =
    useCreateSynonymDialog();
  const { CreateCurationDialog, setShowCreateCurationDialog } =
    useCreateCurationDialog();
  const { CreatePresetDialog, setShowCreatePresetDialog } =
    useCreatePresetDialog();
  const { CreateStopWordsDialog, setShowCreateStopWordsDialog } =
    useCreateStopWordsDialog();
  const {
    CreateConversationModelDialog,
    setShowCreateConversationModelDialog,
  } = useCreateConversationModelDialog();
  const { CreateNLserachModelDialog, setShowCreateNLSearchModelDialog } =
    useCreateNLSearchModelDialog();
  const {
    CreateStemmingDictionaryDialog,
    setShowCreateStemmingDictionaryDialog,
  } = useCreateStemmingDictionaryDialog();
  const { CloneCollectionSchemaDialog, setShowCloneCollectionSchemaDialog } =
    useCloneCollectionSchemaDialog();
  const { ApiResponseInEditorDialog, setShowApiResponseInEditorDialog } =
    useShowApiResponseInEditorModal();

  return (
    <DialogContext.Provider
      value={{
        showCreatedApiKeyDialog: setShowDialogWithApiKey,
        showCreateSynonymDialog: setShowCreateSynonymDialog,
        showCreateCurationDialog: setShowCreateCurationDialog,
        showCreatePresetDialog: setShowCreatePresetDialog,
        showCreateStopWordsDialog: setShowCreateStopWordsDialog,
        showCreateConversationModelDialog: setShowCreateConversationModelDialog,
        showCreateNLSearchModelDialog: setShowCreateNLSearchModelDialog,
        showCreateStemmingDictionaryDialog:
          setShowCreateStemmingDictionaryDialog,
        showCloneCollectionSchemaDialog: setShowCloneCollectionSchemaDialog,
        showApiResponseInEditorDialog: setShowApiResponseInEditorDialog,
      }}
    >
      <CreatedApiKeyDialog />
      <CreateSynonymDialog />
      <CreateCurationDialog />
      <CreatePresetDialog />
      <CreateStopWordsDialog />
      <CreateConversationModelDialog />
      <CreateNLserachModelDialog />
      <CreateStemmingDictionaryDialog />
      <CloneCollectionSchemaDialog />
      <ApiResponseInEditorDialog />
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => useContext(DialogContext);

export default DialogProvider;
