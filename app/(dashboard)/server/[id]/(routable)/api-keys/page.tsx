import { ApiKeyHeaderSection } from "@/components/pages/dashboard/api-keys";
import React from "react";
import { AdminKeyResultDialog } from "@/components/pages/dashboard/api-keys/admin_api_keys";
import { ApiKeysHomeSection } from "@/components/pages/dashboard/api-keys/api_keys_home/api_keys_body_section";

interface ApiKeysProps {
  params: {
    id: string;
  };
}

const ApiKeys: React.FC<ApiKeysProps> = ({ params }) => {
  return (
    <>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto w-full max-w-6xl items-start gap-6">
          <AdminKeyResultDialog />
          <ApiKeyHeaderSection serverId={params.id} />
          <ApiKeysHomeSection serverId={params.id} />
        </div>
      </main>
    </>
  );
};

export default ApiKeys;
