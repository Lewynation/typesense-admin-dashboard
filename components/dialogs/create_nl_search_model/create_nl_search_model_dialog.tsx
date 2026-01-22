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
import { createNLSearchModel, updateNLSearchModel } from "@/actions";
import { toast } from "sonner";
import { BarLoaderFullScreenWidth } from "../../ui/bar_loader";
import LabelledInput from "../add_collection_field/labelled_input";
import { flattenReactFormErrors } from "@/lib/flatter_react_form_errors";
import { CircularSpinner } from "@/components/ui/circular_spinner";
import { NLSearchModelSchema } from "typesense/lib/Typesense/NLSearchModels";
import {
  LocalNLSearchModel,
  LocalNLSearchModelSchema,
} from "@/zod/create_nl_search_model";
import { localToApiNLSearchModelCreate } from "@/lib/nl_search_model_manipulator";
import { NLModelProviderSelection } from "./selections";
import NLModelPlatformFields from "./nl_model_platform_fields";
import { ServerActionResult } from "@/actions/create_server_action";

const ShowCreateNLSearchModelDialog = ({
  setShowDialog,
  showDialog,
  nlSearchModel,
}: {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  nlSearchModel: NLSearchModelSchema | LocalNLSearchModel | undefined;
}) => {
  const params = useParams() as { id: string };
  const isModelEdit = !!nlSearchModel;

  const methods = useForm<LocalNLSearchModel>({
    defaultValues: {
      ...nlSearchModel,
    },
    resolver: zodResolver(LocalNLSearchModelSchema),
  });
  const {
    setError,
    register,
    formState: { isSubmitting, errors },
  } = methods;

  const generateAPIKey: SubmitHandler<LocalNLSearchModel> = async (
    formData,
  ) => {
    try {
      let createdModel: ServerActionResult<NLSearchModelSchema | undefined>;
      if (nlSearchModel) {
        createdModel = await updateNLSearchModel(
          params.id,
          nlSearchModel.id,
          localToApiNLSearchModelCreate(formData),
        );
      } else {
        createdModel = await createNLSearchModel(
          params.id,
          localToApiNLSearchModelCreate(formData),
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
        description: `NL Search model ${isModelEdit ? "edited" : "created"} successfully`,
        className: "font-mono",
      });
    } catch (error) {
      if (error instanceof Error) {
        setError("root", {
          message: error.message,
        });
        toast.error("Error", {
          description: error.message,
          className: "font-mono",
        });
      } else {
        setError("root", {
          message: "Something went wrong",
        });
        toast.error("Error", {
          description: "Uh oh! Something went wrong.",
          className: "font-mono",
        });
      }
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
                {isModelEdit ? "Edit" : "Create"} NL Search Model
              </DialogTitle>
            </DialogHeader>
            <NLModelProviderSelection />
            <LabelledInput
              id="id"
              placeHolder="Enter Id"
              title="Id"
              disabled={isModelEdit}
              {...register("id")}
            />
            <NLModelPlatformFields />
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

export const useCreateNLSearchModelFieldForm = () =>
  useFormContext<LocalNLSearchModel>();

export const useCreateNLSearchModelDialog = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [nlSearchModel, setNLSearchModel] = useState<
    NLSearchModelSchema | LocalNLSearchModel | undefined
  >();

  const CreateNLserachModelDialog = () => (
    <ShowCreateNLSearchModelDialog
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      nlSearchModel={nlSearchModel}
    />
  );

  const setShowCreateNLSearchModelDialog = (
    show: boolean,
    nlSearchModel?: NLSearchModelSchema | LocalNLSearchModel,
  ) => {
    setShowDialog(show);
    setNLSearchModel(nlSearchModel);
  };

  return {
    setShowCreateNLSearchModelDialog,
    CreateNLserachModelDialog,
  };
};
