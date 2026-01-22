import { fetchServerById } from "@/actions";
import Typesense from "typesense";
import { TypesenseClientActions } from "./typesense_actions";
import { CreateTypesenseServer } from "@/better_auth_plugins/typesense_plugin/typings";
import { LRUCache } from "lru-cache";
import { auth } from "@/auth/server";
import { headers } from "next/headers";

export class TypesenseClient {
  // instanceClients: Record<string, TypesenseClientActions> = {};
  private instanceClients: LRUCache<string, TypesenseClientActions>;

  constructor() {
    this.instanceClients = new LRUCache({
      max: 100,
      ttl: 1000 * 60 * 60, // 60 minutes
      updateAgeOnGet: true,
    });
  }

  async getInstance(serverId: string): Promise<TypesenseClientActions | null> {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      throw new Error("UNAUTHORIZED");
    }
    const instance = this.instanceClients.get(serverId);
    if (instance) return instance;
    const server = await fetchServerById(serverId);
    if (!server) {
      return null;
    }
    try {
      const client = new Typesense.Client({
        nodes: [
          {
            host: server.server.host,
            port: server.server.port!,
            protocol: server.server.protocol!,
            path: server.server.path,
          },
        ],
        apiKey: server.server.apiKey,
        connectionTimeoutSeconds: 20,
        numRetries: 3,
        retryIntervalSeconds: 1,
      });
      const typesenseClientAction = new TypesenseClientActions(client);
      this.instanceClients.set(serverId, typesenseClientAction);
      return typesenseClientAction;
    } catch (error) {
      return null;
    }
  }

  deleteInstane(serverId: string) {
    this.instanceClients.delete(serverId);
  }

  async createSingleInstance(
    config: CreateTypesenseServer,
  ): Promise<TypesenseClientActions | null> {
    try {
      const client = new Typesense.Client({
        nodes: [
          {
            host: config.host,
            port: config.port!,
            protocol: config.protocol!,
          },
        ],
        apiKey: config.apiKey,
        connectionTimeoutSeconds: 20,
        numRetries: 3,
        retryIntervalSeconds: 1,
      });
      const typesenseClientAction = new TypesenseClientActions(client);
      return typesenseClientAction;
    } catch (error) {
      return null;
    }
  }
}
