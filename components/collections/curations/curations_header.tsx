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

const CurationsHeader = () => {
  const { showCreateCurationDialog } = useDialog();
  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle className="font-mono">Curations</CardTitle>
        <CardDescription className="font-mono text-balance max-w-lg leading-relaxed">
          Curations allow you to promote other documents in searches over others
          or vice versa.
          <ResourceReadmore link={DocumentationLinks.curations} />
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          className="font-mono"
          onClick={() => {
            showCreateCurationDialog(true);
          }}
        >
          Create A Curration
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CurationsHeader;
