import { Outlet } from "react-router-dom";
import ApiKeyHeading from "../../components/pages/apiKeys/apiKeyHeading";
import ApiKeyList from "../../components/pages/apiKeys/apiKeyList";

export function ApiKeysIndex() {
  return (
    <div>
      <ApiKeyHeading />
      <ApiKeyList />
    </div>
  );
}

function ApiKeys() {
  return (
    <div className="w-full h-full">
      <Outlet />
    </div>
  );
}

export default ApiKeys;
