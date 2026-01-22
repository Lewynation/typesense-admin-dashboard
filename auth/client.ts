import { typesensePluginClient } from "@/better_auth_plugins/typesense_plugin/typesense_plugin.client";
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  // baseURL: "http://localhost:3000",
  plugins: [typesensePluginClient()],
});
