import { Button } from "@/components/ui/button";
import { removeKeys } from "@/lib/remove_keys_from_object";
import { Pencil, Trash } from "lucide-react";
import { Highlight } from "react-instantsearch";

const HitComponent = ({
  hit,
  keys,
  handleDocumentDelete,
  handleDocumentEdit,
}: {
  hit: any;
  keys: Record<"inSchema" | "notInSchema", string[]>;
  handleDocumentEdit: (
    show: boolean,
    document: string,
    documentId: string,
  ) => void;
  handleDocumentDelete: (show: boolean, documentId: string) => void;
}) => {
  // Check if a field has highlight data
  const hasHighlightData = (fieldPath: string, hit: any): boolean => {
    const parts = fieldPath.split(/\.|\[|\]/).filter(Boolean);
    let current = hit._highlightResult;

    for (const part of parts) {
      if (!current || !current[part]) return false;
      current = current[part];
    }

    return (
      current &&
      (current.value !== undefined || current.matchLevel !== undefined)
    );
  };

  // Recursive component to render values with proper highlighting
  const RenderValue = ({
    value,
    fieldPath,
    hit,
    depth = 0,
  }: {
    value: any;
    fieldPath: string;
    hit: any;
    depth?: number;
  }) => {
    // Primitive string - use Highlight if available, otherwise plain value
    if (typeof value === "string") {
      if (hasHighlightData(fieldPath, hit)) {
        return (
          <Highlight
            attribute={fieldPath}
            hit={hit}
            classNames={{
              highlighted: "bg-yellow-200 font-semibold px-0.5 rounded",
            }}
          />
        );
      }
      return <span>{value}</span>;
    }

    // Primitive non-string (number, boolean, null)
    if (
      value === null ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      return <span>{JSON.stringify(value)}</span>;
    }

    // Array
    if (Array.isArray(value)) {
      return (
        <div className="flex flex-col gap-1 mt-1">
          {value.map((item, index) => (
            <div key={index} className="flex gap-2 ml-4">
              <span className="text-muted-foreground shrink-0">-</span>
              <div className="flex-1">
                <RenderValue
                  value={item}
                  fieldPath={`${fieldPath}.${index}`}
                  hit={hit}
                  depth={depth + 1}
                />
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Object
    if (typeof value === "object") {
      return (
        <div className="flex flex-col gap-1 mt-1 ml-4">
          {Object.entries(value).map(([key, val], index) => (
            <div key={index} className="flex gap-3">
              <p className="font-semibold font-mono text-sm shrink-0">{key}</p>
              <p className="shrink-0">:</p>
              <div className="flex-1 min-w-0">
                <RenderValue
                  value={val}
                  fieldPath={`${fieldPath}.${key}`}
                  hit={hit}
                  depth={depth}
                />
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Fallback
    return <span>{JSON.stringify(value)}</span>;
  };

  return (
    <div className="flex flex-col w-full gap-1 px-3 py-3 my-3 bg-card rounded-md">
      <div>
        {keys.notInSchema
          .filter((k) => !["text_match_info", "text_match"].includes(k))
          .map((field, index) => {
            const isComplex =
              typeof hit[field] === "object" && hit[field] !== null;

            return (
              <div key={index} className="flex flex-col gap-0 my-2">
                <div className="flex gap-3">
                  <p className="font-semibold font-mono shrink-0">{field}</p>
                  <p className="shrink-0">:</p>
                  {!isComplex && (
                    <div className="font-mono break-all flex-1 min-w-0">
                      <RenderValue
                        value={hit[field]}
                        fieldPath={field}
                        hit={hit}
                      />
                    </div>
                  )}
                </div>
                {isComplex && (
                  <div className="font-mono break-all">
                    <RenderValue
                      value={hit[field]}
                      fieldPath={field}
                      hit={hit}
                    />
                  </div>
                )}
              </div>
            );
          })}
      </div>
      <div>
        {keys.inSchema
          .filter((k) => !["text_match", "objectID"].includes(k))
          .map((field, index) => {
            const isComplex =
              typeof hit[field] === "object" && hit[field] !== null;

            return (
              <div key={index} className="flex flex-col gap-0 my-2">
                <div className="flex gap-3">
                  <p className="font-semibold font-mono shrink-0">{field}</p>
                  <p className="shrink-0">:</p>
                  {!isComplex && (
                    <div className="font-mono break-all flex-1 min-w-0">
                      <RenderValue
                        value={hit[field]}
                        fieldPath={field}
                        hit={hit}
                      />
                    </div>
                  )}
                </div>
                {isComplex && (
                  <div className="font-mono break-all">
                    <RenderValue
                      value={hit[field]}
                      fieldPath={field}
                      hit={hit}
                    />
                  </div>
                )}
              </div>
            );
          })}
      </div>
      <div className="flex gap-3">
        <Button
          variant="outline"
          className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 hover:text-foreground text-muted-foreground`}
          onClick={() => {
            handleDocumentEdit(
              true,
              JSON.stringify(
                removeKeys(hit, [
                  "objectID",
                  "__position",
                  "_highlightResult",
                  "_rawTypesenseHit",
                  "_snippetResult",
                  "text_match_info",
                  "text_match",
                ]),
                null,
                2,
              ),
              hit.documentID ?? hit.id,
            );
          }}
        >
          <Pencil className="h-5 w-5" />
          <span className="sr-only">Edit</span>
        </Button>
        <Button
          variant="outline"
          className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 hover:text-foreground text-muted-foreground`}
          onClick={() => {
            handleDocumentDelete(true, hit.documentID ?? hit.id);
          }}
        >
          <Trash className="text-destructive h-5 w-5" />
          <span className="sr-only">Delete</span>
        </Button>
      </div>
    </div>
  );
};

export default HitComponent;
