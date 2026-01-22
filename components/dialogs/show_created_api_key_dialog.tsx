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
import { Copy } from "lucide-react";
import { toast } from "sonner";

const ShowCreatedApiKeyDialog = ({
  setShowCreatedApiKeyDialog,
  showCreatedApiKeyDialog,
  apiKey,
}: {
  showCreatedApiKeyDialog: boolean;
  setShowCreatedApiKeyDialog: Dispatch<SetStateAction<boolean>>;
  apiKey: string | undefined;
}) => {
  return (
    <Dialog
      open={showCreatedApiKeyDialog}
      onOpenChange={(open) => setShowCreatedApiKeyDialog(open)}
    >
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-mono">Created API Key</DialogTitle>
          </DialogHeader>
          <div className="font-mono">
            <p className="">
              This is your API key. Copy it as it will not be displayed again!
            </p>
            <div className="flex items-center gap-2 font-mono">
              <p>{apiKey}</p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(apiKey ?? "");
                  toast("Copied to clipboard", {
                    description: "Sucessfuly Copied to clipboard",
                    className: "font-mono",
                  });
                }}
              >
                <Copy className="cursor-pointer" />
              </button>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="font-mono">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export const useShowGeneratedApiKeyModal = () => {
  const [showCreatedApiKeyDialog, setShowCreatedApiKeyDialog] = useState(false);
  const [apiKey, setApiKey] = useState<string | undefined>();

  const CreatedApiKeyDialog = () => (
    <ShowCreatedApiKeyDialog
      showCreatedApiKeyDialog={showCreatedApiKeyDialog}
      setShowCreatedApiKeyDialog={setShowCreatedApiKeyDialog}
      apiKey={apiKey}
    />
  );

  const setShowDialogWithApiKey = (show: boolean, apiKey: string) => {
    setApiKey(apiKey);
    setShowCreatedApiKeyDialog(show);
  };

  return {
    setShowDialogWithApiKey,
    CreatedApiKeyDialog,
  };
};
