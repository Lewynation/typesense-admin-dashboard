"use client";

import React from "react";
import { useSWRConfig } from "swr";
import {
  BarLoaderFullScreenWidth,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Icons,
  ShadCnButton,
  useToast,
} from "ui";
import { useDependencies } from "@/contexts/dependency_provider";
import CreateAliasDialog from "./create_alias_dialog_inputs";

const AliasesHeader = () => {
  const dependencies = useDependencies();
  const { toast } = useToast();
  const { mutate } = useSWRConfig();

  const [aliasName, setAliasName] = React.useState("");
  const [targetCollection, setTargetCollection] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [dialogOpenState, setDialogOpenState] = React.useState(false);

  const aliasCreateHandler = async () => {
    if (!aliasName || !targetCollection)
      return toast({
        variant: "destructive",
        title: "A required input is missing.",
        description: "Alias name and target collection are required.",
        className: "font-oswald",
      });
    setLoading(true);
    try {
      await dependencies?.typesense?.createAlias(aliasName, targetCollection);
      toast({
        description: "Alias created successfully",
        className: "font-oswald",
      });
      mutate("/aliases");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        className: "font-oswald",
      });
    } finally {
      setLoading(false);
      setDialogOpenState(false);
    }
  };

  return (
    <div className="flex justify-between mt-2">
      <div></div>
      <BarLoaderFullScreenWidth loading={loading} />
      <Dialog open={dialogOpenState} onOpenChange={setDialogOpenState}>
        <DialogTrigger asChild>
          <ShadCnButton.Button className="">
            <div className="flex items-center">
              <Icons.Plus />
              <p className="font-oswald">Create alias</p>
            </div>
          </ShadCnButton.Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-oswald">Create alias</DialogTitle>
            <DialogDescription className="font-oswald">
              A virtual collection name that points to a real collection
            </DialogDescription>
          </DialogHeader>
          <CreateAliasDialog
            setAliasName={setAliasName}
            setTargetCollection={setTargetCollection}
          />
          <DialogFooter>
            <ShadCnButton.Button
              type="submit"
              className="font-oswald"
              onClick={aliasCreateHandler}
            >
              Save changes
            </ShadCnButton.Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AliasesHeader;
