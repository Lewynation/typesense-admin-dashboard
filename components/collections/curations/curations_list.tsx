import { getOverrides } from "@/actions";
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
import CurationsRowActions from "./curations_row_actions";
import { OverrideSchema } from "typesense/lib/Typesense/Override";
import { DocumentationLinks } from "@/config/documentaion_links";

const CurationsList = async ({
  serverId,
  collectionName,
}: {
  serverId: string;
  collectionName: string;
}) => {
  const overrides = await getOverrides(serverId, collectionName);
  if (!overrides) {
    notFound();
  }
  return (
    <div className="my-4">
      {overrides.overrides && overrides.overrides.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-mono font-bold">Name</TableHead>
              <TableHead className="font-mono font-bold">Query</TableHead>
              <TableHead className="font-mono font-bold">Match</TableHead>
              <TableHead className="text-center font-mono font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {overrides.overrides.map((override, index) => (
              <SingleCollectionTile {...override} key={index} />
            ))}
          </TableBody>
        </Table>
      )}
      {overrides.overrides.length <= 0 && (
        <>
          <NoResourcesFound
            resource="Curation"
            documentationLink={DocumentationLinks.curations}
          />
        </>
      )}
    </div>
  );
};

const SingleCollectionTile = (overrider: OverrideSchema) => {
  return (
    <TableRow className="">
      <TableCell>
        <div className="font-mono font-bold">{overrider.id}</div>
      </TableCell>
      <TableCell>
        <div className="font-mono">{overrider.rule.query ?? "N/A"}</div>
      </TableCell>
      <TableCell>
        <div className="font-mono">{overrider.rule.match ?? "N/A"}</div>
      </TableCell>
      <TableCell className="text-right">
        <CurationsRowActions {...overrider} />
      </TableCell>
    </TableRow>
  );
};

export default CurationsList;
