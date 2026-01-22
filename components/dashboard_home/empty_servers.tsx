import { BrushCleaning, type LucideIcon } from "lucide-react";
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
import AddServer from "./add_server";
import { DocumentationLinks } from "@/config/documentaion_links";

export function NoServersFound() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <BrushCleaning />
        </EmptyMedia>
        <EmptyTitle className="font-mono">No Servers Found</EmptyTitle>
        <EmptyDescription className="font-mono">
          You haven&apos;t added any servers yet. Get started by connecting to
          your first typesense server.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <AddServer />
        </div>
      </EmptyContent>
      <Button
        variant="link"
        asChild
        className="text-muted-foreground font-mono"
        size="sm"
      >
        <a href={DocumentationLinks.serverConfiguration}>
          Learn More <ArrowUpRightIcon />
        </a>
      </Button>
    </Empty>
  );
}
