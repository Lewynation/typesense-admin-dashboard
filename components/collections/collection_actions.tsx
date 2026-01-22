"use client";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import Link from "next/link";
import {
  BadgeCheck,
  Bell,
  Copy,
  CreditCard,
  Download,
  Eye,
  FileMinus,
  LogOut,
  MoreVertical,
  Sparkles,
  Trash,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDialog } from "../dialogs/dialog_provider";
import { useShowCollectionTruncationConfirmationDialog } from "../dialogs/collection_truncation_confirmation_dialog";
import { useExportCollectionDocumentsDialog } from "../dialogs/export_collection_documents_dialog";
import { useShowImportCollectionDocumentsFromFileDialog } from "../dialogs/import_collection_documents_from_file";
import { useShowResourceDeletionConfirmationDialog } from "../dialogs/resource_deletion_confirmation_dialog";
import { useParams } from "next/navigation";
import { deleteCollection } from "@/actions";

const CollectionRowActions = (collection: CollectionSchema) => {
  const params = useParams<{ id: string }>();
  const {
    ResourceDeletionConfirmationDialog,
    setShowResourceDeletionConfirmationDialog,
  } = useShowResourceDeletionConfirmationDialog(
    () => deleteCollection(params.id, collection.name),
    "Collection",
  );

  const {
    CollectionTruncationConfirmationDialog,
    setShowCollectionTruncationConfirmationDialog,
  } = useShowCollectionTruncationConfirmationDialog();

  const { showCloneCollectionSchemaDialog } = useDialog();

  const {
    ExportCollectionDocumentsDialog,
    setShowExportCollectionDocumentsDialog,
  } = useExportCollectionDocumentsDialog();

  const {
    ImportCollectionDocumentsFromFileDialog,
    setShowImportCollectionDocumentsDialog,
  } = useShowImportCollectionDocumentsFromFileDialog();

  return (
    <div className="flex items-center justify-center gap-2">
      <CollectionTruncationConfirmationDialog />
      <ResourceDeletionConfirmationDialog />
      <ExportCollectionDocumentsDialog />
      <ImportCollectionDocumentsFromFileDialog />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`collections/${collection.name}`}
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 hover:text-foreground text-muted-foreground`}
            >
              <Eye className="h-5 w-5" />
              <span className="sr-only">View</span>
            </Link>
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
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <ShowMoreCollectionOptions
              handleImportCollectionDocuments={() =>
                setShowImportCollectionDocumentsDialog(true, collection)
              }
              handleCloneCollectionSchema={() =>
                showCloneCollectionSchemaDialog(true, collection.name)
              }
              handleTruncateCollectionSchema={() =>
                setShowCollectionTruncationConfirmationDialog(
                  true,
                  collection.name,
                )
              }
              handleExportCollectionDocuments={() =>
                setShowExportCollectionDocumentsDialog(true, collection)
              }
            />
          </TooltipTrigger>
          <TooltipContent side="right">More</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

const ShowMoreCollectionOptions = ({
  handleCloneCollectionSchema,
  handleTruncateCollectionSchema,
  handleExportCollectionDocuments,
  handleImportCollectionDocuments,
}: {
  handleCloneCollectionSchema: () => void;
  handleTruncateCollectionSchema: () => void;
  handleExportCollectionDocuments: () => void;
  handleImportCollectionDocuments: () => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 hover:text-foreground text-muted-foreground`}
        >
          <div>
            <MoreVertical className="h-5 w-5" />
            <span className="sr-only">More</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleImportCollectionDocuments}>
            <Upload />
            Import documents from file
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleExportCollectionDocuments}>
            <Download />
            Export documents
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCloneCollectionSchema}>
            <Copy />
            Clone schema
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleTruncateCollectionSchema}>
            <FileMinus />
            Truncate
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CollectionRowActions;
