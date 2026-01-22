"use client";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Ban } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Ban />
        </EmptyMedia>
        <EmptyTitle className="font-mono">Something went wrong</EmptyTitle>
        <EmptyDescription className="font-mono">
          There was an error with your request. Please try again.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button
            variant="default"
            className="font-mono"
            onClick={() => reset()}
          >
            Try Again
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  );
}
