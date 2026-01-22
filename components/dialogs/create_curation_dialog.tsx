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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOverride } from "@/actions";
import { toast } from "sonner";
import { OverrideSchema } from "typesense/lib/Typesense/Override";
import { Editor } from "@monaco-editor/react";
import { CircularSpinner } from "../ui/circular_spinner";
import {
  CreateOverrideFormFields,
  CreateOverrideSchema,
} from "@/zod/create_curation";
import { OverrideCreateSchema } from "typesense/lib/Typesense/Overrides";
import { BarLoaderFullScreenWidth } from "@/components/ui/bar_loader";
import { tryParse } from "@/lib/try_parse";
import { useTheme } from "next-themes";

const ShowCreateCurationDialog = ({
  setShowDialog,
  showDialog,
  curation,
  readonly,
}: {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  curation: OverrideSchema | undefined;
  readonly: boolean;
}) => {
  const { theme } = useTheme();

  const isCurationEdit = !!curation;
  const params = useParams() as { id: string; name: string };
  const { id, ...curationWithoutId } = curation || {
    rule: {
      query: "apple",
      match: "exact",
    },
    includes: [
      { id: "422", position: 1 },
      { id: "54", position: 2 },
    ],
    excludes: [{ id: "287" }],
  };
  const {
    register,
    handleSubmit,
    setError,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateOverrideFormFields>({
    defaultValues: {
      id: curation?.id,
      override: curationWithoutId,
    },
    resolver: zodResolver(CreateOverrideSchema),
  });

  const createCurationHandler: SubmitHandler<CreateOverrideFormFields> = async (
    formData,
  ) => {
    const { id, override } = formData;
    try {
      const createdSynonym = await createOverride(
        params.id,
        params.name,
        id,
        tryParse(override) as OverrideCreateSchema,
      );
      if (!createdSynonym.success) {
        setError("root", {
          message: createdSynonym.error,
        });
        toast("Error", {
          description: createdSynonym.error,
          className: "font-mono",
        });
        return;
      }
      setShowDialog(false);
      toast("Success", {
        description: "Override created successfully",
      });
    } catch (error) {
      setError("root", {
        message: "Something went wrong",
      });
      toast("Error", {
        description: "Uh oh! Something went wrong.",
        className: "font-mono",
      });
    }
  };

  const override = watch("override");

  return (
    <Dialog open={showDialog} onOpenChange={(open) => setShowDialog(open)}>
      <DialogContent className="sm:max-w-[425px] lg:max-w-3xl">
        {isSubmitting && <BarLoaderFullScreenWidth loading={isSubmitting} />}
        <form onSubmit={handleSubmit(createCurationHandler)}>
          <DialogHeader>
            <DialogTitle className="font-mono">
              {isCurationEdit ? "Edit" : "Create"} Curation(Override)
            </DialogTitle>
          </DialogHeader>
          {!readonly && (
            <div className="grid gap-4 my-3">
              <div className="grid gap-3">
                <Label htmlFor="id" className="font-mono">
                  Name
                </Label>
                <Input
                  {...register("id")}
                  id="id"
                  name="id"
                  disabled={isCurationEdit}
                  placeholder="Enter Curation name"
                  className="font-mono"
                />
              </div>
            </div>
          )}
          <Editor
            onChange={(val) => {
              if (val) setValue("override", val);
            }}
            className="z-10"
            height="60vh"
            defaultLanguage="json"
            defaultValue={JSON.stringify(override, null, 2)}
            loading={<CircularSpinner />}
            theme={theme === "light" ? "light" : "vs-dark"}
          />
          <div>
            {errors.id && (
              <p className="text-destructive text-sm font-mono">
                - (Name) {errors.id.message}
              </p>
            )}
            {errors.override && (
              <p className="text-destructive text-sm font-mono">
                - (Name) {errors.override.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="font-mono">
                Cancel
              </Button>
            </DialogClose>
            {!readonly && (
              <Button type="submit" className="font-mono">
                {isCurationEdit ? "Edit" : "Create"}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const useCreateCurationDialog = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [curation, setCuration] = useState<OverrideSchema | undefined>();
  const [readonly, setReadonly] = useState<boolean>(false);

  const CreateCurationDialog = () => (
    <ShowCreateCurationDialog
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      curation={curation}
      readonly={readonly}
    />
  );

  const setShowCreateCurationDialog = (
    show: boolean,
    curation?: OverrideSchema,
    readonly?: boolean,
  ) => {
    setShowDialog(show);
    setCuration(curation);
    setReadonly(readonly ?? false);
  };

  return {
    setShowCreateCurationDialog,
    CreateCurationDialog,
  };
};
