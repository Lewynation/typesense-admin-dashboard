import { Library } from "lucide-react";
import { ArrowUpRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function NoResourcesFound({
  resource,
  documentationLink,
  onResourceCreateInitiated,
}: {
  resource: string;
  onResourceCreateInitiated?: () => unknown;
  documentationLink?: string;
}) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Library />
        </EmptyMedia>
        <EmptyTitle className="font-mono">
          No {resource.toLowerCase()} found
        </EmptyTitle>
        <EmptyDescription className="font-mono">
          You haven&apos;t created any {resource.toLowerCase()} yet. Any{" "}
          {resource.toLowerCase()} you create will show up here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        {onResourceCreateInitiated && (
          <div className="flex gap-2">
            <Button
              variant="default"
              className="font-mono"
              onClick={onResourceCreateInitiated}
            >
              Create New {resource.toLowerCase()}
            </Button>
          </div>
        )}
      </EmptyContent>
      {documentationLink && (
        <Button
          variant="link"
          asChild
          className="text-muted-foreground font-mono"
          size="sm"
        >
          <a href={documentationLink} target="_blank">
            Learn More <ArrowUpRightIcon />
          </a>
        </Button>
      )}
    </Empty>
  );
}
