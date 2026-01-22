import { z } from "zod";

export const ExpiryDurationSchema = z.enum([
  "7days",
  "30days",
  "60days",
  "90days",
  "NoExpiration",
]);

export type ExpiryDuration = z.infer<typeof ExpiryDurationSchema>;
