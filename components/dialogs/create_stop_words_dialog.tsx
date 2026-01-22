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
import { createStopWord } from "@/actions";
import { toast } from "sonner";
import MultiValueInput from "../ui/multi_value_input";
import { BarLoaderFullScreenWidth } from "../ui/bar_loader";
import { StopwordSchema } from "typesense/lib/Typesense/Stopword";
import {
  CreateStopWordsFormFields,
  CreateStopWordsSchema,
} from "@/zod/create_stop_words";
import { StopwordCreateSchema } from "typesense/lib/Typesense/Stopwords";

const ShowCreateStopWordsDialog = ({
  setShowDialog,
  showDialog,
  stopWords,
}: {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  stopWords: StopwordSchema | undefined;
}) => {
  const params = useParams() as { id: string };
  const isStopWordsEdit = !!stopWords;

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateStopWordsFormFields>({
    defaultValues: {
      id: stopWords?.id,
      locale: stopWords?.locale,
      stopwords: Array.isArray(stopWords?.stopwords)
        ? stopWords.stopwords
        : stopWords?.stopwords.stopwords,
    },
    resolver: zodResolver(CreateStopWordsSchema),
  });

  const createStopWordsSubmitted: SubmitHandler<
    CreateStopWordsFormFields
  > = async (formData) => {
    const { id, stopwords, locale } = formData;
    try {
      const stopWordCreateSchema: StopwordCreateSchema = {
        locale,
        stopwords,
      };
      const createdStopwords = await createStopWord(
        params.id,
        id,
        stopWordCreateSchema,
      );
      if (!createdStopwords.success) {
        setError("root", {
          message: createdStopwords.error,
        });
        toast.error("Error", {
          description: createdStopwords.error,
          className: "font-mono",
        });
        return;
      }
      setShowDialog(false);
      toast.success("Success", {
        description: "Stopwords created successfully",
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
      <DialogContent className="sm:max-w-[425px]">
        {isSubmitting && <BarLoaderFullScreenWidth loading={isSubmitting} />}
        <form onSubmit={handleSubmit(createStopWordsSubmitted)}>
          <DialogHeader>
            <DialogTitle className="font-mono">
              {isStopWordsEdit ? "Edit" : "Create"} Stop Words
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 my-3">
            <div className="grid gap-3">
              <Label htmlFor="id" className="font-mono">
                Name
              </Label>
              <Input
                {...register("id")}
                id="id"
                name="id"
                disabled={isStopWordsEdit}
                placeholder="Enter Synonym Name"
                className="font-mono"
              />
            </div>
          </div>
          <MultiValueInput
            initialValue={
              Array.isArray(stopWords?.stopwords)
                ? stopWords.stopwords
                : stopWords?.stopwords.stopwords
            }
            label="Stopwords"
            onValueChange={(values) => {
              setValue("stopwords", values);
            }}
          />
          <div className="grid gap-4 my-3">
            <div className="grid gap-3">
              <Label htmlFor="locale" className="font-mono">
                Locale (optional)
              </Label>
              <Input
                {...register("locale")}
                id="locale"
                name="locale"
                placeholder="Enter locale"
                className="font-mono"
              />
            </div>
          </div>

          <div>
            {errors.stopwords && (
              <p className="text-destructive text-sm font-mono">
                - (Stopwords) {errors.stopwords.message}
              </p>
            )}
            {errors.id && (
              <p className="text-destructive text-sm font-mono">
                - (Name) {errors.id.message}
              </p>
            )}
            {errors.locale && (
              <p className="text-destructive text-sm font-mono">
                - (Locale) {errors.locale.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="font-mono">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="font-mono">
              {isStopWordsEdit ? "Edit" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const useCreateStopWordsDialog = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [stopWords, setStopWords] = useState<StopwordSchema | undefined>();

  const CreateStopWordsDialog = () => (
    <ShowCreateStopWordsDialog
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      stopWords={stopWords}
    />
  );

  const setShowCreateStopWordsDialog = (
    show: boolean,
    stopWords?: StopwordSchema,
  ) => {
    setShowDialog(show);
    setStopWords(stopWords);
  };

  return {
    setShowCreateStopWordsDialog,
    CreateStopWordsDialog,
  };
};
