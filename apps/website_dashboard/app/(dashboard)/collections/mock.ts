import { CollectionSchema } from "typesense/lib/Typesense/Collection";

export const collectionData: CollectionSchema[] = [
  {
    name: "books",
    created_at: 1675689600,
    num_documents: 10000,
    num_memory_shards: 4,
    default_sorting_field: "publication_year",
    enable_nested_fields: true,
    fields: [
      {
        name: "id",
        type: "string",
        optional: false,
      },
      {
        name: "title",
        type: "string",
        optional: false,
      },
      {
        name: "author",
        type: "string",
        optional: false,
      },
      {
        name: "publication_year",
        type: "int32",
        optional: true,
      },
      {
        name: "genres",
        type: "string[]",
        optional: true,
      },
      {
        name: "rating",
        type: "float",
        optional: true,
      },
    ],
    symbols_to_index: ["@", "$"],
    token_separators: [".", ","],
  },
  {
    name: "users",
    created_at: 1675693200,
    num_documents: 5000,
    num_memory_shards: 2,
    default_sorting_field: "name",
    enable_nested_fields: false,
    fields: [
      {
        name: "id",
        type: "string",
        optional: false,
      },
      {
        name: "name",
        type: "string",
        optional: false,
      },
      {
        name: "email",
        type: "string",
        optional: false,
      },
      {
        name: "age",
        type: "int32",
        optional: true,
      },
      {
        name: "address",
        type: "string",
        optional: true,
      },
    ],
    symbols_to_index: ["!", "#"],
    token_separators: [",", ";"],
  },
  {
    name: "products",
    created_at: 1675696800,
    num_documents: 8000,
    num_memory_shards: 3,
    default_sorting_field: "price",
    enable_nested_fields: true,
    fields: [
      {
        name: "id",
        type: "string",
        optional: false,
      },
      {
        name: "name",
        type: "string",
        optional: false,
      },
      {
        name: "price",
        type: "float",
        optional: false,
      },
      {
        name: "description",
        type: "string",
        optional: true,
      },
      {
        name: "category",
        type: "string",
        optional: true,
      },
    ],
    symbols_to_index: ["$", "%"],
    token_separators: [";", ":"],
  },
];
