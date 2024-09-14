"use client";

import { changeSearchAPIKeyResultDialog } from "@/redux/slices/alert_modals/alert_modals";
import { useAppDispatch, useAppSelector } from "@/redux/store/store";
import { useRouter } from "next/navigation";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Icons,
} from "@/components/ui";

import { useToast } from "@/hooks";

const SearchAPIKeyResultDialog = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { searchAPIKeyResultDialog, searchApiKey } = useAppSelector(
    (state) => state.alertModalSlice
  );

  const { toast } = useToast();

  const opemModal = (modalState: boolean): void => {
    dispatch(changeSearchAPIKeyResultDialog(modalState));
  };

  const toastCopyToClipbaordHandler = () => {
    navigator.clipboard.writeText(searchApiKey);
    toast({
      title: "Copied to clipboard",
      description: "Sucessfuly Copied to clipboard",
    });
  };

  return (
    <div>
      <AlertDialog open={searchAPIKeyResultDialog} onOpenChange={opemModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold font-oswald">
              Your API Key
            </AlertDialogTitle>
            <div className="font-oswald">
              <p className="">
                This is your API key. Copy it as it will not be displayed again!
              </p>
              <div className="flex items-center gap-2 font-oswald">
                <p>{searchApiKey}</p>
                <button onClick={toastCopyToClipbaordHandler}>
                  <Icons.Copy className="cursor-pointer" />
                </button>
              </div>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                router.push("/api-keys");
              }}
              className="font-oswald"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SearchAPIKeyResultDialog;
