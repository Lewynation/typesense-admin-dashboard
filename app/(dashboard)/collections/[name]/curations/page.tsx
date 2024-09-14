import {
  CurationsBody,
  CurationsHeader,
} from "@/components/pages/dashboard/collections/collection_subroute_pages/curations";
import React from "react";

const Curations = ({ params }: { params: { name: string } }) => {
  return (
    <div>
      <CurationsHeader />
      <CurationsBody collectionName={params.name} />
    </div>
  );
};

export default Curations;
