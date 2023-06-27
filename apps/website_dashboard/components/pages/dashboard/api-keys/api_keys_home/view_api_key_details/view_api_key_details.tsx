"use client";

import { useRetrieveAPIKeyDetails } from "@/hooks";
import { setOpenSideMenu } from "@/redux/slices/view_api_key_details/view_api_key_details";
import { useAppDispatch, useAppSelector } from "@/redux/store/store";
import React, { useEffect } from "react";
import {
  BarLoaderSpinner,
  Button,
  Icons,
  ShadCnButton,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "ui";

const ViweAPIKeyDetails = () => {
  const { openSideMenu, keyId } = useAppSelector(
    (state) => state.viewApiKeyDetailsSlice
  );
  const dispatch = useAppDispatch();

  const closeSideMenu = (sideMenuOpenState: boolean) => {
    dispatch(setOpenSideMenu(sideMenuOpenState));
  };

  const { APIKeyDetails, error, loading } = useRetrieveAPIKeyDetails();

  return (
    <Sheet open={openSideMenu} onOpenChange={closeSideMenu}>
      <SheetTrigger asChild>
        <ShadCnButton.Button id="view_api_key_side_panel" className="hidden">
          Open view api key side sheet
        </ShadCnButton.Button>
      </SheetTrigger>
      <SheetContent position="right" size="lg">
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
                value={APIKeyDetails.description}
              />
              <SingleKeyDesc
                label="ValuePrefix"
                value={APIKeyDetails["value_prefix"]}
              />
              <SingleKeyDesc
                label="Collections scope"
                value={APIKeyDetails.collections.join(", ")}
              />
              <SingleKeyDesc
                label="ExpiresAt"
                value={APIKeyDetails.expires_at.toString()}
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
