"use client";
import React from "react";
import { Editor } from "@monaco-editor/react";
import { CircularSpinner, BarLoaderFullScreenWidth } from "@/components/ui";
import { useSchema } from "@/hooks";
import { ErrorComponent } from "@/components/shared/Error";

interface EditorViewProps {
  schemaName: string;
}

const EditorView: React.FC<EditorViewProps> = ({ schemaName }) => {
  const { schema, loading, error } = useSchema(schemaName);

  const CollectionSchemaComponent = error ? (
    <ErrorComponent error={error} />
  ) : (
    <Editor
      className="z-10"
      height="80vh"
      defaultLanguage="json"
      defaultValue={JSON.stringify(schema, null, 2)}
      loading={<CircularSpinner />}
      theme="light" // light, vs-dark, hc-black
    />
  );

  return (
    <div className="mt-3">
      {loading ? (
        <BarLoaderFullScreenWidth loading={loading} />
      ) : (
        CollectionSchemaComponent
      )}
    </div>
  );
};

export default EditorView;
