"use client";
import React from "react";
import { CollectionTable } from ".";
import { useCollections } from "@/hooks";
import { CircularSpinner } from "ui";

const CollectionMainHomeSection = () => {
  const { collections, loading, error } = useCollections();

  return (
    <div>
      {loading ? (
        <>
          <CircularSpinner />
        </>
      ) : (
        <CollectionTable data={collections} />
      )}
    </div>
  );
};

export default CollectionMainHomeSection;
