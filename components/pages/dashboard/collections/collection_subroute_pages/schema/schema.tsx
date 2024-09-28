import React from "react";
import EditorView from "./editor";

interface SchemaProps {
  schemaName: string;
}

const SchemaView: React.FC<SchemaProps> = ({ schemaName }) => {
  return <EditorView schemaName={schemaName} />;
};

export default SchemaView;
