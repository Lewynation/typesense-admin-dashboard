import { ColumnDef } from "@tanstack/react-table";
import { SynonymSchema } from "typesense/lib/Typesense/Synonym";
import SynonymsTableRowActions from "./synonyms_table_row_actions";

export const columns: ColumnDef<SynonymSchema>[] = [
  {
    accessorKey: "id",
    header: () => <div className="font-oswald">Id</div>,
    cell: ({ row }) => {
      const id = row.original.id;

      return <div className="font-oswald">{id}</div>;
    },
  },
  {
    accessorKey: "Type",
    header: () => <div className="font-oswald">Type</div>,
    cell: ({ row }) => {
      const root = row.original.root;

      return (
        <div className="font-oswald">{root ? "One-way" : "Multi-way"}</div>
      );
    },
  },
  {
    accessorKey: "synonyms",
    header: () => <div className="font-oswald">Synonyms</div>,
    cell: ({ row }) => {
      const synonyms = row.original.synonyms;
      let synonymsString = synonyms.join(",");
      if (synonymsString.length > 30) {
        synonymsString = synonymsString.substring(0, 30) + "...";
      }

      return <div className="font-oswald">{synonymsString}</div>;
    },
  },
  {
    accessorKey: "root",
    header: () => <div className="font-oswald">Root</div>,
    cell: ({ row }) => {
      const root = row.original.root;

      return <div className="font-oswald">{root ? root : "N/A"}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <SynonymsTableRowActions row={row} />;
    },
    header: () => <div className="font-oswald">Actions</div>,
  },
];
