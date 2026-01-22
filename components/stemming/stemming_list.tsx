import { getStemmingDictionaries } from "@/actions";
import { notFound } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NoResourcesFound } from "../shared/no_resources_found";
import StemmingRowActions from "./stemming_row_actions";
import { DocumentationLinks } from "@/config/documentaion_links";

const StemmingList = async ({ serverId }: { serverId: string }) => {
  const stemming = await getStemmingDictionaries(serverId);
  if (!stemming) {
    notFound();
  }
  return (
    <div className="my-4">
      {stemming.dictionaries && stemming.dictionaries.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-mono font-bold">Name</TableHead>
              <TableHead className="text-center font-mono font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stemming.dictionaries.map((stemmindDicId, index) => (
              <SingleStemmingDictionary
                stemmingId={stemmindDicId}
                key={index}
              />
            ))}
          </TableBody>
        </Table>
      )}
      {stemming.dictionaries.length <= 0 && (
        <>
          <NoResourcesFound
            resource="Stemming Dictionary"
            documentationLink={DocumentationLinks.stemming}
          />
        </>
      )}
    </div>
  );
};

const SingleStemmingDictionary = ({ stemmingId }: { stemmingId: string }) => {
  return (
    <TableRow className="">
      <TableCell>
        <div className="font-mono font-bold">{stemmingId}</div>
      </TableCell>
      <TableCell className="text-right">
        <StemmingRowActions stemmingId={stemmingId} />
      </TableCell>
    </TableRow>
  );
};

export default StemmingList;
