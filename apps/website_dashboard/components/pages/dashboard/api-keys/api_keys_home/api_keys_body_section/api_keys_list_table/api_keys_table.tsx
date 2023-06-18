import React from "react";
import { DataTable } from "ui";
import { columns } from "./columns";
import { KeysRetrieveSchema } from "typesense/lib/Typesense/Keys";
import { KeySchema } from "typesense/lib/Typesense/Key";

interface ApiKeysTableProps {
  data: KeySchema[];
}

const ApiKeysTalbe: React.FC<ApiKeysTableProps> = ({ data }) => {
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default ApiKeysTalbe;
