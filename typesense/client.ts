import { fetchServerById } from "@/actions";
import Typesense from "typesense";
import { TypesenseClientActions } from "./typesense_actions";

export class TypesenseClient {
  instanceClients: Record<string, TypesenseClientActions> = {};

  async getInstance(serverId: string): Promise<TypesenseClientActions | null> {
    const instance = this.instanceClients[serverId];
    if (instance) return instance;
    const server = await fetchServerById(serverId);
    if (!server) {
      return null;
    }
    try {
      const client = new Typesense.Client({
        nodes: [
          {
            host: server.host,
            port: server.port!,
            protocol: server.protocol!,
          },
        ],
        apiKey: server.apiKey,
        connectionTimeoutSeconds: 2,
      });
      const typesenseClientAction = new TypesenseClientActions(client);
      this.instanceClients[serverId] = typesenseClientAction;
      return typesenseClientAction;
    } catch (error) {
      return null;
    }
  }
}
