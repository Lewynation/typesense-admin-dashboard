import { SchemaView } from "@/components/pages/dashboard/collections/collection_subroute_pages/schema";
import React from "react";

const Schema = ({ params }: { params: { name: string } }) => {
  return (
    <div>
      <SchemaView schemaName={params.name} />
    </div>
  );
};

export default Schema;
