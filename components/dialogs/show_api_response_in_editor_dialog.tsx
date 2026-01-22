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
import { Editor } from "@monaco-editor/react";
import { CircularSpinner } from "../ui/circular_spinner";
import { useTheme } from "next-themes";

const ShowApiResponseInEditorDialog = ({
  setShowDialog,
  showDialog,
  response,
}: {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  response: string | undefined;
}) => {
  const { theme } = useTheme();

  return (
    <Dialog open={showDialog} onOpenChange={(open) => setShowDialog(open)}>
      <DialogContent className="sm:max-w-[425px] lg:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-mono">API Response</DialogTitle>
        </DialogHeader>
        <Editor
          className="z-10"
          height="60vh"
          defaultLanguage="jsonl"
          options={{
            readOnly: true,
            domReadOnly: true,
          }}
          defaultValue={response}
          loading={<CircularSpinner />}
          theme={theme === "light" ? "light" : "vs-dark"}
        />
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

export const useShowApiResponseInEditorModal = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [response, setResponse] = useState<string | undefined>();

  const ApiResponseInEditorDialog = () => (
    <ShowApiResponseInEditorDialog
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      response={response}
    />
  );

  const setShowApiResponseInEditorDialog = (
    show: boolean,
    response: string,
  ) => {
    setResponse(response);
    setShowDialog(show);
  };

  return {
    ApiResponseInEditorDialog,
    setShowApiResponseInEditorDialog,
  };
};
