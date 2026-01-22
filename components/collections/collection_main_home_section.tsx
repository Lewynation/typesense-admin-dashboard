import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCollections } from "@/actions";
import { notFound } from "next/navigation";
import { NoResourcesFound } from "../shared/no_resources_found";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";
import CollectionRowActions from "./collection_actions";
import { formatEpochDate } from "@/lib/date_format";
import { DocumentationLinks } from "@/config/documentaion_links";

const CollectionMainHomeSection = async ({
  serverId,
}: {
  serverId: string;
}) => {
  const collections = await getCollections(serverId);
  if (!collections) {
    notFound();
  }

  return (
    <div className="my-4">
      {collections && collections.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-mono font-bold">
                Collection Name
              </TableHead>
              <TableHead className="font-mono font-bold">
                Documents No
              </TableHead>
              <TableHead className="font-mono font-bold">
                Schema Fields
              </TableHead>
              <TableHead className="font-mono font-bold">Created At</TableHead>
              <TableHead className="text-center font-mono font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {collections.map((collection, index) => (
              <SingleCollectionTile {...collection} key={index} />
            ))}
          </TableBody>
        </Table>
      )}
      {collections.length <= 0 && (
        <>
          <NoResourcesFound
            resource="Collection"
            documentationLink={DocumentationLinks.collections}
          />
        </>
      )}
    </div>
  );
};

const SingleCollectionTile = (collection: CollectionSchema) => {
  return (
    <TableRow className="">
      <TableCell>
        <div className="font-mono font-bold">{collection.name}</div>
      </TableCell>
      <TableCell>
        <div className="font-mono">{collection.num_documents}</div>
      </TableCell>
      <TableCell>
        <div className="font-mono">{collection.fields.length}</div>
      </TableCell>
      <TableCell>
        <div className="font-mono">
          {formatEpochDate(collection.created_at)}
        </div>
      </TableCell>
      <TableCell className="text-right">
        <CollectionRowActions {...collection} />
      </TableCell>
    </TableRow>
  );
};

export default CollectionMainHomeSection;
