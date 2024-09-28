"use server";
import { signIn, signOut } from "@/auth";
import { z } from "zod";
import { CONFIG_PATH } from "@/envs";
import { TypesenseServer } from "@/types";
import * as fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { revalidatePath } from "next/cache";
import typesense from "../typesense/instance";
import { CollectionCreateSchema } from "typesense/lib/Typesense/Collections";
import { KeyCreateSchema } from "typesense/lib/Typesense/Key";

export async function login(formData: FormData) {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  await signOut({ redirectTo: "/login" });
}

export async function createServer(formData: FormData) {
  const schema = z.object({
    name: z.string(),
    protocol: z.enum(["http", "https"]).nullable(),
    host: z.string(),
    port: z.string().nullable(),
    path: z.string().nullable(),
    apiKey: z.string(),
  });
  const data = schema.parse({
    name: formData.get("name"),
    protocol: formData.get("protocol"),
    host: formData.get("host"),
    port: formData.get("port"),
    path: formData.get("path"),
    apiKey: formData.get("apiKey"),
  });

  let servers: TypesenseServer[] = [];
  const localServers = await fetchServers();
  if (localServers) {
    servers = localServers;
  }
  servers.unshift({
    host: data.host,
    protocol: data.protocol || "http",
    name: data.name,
    path: data.path || "",
    id: uuidv4(),
    port: Number(data.port) || 8108,
    apiKey: data.apiKey,
  });
  await storeServers(servers);
  revalidatePath("/");
}

async function storeServers(servers: TypesenseServer[]): Promise<void> {
  const jsonData = JSON.stringify(servers, null, 2);
  const filePath = path.join(CONFIG_PATH, "td-config.json");
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.join(CONFIG_PATH), { recursive: true });
  }
  await fs.promises.writeFile(filePath, jsonData, "utf-8");
  console.log(`Servers saved to ${filePath}`);
}

export async function deleteServerById(serverId: string): Promise<boolean> {
  const servers = await fetchServers();
  if (!servers) {
    return false;
  }
  const serverIndex = servers.findIndex((server) => server.id === serverId);
  if (serverIndex === -1) {
    return false;
  }
  servers.splice(serverIndex, 1);
  await storeServers(servers);
  revalidatePath("/");
  return true;
}

export const getAllServers = async () => {
  const servers = await fetchServers();
  revalidatePath("/");
  return servers;
};

export async function fetchServers(): Promise<TypesenseServer[] | null> {
  const configPath = CONFIG_PATH;
  const filePath = path.join(configPath, "td-config.json");
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const configs = await fs.promises.readFile(filePath, "utf-8");
  const servers = JSON.parse(configs);
  return servers as TypesenseServer[];
}

export async function fetchServerById(
  serverId: string
): Promise<TypesenseServer | undefined> {
  const servers = await fetchServers();
  const server = servers?.find((s) => s.id === serverId);
  return server;
}

export async function getCollections(serverId: string) {
  const client = await typesense.getInstance(serverId);
  return client?.getCollections();
}

export async function getApiKeys(serverId: string) {
  const client = await typesense.getInstance(serverId);
  return client?.getAPIKeys();
}

export async function createCollection(
  serverId: string,
  schema: CollectionCreateSchema
) {
  const client = await typesense.getInstance(serverId);
  const collection = await client?.createCollection(schema);
  revalidatePath(`/server/${serverId}/collections`);
  return collection;
}

export async function createAPIKey(serverId: string, schema: KeyCreateSchema) {
  const client = await typesense.getInstance(serverId);
  const key = await client?.createAPIKey(schema);
  revalidatePath(`/server/${serverId}/api-keys`);
  return key;
}

export async function deleteAPIKey(serverId: string, keyId: number) {
  const client = await typesense.getInstance(serverId);
  const key = await client?.deleteAPIKey(keyId);
  revalidatePath(`/server/${serverId}/api-keys`);
  return key;
}

export async function retrieveApiKeyDetails(serverId: string, keyId: number) {
  const client = await typesense.getInstance(serverId);
  return client?.retrieveAPIKeyDetails(keyId);
}
