import React from "react";
import EditorView from "./editor";
import { AuthenticationCheckWrapper } from "@/components/shared";

interface SchemaProps {
  schemaName: string;
}

const SchemaView: React.FC<SchemaProps> = ({ schemaName }) => {
  return (
    <AuthenticationCheckWrapper>
      <EditorView schemaName={schemaName} />
    </AuthenticationCheckWrapper>
  );
};

export default SchemaView;
