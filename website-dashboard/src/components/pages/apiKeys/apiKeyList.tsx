import ListLayout from "../../../layouts/listLayout/listLayout";
import ApiKeyListTile from "./apiKeyListtile";
import ApiKeyListTitle from "./apiKeyListTitle";
import { apiKeyTempData } from "./mockData";

function ApiKeyList() {
  return (
    <ListLayout>
      <ApiKeyListTitle />
      {apiKeyTempData.map((apiKey) => {
        return (
          <ApiKeyListTile
            key={apiKey.keyPrefix}
            uniqueId={apiKey.uniqueId}
            keyPrefix={apiKey.keyPrefix}
            description={apiKey.description}
            expiresAt={apiKey.expiresAt}
          />
        );
      })}
    </ListLayout>
  );
}

export default ApiKeyList;
