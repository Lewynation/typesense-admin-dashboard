import z from "zod";

const DatabaseAdapterSchema = z.enum(["memory", "sqlite"]);

export const SQLITE_DB_PATH =
  process.env.SQLITE_DB_PATH || "/app/data/database.sqlite";
export const DATABASE_ADAPTER = DatabaseAdapterSchema.catch("sqlite").parse(
  process.env.DATABASE_ADAPTER,
);
export const DISABLE_REGISTRATION =
  process.env.DISABLE_REGISTRATION != undefined
    ? Boolean(process.env.DISABLE_REGISTRATION)
    : false;
