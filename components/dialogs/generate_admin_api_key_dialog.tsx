"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAPIKey } from "@/actions";
import { useDialog } from "./dialog_provider";
import { toast } from "sonner";
import { getEpochTimes } from "@/lib/search_api_keys_utils";
import {
  CreateAdminApiKeyFormFields,
  CreateAdminApiKeySchema,
} from "@/zod/create_api_key";
import { ExpiryDurationSchema } from "@/zod/enums/expiry_duration";

const GenerateAdminApiKeyDialog = ({
  setShowGenerateAdminApiKeyModal,
  showGenerateAdminApiKeyModal,
}: {
  showGenerateAdminApiKeyModal: boolean;
  setShowGenerateAdminApiKeyModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const params = useParams() as { id: string };
  const { showCreatedApiKeyDialog } = useDialog();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateAdminApiKeyFormFields>({
    defaultValues: {
      expiration: "7days",
    },
    resolver: zodResolver(CreateAdminApiKeySchema),
  });

  const generateAPIKey: SubmitHandler<CreateAdminApiKeyFormFields> = async (
    formData,
  ) => {
    const schema = {
      description: formData.description,
      actions: ["*"],
      collections: ["*"],
      expires_at: Math.round(getEpochTimes(formData.expiration) / 1000),
    };
    try {
      const createdAdminKey = await createAPIKey(params.id, schema);
      if (!createdAdminKey.success) {
        setError("root", {
          message: createdAdminKey.error,
        });
        toast.error("Error", {
          description: createdAdminKey.error,
          className: "font-mono",
        });
        return;
      }
      if (createdAdminKey.value?.value) {
        setShowGenerateAdminApiKeyModal(false);
        showCreatedApiKeyDialog(true, createdAdminKey.value.value);
      }
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
    <Dialog
      open={showGenerateAdminApiKeyModal}
      onOpenChange={(open) => setShowGenerateAdminApiKeyModal(open)}
    >
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(generateAPIKey)}>
          <DialogHeader>
            <DialogTitle className="font-mono">
              Create an admin API Key
            </DialogTitle>
            <DialogDescription className="font-mono">
              This API Key allows you to perform all operations. Refrain from
              creating such widely scoped keys as much as possible. Create a
              scoped key{" "}
              <span className="text-blue-500">
                <Link href={`/server/${params.id}/api-keys/search-api-key`}>
                  here
                </Link>
              </span>
              .
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 my-2">
            <div className="grid gap-3">
              <Label htmlFor="description" className="font-mono">
                Description
              </Label>
              <Input
                {...register("description")}
                id="description"
                name="description"
                placeholder="Enter description"
                className="font-mono"
              />
              {errors.description && (
                <p className="text-destructive text-sm font-mono">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
          <Select
            onValueChange={(val) => {
              setValue(
                "expiration",
                ExpiryDurationSchema.catch("7days").parse(val),
              );
            }}
          >
            <SelectTrigger className="w-full my-2 font-mono">
              <SelectValue placeholder="Select expiry duration (Default 7 days)" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="font-mono">Durations</SelectLabel>
                <SelectItem className="font-mono" value="7days">
                  7 Days
                </SelectItem>
                <SelectItem className="font-mono" value="30days">
                  30 Days
                </SelectItem>
                <SelectItem className="font-mono" value="60days">
                  60 days
                </SelectItem>
                <SelectItem className="font-mono" value="90days">
                  90 days
                </SelectItem>
                <SelectItem className="font-mono" value="NoExpiration">
                  No Expiration
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.expiration && (
            <p className="text-destructive text-sm font-mono">
              {errors.expiration.message}
            </p>
          )}
          <DialogFooter>
            {errors.root && (
              <p className="text-destructive text-sm font-mono">
                {errors.root.message}
              </p>
            )}
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

export const useGenerateAdminApiKeyModal = () => {
  const [showGenerateAdminApiKeyModal, setShowGenerateAdminApiKeyModal] =
    useState(false);

  const AdminApiKeyDialog = () => (
    <GenerateAdminApiKeyDialog
      showGenerateAdminApiKeyModal={showGenerateAdminApiKeyModal}
      setShowGenerateAdminApiKeyModal={setShowGenerateAdminApiKeyModal}
    />
  );

  return {
    setShowGenerateAdminApiKeyModal,
    AdminApiKeyDialog,
  };
};
