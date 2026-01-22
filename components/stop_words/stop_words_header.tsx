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
import ResourceReadmore from "../shared/resource_readmore";
import { DocumentationLinks } from "@/config/documentaion_links";

const StopWordsHeader = () => {
  const { showCreateStopWordsDialog } = useDialog();
  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle className="font-mono">Stop Words</CardTitle>
        <CardDescription className="font-mono text-balance max-w-lg leading-relaxed">
          Stopwords are keywords which will be removed from search query while
          searching.
          <ResourceReadmore link={DocumentationLinks.stopWords} />
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          onClick={() => {
            showCreateStopWordsDialog(true);
          }}
        >
          Create Stopwords
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StopWordsHeader;
