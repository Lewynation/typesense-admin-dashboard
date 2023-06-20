const initialState = [
  {
    value: "Collections",
    selected: false,
    children: [
      {
        value: "collections:create",
        enabledBySelf: false,
        enabledByTitle: false,
      },
      {
        value: "collections:delete",
        enabledBySelf: false,
        enabledByTitle: false,
      },
      {
        value: "collections:get",
        enabledBySelf: false,
        enabledByTitle: false,
      },
      {
        value: "collections:list",
        enabledBySelf: false,
        enabledByTitle: false,
      },
    ],
  },
  {
    value: "Documents",
    selected: false,
    children: [
      {
        value: "documents:search",
        enabledBySelf: false,
        enabledByTitle: false,
      },
      {
        value: "documents:get",
        enabledBySelf: false,
        enabledByTitle: false,
      },
      {
        value: "documents:create",
        enabledBySelf: false,
        enabledByTitle: false,
      },
      {
        value: "documents:upsert",
        enabledBySelf: false,
        enabledByTitle: false,
      },
      {
        value: "documents:update",
        enabledBySelf: false,
        enabledByTitle: false,
      },
      {
        value: "documents:delete",
        enabledBySelf: false,
        enabledByTitle: false,
      },
      {
        value: "documents:import",
        enabledBySelf: false,
        enabledByTitle: false,
      },
    ],
  },
  {
    value: "Aliases",
    selected: false,
    children: [
      {
        value: "aliases:list",
        enabledBySelf: false,
        enabledByTitle: false,
      },
      {
        value: "aliases:get",
        enabledBySelf: false,
        enabledByTitle: false,
      },
      {
        value: "aliases:create",
        enabledBySelf: false,
        enabledByTitle: false,
      },
      {
        value: "aliases:delete",
        enabledBySelf: false,
        enabledByTitle: false,
      },
    ],
  },
  {
    value: "Synonyms",
    selected: false,
    children: [
      {
        value: "synonyms:list",
        enabledBySelf: false,
        enabledByTitle: false,
      },
      {
        value: "synonyms:get",
        enabledBySelf: false,
        enabledByTitle: false,
      },
      {
        value: "synonyms:create",
        enabledBySelf: false,
        enabledByTitle: false,
      },
      {
        value: "synonyms:delete",
        enabledBySelf: false,
        enabledByTitle: false,
      },
    ],
  },
  {
    value: "Overrides",
    selected: false,
    children: [
      {
        value: "overrides:list",
        enabledBySelf: false,
        enabledByTitle: false,
      },
      {
        value: "overrides:get",
        enabledBySelf: false,
        enabledByTitle: false,
      },
      {
        value: "overrides:create",
        enabledBySelf: false,
        enabledByTitle: false,
      },
      {
        value: "overrides:delete",
        enabledBySelf: false,
        enabledByTitle: false,
      },
    ],
  },
  {
    value: "Keys",
    selected: false,
    children: [
      {
        value: "keys:list",
        enabledBySelf: false,
        enabledByTitle: false,
      },
      {
        value: "keys:get",
        enabledBySelf: false,
        enabledByTitle: false,
      },
      {
        value: "keys:create",
        enabledBySelf: false,
        enabledByTitle: false,
      },
      {
        value: "keys:delete",
        enabledBySelf: false,
        enabledByTitle: false,
      },
    ],
  },
  {
    value: "Misc",
    selected: false,
    children: [
      {
        value: "metrics.json:list",
        enabledBySelf: false,
        enabledByTitle: false,
      },
      {
        value: "debug:list",
        enabledBySelf: false,
        enabledByTitle: false,
      },
    ],
  },
];
export default initialState;
