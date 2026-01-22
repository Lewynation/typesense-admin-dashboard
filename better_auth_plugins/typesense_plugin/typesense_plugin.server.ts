import type { BetterAuthPlugin } from "better-auth";
import { createAuthEndpoint, sessionMiddleware } from "better-auth/api";
import { APIError } from "better-auth/api";
import { z } from "zod";
import { TypesenseServer } from "./typings";

/**
 * Typesense Server Management Plugin for Better Auth
 *
 * Features:
 * - Store Typesense server configurations securely
 * - Retrieve single or all server configs
 * - Update existing configurations
 * - Delete single or all configurations
 * - Track creator of each configuration
 * - Automatic timestamps for audit trail
 */
export const typesensePlugin = () => {
  return {
    id: "typesense-management",
    schema: {
      typesenseServer: {
        modelName: "typesenseServer",
        fields: {
          userId: {
            type: "string",
            required: true,
            references: {
              model: "user",
              field: "id",
              onDelete: "cascade",
            },
          },
          name: {
            type: "string",
            required: true,
          },
          protocol: {
            type: "string",
            required: false,
            defaultValue: "https",
          },
          host: {
            type: "string",
            required: true,
          },
          port: {
            type: "number",
            required: false,
          },
          path: {
            type: "string",
            required: false,
          },
          apiKey: {
            type: "string",
            required: true,
          },
          createdAt: {
            type: "date",
            required: true,
          },
          updatedAt: {
            type: "date",
            required: false,
          },
        },
      },
    },

    endpoints: {
      createTypesenseServer: createAuthEndpoint(
        "/typesense/create",
        {
          method: "POST",
          body: z.object({
            name: z.string().min(1, "Name is required"),
            protocol: z.enum(["http", "https"]).optional().default("https"),
            host: z.string().min(1, "Host is required"),
            port: z.number().positive().optional(),
            path: z.string().optional(),
            apiKey: z.string().min(1, "API key is required"),
          }),
          use: [sessionMiddleware],
          requireHeaders: true,
        },
        async (ctx) => {
          const { name, protocol, host, port, path, apiKey } = ctx.body;
          const session = ctx.context.session;
          const user = session.user;

          const existing = await ctx.context.adapter.findOne({
            model: "typesenseServer",
            where: [
              { field: "userId", value: user.id },
              { field: "name", value: name },
            ],
          });

          if (existing) {
            throw new APIError("BAD_REQUEST", {
              message: "A server configuration with this name already exists.",
            });
          }

          const now = new Date();

          const server = await ctx.context.adapter.create<TypesenseServer>({
            model: "typesenseServer",
            data: {
              userId: user.id,
              name,
              protocol,
              host,
              port,
              path,
              apiKey,
              createdAt: now,
              updatedAt: now,
            },
          });

          return ctx.json({
            success: true,
            server,
          });
        }
      ),

      getTypesenseServer: createAuthEndpoint(
        "/typesense/get/:id",
        {
          method: "GET",
          use: [sessionMiddleware],
          requireHeaders: true,
        },
        async (ctx) => {
          const session = ctx.context.session;
          const user = session.user;
          const serverId = ctx.params?.id;

          if (!serverId) {
            throw new APIError("BAD_REQUEST", {
              message: "Server ID is required.",
            });
          }

          // Get server configuration
          const server = await ctx.context.adapter.findOne<TypesenseServer>({
            model: "typesenseServer",
            where: [
              { field: "id", value: serverId },
              { field: "userId", value: user.id },
            ],
          });

          if (!server) {
            throw new APIError("NOT_FOUND", {
              message: "Server configuration not found.",
            });
          }

          return ctx.json({
            success: true,
            server,
          });
        }
      ),

      // Get all Typesense server configurations for the current user
      getAllTypesenseServers: createAuthEndpoint(
        "/typesense/get-all",
        {
          method: "GET",
          use: [sessionMiddleware],
          requireHeaders: true,
        },
        async (ctx) => {
          const session = ctx.context.session;
          const user = session.user;

          // Get all server configurations for this user
          const servers = await ctx.context.adapter.findMany<TypesenseServer>({
            model: "typesenseServer",
            where: [{ field: "userId", value: user.id }],
          });

          return ctx.json({
            success: true,
            servers: servers || [],
            count: servers?.length || 0,
          });
        }
      ),

      // Update a Typesense server configuration
      updateTypesenseServer: createAuthEndpoint(
        "/typesense/update/:id",
        {
          method: "PATCH",
          body: z.object({
            name: z.string().min(1).optional(),
            protocol: z.enum(["http", "https"]).optional(),
            host: z.string().min(1).optional(),
            port: z.number().positive().optional(),
            path: z.string().optional(),
            apiKey: z.string().min(1).optional(),
          }),
          use: [sessionMiddleware],
          requireHeaders: true,
        },
        async (ctx) => {
          const session = ctx.context.session;
          const user = session.user;
          const serverId = ctx.params?.id;

          if (!serverId) {
            throw new APIError("BAD_REQUEST", {
              message: "Server ID is required.",
            });
          }

          // Check if server exists and belongs to user
          const existing = await ctx.context.adapter.findOne<TypesenseServer>({
            model: "typesenseServer",
            where: [
              { field: "id", value: serverId },
              { field: "userId", value: user.id },
            ],
          });

          if (!existing) {
            throw new APIError("NOT_FOUND", {
              message: "Server configuration not found.",
            });
          }

          // If name is being changed, check for duplicates
          if (ctx.body.name && ctx.body.name !== existing.name) {
            const duplicate = await ctx.context.adapter.findOne({
              model: "typesenseServer",
              where: [
                { field: "userId", value: user.id },
                { field: "name", value: ctx.body.name },
              ],
            });

            if (duplicate) {
              throw new APIError("BAD_REQUEST", {
                message:
                  "A server configuration with this name already exists.",
              });
            }
          }

          // Update server configuration
          const updated = await ctx.context.adapter.update<TypesenseServer>({
            model: "typesenseServer",
            where: [
              { field: "id", value: serverId },
              { field: "userId", value: user.id },
            ],
            update: {
              ...ctx.body,
              updatedAt: new Date(),
            },
          });

          return ctx.json({
            success: true,
            server: updated,
          });
        }
      ),

      // Delete a single Typesense server configuration
      deleteTypesenseServer: createAuthEndpoint(
        "/typesense/delete/:id",
        {
          method: "DELETE",
          use: [sessionMiddleware],
          requireHeaders: true,
        },
        async (ctx) => {
          const session = ctx.context.session;
          const user = session.user;
          const serverId = ctx.params?.id;

          if (!serverId) {
            throw new APIError("BAD_REQUEST", {
              message: "Server ID is required.",
            });
          }

          // Check if server exists and belongs to user
          const existing = await ctx.context.adapter.findOne({
            model: "typesenseServer",
            where: [
              { field: "id", value: serverId },
              { field: "userId", value: user.id },
            ],
          });

          if (!existing) {
            throw new APIError("NOT_FOUND", {
              message: "Server configuration not found.",
            });
          }

          // Delete server configuration
          await ctx.context.adapter.delete({
            model: "typesenseServer",
            where: [
              { field: "id", value: serverId },
              { field: "userId", value: user.id },
            ],
          });

          return ctx.json({
            success: true,
            message: "Server configuration deleted successfully.",
          });
        }
      ),

      // Delete all Typesense server configurations for the current user
      deleteAllTypesenseServers: createAuthEndpoint(
        "/typesense/delete-all",
        {
          method: "DELETE",
          use: [sessionMiddleware],
          requireHeaders: true,
        },
        async (ctx) => {
          const session = ctx.context.session;
          const user = session.user;

          // Delete all server configurations for this user
          await ctx.context.adapter.deleteMany({
            model: "typesenseServer",
            where: [{ field: "userId", value: user.id }],
          });

          return ctx.json({
            success: true,
            message: "All server configurations deleted successfully.",
          });
        }
      ),
    },

    rateLimit: [
      {
        pathMatcher: (path) => path === "/typesense/create",
        window: 60,
        max: 10,
      },
      {
        pathMatcher: (path) => path.startsWith("/typesense/update/"),
        window: 60,
        max: 20,
      },
      {
        pathMatcher: (path) => path.startsWith("/typesense/delete/"),
        window: 60,
        max: 10,
      },
      {
        pathMatcher: (path) => path === "/typesense/delete-all",
        window: 300,
        max: 3,
      },
    ],
  } satisfies BetterAuthPlugin;
};
