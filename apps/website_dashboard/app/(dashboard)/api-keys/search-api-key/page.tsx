import { SearchAPIKeyBackBtn } from "@/components/pages/dashboard/api-keys";
import { CheckBoxTreeAssembly } from "@/components/pages/dashboard/api-keys/search_only_api_keys/check_boxes";
import { SearchAPIKeysDataCollection } from "@/components/pages/dashboard/api-keys/search_only_api_keys/search_api_key_data_collection";
import { SearchApiKeysDataSubmisssion } from "@/components/pages/dashboard/api-keys/search_only_api_keys/search_api_key_data_submission";
import SearchAPIKeyResultDialog from "@/components/pages/dashboard/api-keys/search_only_api_keys/search_api_key_data_submission/search_api_key_result_dialog";
import { AuthenticationCheckWrapper } from "@/components/shared";
import React from "react";

const SearchApiKey = () => {
  return (
    <>
      {/* <AuthenticationCheckWrapper> */}
      <div className="relative flex flex-col items-center">
        <SearchAPIKeyBackBtn className="absolute top-0 left-0 z-0 cursor-pointer" />
        <div>
          <SearchAPIKeysDataCollection />
          <CheckBoxTreeAssembly />
          <SearchApiKeysDataSubmisssion />
          <SearchAPIKeyResultDialog />
        </div>
      </div>
      {/* </AuthenticationCheckWrapper> */}
    </>
  );
};

export default SearchApiKey;
