import React from "react";
import { DataTable } from "ui";
import { column } from "./columns";
import { CollectionAliasSchema } from "typesense/lib/Typesense/Aliases";

interface AliasTableProps {
  data: CollectionAliasSchema[];
}

const AliasTable: React.FC<AliasTableProps> = ({ data }) => {
  return (
    <div>
      <DataTable
        columns={column}
        data={data}
        searchcolumn="name"
        searchInputDefaultValue="Aliases"
      />
    </div>
  );
};

export default AliasTable;
