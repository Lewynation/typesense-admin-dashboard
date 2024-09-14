import { QueryPage } from "@/components/pages/dashboard/collections/collection_subroute_pages/query";
import React from "react";

const QueryCollection = ({ params }: { params: { name: string } }) => {
  return (
    <div>
      <QueryPage schemaName={params.name} />
    </div>
  );
};

export default QueryCollection;
