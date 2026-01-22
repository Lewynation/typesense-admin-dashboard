import z from "zod";

export const CreateStopWordsSchema = z.object({
  id: z.string().nonempty(),
  stopwords: z.array(z.string()).nonempty(),
  locale: z.string().optional(),
});

export type CreateStopWordsFormFields = z.infer<typeof CreateStopWordsSchema>;
