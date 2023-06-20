"use client";

import React from "react";
import { ApiKeysTable } from ".";
import { useAPIKeys } from "@/hooks";
import { BarLoaderFullScreenWidth, CircularSpinner } from "ui";
import { ErrorComponent } from "@/components/shared/Error";

const ApiKeysHomeSection = () => {
  const { apiKeys, loading, error } = useAPIKeys();

  const ApiKeysComponent = error ? (
    <ErrorComponent error={error} />
  ) : (
    <ApiKeysTable data={apiKeys} />
  );

  return (
    <div className="mt-2">
      {loading ? (
        <BarLoaderFullScreenWidth loading={loading} />
      ) : (
        ApiKeysComponent
      )}
    </div>
  );
};

export default ApiKeysHomeSection;
