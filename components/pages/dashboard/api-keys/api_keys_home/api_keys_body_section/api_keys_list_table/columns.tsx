"use client";

import { ColumnDef } from "@tanstack/react-table";
import { KeySchema } from "typesense/lib/Typesense/Key";
import APIKeyTableColumnHeader from "./api_key_column_header";
import APIKeyTableRowActions from "./api_key_table_row_actions";

export const columns: ColumnDef<KeySchema>[] = [
  {
    accessorKey: "description",
    header: () => <div className="font-oswald">Description</div>,
    cell: ({ row }) => {
      return <div className="font-oswald"> {row.original.description}</div>;
    },
  },
  {
    accessorKey: "value_prefix",
    header: () => <div className="font-oswald">Key Prefix</div>,
    cell: ({ row }) => {
      return <div className="font-oswald"> {row.original["value_prefix"]}</div>;
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <APIKeyTableColumnHeader column={column} title="Id" />;
    },
    cell: ({ row }) => {
      return <div className="font-oswald"> {row.original.id}</div>;
    },
  },
  {
    accessorKey: "expires_at",
    header: ({ column }) => {
      return <APIKeyTableColumnHeader column={column} title="Expires At" />;
    },
    cell: ({ row }) => {
      const date = row.original.expires_at || 0;
      const formattedDate = new Date(date * 1000).toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      return <div className="font-oswald">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <APIKeyTableRowActions row={row} />;
    },
    header: () => <div className="font-oswald">Actions</div>,
  },
];
