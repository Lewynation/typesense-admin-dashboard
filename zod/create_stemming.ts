import z from "zod";

export const CreateStemmingSchema = z.object({
  preset: z.unknown(),
  //   id: z.string().nonempty(),
});

export type CreateStemmingFormFields = z.infer<typeof CreateStemmingSchema>;
