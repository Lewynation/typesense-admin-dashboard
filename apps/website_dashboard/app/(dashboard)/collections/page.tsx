import { CollectionTable } from "@/components/pages/dashboard/collections";
import { AuthenticationCheckWrapper } from "@/components/shared";
import React from "react";
import { collectionData } from "./mock";

const Collections = async () => {
  return (
    <AuthenticationCheckWrapper>
      <CollectionTable data={collectionData} />
    </AuthenticationCheckWrapper>
  );
};

export default Collections;
