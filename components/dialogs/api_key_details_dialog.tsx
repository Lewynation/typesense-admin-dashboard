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
import { useApiKey } from "@/swr/use_api_key";
import { CircularSpinner } from "../ui/circular_spinner";

const ShowApiKeyDetailsDialog = ({
  setShowApiKeyDetailsDialog,
  showApiKeyDetailsDialog,
  keyId,
}: {
  showApiKeyDetailsDialog: boolean;
  setShowApiKeyDetailsDialog: Dispatch<SetStateAction<boolean>>;
  keyId: number | undefined;
}) => {
  const { apiKey, error, isLoading } = useApiKey(keyId!);

  const formatDate = (date?: number): string | null => {
    if (!date) return null;
    const formattedDate = new Date(date * 1000).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return formattedDate;
  };

  return (
    <Dialog
      open={showApiKeyDetailsDialog}
      onOpenChange={(open) => setShowApiKeyDetailsDialog(open)}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-mono">API Key details</DialogTitle>
        </DialogHeader>
        {isLoading && <CircularSpinner />}
        {error && <p className="font-mono">An Error occured</p>}
        {apiKey && (
          <div>
            <div className="font-mono">
              <SingleKeyDesc
                label="Description"
                value={apiKey.description ?? "No description"}
              />
              <SingleKeyDesc
                label="ValuePrefix"
                value={apiKey.value_prefix ?? "No value prefix"}
              />
              <SingleKeyDesc
                label="Collections scope"
                value={apiKey.collections?.join(", ")}
              />
              <SingleKeyDesc
                label="ExpiresAt"
                value={formatDate(apiKey.expires_at) ?? "No expiry date"}
              />
              <SingleKeyDesc
                label="Actions"
                value={apiKey.actions?.join(", ")}
              />
            </div>

            {apiKey.actions?.join(", ") === "*" &&
              apiKey.collections?.join(", ") === "*" && (
                <p className="mt-5 italic font-bold font-mono">
                  This is an admin API Key
                </p>
              )}
          </div>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="font-mono">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const SingleKeyDesc = ({ label, value }: { label: string; value: string }) => {
  return (
    <p className="my-1 font-semibold font-mono">
      {label}:<span className="text-base font-normal"> {value}</span>
    </p>
  );
};

export const useShowApiKeyDetailsDialog = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [keyId, setKeyId] = useState<number | undefined>();

  const ApiKeyDetailsDialog = () => (
    <ShowApiKeyDetailsDialog
      showApiKeyDetailsDialog={showDialog}
      setShowApiKeyDetailsDialog={setShowDialog}
      keyId={keyId}
    />
  );

  const setShowApiKeyDetailsDialog = (show: boolean, keyId: number) => {
    setKeyId(keyId);
    setShowDialog(show);
  };

  return {
    setShowApiKeyDetailsDialog,
    ApiKeyDetailsDialog,
  };
};
