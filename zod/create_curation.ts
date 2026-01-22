import z from "zod";

export const CreateOverrideSchema = z.object({
  override: z.unknown(),
  id: z.string().nonempty(),
});

export type CreateOverrideFormFields = z.infer<typeof CreateOverrideSchema>;
