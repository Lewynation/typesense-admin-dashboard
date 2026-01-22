import { getAliases, getSynonyms } from "@/actions";
import { notFound } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CollectionAliasSchema } from "typesense/lib/Typesense/Aliases";
import { NoResourcesFound } from "../shared/no_resources_found";
import AliasesRowActions from "./aliases_row_actions";
import { DocumentationLinks } from "@/config/documentaion_links";

const AliasesList = async ({ serverId }: { serverId: string }) => {
  const aliases = await getAliases(serverId);
  if (!aliases) {
    notFound();
  }
  return (
    <div className="my-4">
      {aliases.aliases && aliases.aliases.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-mono font-bold">Alias Name</TableHead>
              <TableHead className="font-mono font-bold">
                Collection Name
              </TableHead>
              <TableHead className="text-center font-mono font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {aliases.aliases.map((alias, index) => (
              <SingleAliasTile {...alias} key={index} />
            ))}
          </TableBody>
        </Table>
      )}
      {aliases.aliases.length <= 0 && (
        <>
          <NoResourcesFound
            resource="Aliases"
            documentationLink={DocumentationLinks.aliases}
          />
        </>
      )}
    </div>
  );
};

const SingleAliasTile = (alias: CollectionAliasSchema) => {
  return (
    <TableRow className="">
      <TableCell>
        <div className="font-mono font-bold">{alias.name}</div>
      </TableCell>
      <TableCell>
        <div className="font-mono">{alias.collection_name}</div>
      </TableCell>
      <TableCell className="text-right">
        <AliasesRowActions {...alias} />
      </TableCell>
    </TableRow>
  );
};

export default AliasesList;
