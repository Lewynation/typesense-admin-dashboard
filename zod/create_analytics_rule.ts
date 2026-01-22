import z from "zod";

export const AnalyticsRuleEventSchema = z.object({
  type: z.string().nonempty(),
  name: z.string().nonempty(),
  weight: z.number().optional(),
});

export type AnalyticsRuleEvent = z.infer<typeof AnalyticsRuleEventSchema>;

export const AnalyticsRuleTypeSchema = z.enum([
  "popular_queries",
  "nohits_queries",
  "counter",
  "log",
]);

export const CreateAnalyticsRuleFieldSchema = z.object({
  type: AnalyticsRuleTypeSchema,
  name: z.string().nonempty(),
  enable_auto_aggregation: z.boolean().optional(),
  source: z.object({
    collections: z.array(z.string()).nonempty(),
    events: z.array(AnalyticsRuleEventSchema).optional(),
  }),
  expand_query: z.boolean().optional(),
  meta_fields: z.array(z.string()).optional(),
  destination: z.object({
    collection: z.string().nonempty(),
    counter_field: z.string().optional(),
  }),
  limit: z.number().optional(),
});

export type CreateAnalyticsRuleField = z.infer<
  typeof CreateAnalyticsRuleFieldSchema
>;
