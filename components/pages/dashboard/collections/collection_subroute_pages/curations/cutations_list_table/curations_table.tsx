import React from "react";
import { DataTable } from "@/components/ui";
import { columns } from "./columns";
import { OverrideSchema } from "typesense/lib/Typesense/Override";

interface CurationsTableProps {
  data: OverrideSchema[];
}

const CurationsTable: React.FC<CurationsTableProps> = ({ data }) => {
  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        searchcolumn="match"
        searchInputDefaultValue="curations"
      />
    </>
  );
};

export default CurationsTable;
