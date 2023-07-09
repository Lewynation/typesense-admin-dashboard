"use client";

import React from "react";
import { DataTable } from "ui";
import { columns } from "./columns";
import { SynonymSchema } from "typesense/lib/Typesense/Synonym";

interface SynonymsTableProps {
  data: SynonymSchema[];
}

const SynonymsTable: React.FC<SynonymsTableProps> = ({ data }) => {
  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        searchInputDefaultValue="synonyms"
        searchcolumn="id"
      />
    </div>
  );
};

export default SynonymsTable;
