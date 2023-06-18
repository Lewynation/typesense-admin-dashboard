"use client";
import React from "react";
import { Editor } from "@monaco-editor/react";
import { BarLoaderSpinner } from "ui";
import { useSchema } from "@/hooks";

interface EditorViewProps {
  schemaName: string;
}

const EditorView: React.FC<EditorViewProps> = ({ schemaName }) => {
  const { schema, loading } = useSchema(schemaName);

  return (
    <div className="mt-3">
      {!loading && (
        <Editor
          className="z-10"
          height="80vh"
          defaultLanguage="json"
          defaultValue={JSON.stringify(schema, null, 2)}
          loading={<BarLoaderSpinner />}
          theme="light" // light, vs-dark, hc-black
        />
      )}
    </div>
  );
};

export default EditorView;
