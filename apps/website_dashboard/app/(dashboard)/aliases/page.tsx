import {
  AliasBody,
  AliasHeader as AliasesHeader,
} from "@/components/pages/dashboard/aliases";
import { AuthenticationCheckWrapper } from "@/components/shared";
import React from "react";

const Aliases = () => {
  return (
    <div>
      <AliasesHeader />
      <AliasBody />
    </div>
  );
};

export default Aliases;
