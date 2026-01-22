import { auth } from "./auth/server";
import { getMigrations } from "better-auth/db";

export async function register() {
  try {
    const { toBeCreated, toBeAdded, runMigrations } = await getMigrations(
      auth.options,
    );
    if (toBeCreated.length === 0 && toBeAdded.length === 0) {
      const dbInSyncData = { message: "No migrations needed" };
      console.log(dbInSyncData);
      return dbInSyncData;
    }
    await runMigrations();
    const creationData = {
      message: "Migrations completed successfully",
      created: toBeCreated.map((t) => t.table),
      added: toBeAdded.map((t) => t.table),
    };
    console.log(creationData);
    return creationData;
  } catch (error) {
    const errorData = {
      error: error instanceof Error ? error.message : String(error),
    };
    console.log(errorData);
    return errorData;
  }
}
