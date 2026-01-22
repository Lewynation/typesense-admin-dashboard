import z from "zod";

export const CreateSearchPresetSchema = z.object({
  preset: z.unknown(),
  id: z.string().nonempty(),
});

export type CreateSearchPresetFormFields = z.infer<
  typeof CreateSearchPresetSchema
>;
