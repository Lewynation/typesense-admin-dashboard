import { APIError, betterAuth } from "better-auth";
import Database from "better-sqlite3";
import { nextCookies } from "better-auth/next-js";
import { typesensePlugin } from "../better_auth_plugins/typesense_plugin/typesense_plugin.server";
import {
  SQLITE_DB_PATH,
  DATABASE_ADAPTER,
  DISABLE_REGISTRATION,
} from "../envs";
import { createAuthMiddleware } from "better-auth/api";
import typesense from "@/typesense/instance";

export const auth = betterAuth({
  database:
    DATABASE_ADAPTER === "memory" ? undefined : new Database(SQLITE_DB_PATH),
  emailAndPassword: {
    enabled: true,
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        if (DISABLE_REGISTRATION) {
          const userCount = await ctx.context.adapter.count({ model: "user" });
          if (userCount > 0) {
            throw new APIError("FORBIDDEN", {
              message: "New User Registration disabled",
            });
          }
        }
      }
      if (
        ctx.path === "/typesense/update/:id" ||
        ctx.path === "/typesense/delete/:id"
      ) {
        const params = JSON.parse(JSON.stringify(ctx.params)) as { id: string };
        typesense.deleteInstane(params.id);
      }
    }),
  },
  plugins: [typesensePlugin(), nextCookies()],
});

/**
 * Generate migrations and migrate sqlite db
 *
 * npx @better-auth/cli@latest generate --config=./auth/server.ts
 * npx @better-auth/cli@latest migrate --config=./auth/server.ts
 */
