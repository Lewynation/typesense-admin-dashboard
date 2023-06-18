"use client";

import React from "react";
import { ApiKeysTable } from ".";
import { useAPIKeys } from "@/hooks";
import { CircularSpinner } from "ui";

const ApiKeysHomeSection = () => {
  const { apiKeys, loading, error } = useAPIKeys();
  console.log(apiKeys);

  return (
    <div className="mt-2">
      {loading ? (
        <>
          <CircularSpinner />
        </>
      ) : (
        <ApiKeysTable data={apiKeys} />
      )}
    </div>
  );
};

export default ApiKeysHomeSection;
