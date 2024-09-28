"use client";

import React from "react";
import AliasTable from "./aliases_list_table/alias_table";
import { useAliases } from "@/hooks";
import { ErrorComponent } from "@/components/shared/Error";
import { BarLoaderFullScreenWidth } from "@/components/ui";

const AliasBody = () => {
  const { aliases, loading, error } = useAliases();

  return (
    <div>
      {loading && <BarLoaderFullScreenWidth loading={loading} />}
      {error && <ErrorComponent error={error} />}
      {aliases && <AliasTable data={aliases} />}
    </div>
  );
};

export default AliasBody;
