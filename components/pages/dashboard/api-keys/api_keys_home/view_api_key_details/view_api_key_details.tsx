"use client";

import { useRetrieveAPIKeyDetails } from "@/hooks";
import { setOpenSideMenu } from "@/redux/slices/view_api_key_details/view_api_key_details";
import { useAppDispatch, useAppSelector } from "@/redux/store/store";
import React from "react";
import {
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui";

const ViweAPIKeyDetails = () => {
  const { openSideMenu } = useAppSelector(
    (state) => state.viewApiKeyDetailsSlice
  );
  const dispatch = useAppDispatch();

  const closeSideMenu = (sideMenuOpenState: boolean) => {
    dispatch(setOpenSideMenu(sideMenuOpenState));
  };

  const { APIKeyDetails } = useRetrieveAPIKeyDetails();

  return (
    <Sheet open={openSideMenu} onOpenChange={closeSideMenu}>
      <SheetTrigger asChild>
        <Button id="view_api_key_side_panel" className="hidden">
          Open view api key side sheet
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="text-2xl font-oswald">
            API Key details
          </SheetTitle>
        </SheetHeader>

        {APIKeyDetails && (
          <div>
            <div className="font-oswald">
              <SingleKeyDesc
                label="Description"
                value={APIKeyDetails.description || "No description"}
              />
              <SingleKeyDesc
                label="ValuePrefix"
                value={APIKeyDetails["value_prefix"] || "No value prefix"}
              />
              <SingleKeyDesc
                label="Collections scope"
                value={APIKeyDetails.collections.join(", ")}
              />
              <SingleKeyDesc
                label="ExpiresAt"
                value={APIKeyDetails.expires_at?.toString() || "No expiry date"}
              />
              <SingleKeyDesc
                label="Actions"
                value={APIKeyDetails.actions.join(", ")}
              />
            </div>

            {APIKeyDetails.actions.join(", ") === "*" &&
              APIKeyDetails.collections.join(", ") === "*" && (
                <p className="mt-5 text-xl italic font-bold font-oswald">
                  This is an admin API Key
                </p>
              )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

interface SingleKeyDescProps {
  label: string;
  value: string;
}

const SingleKeyDesc: React.FC<SingleKeyDescProps> = ({ label, value }) => {
  return (
    <p className="my-2 text-xl font-semibold font-oswald">
      {label}:<span className="text-base font-normal"> {value}</span>
    </p>
  );
};

export default ViweAPIKeyDetails;
