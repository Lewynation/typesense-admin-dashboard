import { KeySchema } from "typesense/lib/Typesense/Key";

export const mockAPIKeys: KeySchema[] = [
  {
    id: 1,
    actions: ["documents:search", "documents:read"],
    collections: ["books"],
    description: "Key for search and read operations on the books collection",
    expires_at: 1769891200,
    value: "your-key-value-1",
  },
  {
    id: 2,
    actions: ["documents:search", "documents:read", "documents:write"],
    collections: ["books", "users"],
    description:
      "Key for search, read, and write operations on the books and users collections",
    expires_at: 1769912800,
    value: "your-key-value-2",
  },
  {
    id: 3,
    actions: ["documents:search"],
    collections: ["users"],
    description: "Key for search operations on the users collection",
    value: "your-key-value-3",
  },
];
