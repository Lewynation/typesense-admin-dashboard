import ListLayout from "../../../layouts/listLayout/listLayout";
import ApiKeyListTile from "./apiKeyListtile";
import ApiKeyListTitle from "./apiKeyListTitle";

import useAPIKeys from "./hooks/useAPIKeys";

function ApiKeyList() {
  const { apiKeys, error, loading } = useAPIKeys();
  console.log(apiKeys);
  return (
    <ListLayout>
      <ApiKeyListTitle />
      {apiKeys.map((apiKey) => {
        return (
          <ApiKeyListTile
            key={apiKey.id}
            uniqueId={apiKey.id}
            keyPrefix={apiKey.value_prefix || "No key"}
            description={apiKey.description || "No description"}
            expiresAt={apiKey.expires_at || 0}
          />
        );
      })}
    </ListLayout>
  );
}

export default ApiKeyList;
