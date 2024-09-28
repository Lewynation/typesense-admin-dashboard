"use client";

import { ColumnDef } from "@tanstack/react-table";
import { OverrideSchema } from "typesense/lib/Typesense/Override";
import { OverrideRuleQuerySchema } from "typesense/lib/Typesense/Overrides";
import CurationTableRowActions from "./curation_table_row_actions";

export const columns: ColumnDef<OverrideSchema>[] = [
  {
    accessorKey: "rule",
    header: () => <div className="font-oswald">Query</div>,
    cell: ({ row }) => {
      const query = row.original.rule as OverrideRuleQuerySchema;

      return <div className="font-oswald">{query.query}</div>;
    },
  },
  {
    accessorKey: "match",
    header: () => <div className="font-oswald">Match</div>,
    cell: ({ row }) => {
      const match = row.original.rule as OverrideRuleQuerySchema;

      return <div className="font-oswald">{match.match}</div>;
    },
  },
  {
    accessorKey: "includes",
    header: () => <div className="font-oswald">Includes</div>,
    cell: ({ row }) => {
      const includes = row.original.includes?.length;

      return <div className="font-oswald">{includes}</div>;
    },
  },
  {
    accessorKey: "excludes",
    header: () => <div className="font-oswald">Excludes</div>,
    cell: ({ row }) => {
      const excludes = row.original.excludes?.length;

      return <div className="font-oswald">{excludes}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <CurationTableRowActions row={row} />;
    },
    header: () => <div className="font-oswald">Actions</div>,
  },
];
