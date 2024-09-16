import React from "react";
import { ApiKeysTable } from ".";
import { GetResourceByServerIdProps } from "@/types";
import { getApiKeys } from "@/actions";
import { notFound } from "next/navigation";

const ApiKeysHomeSection: React.FC<GetResourceByServerIdProps> = async ({
  serverId,
}) => {
  const apiKeys = await getApiKeys(serverId);
  if (!apiKeys) {
    notFound();
  }
  return (
    <div className="mt-2">
      {apiKeys && <ApiKeysTable data={apiKeys.keys} />}
      {apiKeys && apiKeys.keys.length < 0 && (
        <>
          <div>There are no api keys</div>
        </>
      )}
    </div>
  );
};

export default ApiKeysHomeSection;
