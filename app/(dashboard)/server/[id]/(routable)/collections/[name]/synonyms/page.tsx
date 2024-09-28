import {
  SynonymsPageAssembly,
  SynonymsHeader,
} from "@/components/pages/dashboard/collections/collection_subroute_pages/synonyms";
// import SynonymsHeader from "@/components/pages/dashboard/collections/collection_subroute_pages/synonyms/synonyms_header/synonyms_header";
import React from "react";

interface SynonymsProps {
  params: {
    name: string;
  };
}

const Synonyms: React.FC<SynonymsProps> = ({ params }) => {
  return (
    <div>
      <SynonymsHeader />
      <SynonymsPageAssembly collectionName={params.name} />
    </div>
  );
};

export default Synonyms;
