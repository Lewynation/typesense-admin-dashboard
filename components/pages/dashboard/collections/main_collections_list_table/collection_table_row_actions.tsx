import { Row } from "@tanstack/react-table";
import React from "react";

import { Button } from "@/components/ui";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui";
import Link from "next/link";
import { Download, Eye, Trash, Upload } from "lucide-react";

interface CollectionTableRowActionsProps {
  row: Row<CollectionSchema>;
}

const CollectionTableRowActions: React.FC<CollectionTableRowActionsProps> = ({
  row,
}) => {
  const collections = row.original;
  return (
    <div className="flex items-center justify-start gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`collections/${collections.name}`}
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
            <Link
              href={`/server/`}
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 hover:text-foreground text-muted-foreground`}
            >
              <Download className="h-5 w-5" />
              <span className="sr-only">Download</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Download</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`/server/`}
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 hover:text-foreground text-muted-foreground`}
            >
              <Upload className="h-5 w-5" />
              <span className="sr-only">Upload</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Upload</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 hover:text-foreground text-muted-foreground`}
              onClick={() => {}}
            >
              <div>
                <Trash className="h-5 w-5" />
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

export default CollectionTableRowActions;
