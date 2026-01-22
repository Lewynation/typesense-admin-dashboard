import { z } from "zod";
import { ExpiryDurationSchema } from "./enums/expiry_duration";

export const CreateAdminApiKeySchema = z.object({
  description: z.string().nonempty(),
  expiration: ExpiryDurationSchema,
});

export type CreateAdminApiKeyFormFields = z.infer<
  typeof CreateAdminApiKeySchema
>;

export const CreateSearchApiKeyFormSchema = z.object({
  collections: z.array(z.string()),
  expiration: ExpiryDurationSchema,
  description: z.string().nonempty(),
});

export type CreateSearchApiKeyFormFields = z.infer<
  typeof CreateSearchApiKeyFormSchema
>;
