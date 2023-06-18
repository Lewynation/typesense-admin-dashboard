const nodes = [
  {
    value: "collections",
    label: "Collections",
    parentDescription: "Allow all kinds of collection related operations.",
    children: [
      {
        value: "collections:create",
        label: "collections:create",
        description: "Allows a collection to be created.",
      },
      {
        value: "collections:delete",
        label: "collections:delete",
        description: "Allows a collection to be deleted.",
      },
      {
        value: "collections:get",
        label: "collections:get",
        description: "Allows a collection schema to be retrieved.",
      },
      {
        value: "collections:list",
        label: "collections:list",
        description: "Allows retrieving all collection schema.",
      },
    ],
  },
  {
    value: "documents",
    label: "Documents",
    parentDescription: "Allows all document operations.",
    children: [
      {
        value: "documents:search",
        label: "documents:search",
        description: "Allows only search requests.",
      },
      {
        value: "documents:get",
        label: "documents:get",
        description: "Allows fetching a single document.",
      },
      {
        value: "documents:create",
        label: "documents:create",
        description: "Allows creating documents.",
      },
      {
        value: "documents:upsert",
        label: "documents:upsert",
        description: "Allows upserting documents.",
      },
      {
        value: "documents:update",
        label: "documents:update",
        description: "Allows updating documents.",
      },
      {
        value: "documents:delete",
        label: "documents:delete",
        description: "Allows deletion of documents.",
      },
      {
        value: "documents:import",
        label: "documents:import",
        description: "Allows import of documents in bulk.",
      },
    ],
  },
  {
    value: "aliases",
    label: "Aliases",
    parentDescription: "Allows all alias operations.",
    children: [
      {
        value: "aliases:list",
        label: "aliases:list",
        description: "Allows all aliases to be fetched.",
      },
      {
        value: "aliases:get",
        label: "aliases:get",
        description: "	Allows a single alias to be retrieved",
      },
      {
        value: "aliases:create",
        label: "aliases:create",
        description: "	Allows the creation of aliases.",
      },
      {
        value: "aliases:delete",
        label: "aliases:delete",
        description: "	Allows the deletion of aliases.",
      },
    ],
  },
  {
    value: "synonyms",
    label: "Synonyms",
    parentDescription: "Allows all synonym operations.",
    children: [
      {
        value: "synonyms:list",
        label: "synonyms:list",
        description: "Allows all synonyms to be fetched.",
      },
      {
        value: "synonyms:get",
        label: "synonyms:get",
        description: "Allows a single synonym to be retrieved",
      },
      {
        value: "synonyms:create",
        label: "synonyms:create",
        description: "Allows the creation of synonyms.",
      },
      {
        value: "synonyms:delete",
        label: "synonyms:delete",
        description: "Allows the deletion of synonyms.",
      },
    ],
  },
  {
    value: "overrides",
    label: "Overrides",
    parentDescription: "Allows all override operations.",
    children: [
      {
        value: "overrides:list",
        label: "overrides:list",
        description: "	Allows all overrides to be fetched.",
      },
      {
        value: "overrides:get",
        label: "overrides:get",
        description: "Allows a single override to be retrieved",
      },
      {
        value: "overrides:create",
        label: "overrides:create",
        description: "Allows the creation of overrides.",
      },
      {
        value: "overrides:delete",
        label: "overrides:delete",
        description: "	Allows the deletion of overrides.",
      },
    ],
  },
  {
    value: "keys",
    label: "Keys",
    parentDescription: "Allows all API Key related operations.",
    children: [
      {
        value: "keys:list",
        label: "keys:list",
        description: "Allows fetching of metadata for all keys",
      },
      {
        value: "keys:get",
        label: "keys:get",
        description: "	Allows metadata for a single key to be fetched",
      },
      {
        value: "keys:create",
        label: "keys:create",
        description: "Allows the creation of API keys.",
      },
      {
        value: "keys:delete",
        label: "keys:delete",
        description: "Allows the deletion of API keys.",
      },
    ],
  },
  {
    value: "misc",
    label: "Misc",
    parentDescription: "Allows these admin operations.",
    children: [
      {
        value: "metrics.json:list",
        label: "metrics.json:list",
        description: "Allows access to the metrics endpoint.",
      },
      {
        value: "debug:list",
        label: "debug:list",
        description: "	Allows access to the /debug endpoint.",
      },
    ],
  },
];
export default nodes;
