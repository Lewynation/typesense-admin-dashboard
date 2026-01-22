import z from "zod";

export const CreateAliasSchema = z.object({
  aliasName: z.string().nonempty(),
  collectionName: z.string().nonempty(),
});

export type CreateAliasFormFields = z.infer<typeof CreateAliasSchema>;
