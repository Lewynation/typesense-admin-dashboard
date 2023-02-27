export interface Collection {
  collectionName: string;
  collectionDocuments: number;
  collectionSchemaFields: number;
  collectionCreatedAt: string;
}

export const collectionTempData: Collection[] = [
  {
    collectionName: "Clients",
    collectionCreatedAt: "23rd Nov,2018",
    collectionDocuments: 234,
    collectionSchemaFields: 23,
  },
  {
    collectionName: "Users",
    collectionCreatedAt: "23rd Nov,2018",
    collectionDocuments: 234,
    collectionSchemaFields: 23,
  },
  {
    collectionName: "Books",
    collectionCreatedAt: "23rd Nov,2018",
    collectionDocuments: 234,
    collectionSchemaFields: 23,
  },
  {
    collectionName: "Travelers",
    collectionCreatedAt: "23rd Nov,2018",
    collectionDocuments: 234,
    collectionSchemaFields: 23,
  },
  {
    collectionName: "Shopping records",
    collectionCreatedAt: "23rd Nov,2018",
    collectionDocuments: 234,
    collectionSchemaFields: 23,
  },
  {
    collectionName: "Distributions",
    collectionCreatedAt: "23rd Nov,2018",
    collectionDocuments: 234,
    collectionSchemaFields: 23,
  },
];
