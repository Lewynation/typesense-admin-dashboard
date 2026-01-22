"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCreateAliasDialog } from "../dialogs/create_alias_dialog";
import ResourceReadmore from "../shared/resource_readmore";
import { DocumentationLinks } from "@/config/documentaion_links";

const AliasesHeader = () => {
  const { CreateAliasDialog, setShowCreateAliasDialog } =
    useCreateAliasDialog();
  return (
    <Card className="sm:col-span-2">
      <CreateAliasDialog />
      <CardHeader className="pb-3">
        <CardTitle className="font-mono">Synonyms</CardTitle>
        <CardDescription className="font-mono text-balance max-w-lg leading-relaxed">
          An alias is a virtual collection name that points to a real
          collection. Kind of like a symbolic link in Linux.
          <ResourceReadmore link={DocumentationLinks.aliases} />
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          className="font-mono"
          onClick={() => {
            setShowCreateAliasDialog(true);
          }}
        >
          Create An Alias
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AliasesHeader;
