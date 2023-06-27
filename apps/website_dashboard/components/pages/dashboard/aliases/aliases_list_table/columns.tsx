"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CollectionAliasSchema } from "typesense/lib/Typesense/Aliases";
import AliasTableRowActions from "./alias_table_row_action";

export const column: ColumnDef<CollectionAliasSchema>[] = [
  {
    accessorKey: "name",
    header: () => <div className="font-oswald">Name</div>,
    cell: ({ row }) => {
      const name = row.original.name;
      return <div className="font-oswald">{name}</div>;
    },
  },
  {
    accessorKey: "collection_name",
    header: () => <div className="font-oswald">Collection Name</div>,
    cell: ({ row }) => {
      const collection_name = row.original.collection_name;
      return <div className="font-oswald">{collection_name}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <AliasTableRowActions row={row} />;
    },
    header: () => <div className="font-oswald">Actions</div>,
  },
];
