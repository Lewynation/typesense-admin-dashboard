"use client";

import React, { useEffect } from "react";
import CurationsTable from "./cutations_list_table/curations_table";
import { useDependencies } from "@/contexts/dependency_provider";
import { OverrideSchema } from "typesense/lib/Typesense/Override";
import { useCurations } from "@/hooks";
import { BarLoaderFullScreenWidth, CircularSpinner } from "ui";
import { AuthenticationCheckWrapper } from "@/components/shared";
import { ErrorComponent } from "@/components/shared/Error";

interface CurationsBodyProps {
  collectionName: string;
}

const CurationsBody: React.FC<CurationsBodyProps> = ({ collectionName }) => {
  const { curations, error, loading } = useCurations(collectionName);

  const CurationsComponent = error ? (
    <ErrorComponent error={error} />
  ) : (
    <CurationsTable data={curations} />
  );

  return (
    <div>
      {loading ? (
        <BarLoaderFullScreenWidth loading={loading} />
      ) : (
        CurationsComponent
      )}
    </div>
  );
};

export default CurationsBody;
