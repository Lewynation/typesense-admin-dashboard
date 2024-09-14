"use client";

import React from "react";
import { ApiKeysTable } from ".";
import { useAPIKeys } from "@/hooks";
import { BarLoaderFullScreenWidth } from "@/components/ui";
import { ErrorComponent } from "@/components/shared/Error";

const ApiKeysHomeSection = () => {
  const { apiKeys, loading, error } = useAPIKeys();

  return (
    <div className="mt-2">
      {loading && <BarLoaderFullScreenWidth loading={loading} />}
      {error && <ErrorComponent error={error} />}
      {apiKeys && <ApiKeysTable data={apiKeys} />}
    </div>
  );
};

export default ApiKeysHomeSection;
