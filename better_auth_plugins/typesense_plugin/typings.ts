/**
 * Type definitions for Typesense Server Management Plugin
 * These types represent the database models and API payloads used by the plugin
 */

/**
 * TypesenseServer Model
 * Stores Typesense server configurations for each user
 */
export interface TypesenseServer {
  /**
   * Unique identifier for the server configuration
   */
  id: string;

  /**
   * Reference to the user who created this configuration
   * Foreign key to user.id with CASCADE delete
   */
  userId: string;

  /**
   * Display name for the server configuration
   */
  name: string;

  /**
   * Protocol to use for connection
   * @default "https"
   */
  protocol?: "http" | "https";

  /**
   * Typesense server host/domain
   * Example: "localhost" or "typesense.example.com"
   */
  host: string;

  /**
   * Port number for the Typesense server
   * Example: 8108 for default Typesense port
   */
  port?: number;

  /**
   * Optional path prefix for the API
   * Example: "/api" or "/v1"
   */
  path?: string;

  /**
   * API key for authenticating with Typesense
   * Stored securely - should be encrypted in production
   */
  apiKey: string;

  /**
   * Timestamp when the configuration was created
   */
  createdAt: Date;

  /**
   * Timestamp when the configuration was last updated
   */
  updatedAt: Date;
}

/**
 * Type for creating a new TypesenseServer record
 * Omits auto-generated fields
 */
export type CreateTypesenseServer = Omit<
  TypesenseServer,
  "id" | "createdAt" | "updatedAt"
>;

/**
 * Type for updating a TypesenseServer record
 * All fields except id and userId are optional
 */
export type UpdateTypesenseServer = Partial<
  Omit<TypesenseServer, "id" | "userId" | "createdAt" | "updatedAt">
>;

/**
 * Extended User type with Typesense servers
 * Use this when you need to include server configurations with user data
 */
export interface UserWithTypesenseServers {
  id: string;
  email?: string;
  name?: string;
  // ... other user fields
  typesenseServers?: TypesenseServer[];
}

/**
 * Response type for createTypesenseServer endpoint
 */
export interface CreateTypesenseServerResponse {
  success: boolean;
  server: TypesenseServer;
}

/**
 * Response type for getTypesenseServer endpoint
 */
export interface GetTypesenseServerResponse {
  success: boolean;
  server: TypesenseServer;
}

/**
 * Response type for getAllTypesenseServers endpoint
 */
export interface GetAllTypesenseServersResponse {
  success: boolean;
  servers: TypesenseServer[];
  count: number;
}

/**
 * Response type for updateTypesenseServer endpoint
 */
export interface UpdateTypesenseServerResponse {
  success: boolean;
  server: TypesenseServer;
}

/**
 * Response type for deleteTypesenseServer endpoint
 */
export interface DeleteTypesenseServerResponse {
  success: boolean;
  message: string;
}

/**
 * Response type for deleteAllTypesenseServers endpoint
 */
export interface DeleteAllTypesenseServersResponse {
  success: boolean;
  message: string;
}

/**
 * Request payload for createTypesenseServer endpoint
 */
export interface CreateTypesenseServerPayload {
  name: string;
  protocol?: "http" | "https";
  host: string;
  port?: number;
  path?: string;
  apiKey: string;
}

/**
 * Request payload for updateTypesenseServer endpoint
 */
export interface UpdateTypesenseServerPayload {
  name?: string;
  protocol?: "http" | "https";
  host?: string;
  port?: number;
  path?: string;
  apiKey?: string;
}

/**
 * Type guard to check if a user has any Typesense servers
 */
export function hasTypesenseServers(
  user: UserWithTypesenseServers
): user is UserWithTypesenseServers & { typesenseServers: TypesenseServer[] } {
  return (
    user.typesenseServers !== null &&
    user.typesenseServers !== undefined &&
    user.typesenseServers.length > 0
  );
}

/**
 * Helper function to validate Typesense server configuration
 */
export function isValidTypesenseServer(
  server: Partial<TypesenseServer>
): server is TypesenseServer {
  return !!(
    server.id &&
    server.userId &&
    server.name &&
    server.host &&
    server.apiKey &&
    server.createdAt
  );
}

/**
 * Helper function to build Typesense connection URL
 */
export function buildTypesenseUrl(server: TypesenseServer): string {
  const protocol = server.protocol || "https";
  const port = server.port ? `:${server.port}` : "";
  const path = server.path || "";
  return `${protocol}://${server.host}${port}${path}`;
}

/**
 * Helper function to sanitize server data for client-side display
 * Masks the API key for security
 */
export function sanitizeTypesenseServer(
  server: TypesenseServer
): Omit<TypesenseServer, "apiKey"> & { apiKey: string } {
  return {
    ...server,
    apiKey: `${server.apiKey.substring(0, 4)}${"*".repeat(
      server.apiKey.length - 4
    )}`,
  };
}

/**
 * Typesense client configuration interface
 * Used when initializing a Typesense client with stored configuration
 */
export interface TypesenseClientConfig {
  nodes: Array<{
    host: string;
    port: number;
    protocol: "http" | "https";
    path?: string;
  }>;
  apiKey: string;
  connectionTimeoutSeconds?: number;
  numRetries?: number;
}

/**
 * Helper function to convert TypesenseServer to Typesense client config
 */
export function toTypesenseClientConfig(
  server: TypesenseServer,
  options?: {
    connectionTimeoutSeconds?: number;
    numRetries?: number;
  }
): TypesenseClientConfig {
  return {
    nodes: [
      {
        host: server.host,
        port: server.port || (server.protocol === "https" ? 443 : 8108),
        protocol: server.protocol || "https",
        path: server.path,
      },
    ],
    apiKey: server.apiKey,
    connectionTimeoutSeconds: options?.connectionTimeoutSeconds,
    numRetries: options?.numRetries,
  };
}
