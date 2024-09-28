"use client";

import React from "react";
import CurationsTable from "./cutations_list_table/curations_table";
import { useCurations } from "@/hooks";
import { BarLoaderFullScreenWidth } from "@/components/ui";
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
