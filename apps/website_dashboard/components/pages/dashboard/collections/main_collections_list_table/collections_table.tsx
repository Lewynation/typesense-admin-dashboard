import React from "react";
import { DataTable } from "ui";
import { columns } from "./columns";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";

interface CollectionTableProps {
  data: CollectionSchema[];
}

const CollectionsTable: React.FC<CollectionTableProps> = ({ data }) => {
  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        searchcolumn="name"
        searchInputDefaultValue="collections"
      />
    </>
  );
};

export default CollectionsTable;
