import type { BetterAuthClientPlugin } from "better-auth/client";
import type { typesensePlugin } from "./typesense_plugin.server";
import type { BetterFetchOption } from "@better-fetch/fetch";

export const typesensePluginClient = () => {
  return {
    id: "typesense-management",
    $InferServerPlugin: {} as ReturnType<typeof typesensePlugin>,

    getActions: ($fetch) => {
      return {
        /**
         * Create a new Typesense server configuration
         * @param data - Server configuration details
         */
        createTypesenseServer: async (
          data: {
            name: string;
            protocol?: "http" | "https";
            host: string;
            port?: number;
            path?: string;
            apiKey: string;
          },
          fetchOptions?: BetterFetchOption
        ) => {
          const res = await $fetch<{
            success: boolean;
            server: {
              id: string;
              userId: string;
              name: string;
              protocol?: "http" | "https";
              host: string;
              port?: number;
              path?: string;
              apiKey: string;
              createdAt: Date;
              updatedAt: Date;
            };
          }>("/typesense/create", {
            method: "POST",
            body: data,
            ...fetchOptions,
          });

          return res;
        },

        /**
         * Get a single Typesense server configuration by ID
         * @param id - Server configuration ID
         */
        getTypesenseServer: async (
          id: string,
          fetchOptions?: BetterFetchOption
        ) => {
          const res = await $fetch<{
            success: boolean;
            server: {
              id: string;
              userId: string;
              name: string;
              protocol?: "http" | "https";
              host: string;
              port?: number;
              path?: string;
              apiKey: string;
              createdAt: Date;
              updatedAt: Date;
            };
          }>(`/typesense/get/${id}`, {
            method: "GET",
            ...fetchOptions,
          });

          return res;
        },

        /**
         * Get all Typesense server configurations for the current user
         */
        getAllTypesenseServers: async (fetchOptions?: BetterFetchOption) => {
          const res = await $fetch<{
            success: boolean;
            servers: Array<{
              id: string;
              userId: string;
              name: string;
              protocol?: "http" | "https";
              host: string;
              port?: number;
              path?: string;
              apiKey: string;
              createdAt: Date;
              updatedAt: Date;
            }>;
            count: number;
          }>("/typesense/get-all", {
            method: "GET",
            ...fetchOptions,
          });

          return res;
        },

        /**
         * Update a Typesense server configuration
         * @param id - Server configuration ID
         * @param data - Fields to update
         */
        updateTypesenseServer: async (
          id: string,
          data: {
            name?: string;
            protocol?: "http" | "https";
            host?: string;
            port?: number;
            path?: string;
            apiKey?: string;
          },
          fetchOptions?: BetterFetchOption
        ) => {
          const res = await $fetch<{
            success: boolean;
            server: {
              id: string;
              userId: string;
              name: string;
              protocol?: "http" | "https";
              host: string;
              port?: number;
              path?: string;
              apiKey: string;
              createdAt: Date;
              updatedAt: Date;
            };
          }>(`/typesense/update/${id}`, {
            method: "PATCH",
            body: data,
            ...fetchOptions,
          });

          return res;
        },

        /**
         * Delete a single Typesense server configuration
         * @param id - Server configuration ID
         */
        deleteTypesenseServer: async (
          id: string,
          fetchOptions?: BetterFetchOption
        ) => {
          const res = await $fetch<{
            success: boolean;
            message: string;
          }>(`/typesense/delete/${id}`, {
            method: "DELETE",
            ...fetchOptions,
          });

          return res;
        },

        /**
         * Delete all Typesense server configurations for the current user
         */
        deleteAllTypesenseServers: async (fetchOptions?: BetterFetchOption) => {
          const res = await $fetch<{
            success: boolean;
            message: string;
          }>("/typesense/delete-all", {
            method: "DELETE",
            ...fetchOptions,
          });

          return res;
        },
      };
    },
  } satisfies BetterAuthClientPlugin;
};
