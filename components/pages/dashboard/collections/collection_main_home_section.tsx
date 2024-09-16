import React from "react";
import { CollectionTable } from ".";
import { getCollections } from "@/actions";
import { GetResourceByServerIdProps } from "@/types";
import { notFound } from "next/navigation";

const CollectionMainHomeSection: React.FC<GetResourceByServerIdProps> = async ({
  serverId,
}) => {
  const collections = await getCollections(serverId);
  if (!collections) {
    notFound();
  }

  return (
    <>
      {collections && collections.length > 0 && (
        <CollectionTable data={collections} />
      )}
      {collections.length < 0 && (
        <>
          <div>There are no colletions</div>
        </>
      )}
    </>
  );
};

export default CollectionMainHomeSection;
