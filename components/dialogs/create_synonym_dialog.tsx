"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { createSynonym } from "@/actions";
import { toast } from "sonner";
import { SynonymSchema } from "typesense/lib/Typesense/Synonym";
import {
  CreateSynonymFormFields,
  CreateSynonymSchema,
} from "@/zod/create_synonym";
import MultiValueInput from "../ui/multi_value_input";
import { SynonymCreateSchema } from "typesense/lib/Typesense/Synonyms";
import { BarLoaderFullScreenWidth } from "../ui/bar_loader";

const ShowCreateSynonymDialog = ({
  setShowDialog,
  showDialog,
  synonym,
}: {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  synonym: SynonymSchema | undefined;
}) => {
  const isSynonymEdit = !!synonym;
  const params = useParams() as { id: string; name: string };

  const {
    register,
    handleSubmit,
    setError,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateSynonymFormFields>({
    defaultValues: {
      id: synonym?.id,
      locale: synonym?.locale,
      rootV: synonym?.root,
      symbolsToIndex: synonym?.symbols_to_index,
      synonyms: synonym?.synonyms,
      synonymType: synonym?.root ? "oneWay" : "multiWay",
    },
    resolver: zodResolver(CreateSynonymSchema),
  });

  const synonymType = watch("synonymType");

  const createSynonymSubmitted: SubmitHandler<CreateSynonymFormFields> = async (
    formData,
  ) => {
    const { id, synonyms, rootV, synonymType, locale, symbolsToIndex } =
      formData;
    try {
      const synonym: SynonymCreateSchema = {
        synonyms,
        root: synonymType === "oneWay" ? rootV : undefined,
        locale,
        symbols_to_index: symbolsToIndex,
      };
      const createdSynonym = await createSynonym(
        params.id,
        id,
        params.name,
        synonym,
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
      toast.success("Success", {
        description: "Synonym created successfully",
        className: "font-mono",
      });
      setShowDialog(false);
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

  return (
    <Dialog open={showDialog} onOpenChange={(open) => setShowDialog(open)}>
      <DialogContent className="sm:max-w-[425px]">
        {isSubmitting && <BarLoaderFullScreenWidth loading={isSubmitting} />}
        <form onSubmit={handleSubmit(createSynonymSubmitted)}>
          <DialogHeader>
            <DialogTitle className="font-mono">
              {isSynonymEdit ? "Edit" : "Create"} a Synonym
            </DialogTitle>
          </DialogHeader>
          <RadioGroup
            {...register("synonymType")}
            defaultValue={synonymType}
            className="my-3"
          >
            <Label htmlFor="synonymType" className="font-mono">
              Synonym Type
            </Label>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="oneWay" id="r1" />
              <Label htmlFor="r1" className="font-mono">
                One-way synonym
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="multiWay" id="r2" />
              <Label htmlFor="r2" className="font-mono">
                Multi-way synonym
              </Label>
            </div>
          </RadioGroup>
          <div className="grid gap-4 my-3">
            <div className="grid gap-3">
              <Label htmlFor="id" className="font-mono">
                Name
              </Label>
              <Input
                {...register("id")}
                id="id"
                name="id"
                disabled={isSynonymEdit}
                placeholder="Enter Synonym Name"
                className="font-mono"
              />
            </div>
          </div>
          {synonymType === "oneWay" && (
            <div className="grid gap-4 my-3">
              <div className="grid gap-3">
                <Label htmlFor="rootV" className="font-mono">
                  Root
                </Label>
                <Input
                  {...register("rootV")}
                  id="rootV"
                  name="rootV"
                  placeholder="Enter Synonym root"
                  className="font-mono"
                />
              </div>
            </div>
          )}
          <MultiValueInput
            initialValue={synonym?.synonyms}
            label="Synonyms"
            onValueChange={(values) => {
              setValue("synonyms", values);
            }}
          />
          <MultiValueInput
            initialValue={synonym?.symbols_to_index}
            label="Symbols to index (optional)"
            onValueChange={(values) => {
              setValue("symbolsToIndex", values);
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
            {errors.rootV && (
              <p className="text-destructive text-sm font-mono">
                - (Root) {errors.rootV.message}
              </p>
            )}
            {errors.id && (
              <p className="text-destructive text-sm font-mono">
                - (Name) {errors.id.message}
              </p>
            )}
            {errors.synonyms && (
              <p className="text-destructive text-sm font-mono">
                - (Synonyms) {errors.synonyms.message}
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
              {isSynonymEdit ? "Edit" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const useCreateSynonymDialog = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [synonym, setSynonym] = useState<SynonymSchema | undefined>();

  const CreateSynonymDialog = () => (
    <ShowCreateSynonymDialog
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      synonym={synonym}
    />
  );

  const setShowCreateSynonymDialog = (
    show: boolean,
    synonym?: SynonymSchema,
  ) => {
    setShowDialog(show);
    setSynonym(synonym);
  };

  return {
    setShowCreateSynonymDialog,
    CreateSynonymDialog,
  };
};
