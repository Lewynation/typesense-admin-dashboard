import React from "react";
import { getApiKeys } from "@/actions";
import { notFound } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { KeySchema } from "typesense/lib/Typesense/Key";
import { formatEpochDate } from "@/lib/date_format";
import APIKeyTableRowActions from "./api_key_table_row_actions";
import { Badge } from "../ui/badge";

type GetResourceByServerIdProps = {
  serverId: string;
};

const ApiKeysHomeSection: React.FC<GetResourceByServerIdProps> = async ({
  serverId,
}) => {
  const apiKeys = await getApiKeys(serverId);
  if (!apiKeys) {
    notFound();
  }
  return (
    <div className="mt-2">
      {apiKeys && apiKeys.keys.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-mono font-bold">Description</TableHead>
              <TableHead className="font-mono font-bold">Key Prefix</TableHead>
              <TableHead className="font-mono font-bold">Priviledge</TableHead>
              <TableHead className="font-mono font-bold">Id</TableHead>
              <TableHead className="font-mono font-bold">Expires At</TableHead>
              <TableHead className="text-center font-mono font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apiKeys.keys.map((key, index) => (
              <SingleCollectionTile {...key} key={index} />
            ))}
          </TableBody>
        </Table>
      )}
      {apiKeys && apiKeys.keys.length < 0 && (
        <>
          <div>There are no api keys</div>
        </>
      )}
    </div>
  );
};

const SingleCollectionTile = (key: KeySchema) => {
  const isAdminKey =
    key.actions?.join(", ") === "*" && key.collections?.join(", ") === "*";
  const isPartialAdminKey =
    key.actions?.join(", ") !== "*" && key.collections?.join(", ") === "*";
  return (
    <TableRow className="">
      <TableCell>
        <div className="font-mono font-bold">{key.description}</div>
      </TableCell>
      <TableCell>
        <div className="font-mono">{key.value_prefix}</div>
      </TableCell>
      <TableCell>
        <div>
          <Badge
            variant={
              isAdminKey
                ? "destructive"
                : isPartialAdminKey
                  ? "default"
                  : "secondary"
            }
            className="font-mono"
          >
            {isAdminKey
              ? "Admin"
              : isPartialAdminKey
                ? "partialAdmin"
                : "Search"}
          </Badge>
        </div>
      </TableCell>
      <TableCell>
        <div className="font-mono">{key.id}</div>
      </TableCell>
      <TableCell>
        <div
          className={`font-mono ${key.expires_at && key.expires_at * 1000 < Date.now() ? "text-destructive" : ""}`}
        >
          {formatEpochDate(key.expires_at || 0)}
        </div>
      </TableCell>
      <TableCell className="text-right">
        <APIKeyTableRowActions {...key} />
      </TableCell>
    </TableRow>
  );
};

export default ApiKeysHomeSection;
