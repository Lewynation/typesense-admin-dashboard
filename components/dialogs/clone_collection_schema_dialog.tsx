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
import { cloneCollectionSchema } from "@/actions";
import { toast } from "sonner";
import { BarLoaderFullScreenWidth } from "../ui/bar_loader";
import {
  CloneCollectionSchema,
  CloneCollectionSchemaFormFields,
} from "@/zod/clone_collection";

const ShowCloneCollectionSchemaDialog = ({
  setShowDialog,
  showDialog,
  fromCollectionName,
}: {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  fromCollectionName: string | undefined;
}) => {
  const params = useParams() as { id: string };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CloneCollectionSchemaFormFields>({
    resolver: zodResolver(CloneCollectionSchema),
  });

  const cloneSchemaSubmitted: SubmitHandler<
    CloneCollectionSchemaFormFields
  > = async (formData) => {
    const { newCollectionName } = formData;
    try {
      if (!fromCollectionName) return;
      const res = await cloneCollectionSchema(
        params.id,
        fromCollectionName,
        newCollectionName,
      );
      if (!res.success) {
        setError("root", {
          message: res.error,
        });
        toast.error("Error", {
          description: res.error,
          className: "font-mono",
        });
        return;
      }
      setShowDialog(false);
      toast.success("Success", {
        description: "Collection cloned successfully",
        className: "font-mono",
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

  return (
    <Dialog open={showDialog} onOpenChange={(open) => setShowDialog(open)}>
      <DialogContent className="sm:max-w-[425px]">
        {isSubmitting && <BarLoaderFullScreenWidth loading={isSubmitting} />}
        <form onSubmit={handleSubmit(cloneSchemaSubmitted)}>
          <DialogHeader>
            <DialogTitle className="font-mono">
              Clone {fromCollectionName}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 my-3">
            <div className="grid gap-3">
              <Label htmlFor="newCollectionName" className="font-mono">
                New collection name
              </Label>
              <Input
                {...register("newCollectionName")}
                id="newCollectionName"
                name="newCollectionName"
                placeholder="Enter New Collection Name"
                className="font-mono"
              />
            </div>
          </div>

          <div>
            {errors.root && (
              <p className="text-destructive text-sm font-mono">
                - (Root) {errors.root.message}
              </p>
            )}
            {errors.newCollectionName && (
              <p className="text-destructive text-sm font-mono">
                - (Name) {errors.newCollectionName.message}
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
              Clone
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const useCloneCollectionSchemaDialog = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [fromCollectionName, setFromCollectionName] = useState<
    string | undefined
  >();

  const CloneCollectionSchemaDialog = () => (
    <ShowCloneCollectionSchemaDialog
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      fromCollectionName={fromCollectionName}
    />
  );

  const setShowCloneCollectionSchemaDialog = (
    show: boolean,
    fromCollectionName: string,
  ) => {
    setShowDialog(show);
    setFromCollectionName(fromCollectionName);
  };

  return {
    setShowCloneCollectionSchemaDialog,
    CloneCollectionSchemaDialog,
  };
};
