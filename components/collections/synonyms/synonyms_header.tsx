"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDialog } from "@/components/dialogs/dialog_provider";
import { DocumentationLinks } from "@/config/documentaion_links";
import ResourceReadmore from "@/components/shared/resource_readmore";

const SynonymsHeader = () => {
  const { showCreateSynonymDialog } = useDialog();
  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle className="font-mono">Synonyms</CardTitle>
        <CardDescription className="font-mono text-balance max-w-lg leading-relaxed">
          Synonyms allow you to define search terms that should be considered
          equivalent.
          <ResourceReadmore link={DocumentationLinks.synonyms} />
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          className="font-mono"
          onClick={() => {
            showCreateSynonymDialog(true);
          }}
        >
          Create A Synonym
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SynonymsHeader;
