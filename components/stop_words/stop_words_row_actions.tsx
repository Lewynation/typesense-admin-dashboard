"use client";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Eye, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/components/dialogs/dialog_provider";
import { StopwordSchema } from "typesense/lib/Typesense/Stopword";
import { useShowStopwordsDetailsDialog } from "../dialogs/stop_words_details_dialog";
import { useParams } from "next/navigation";
import { deleteStopWord } from "@/actions";
import { useShowResourceDeletionConfirmationDialog } from "../dialogs/resource_deletion_confirmation_dialog";

const StopWordsRowActions = (stopWord: StopwordSchema) => {
  const { showCreateStopWordsDialog } = useDialog();
  const params = useParams<{ id: string }>();
  const {
    ResourceDeletionConfirmationDialog,
    setShowResourceDeletionConfirmationDialog,
  } = useShowResourceDeletionConfirmationDialog(
    () => deleteStopWord(params.id, stopWord.id),
    "Stop Word",
  );

  const { StopwordsDetailsDialog, setShowStopwordsDetailsDialog } =
    useShowStopwordsDetailsDialog();

  return (
    <div className="flex items-center justify-center gap-2">
      <ResourceDeletionConfirmationDialog />
      <StopwordsDetailsDialog />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 hover:text-foreground text-muted-foreground`}
              onClick={() => {
                setShowStopwordsDetailsDialog(true, stopWord.id);
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
                showCreateStopWordsDialog(true, stopWord);
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

export default StopWordsRowActions;
