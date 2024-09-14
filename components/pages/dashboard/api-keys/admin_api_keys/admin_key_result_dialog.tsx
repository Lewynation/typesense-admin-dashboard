"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store/store";
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
import { changeAdminApiKeyResultDialog } from "@/redux/slices/alert_modals/alert_modals";
import { useSWRConfig } from "swr";

const AdminKeyResultDialog = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { adminAPIKeyResultDialog, adminAPIKey } = useAppSelector(
    (state) => state.alertModalSlice
  );
  const opemModal = (modalState: boolean): void => {
    dispatch(changeAdminApiKeyResultDialog(modalState));
  };
  const { mutate } = useSWRConfig();

  return (
    <div>
      <AlertDialog open={adminAPIKeyResultDialog} onOpenChange={opemModal}>
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
                <p>{adminAPIKey}</p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(adminAPIKey);
                    toast({
                      title: "Copied to clipboard",
                      description: "Sucessfuly Copied to clipboard",
                      className: "font-oswald",
                    });
                  }}
                >
                  <Icons.Copy className="cursor-pointer" />
                </button>
              </div>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                mutate("/api-keys");
                opemModal(false);
                // router.push("/api-keys");
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

export default AdminKeyResultDialog;
