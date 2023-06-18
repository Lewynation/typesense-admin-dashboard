import { CheckBoxTreeAssembly } from "@/components/pages/dashboard/api-keys/search_only_api_keys/check_boxes";
import { SearchAPIKeysDataCollection } from "@/components/pages/dashboard/api-keys/search_only_api_keys/search_api_key_data_collection";
import { SearchApiKeysDataSubmisssion } from "@/components/pages/dashboard/api-keys/search_only_api_keys/search_api_key_data_submission";
import SearchAPIKeyResultDialog from "@/components/pages/dashboard/api-keys/search_only_api_keys/search_api_key_data_submission/search_api_key_result_dialog";
import React from "react";

const SearchApiKey = () => {
  return (
    <div className="flex flex-col items-center">
      <div>
        <SearchAPIKeysDataCollection />
        <CheckBoxTreeAssembly />
        <SearchApiKeysDataSubmisssion />
        <SearchAPIKeyResultDialog />
      </div>
    </div>
  );
};

export default SearchApiKey;
