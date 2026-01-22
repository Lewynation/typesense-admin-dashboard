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
import ResourceReadmore from "../shared/resource_readmore";

const NLSearchModelsHeader = () => {
  const { showCreateNLSearchModelDialog } = useDialog();
  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle className="font-mono">
          Natural Language Search Models
        </CardTitle>
        <CardDescription className="font-mono text-balance max-w-lg leading-relaxed">
          Natural Language Search in Typesense allows you to transform any
          free-form sentences a user might type into your search bar, into a
          structured set of search parameters.
          <ResourceReadmore link={DocumentationLinks.nlSearchModels} />
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          className="font-mono"
          onClick={() => {
            showCreateNLSearchModelDialog(true);
          }}
        >
          Create An NL Search Model
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NLSearchModelsHeader;
