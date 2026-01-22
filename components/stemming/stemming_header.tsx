"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDialog } from "@/components/dialogs/dialog_provider";
import { FilePlus, LayoutDashboard, Search, ShieldAlert } from "lucide-react";
import { useShowImportStemmingDictionariesFromFileDialog } from "../dialogs/import_stemming_dictionaries_from_file_dialog";
import ResourceReadmore from "../shared/resource_readmore";
import { DocumentationLinks } from "@/config/documentaion_links";

const StemmingHeader = () => {
  const {
    ImportStemmingDictionariesFromFileDialog,
    setImportStemmingDictionariesFromFileDialog,
  } = useShowImportStemmingDictionariesFromFileDialog();
  const { showCreateStemmingDictionaryDialog } = useDialog();

  return (
    <Card className="sm:col-span-2">
      <ImportStemmingDictionariesFromFileDialog />
      <CardHeader className="pb-3">
        <CardTitle className="font-mono">Stemming</CardTitle>
        <CardDescription className="font-mono text-balance max-w-lg leading-relaxed">
          Stemming is a technique that helps handle variations of words during
          search. When stemming is enabled, a search for one form of a word will
          also match other grammatical forms of that word.
          <ResourceReadmore link={DocumentationLinks.stemming} />
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="font-mono">Create a Stemming Library</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <p className="font-mono">Actions</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                setImportStemmingDictionariesFromFileDialog(true);
              }}
            >
              <div className="flex items-center gap-3 justify-between w-full">
                <div>
                  <p className="font-mono text-sm">Import from file</p>
                  <p className="font-mono text-xs text-muted-foreground">
                    Select a .jsonl file locally
                  </p>
                </div>
                <FilePlus size={20} />
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                showCreateStemmingDictionaryDialog(true);
              }}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-3 justify-between w-full">
                <div>
                  <p className="font-mono text-sm">Create on dashboard</p>
                  <p className="font-mono text-xs text-muted-foreground">
                    Create on this portal
                  </p>
                </div>
                <LayoutDashboard size={20} />
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
};

export default StemmingHeader;
