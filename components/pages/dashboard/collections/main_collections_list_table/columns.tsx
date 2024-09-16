"use client";

import { ColumnDef } from "@tanstack/react-table";
import CollectionTableRowActions from "./collection_table_row_actions";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";
import CollectionTableColumnHeader from "./collection_table_column_headers";

export const columns: ColumnDef<CollectionSchema>[] = [
  {
    accessorKey: "name",
    header: () => <div className="font-oswald">Collections Name</div>,
    cell: ({ row }) => {
      return <div className="font-oswald"> {row.original.name}</div>;
    },
  },
  {
    accessorKey: "num_documents",
    header: ({ column }) => {
      return (
        <CollectionTableColumnHeader column={column} title="Documents No" />
      );
    },
  },
  {
    accessorKey: "fields",
    header: ({ column }) => {
      return (
        <CollectionTableColumnHeader column={column} title="Schema Fields" />
      );
    },
    cell: ({ row }) => {
      const fields = row.original.fields?.length;
      if (!fields) {
        return null;
      }
      return <div className="font-oswald">{fields}</div>;
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return <CollectionTableColumnHeader column={column} title="Created At" />;
    },
    cell: ({ row }) => {
      const date = row.original.created_at;
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
      return <CollectionTableRowActions row={row} />;
    },
    header: () => <div className="font-oswald">Actions</div>,
  },
];
