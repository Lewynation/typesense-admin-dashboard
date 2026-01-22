import { getConversationalModels } from "@/actions";
import { notFound } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { apiToLocalConversationalModel } from "@/lib/conversational_model_manipulator";
import { ConversationModelSchema } from "typesense/lib/Typesense/ConversationModel";
import { LocalConversationModel } from "@/zod/create_conversation_model";
import { Badge } from "../ui/badge";
import { NoResourcesFound } from "../shared/no_resources_found";
import ConversationModelsRowActions from "./convesation_models_row_actions";
import { DocumentationLinks } from "@/config/documentaion_links";

const ConversationModelsList = async ({ serverId }: { serverId: string }) => {
  const apiConversationModels = await getConversationalModels(serverId);
  if (!apiConversationModels) {
    notFound();
  }
  const localConversationModels = apiConversationModels.map((model) =>
    apiToLocalConversationalModel(model),
  );
  return (
    <div className="my-4">
      {localConversationModels.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-mono font-bold">Id</TableHead>
              <TableHead className="font-mono font-bold">Model</TableHead>
              <TableHead className="font-mono font-bold">Provider</TableHead>
              <TableHead className="font-mono font-bold">TTL</TableHead>
              <TableHead className="font-mono font-bold">Max Bytes</TableHead>
              <TableHead className="font-mono font-bold">
                History Collection
              </TableHead>
              <TableHead className="text-center font-mono font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {localConversationModels.map((model, index) => (
              <SingleConversationModelTile {...model} key={index} />
            ))}
          </TableBody>
        </Table>
      )}
      {localConversationModels.length <= 0 && (
        <>
          <NoResourcesFound
            resource="Conversation Model"
            documentationLink={DocumentationLinks.conversationModels}
          />
        </>
      )}
    </div>
  );
};

const SingleConversationModelTile = (
  model: ConversationModelSchema | LocalConversationModel,
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
        <div className="font-mono">{model.ttl ?? "N/A"}</div>
      </TableCell>
      <TableCell>
        <div className="font-mono">{model.max_bytes ?? "N/A"}</div>
      </TableCell>
      <TableCell>
        <div className="font-mono">{model.history_collection ?? "N/A"}</div>
      </TableCell>
      <TableCell className="text-right">
        <ConversationModelsRowActions {...model} />
      </TableCell>
    </TableRow>
  );
};

export default ConversationModelsList;
