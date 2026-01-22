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
import { useStopwords } from "@/swr/use_stopwords";
import { Badge } from "../ui/badge";

const ShowStopwordsDetailsDialog = ({
  setShowDialog,
  showDialog,
  stopwordsId,
}: {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  stopwordsId: string | undefined;
}) => {
  const { stopwords, error, isLoading } = useStopwords(stopwordsId!);
  const definiteStopWords = Array.isArray(stopwords?.stopwords)
    ? stopwords.stopwords
    : stopwords?.stopwords.stopwords;

  const definiteStopwordIdentity = !Array.isArray(stopwords?.stopwords)
    ? stopwords?.stopwords
    : undefined;
  return (
    <Dialog open={showDialog} onOpenChange={(open) => setShowDialog(open)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-mono">Stopwords details</DialogTitle>
        </DialogHeader>
        {isLoading && <CircularSpinner />}
        {error && <p className="font-mono">An Error occured</p>}
        {stopwords && (
          <div>
            <div className="font-mono">
              <SingleKeyDesc
                label="Id"
                value={definiteStopwordIdentity?.id ?? "N/A"}
              />
              <SingleKeyDesc
                label="Locale"
                value={(definiteStopwordIdentity as any)?.["locale"] ?? "N/A"}
              />
              <div className="flex gap-2">
                <div className="font-mono">Stopwords:</div>
                <div className="flex flex-wrap gap-2">
                  {definiteStopWords &&
                    definiteStopWords.map((stopword, index) => (
                      <Badge className="font-mono" key={index}>
                        {stopword}
                      </Badge>
                    ))}
                </div>
              </div>
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

export const useShowStopwordsDetailsDialog = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [stopwordsId, setStopwordsId] = useState<string | undefined>();

  const StopwordsDetailsDialog = () => (
    <ShowStopwordsDetailsDialog
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      stopwordsId={stopwordsId}
    />
  );

  const setShowStopwordsDetailsDialog = (
    show: boolean,
    stopwordsId: string
  ) => {
    setStopwordsId(stopwordsId);
    setShowDialog(show);
  };

  return {
    setShowStopwordsDetailsDialog,
    StopwordsDetailsDialog,
  };
};
