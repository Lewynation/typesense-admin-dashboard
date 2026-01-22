import z from "zod";

export const CloneCollectionSchema = z.object({
  newCollectionName: z.string().nonempty(),
});

export type CloneCollectionSchemaFormFields = z.infer<
  typeof CloneCollectionSchema
>;
