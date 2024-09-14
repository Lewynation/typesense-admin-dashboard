import React from "react";
import { DataTable } from "@/components/ui";
import { columns } from "./columns";
import { KeySchema } from "typesense/lib/Typesense/Key";

interface ApiKeysTableProps {
  data: KeySchema[];
}

const ApiKeysTalbe: React.FC<ApiKeysTableProps> = ({ data }) => {
  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        searchcolumn="description"
        searchInputDefaultValue="API Keys"
      />
    </div>
  );
};

export default ApiKeysTalbe;
