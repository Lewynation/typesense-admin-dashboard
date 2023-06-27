"use client";

import React from "react";
import AliasTable from "./aliases_list_table/alias_table";
import { useAliases } from "@/hooks";
import { ErrorComponent } from "@/components/shared/Error";
import { BarLoaderFullScreenWidth } from "ui";

const AliasBody = () => {
  const { aliases, loading, error } = useAliases();

  const AliasBody = error ? (
    <ErrorComponent error={error} />
  ) : (
    <AliasTable data={aliases} />
  );

  return (
    <div>
      {loading ? <BarLoaderFullScreenWidth loading={loading} /> : AliasBody}
    </div>
  );
};

export default AliasBody;
