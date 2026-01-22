"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createConversationalModel,
  updateConversationalModel,
} from "@/actions";
import { toast } from "sonner";
import { BarLoaderFullScreenWidth } from "../../ui/bar_loader";
import {
  ConversationModelCreateSchema,
  ConversationModelSchema,
} from "typesense/lib/Typesense/ConversationModel";
import {
  LocalConversationModel,
  LocalConversationModelSchema,
} from "@/zod/create_conversation_model";
import LabelledInput from "../add_collection_field/labelled_input";
import { flattenReactFormErrors } from "@/lib/flatter_react_form_errors";
import { ModelProviderSelection } from "./selections";
import { localToApiConversationModelCreate } from "@/lib/conversational_model_manipulator";
import ConversationProviderFields from "./conversation_providers_input";
import { CircularSpinner } from "@/components/ui/circular_spinner";
import { ServerActionResult } from "@/actions/create_server_action";

const ShowCreateConversationModelDialog = ({
  setShowDialog,
  showDialog,
  conversationModel,
}: {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  conversationModel:
    | ConversationModelSchema
    | LocalConversationModel
    | undefined;
}) => {
  const params = useParams() as { id: string };
  const isModelEdit = !!conversationModel;

  const methods = useForm<LocalConversationModel>({
    defaultValues: {
      ...conversationModel,
    },
    resolver: zodResolver(LocalConversationModelSchema),
  });
  const {
    setError,
    register,
    formState: { isSubmitting, errors },
  } = methods;

  const generateAPIKey: SubmitHandler<LocalConversationModel> = async (
    formData,
  ) => {
    try {
      let createdModel: ServerActionResult<
        ConversationModelCreateSchema | undefined
      >;
      if (conversationModel) {
        createdModel = await updateConversationalModel(
          params.id,
          conversationModel.id,
          localToApiConversationModelCreate(formData),
        );
      } else {
        createdModel = await createConversationalModel(
          params.id,
          localToApiConversationModelCreate(formData),
        );
      }
      if (!createdModel.success) {
        setError("root", {
          message: createdModel.error,
        });
        toast.error("Error", {
          description: createdModel.error,
          className: "font-mono",
        });
        return;
      }
      setShowDialog(false);
      toast.success("Success", {
        description: `Conversation model ${isModelEdit ? "edited" : "created"} successfully`,
        className: "font-mono",
      });
    } catch (error) {
      setError("root", {
        message: "Something went wrong",
      });
      toast.error("Error", {
        description: "Uh oh! Something went wrong.",
        className: "font-mono",
      });
    }
  };

  return (
    <Dialog open={showDialog} onOpenChange={(open) => setShowDialog(open)}>
      <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-[95vh] lg:max-w-2xl">
        {isSubmitting && <BarLoaderFullScreenWidth loading={isSubmitting} />}
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(generateAPIKey)}>
            <DialogHeader>
              <DialogTitle className="font-mono">
                {isModelEdit ? "Edit" : "Create"} Conversation Model
              </DialogTitle>
            </DialogHeader>
            <ModelProviderSelection />
            <LabelledInput
              id="id"
              placeHolder="Enter Id"
              title="Id"
              disabled={isModelEdit}
              {...register("id")}
            />
            <ConversationProviderFields />
            <div>
              {flattenReactFormErrors(errors).map((error, index) => (
                <p
                  className="text-destructive text-sm font-mono w-full break-all"
                  key={index}
                >
                  {error}
                </p>
              ))}
            </div>
            <DialogFooter>
              {isSubmitting && <CircularSpinner size={20} />}
              <DialogClose asChild>
                <Button variant="outline" className="font-mono">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="font-mono">
                {isModelEdit ? "Edit" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export const useCreateCollectConversationModelFieldForm = () =>
  useFormContext<LocalConversationModel>();

export const useCreateConversationModelDialog = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [conversationModel, setConversationModel] = useState<
    ConversationModelSchema | LocalConversationModel | undefined
  >();

  const CreateConversationModelDialog = () => (
    <ShowCreateConversationModelDialog
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      conversationModel={conversationModel}
    />
  );

  const setShowCreateConversationModelDialog = (
    show: boolean,
    conversationModel?: ConversationModelSchema | LocalConversationModel,
  ) => {
    setShowDialog(show);
    setConversationModel(conversationModel);
  };

  return {
    setShowCreateConversationModelDialog,
    CreateConversationModelDialog,
  };
};
