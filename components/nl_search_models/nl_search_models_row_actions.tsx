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
import { NLSearchModelSchema } from "typesense/lib/Typesense/NLSearchModels";
import { LocalNLSearchModel } from "@/zod/create_nl_search_model";
import { useShowNLSearchModelDetailsDialog } from "../dialogs/nl_search_model_details_dialog";
import { useShowResourceDeletionConfirmationDialog } from "../dialogs/resource_deletion_confirmation_dialog";
import { useParams } from "next/navigation";
import { deleteNLSearchModel } from "@/actions";

const NLSearchModelsRowActions = (
  model: NLSearchModelSchema | LocalNLSearchModel,
) => {
  const params = useParams<{ id: string }>();

  const { showCreateNLSearchModelDialog } = useDialog();
  const { NLSearchModelDetailsDialog, setShowNLSearchModelDetailsDialog } =
    useShowNLSearchModelDetailsDialog();
  const {
    ResourceDeletionConfirmationDialog,
    setShowResourceDeletionConfirmationDialog,
  } = useShowResourceDeletionConfirmationDialog(
    () => deleteNLSearchModel(params.id, model.id),
    "NL Search Model",
  );

  return (
    <div className="flex items-center justify-center gap-2">
      <NLSearchModelDetailsDialog />
      <ResourceDeletionConfirmationDialog />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 hover:text-foreground text-muted-foreground`}
              onClick={() => {
                setShowNLSearchModelDetailsDialog(true, model.id);
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
                showCreateNLSearchModelDialog(true, model);
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

export default NLSearchModelsRowActions;
