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
import { createSearchPreset } from "@/actions";
import { toast } from "sonner";
import { Editor } from "@monaco-editor/react";
import { CircularSpinner } from "../ui/circular_spinner";
import { BarLoaderFullScreenWidth } from "@/components/ui/bar_loader";
import { DocumentSchema } from "typesense/lib/Typesense/Documents";
import { PresetSchema } from "typesense/lib/Typesense/Preset";
import {
  CreateSearchPresetFormFields,
  CreateSearchPresetSchema,
} from "@/zod/create_search_preset";
import { PresetCreateSchema } from "typesense/lib/Typesense/Presets";
import { tryParse } from "@/lib/try_parse";
import { useTheme } from "next-themes";

const ShowCreatePresetDialog = ({
  setShowDialog,
  showDialog,
  preset,
  readonly,
}: {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  preset: PresetSchema<DocumentSchema> | undefined;
  readonly: boolean;
}) => {
  const isPresetEdit = !!preset;
  const { theme } = useTheme();

  const params = useParams() as { id: string };
  const presetOr = preset?.value || {
    searches: [
      {
        collection: "products",
        q: "*",
        sort_by: "popularity",
      },
      {
        collection: "blog_posts",
        q: "*",
        sort_by: "published_at:desc",
      },
    ],
  };
  const {
    register,
    handleSubmit,
    setError,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateSearchPresetFormFields>({
    defaultValues: {
      id: preset?.name,
      preset: presetOr,
    },
    resolver: zodResolver(CreateSearchPresetSchema),
  });

  const createPresetSumitted: SubmitHandler<
    CreateSearchPresetFormFields
  > = async (formData) => {
    const { id, preset } = formData;
    const payload = tryParse(preset) as any;
    try {
      const createdSynonym = await createSearchPreset(
        params.id,
        id,
        payload["value"]
          ? payload
          : ({ value: payload } as PresetCreateSchema<DocumentSchema, string>),
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
      toast.success("Success", {
        description: "Preset created successfully",
        className: "font-mono",
      });
    } catch (error) {
      setError("root", {
        message: "Something went wrong",
      });
      toast("Error", {
        description: "Uh oh! Something went wrong.",
      });
    }
  };

  const presetWatch = watch("preset");

  return (
    <Dialog open={showDialog} onOpenChange={(open) => setShowDialog(open)}>
      <DialogContent className="sm:max-w-[425px] lg:max-w-3xl">
        {isSubmitting && <BarLoaderFullScreenWidth loading={isSubmitting} />}
        <form onSubmit={handleSubmit(createPresetSumitted)}>
          <DialogHeader>
            <DialogTitle className="font-mono">
              {isPresetEdit ? "Edit" : "Create"} Search Preset
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
                  disabled={isPresetEdit}
                  placeholder="Enter Preset name"
                  className="font-mono"
                />
              </div>
            </div>
          )}
          <Editor
            onChange={(val) => {
              if (val) setValue("preset", val);
            }}
            className="z-10"
            height="60vh"
            defaultLanguage="json"
            defaultValue={JSON.stringify(presetWatch, null, 2)}
            loading={<CircularSpinner />}
            theme={theme === "light" ? "light" : "vs-dark"}
          />
          <div>
            {errors.id && (
              <p className="text-destructive text-sm font-mono">
                - (Name) {errors.id.message}
              </p>
            )}
            {errors.preset && (
              <p className="text-destructive text-sm font-mono">
                - (Preset) {errors.preset.message}
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
                {isPresetEdit ? "Edit" : "Create"}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const useCreatePresetDialog = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [preset, setPreset] = useState<
    PresetSchema<DocumentSchema> | undefined
  >();
  const [readonly, setReadonly] = useState<boolean>(false);

  const CreatePresetDialog = () => (
    <ShowCreatePresetDialog
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      preset={preset}
      readonly={readonly}
    />
  );

  const setShowCreatePresetDialog = (
    show: boolean,
    preset?: PresetSchema<DocumentSchema>,
    readonly?: boolean,
  ) => {
    setShowDialog(show);
    setPreset(preset);
    setReadonly(readonly ?? false);
  };

  return {
    setShowCreatePresetDialog,
    CreatePresetDialog,
  };
};
