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
import { updateCollection } from "@/actions";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTheme } from "next-themes";

const ShowReadonlyCollectionEditEditorDialog = ({
  setShowDialog,
  showDialog,
  response,
}: {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  response: string | undefined;
}) => {
  const params = useParams<{ id: string; name: string }>();
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <Dialog open={showDialog} onOpenChange={(open) => setShowDialog(open)}>
      <DialogContent className="sm:max-w-[425px] lg:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-mono">Confirm Changes</DialogTitle>
        </DialogHeader>
        <div className="font-mono my-3 text-destructive">
          You are about to make these changes to the collection. They are
          subject to errors so validate that these are the changes you want.
        </div>
        <Editor
          className="z-10"
          height="60vh"
          defaultLanguage="json"
          defaultValue={response}
          options={{
            readOnly: true,
            domReadOnly: true,
          }}
          loading={<CircularSpinner />}
          theme={theme === "light" ? "light" : "vs-dark"}
        />
        <DialogFooter>
          <Button
            type="button"
            variant="default"
            className="font-mono"
            onClick={async () => {
              if (!response) return;
              try {
                const res = await updateCollection(
                  params.id,
                  params.name,
                  JSON.parse(response),
                );
                if (!res.success) {
                  toast.error("Error editing collection", {
                    description: res.error,
                    className: "font-mono",
                  });
                  return;
                }
                toast.success("Collection edited successfully", {
                  className: "font-mono",
                });
                router.refresh();
                setShowDialog(false);
              } catch (error) {
                toast.error("Error editing collection", {
                  className: "font-mono",
                });
              }
            }}
          >
            LGTM, Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const useShowReadonlyCollectionEditEditorModal = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [response, setResponse] = useState<string | undefined>();

  const ReadonlyCollectionEditEditorDialog = () => (
    <ShowReadonlyCollectionEditEditorDialog
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      response={response}
    />
  );

  const setShowReadonltCollectionEditEditorDialog = (
    show: boolean,
    response: string,
  ) => {
    setResponse(response);
    setShowDialog(show);
  };

  return {
    ReadonlyCollectionEditEditorDialog,
    setShowReadonltCollectionEditEditorDialog,
  };
};

// export const useShowApiResponseInEditorModal = <T = void,>() => {
//   const [showDialog, setShowDialog] = useState(false);
//   const [response, setResponse] = useState<string | undefined>();
//   const [callback, setCallback] = useState<((param: T) => void) | undefined>();

//   const ApiResponseInEditorDialog = () => (
//     <ShowApiResponseInEditorDialog
//       showDialog={showDialog}
//       setShowDialog={setShowDialog}
//       response={response}
//       //   onConfirm={callback}
//     />
//   );

//   const setShowApiResponseInEditorDialog = (
//     show: boolean,
//     response: string,
//     onConfirm?: (param: T) => void,
//   ) => {
//     setResponse(response);
//     setCallback(() => onConfirm); // Wrap in arrow function to avoid immediate invocation
//     setShowDialog(show);
//   };

//   return {
//     ApiResponseInEditorDialog,
//     setShowApiResponseInEditorDialog,
//   };
// };
