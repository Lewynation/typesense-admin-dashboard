import { AuthenticationCheckWrapper } from "@/components/shared";
import { ApiKeyHeaderSection } from "@/components/pages/dashboard/api-keys";
import React from "react";
import { AdminKeyResultDialog } from "@/components/pages/dashboard/api-keys/admin_api_keys";
import {
  ApiKeysHomeSection,
  ApiKeysTable,
} from "@/components/pages/dashboard/api-keys/api_keys_home/api_keys_body_section";
import { mockAPIKeys } from "./mock";

const ApiKeys = () => {
  return (
    <AuthenticationCheckWrapper>
      <AdminKeyResultDialog />
      <ApiKeyHeaderSection />
      {/* <ApiKeysTable data={mockAPIKeys} /> */}
      <ApiKeysHomeSection />
    </AuthenticationCheckWrapper>
  );
};

export default ApiKeys;
