"use client";

import { setOpenSideMenu } from "@/redux/slices/view_api_key_details/view_api_key_details";
import { useAppDispatch, useAppSelector } from "@/redux/store/store";
import React, { useEffect } from "react";
import {
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui";
import { KeySchema } from "typesense/lib/Typesense/Key";
import { retrieveApiKeyDetails } from "@/actions";
import { useParams } from "next/navigation";

const ViweAPIKeyDetails = () => {
  const { openSideMenu } = useAppSelector(
    (state) => state.viewApiKeyDetailsSlice
  );
  const dispatch = useAppDispatch();
  const params = useParams<{ id: string }>();

  const [APIKeyDetails, setApiKeyDetails] = React.useState<
    KeySchema | undefined
  >();
  const { keyId } = useAppSelector((state) => state.viewApiKeyDetailsSlice);

  useEffect(() => {
    const getApiKeyDetails = async () => {
      if (keyId === null) return;
      const details = await retrieveApiKeyDetails(params.id, keyId);
      setApiKeyDetails(details);
    };
    getApiKeyDetails();
  }, [keyId, params.id]);

  const closeSideMenu = (sideMenuOpenState: boolean) => {
    dispatch(setOpenSideMenu(sideMenuOpenState));
  };

  const formatDate = (date?: number): string | null => {
    if (!date) return null;
    const formattedDate = new Date(date * 1000).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return formattedDate;
  };

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
                value={formatDate(APIKeyDetails.expires_at) || "No expiry date"}
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
