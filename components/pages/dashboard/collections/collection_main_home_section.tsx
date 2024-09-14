"use client";
import React from "react";
import { CollectionTable } from ".";
import { useCollections } from "@/hooks";
import { BarLoaderFullScreenWidth } from "@/components/ui";
import { ErrorComponent } from "@/components/shared/Error";

const CollectionMainHomeSection = () => {
  const { collections, loading, error } = useCollections();

  const CollectionComponent = error ? (
    <ErrorComponent error={error} />
  ) : (
    <CollectionTable data={collections} />
  );

  return (
    <div>
      {loading ? (
        <BarLoaderFullScreenWidth loading={loading} />
      ) : (
        CollectionComponent
      )}
    </div>
  );
};

export default CollectionMainHomeSection;
