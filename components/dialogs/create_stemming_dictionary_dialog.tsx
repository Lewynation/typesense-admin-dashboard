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
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createStemmingDictionary } from "@/actions";
import { toast } from "sonner";
import { Editor } from "@monaco-editor/react";
import { CircularSpinner } from "../ui/circular_spinner";
import { BarLoaderFullScreenWidth } from "@/components/ui/bar_loader";
import { tryParse } from "@/lib/try_parse";
import { useStemming } from "@/swr/use_stemming";
import {
  CreateStemmingFormFields,
  CreateStemmingSchema,
} from "@/zod/create_stemming";
import { useTheme } from "next-themes";

const ShowCreateStemmingDictionaryDialog = ({
  setShowDialog,
  showDialog,
  stemmingId,
  readonly,
}: {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  stemmingId: string | undefined;
  readonly: boolean;
}) => {
  const isPresetEdit = !!stemmingId;
  const { theme } = useTheme();

  const params = useParams() as { id: string };

  const { stemmingDictionary, isLoading } = useStemming(stemmingId);
  const presetOr = isPresetEdit
    ? stemmingDictionary
    : {
        id: "irregular-plurals",
        words: [
          { root: "person", word: "people" },
          { root: "child", word: "children" },
          { root: "goose", word: "geese" },
        ],
      };
  const {
    handleSubmit,
    setError,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateStemmingFormFields>({
    values: {
      preset: presetOr,
    },
    resolver: zodResolver(CreateStemmingSchema),
  });

  const createStemmingDictionarySubmitted: SubmitHandler<
    CreateStemmingFormFields
  > = async (formData) => {
    const { preset } = formData;
    const payload = tryParse(preset) as any;
    try {
      if (!payload?.["id"] || !payload?.["words"]) {
        throw new Error("Invalid object passed");
      }
      const createdSynonym = await createStemmingDictionary(
        params.id,
        payload["id"],
        payload["words"],
      );
      if (!createdSynonym.success) {
        setError("root", {
          message: createdSynonym.error,
        });
        toast.error("Error", {
          description: createdSynonym.error,
          className: "font-mono",
        });
        return;
      }
      setShowDialog(false);
      toast.success("Success", {
        description: "Stemming dictionary created successfully",
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

  const presetWatch = watch("preset");

  return (
    <Dialog open={showDialog} onOpenChange={(open) => setShowDialog(open)}>
      <DialogContent className="sm:max-w-[425px] lg:max-w-3xl">
        {isSubmitting ||
          (isLoading && (
            <BarLoaderFullScreenWidth loading={isSubmitting || isLoading} />
          ))}
        <form onSubmit={handleSubmit(createStemmingDictionarySubmitted)}>
          <DialogHeader>
            <DialogTitle className="font-mono">
              {isPresetEdit ? "Edit" : "Create"} Stemming Dictionary
            </DialogTitle>
          </DialogHeader>
          {!!presetWatch && (
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
          )}
          <div>
            {errors.preset && (
              <p className="text-destructive text-sm font-mono">
                - (Stemming) {errors.preset.message}
              </p>
            )}
            {errors.root && (
              <p className="text-destructive text-sm font-mono">
                - (Root) {errors.root.message}
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

export const useCreateStemmingDictionaryDialog = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [stemmingId, setStemmingId] = useState<string | undefined>();
  const [readonly, setReadonly] = useState<boolean>(false);

  const CreateStemmingDictionaryDialog = () => (
    <ShowCreateStemmingDictionaryDialog
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      stemmingId={stemmingId}
      readonly={readonly}
    />
  );

  const setShowCreateStemmingDictionaryDialog = (
    show: boolean,
    stemmingId?: string,
    readonly?: boolean,
  ) => {
    setShowDialog(show);
    setStemmingId(stemmingId);
    setReadonly(readonly ?? false);
  };

  return {
    setShowCreateStemmingDictionaryDialog,
    CreateStemmingDictionaryDialog,
  };
};
