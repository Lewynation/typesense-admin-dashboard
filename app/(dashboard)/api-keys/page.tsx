import { ApiKeyHeaderSection } from "@/components/pages/dashboard/api-keys";
import React from "react";
import { AdminKeyResultDialog } from "@/components/pages/dashboard/api-keys/admin_api_keys";
import { ApiKeysHomeSection } from "@/components/pages/dashboard/api-keys/api_keys_home/api_keys_body_section";

const ApiKeys = () => {
  return (
    <>
      <AdminKeyResultDialog />
      <ApiKeyHeaderSection />
      <ApiKeysHomeSection />
    </>
  );
};

export default ApiKeys;
