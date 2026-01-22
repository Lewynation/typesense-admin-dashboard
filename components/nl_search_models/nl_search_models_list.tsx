import {
  getConversationalModels,
  getNLSearchModels,
  getSynonyms,
} from "@/actions";
import { notFound } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../ui/badge";
import { NoResourcesFound } from "../shared/no_resources_found";
import { apiToLocalNLSearchModel } from "@/lib/nl_search_model_manipulator";
import { NLSearchModelSchema } from "typesense/lib/Typesense/NLSearchModels";
import { LocalNLSearchModel } from "@/zod/create_nl_search_model";
import NLSearchModelsRowActions from "./nl_search_models_row_actions";
import { DocumentationLinks } from "@/config/documentaion_links";

const NLSearchModelsList = async ({ serverId }: { serverId: string }) => {
  const nlSearchModels = await getNLSearchModels(serverId);
  if (!nlSearchModels) {
    notFound();
  }
  const localNlSearchModels = nlSearchModels.map((model) =>
    apiToLocalNLSearchModel(model),
  );
  return (
    <div className="my-4">
      {localNlSearchModels.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-mono font-bold">Id</TableHead>
              <TableHead className="font-mono font-bold">Model</TableHead>
              <TableHead className="font-mono font-bold">Provider</TableHead>
              <TableHead className="font-mono font-bold">Max Bytes</TableHead>
              <TableHead className="text-center font-mono font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {localNlSearchModels.map((model, index) => (
              <SingleNLSearchModelTile {...model} key={index} />
            ))}
          </TableBody>
        </Table>
      )}
      {localNlSearchModels.length <= 0 && (
        <>
          <NoResourcesFound
            resource="NL Search Model"
            documentationLink={DocumentationLinks.nlSearchModels}
          />
        </>
      )}
    </div>
  );
};

const SingleNLSearchModelTile = (
  model: NLSearchModelSchema | LocalNLSearchModel,
) => {
  const local = "type" in model;
  return (
    <TableRow className="">
      <TableCell>
        <div className="font-mono font-bold">{model.id}</div>
      </TableCell>
      <TableCell>
        <div className="font-mono font-bold">{model.model_name}</div>
      </TableCell>
      <TableCell>
        <div className="font-mono">
          {local ? (
            <Badge className="font-mono">{model.type}</Badge>
          ) : (
            <Badge className="font-mono" variant={"destructive"}>
              Unknown Provider
            </Badge>
          )}
        </div>
      </TableCell>
      <TableCell>
        <div className="font-mono">{model.max_bytes ?? "N/A"}</div>
      </TableCell>
      <TableCell className="text-right">
        <NLSearchModelsRowActions {...model} />
      </TableCell>
    </TableRow>
  );
};

export default NLSearchModelsList;
