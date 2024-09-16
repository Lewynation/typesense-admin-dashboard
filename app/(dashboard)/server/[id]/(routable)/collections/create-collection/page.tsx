import { CreateCollectionAssembly } from "@/components/pages/dashboard/collections";
import React from "react";

interface CreateCollectionProps {
  params: {
    id: string;
  };
}

const CreateCollection: React.FC<CreateCollectionProps> = ({ params }) => {
  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <div className="mx-auto w-full max-w-6xl items-start gap-6">
        <CreateCollectionAssembly serverId={params.id} />
      </div>
    </main>
  );
};

export default CreateCollection;
