"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CircularSpinner } from "../ui/circular_spinner";
import { useSynonym } from "@/swr/use_synonym";

const ShowSynonymDetailsDialog = ({
  setShowDialog,
  showDialog,
  synonymId,
}: {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  synonymId: string | undefined;
}) => {
  const { synonym, error, isLoading } = useSynonym(synonymId!);

  return (
    <Dialog open={showDialog} onOpenChange={(open) => setShowDialog(open)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-mono">Synonym details</DialogTitle>
        </DialogHeader>
        {isLoading && <CircularSpinner />}
        {error && <p className="font-mono">An Error occured</p>}
        {synonym && (
          <div>
            <div className="font-mono">
              <SingleKeyDesc label="Id" value={synonym.id ?? "N/A"} />
              <SingleKeyDesc
                label="Synonym Type"
                value={synonym.root ? "One Way" : "Muti Way"}
              />
              <SingleKeyDesc label="Root" value={synonym.root ?? "N/A"} />
              <SingleKeyDesc label="Locale" value={synonym.locale ?? "N/A"} />
              <SingleKeyDesc
                label="Synonyms"
                value={synonym.synonyms?.join(", ") ?? "N/A"}
              />
              <SingleKeyDesc
                label="Symbols to index"
                value={synonym.symbols_to_index?.join(", ") ?? "N/A"}
              />
            </div>
          </div>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="font-mono">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const SingleKeyDesc = ({ label, value }: { label: string; value: string }) => {
  return (
    <p className="my-1 font-semibold font-mono">
      {label}:<span className="text-base font-normal"> {value}</span>
    </p>
  );
};

export const useShowSynonymDetailsDialog = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [synonymId, setSynonymId] = useState<string | undefined>();

  const SynonymDetailsDialog = () => (
    <ShowSynonymDetailsDialog
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      synonymId={synonymId}
    />
  );

  const setShowSynonymDetailsDialog = (show: boolean, synonymId: string) => {
    setSynonymId(synonymId);
    setShowDialog(show);
  };

  return {
    setShowSynonymDetailsDialog,
    SynonymDetailsDialog,
  };
};
