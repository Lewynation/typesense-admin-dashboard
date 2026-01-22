import z from "zod";

export const ExportCollectionSchema = z
  .object({
    filterBy: z.string().optional(),
    excludeFields: z.array(z.string()).optional(),
    includeFields: z.array(z.string()).optional(),
  })
  .refine(
    (data) => {
      const inc = new Set(data.includeFields);
      return !data.excludeFields?.some((item) => inc.has(item));
    },
    {
      message: "Included Fields and Excluded Fields are disjoint",
      path: ["excludeFields"],
    },
  );

export type ExportCollectionFormFields = z.infer<typeof ExportCollectionSchema>;
