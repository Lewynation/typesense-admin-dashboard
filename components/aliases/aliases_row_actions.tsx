"use client";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CollectionAliasSchema } from "typesense/lib/Typesense/Aliases";
import { useShowResourceDeletionConfirmationDialog } from "../dialogs/resource_deletion_confirmation_dialog";
import { deleteAlias } from "@/actions";
import { useParams } from "next/navigation";

const AliasesRowActions = (alias: CollectionAliasSchema) => {
  const params = useParams<{ id: string }>();
  const {
    ResourceDeletionConfirmationDialog,
    setShowResourceDeletionConfirmationDialog,
  } = useShowResourceDeletionConfirmationDialog(
    () => deleteAlias(params.id, alias.name),
    "Alias",
  );

  return (
    <div className="flex items-center justify-center gap-2">
      <ResourceDeletionConfirmationDialog />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 hover:text-foreground text-muted-foreground`}
              onClick={() => {
                setShowResourceDeletionConfirmationDialog(true);
              }}
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

export default AliasesRowActions;
