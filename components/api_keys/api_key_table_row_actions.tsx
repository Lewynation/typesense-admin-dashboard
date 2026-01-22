"use client";

import { Button } from "@/components/ui/button";
import { KeySchema } from "typesense/lib/Typesense/Key";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Eye, Trash } from "lucide-react";
import { useShowApiKeyDetailsDialog } from "@/components/dialogs/api_key_details_dialog";
import { useShowResourceDeletionConfirmationDialog } from "../dialogs/resource_deletion_confirmation_dialog";
import { useParams } from "next/navigation";
import { deleteAPIKey } from "@/actions";

const APIKeyTableRowActions = (key: KeySchema) => {
  const params = useParams<{ id: string }>();

  const { ApiKeyDetailsDialog, setShowApiKeyDetailsDialog } =
    useShowApiKeyDetailsDialog();
  const {
    ResourceDeletionConfirmationDialog,
    setShowResourceDeletionConfirmationDialog,
  } = useShowResourceDeletionConfirmationDialog(
    () => deleteAPIKey(params.id, key.id),
    "API Key",
  );

  return (
    <div className="flex items-center justify-start gap-2">
      <ApiKeyDetailsDialog />
      <ResourceDeletionConfirmationDialog />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 hover:text-foreground text-muted-foreground`}
              onClick={() => {
                setShowApiKeyDetailsDialog(true, key.id);
              }}
            >
              <div>
                <Eye className="h-5 w-5" />
                <span className="sr-only">View</span>
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">View</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              onClick={() => {
                setShowResourceDeletionConfirmationDialog(true);
              }}
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 hover:text-foreground text-muted-foreground`}
            >
              <div>
                <Trash className="h-5 w-5 text-destructive" />
                <span className="sr-only">Delete</span>
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Delete</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default APIKeyTableRowActions;
