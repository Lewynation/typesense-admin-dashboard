import z from "zod";

export const CollectionImportActionSchema = z.enum([
  "create",
  "upsert",
  "update",
  "emplace",
]);

export type CollectionImportAction = z.infer<
  typeof CollectionImportActionSchema
>;

export const CollectionImportDealingWithDirtyDataSchema = z.enum([
  "coerce_or_reject",
  "coerce_or_drop",
  "drop",
  "reject",
]);

export type CollectionImportDealingWithDirtyData = z.infer<
  typeof CollectionImportDealingWithDirtyDataSchema
>;
