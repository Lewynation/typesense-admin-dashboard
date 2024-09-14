import { ITypesenseAuthData } from "@/dependencies";
import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";

interface ISortByList {
  label: string;
  value: string;
}

export class CollectionSchemaFieldManipulator {
  typesenseAdapter: TypesenseInstantsearchAdapter;

  constructor(
    private readonly collectionSchema: CollectionSchema,
    authData: ITypesenseAuthData
  ) {
    this.typesenseAdapter = new TypesenseInstantsearchAdapter({
      server: {
        apiKey: authData.apiKey,
        nodes: [
          {
            host: authData.host,
            port: authData.port,
            protocol: authData.protocol,
            path: authData.path,
          },
        ],
      },
      additionalSearchParameters: {
        exhaustive_search: true,
        query_by: this.getQueryBy(),
      },
    });
  }

  getSchemaName(): string {
    return this.collectionSchema.name;
  }

  getQueryBy = (): string => {
    return (
      this.collectionSchema.fields
        ?.filter((field) => {
          return (
            field.index &&
            ["string", "string[]"].includes(field.type) &&
            !field.name.includes(".*")
          );
        })
        .map((field) => field.name)
        .join(",") ?? ""
    );
  };

  getSortByList = (): ISortByList[] => {
    const sortBy = [{ label: "Default", value: this.collectionSchema.name }];

    this.collectionSchema.fields
      ?.filter((field) => {
        return (
          ["int32", "float"].includes(field.type) ||
          (field.type === "string" && field.sort)
        );
      })
      .forEach((field) => {
        if (!this.collectionSchema) return;

        sortBy.push({
          value: `${this.collectionSchema.name}/sort/${field.name}:asc`,
          label: `${field.name} asc`,
        });
        sortBy.push({
          value: `${this.collectionSchema.name}/sort/${field.name}:desc`,
          label: `${field.name} desc`,
        });
      });
    return sortBy;
  };

  getFacetedNumberFields = (): string[] => {
    return (
      this.collectionSchema.fields
        ?.filter((field) => {
          return (
            field.facet &&
            [
              "int32",
              "int64",
              "float",
              "int32[]",
              "int64[]",
              "float[]",
            ].includes(field.type) &&
            !field.name.includes(".*")
          );
        })
        .map((field) => field.name) ?? []
    );
  };

  getFacetedStringFields = (): string[] => {
    return (
      this.collectionSchema.fields
        ?.filter((field) => {
          return (
            field.facet &&
            ["string", "string[]"].includes(field.type) &&
            !field.name.includes(".*")
          );
        })
        .map((field) => field.name) ?? []
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getFields = (hit: any): Record<"inSchema" | "notInSchema", string[]> => {
    if (!hit || !this.collectionSchema)
      return { inSchema: [], notInSchema: [] };
    const schemaKeys = this.collectionSchema.fields
      ?.map((s) => s.name)
      .concat(["objectID", "text_match"]);
    const hitKeys = Object.keys(hit).filter((k) => {
      return !k.startsWith("_");
    });
    const filteredKeys = hitKeys.filter((k) => {
      return schemaKeys?.includes(k);
    });
    const notInSchema = hitKeys.filter((k) => {
      return !schemaKeys?.includes(k);
    });
    return {
      inSchema: filteredKeys,
      notInSchema: notInSchema,
    };
  };
}
