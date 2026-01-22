import z from "zod";

export const CreateSynonymSchema = z
  .object({
    id: z.string().nonempty(),
    rootV: z.string().optional(),
    synonyms: z.array(z.string()).nonempty(),
    locale: z.string().optional(),
    symbolsToIndex: z.array(z.string()).optional(),
    synonymType: z.enum(["oneWay", "multiWay"]),
  })
  .refine(
    (data) => {
      if (data.synonymType === "oneWay") {
        return !!data.rootV?.trim();
      }
      return true;
    },
    {
      message:
        "Root must be provided and non-empty when synonymType is 'oneWay'",
      path: ["rootV"],
    }
  );

export type CreateSynonymFormFields = z.infer<typeof CreateSynonymSchema>;
