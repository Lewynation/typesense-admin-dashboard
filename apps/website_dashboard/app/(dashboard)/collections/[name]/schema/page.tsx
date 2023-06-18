import EditorView from "@/components/pages/dashboard/collections/collection_subroute_pages/schema/editor";
import React from "react";

const Schema = ({ params }: { params: { name: string } }) => {
  return (
    <div>
      <EditorView schemaName={params.name} />
    </div>
  );
};

export default Schema;
