import { getSearchPresets } from "@/actions";
import { notFound } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PresetSchema } from "typesense/lib/Typesense/Preset";
import { DocumentSchema } from "typesense/lib/Typesense/Documents";
import { NoResourcesFound } from "../shared/no_resources_found";
import SearchPresetRowActions from "./search_preset_row_actions";
import { DocumentationLinks } from "@/config/documentaion_links";

const SearchPresetsList = async ({ serverId }: { serverId: string }) => {
  const searchPresets = await getSearchPresets(serverId);
  if (!searchPresets) {
    notFound();
  }
  return (
    <div className="my-4">
      {searchPresets.presets && searchPresets.presets.length > 0 && (
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
            {searchPresets.presets.map((preset, index) => (
              <SingleSearchPresetTile {...preset} key={index} />
            ))}
          </TableBody>
        </Table>
      )}
      {searchPresets.presets.length <= 0 && (
        <>
          <NoResourcesFound
            resource="Search Preset"
            documentationLink={DocumentationLinks.searchPresets}
          />
        </>
      )}
    </div>
  );
};

const SingleSearchPresetTile = (preset: PresetSchema<DocumentSchema>) => {
  return (
    <TableRow className="">
      <TableCell>
        <div className="font-mono font-bold">{preset.name}</div>
      </TableCell>
      <TableCell className="text-right">
        <SearchPresetRowActions {...preset} />
      </TableCell>
    </TableRow>
  );
};

export default SearchPresetsList;
