"use client";

import React, { useEffect } from "react";
import CurationsTable from "./cutations_list_table/curations_table";
import { useDependencies } from "@/contexts/dependency_provider";
import { OverrideSchema } from "typesense/lib/Typesense/Override";
import { useCurations } from "@/hooks";
import { CircularSpinner } from "ui";
import { AuthenticationCheckWrapper } from "@/components/shared";

interface CurationsBodyProps {
  collectionName: string;
}

const CurationsBody: React.FC<CurationsBodyProps> = ({ collectionName }) => {
  const { curations, error, loading } = useCurations(collectionName);

  return (
    <AuthenticationCheckWrapper>
      <div>
        {loading ? (
          <>
            <CircularSpinner />
          </>
        ) : (
          <CurationsTable data={curations} />
        )}
      </div>
    </AuthenticationCheckWrapper>
  );
};

export default CurationsBody;
