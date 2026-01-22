"use client";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Eye, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SynonymSchema } from "typesense/lib/Typesense/Synonym";
import { useDialog } from "@/components/dialogs/dialog_provider";
import { useShowSynonymDetailsDialog } from "@/components/dialogs/synonym_details_dialog";
import { useShowResourceDeletionConfirmationDialog } from "@/components/dialogs/resource_deletion_confirmation_dialog";
import { useParams } from "next/navigation";
import { deleteSynonym } from "@/actions";

const SynonymRowActions = (synonym: SynonymSchema) => {
  const params = useParams<{ id: string; name: string }>();

  const { showCreateSynonymDialog } = useDialog();
  const { SynonymDetailsDialog, setShowSynonymDetailsDialog } =
    useShowSynonymDetailsDialog();
  const {
    ResourceDeletionConfirmationDialog,
    setShowResourceDeletionConfirmationDialog,
  } = useShowResourceDeletionConfirmationDialog(
    () => deleteSynonym(params.id, synonym.id, params.name),
    "Synonym",
  );

  return (
    <div className="flex items-center justify-center gap-2">
      <SynonymDetailsDialog />
      <ResourceDeletionConfirmationDialog />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 hover:text-foreground text-muted-foreground`}
              onClick={() => {
                setShowSynonymDetailsDialog(true, synonym.id);
              }}
            >
              <div>
                <Eye className="h-5 w-5 " />
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
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 hover:text-foreground text-muted-foreground`}
              onClick={() => {
                showCreateSynonymDialog(true, synonym);
              }}
            >
              <div>
                <Pencil className="h-5 w-5 " />
                <span className="sr-only">Edit</span>
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Edit</TooltipContent>
        </Tooltip>
      </TooltipProvider>
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

export default SynonymRowActions;
