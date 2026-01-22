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

const SearchPresetsHeader = () => {
  const { showCreatePresetDialog } = useDialog();
  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle className="font-mono">Search Presets</CardTitle>
        <CardDescription className="font-mono text-balance max-w-lg leading-relaxed">
          Search presets allow you to store a bunch of search parameters
          together, and reference them by a name.
          <ResourceReadmore link={DocumentationLinks.searchPresets} />
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          className="font-mono"
          onClick={() => {
            showCreatePresetDialog(true);
          }}
        >
          Create A Search Preset
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SearchPresetsHeader;
