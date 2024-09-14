"use client";
import React from "react";
import SynonymsTable from "./synonyms_list_table/synonyms_table";
import { useSynonyms } from "@/hooks";
import { BarLoaderFullScreenWidth } from "@/components/ui";
import { ErrorComponent } from "@/components/shared/Error";

interface SynonymsProps {
  collectionName: string;
}

const Synonyms: React.FC<SynonymsProps> = ({ collectionName }) => {
  const { synonyms, error, loading } = useSynonyms(collectionName);
  const SynonymsComponent = error ? (
    <ErrorComponent error={error} />
  ) : (
    <SynonymsTable data={synonyms} />
  );

  return (
    <div>
      {loading ? (
        <BarLoaderFullScreenWidth loading={loading} />
      ) : (
        SynonymsComponent
      )}
    </div>
  );
};

export default Synonyms;
