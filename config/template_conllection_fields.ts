import { CreateCollectionField } from "@/zod/create_collection";

export const querySuggestionCollectionFields: CreateCollectionField[] = [
  {
    name: "q",
    fieldType: "string",
  },
  {
    name: "count",
    fieldType: "int32",
  },
];

export const queryAnalyticsWithMetaFieldsCollectionFields: CreateCollectionField[] =
  [
    {
      name: "q",
      fieldType: "string",
    },
    {
      name: "count",
      fieldType: "int32",
    },
    {
      name: "filter_by",
      fieldType: "string",
    },
    {
      name: "analytics_tag",
      fieldType: "string",
    },
  ];

export const noHitsQueriesCollectionFields: CreateCollectionField[] = [
  {
    name: "q",
    fieldType: "string",
  },
  {
    name: "count",
    fieldType: "int32",
  },
];

export const ragConversationHistoryCollectionFields: CreateCollectionField[] = [
  {
    name: "conversation_id",
    fieldType: "string",
  },
  {
    name: "model_id",
    fieldType: "string",
  },
  {
    name: "timestamp",
    fieldType: "int32",
  },
  {
    name: "role",
    fieldType: "string",
    index: false,
  },
  {
    name: "message",
    fieldType: "string",
    index: false,
  },
];
