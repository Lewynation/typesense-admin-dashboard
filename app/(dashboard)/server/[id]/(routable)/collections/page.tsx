import {
  CollectionHeader,
  CollectionMainHomeSection,
} from "@/components/pages/dashboard/collections";
import React from "react";

interface CollectionProps {
  params: {
    id: string;
  };
}

const Collections: React.FC<CollectionProps> = async ({ params }) => {
  return (
    <>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto w-full max-w-6xl items-start gap-6">
          <CollectionHeader />
          <CollectionMainHomeSection serverId={params.id} />
        </div>
      </main>
    </>
  );
};

export default Collections;
