import { getSynonyms } from "@/actions";
import { notFound } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NoResourcesFound } from "../../shared/no_resources_found";
import { SynonymSchema } from "typesense/lib/Typesense/Synonym";
import SynonymRowActions from "./synonym_row_actions";
import { DocumentationLinks } from "@/config/documentaion_links";
const SynonymList = async ({
  serverId,
  collectionName,
}: {
  serverId: string;
  collectionName: string;
}) => {
  const synonyms = await getSynonyms(serverId, collectionName);
  if (!synonyms) {
    notFound();
  }
  return (
    <div className="my-4">
      {synonyms.synonyms && synonyms.synonyms.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-mono font-bold">
                Synonym Name
              </TableHead>
              <TableHead className="font-mono font-bold">Type</TableHead>
              <TableHead className="font-mono font-bold">Root</TableHead>
              <TableHead className="font-mono font-bold">Locale</TableHead>
              <TableHead className="text-center font-mono font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {synonyms.synonyms.map((collection, index) => (
              <SingleCollectionTile {...collection} key={index} />
            ))}
          </TableBody>
        </Table>
      )}
      {synonyms.synonyms.length <= 0 && (
        <>
          <NoResourcesFound
            resource="Synonym"
            documentationLink={DocumentationLinks.synonyms}
          />
        </>
      )}
    </div>
  );
};

const SingleCollectionTile = (synonym: SynonymSchema) => {
  return (
    <TableRow className="">
      <TableCell>
        <div className="font-mono font-bold">{synonym.id}</div>
      </TableCell>
      <TableCell>
        <div className="font-mono">{synonym.root ? "One Way" : "Muti Way"}</div>
      </TableCell>
      <TableCell>
        <div className="font-mono">
          {!!synonym.root?.trim() ? synonym.root.trim() : "N/A"}
        </div>
      </TableCell>
      <TableCell>
        <div className="font-mono">{synonym.locale ?? "N/A"}</div>
      </TableCell>
      <TableCell className="text-right">
        <SynonymRowActions {...synonym} />
      </TableCell>
    </TableRow>
  );
};

export default SynonymList;
