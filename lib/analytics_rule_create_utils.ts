import { CreateAnalyticsRuleField } from "@/zod/create_analytics_rule";
import { AnalyticsRuleCreateSchema } from "typesense/lib/Typesense/AnalyticsRule";

export const generateAnalyticsRuleCreateSchemaFromZodModel = (
  zodModel: CreateAnalyticsRuleField,
): AnalyticsRuleCreateSchema => {
  return {
    type: zodModel.type,
    params: {
      limit: zodModel.limit,
      expand_query: zodModel.expand_query,
      enable_auto_aggregation: zodModel.enable_auto_aggregation,
      destination: {
        collection: zodModel.destination.collection,
        counter_field: zodModel.destination.counter_field,
      },
      source: {
        collections: zodModel.source.collections,
        events: zodModel.source.events,
      },
      ...{ meta_fields: zodModel.meta_fields }, //
    },
  };
};
