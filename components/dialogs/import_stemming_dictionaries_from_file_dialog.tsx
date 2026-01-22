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
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BarLoaderFullScreenWidth } from "../ui/bar_loader";
import { flattenReactFormErrors } from "@/lib/flatter_react_form_errors";
import z from "zod";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const StemmingDictionaryImportSchema = z.object({
  name: z.string().nonempty(),
  file: z.instanceof(File),
});

type StemmingDictionaryImport = z.infer<typeof StemmingDictionaryImportSchema>;

const ShowImportStemmingDictionariesFromFileDialog = ({
  setShowDialog,
  showDialog,
}: {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
}) => {
  const params = useParams<{ id: string }>();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StemmingDictionaryImport>({
    defaultValues: {},
    resolver: zodResolver(StemmingDictionaryImportSchema),
  });

  const router = useRouter();

  const handleAnalyticsEventSubmission: SubmitHandler<
    StemmingDictionaryImport
  > = async (formData) => {
    const { file, name } = formData;
    try {
      const res = await fetch(
        `/api/typesense/dictionaries/import?serverId=${params.id}&dictionaryId=${name}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: file,
        },
      );
      if (res.ok) {
        toast.success("success", {
          description: "Stemming dictionary imported successfuly",
        });
        reset();
        router.refresh();
        setShowDialog(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error", {
          description: error.message,
          className: "font-mono",
        });
      } else {
        toast.error("Error", {
          description: "Error importing stemming dictionary",
          className: "font-mono",
        });
      }
    }
  };

  return (
    <Dialog open={showDialog} onOpenChange={(open) => setShowDialog(open)}>
      <DialogContent className="sm:max-w-[425px]">
        {isSubmitting && <BarLoaderFullScreenWidth loading={isSubmitting} />}
        <form>
          <DialogHeader>
            <DialogTitle className="font-mono">
              Import stemming dictionaries from file
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 my-3">
            <div className="grid gap-3">
              <Label htmlFor="name" className="font-mono">
                Stemming Dictionary Name
              </Label>
              <Input
                {...register("name")}
                id="name"
                name="name"
                placeholder="Enter Stemming Dictionary Name"
                className="font-mono"
              />
            </div>
          </div>
          <div className="space-y-2 my-3">
            <Label htmlFor="file-1" className="font-mono">
              Upload file
            </Label>
            <Controller
              name="file"
              control={control}
              render={({ field }) => (
                <Input
                  className="font-mono"
                  id="file-1"
                  name="file-1"
                  type="file"
                  accept=".jsonl"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              )}
            />
            <p className="text-sm text-muted-foreground font-mono">
              You are only allowed to upload JSONL files.
            </p>
          </div>
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
            <DialogClose asChild>
              <Button type="button" variant="outline" className="font-mono">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              className="font-mono"
              onClick={handleSubmit(handleAnalyticsEventSubmission)}
            >
              Import
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const useShowImportStemmingDictionariesFromFileDialog = () => {
  const [showDialog, setImportStemmingDictionariesFromFileDialog] =
    useState(false);

  const ImportStemmingDictionariesFromFileDialog = () => (
    <ShowImportStemmingDictionariesFromFileDialog
      showDialog={showDialog}
      setShowDialog={setImportStemmingDictionariesFromFileDialog}
    />
  );

  return {
    setImportStemmingDictionariesFromFileDialog,
    ImportStemmingDictionariesFromFileDialog,
  };
};
