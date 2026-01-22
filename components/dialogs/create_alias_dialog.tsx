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
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAlias } from "@/actions";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateAliasFormFields, CreateAliasSchema } from "@/zod/create_alias";
import { useCollections } from "@/swr/use_collections";
import { BarLoaderFullScreenWidth } from "../ui/bar_loader";

const ShowCreateAliasDialog = ({
  setShowDialog,
  showDialog,
}: {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
}) => {
  const params = useParams() as { id: string; name: string };
  const { collections } = useCollections();

  const {
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateAliasFormFields>({
    resolver: zodResolver(CreateAliasSchema),
  });

  const generateAPIKey: SubmitHandler<CreateAliasFormFields> = async (
    formData,
  ) => {
    const { aliasName, collectionName } = formData;
    try {
      const createdAlias = await createAlias(
        params.id,
        collectionName,
        aliasName,
      );
      if (!createdAlias.success) {
        setError("root", {
          message: createdAlias.error,
        });
        toast.error("Error", {
          description: createdAlias.error,
          className: "font-mono",
        });
        return;
      }
      setShowDialog(false);
      toast.success("Success", {
        description: "Alias created successfully",
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
        <form onSubmit={handleSubmit(generateAPIKey)}>
          <DialogHeader>
            <DialogTitle className="font-mono">Create an Alias</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 my-3">
            <Controller
              name="aliasName"
              control={control}
              render={({ field }) => (
                <div className="grid gap-3">
                  <Label htmlFor="alias_name" className="font-mono">
                    Name
                  </Label>
                  <Input
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    id="alias_name"
                    name="alias_name"
                    placeholder="Enter Alias Name"
                    className="font-mono"
                  />
                </div>
              )}
            />
          </div>
          <div className="grid gap-3 mb-3">
            <Label className="font-mono">Collection</Label>
            <Controller
              name="collectionName"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(val) => {
                    field.onChange(val);
                  }}
                >
                  <SelectTrigger className="w-full font-mono">
                    <SelectValue placeholder="Select a collection" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {collections && (
                        <SelectLabel className="font-mono">
                          Collections
                        </SelectLabel>
                      )}
                      {!collections && (
                        <SelectLabel className="font-mono">
                          Your other collections will show up here
                        </SelectLabel>
                      )}
                      {collections &&
                        collections?.map((collection, index) => {
                          return (
                            <SelectItem
                              key={index}
                              className="font-mono"
                              value={collection.name}
                            >
                              {collection.name}
                            </SelectItem>
                          );
                        })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div>
            {errors.aliasName && (
              <p className="text-destructive text-sm font-mono">
                - (Alias Name) {errors.aliasName.message}
              </p>
            )}
            {errors.collectionName && (
              <p className="text-destructive text-sm font-mono">
                - (Collection Name) {errors.collectionName.message}
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
            <Button type="submit" className="font-mono">
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const useCreateAliasDialog = () => {
  const [showDialog, setShowCreateAliasDialog] = useState(false);

  const CreateAliasDialog = () => (
    <ShowCreateAliasDialog
      showDialog={showDialog}
      setShowDialog={setShowCreateAliasDialog}
    />
  );

  return {
    setShowCreateAliasDialog,
    CreateAliasDialog,
  };
};
