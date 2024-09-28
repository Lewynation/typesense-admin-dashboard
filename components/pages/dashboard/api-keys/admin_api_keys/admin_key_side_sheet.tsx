"use client";
import React, { useState } from "react";
import {
  Icons,
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui";
import * as epochTime from "@/constants/epoch_time";
import { formatDate, handleExpiryDate } from "@/lib";
import date from "date-and-time";
import { useAppDispatch } from "@/redux/store/store";
import {
  changeAdminApiKeyResultDialog,
  setAdminApiKey,
} from "@/redux/slices/alert_modals/alert_modals";
import Link from "next/link";
import { createAPIKey } from "@/actions";
import { GetResourceByServerIdProps } from "@/types";

const CreateAdminAPIKeySideSheet: React.FC<GetResourceByServerIdProps> = ({
  serverId,
}) => {
  const dispatch = useAppDispatch();
  const [APIKeyDescription, setAPIKKeyDescription] = useState<string>("");
  const [required, setRequired] = useState(false);
  const [epochDate, setEpochDate] = useState<number>(
    Date.now() + epochTime.SEVENDAYS
  );
  const [schema, setSchema] = useState({
    description: APIKeyDescription,
    actions: ["*"],
    collections: ["*"],
    expires_at:
      epochDate === 1 ? epochTime.NEVER : Math.round(epochDate / 1000),
  });

  const generateAPIKey = async () => {
    if (APIKeyDescription === "") {
      setRequired(true);
      return;
    }
    const createdAdminKey = await createAPIKey(serverId, schema);
    if (!createdAdminKey) {
      return;
    }
    dispatch(setAdminApiKey(createdAdminKey.value || ""));
    dispatch(changeAdminApiKeyResultDialog(true));
  };

  const handleAPIKeyInput = (event: React.FormEvent<HTMLInputElement>) => {
    setRequired(false);
    setAPIKKeyDescription(event.currentTarget.value);
    setSchema({
      description: event.currentTarget.value,
      actions: ["*"],
      collections: ["*"],
      expires_at:
        epochDate === 1 ? epochTime.NEVER : Math.round(epochDate / 1000),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button id="abmin_side_panel" className="hidden">
          Open admin side sheet
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="text-2xl font-oswald">
            Generate Admin API Key
          </SheetTitle>
        </SheetHeader>
        <div className="">
          <p className="pb-2 text-sm font-bold font-oswald dark:text-gray-400">
            Description <span className="text-red-700">*</span>
          </p>
          {required && <p className="text-red-600 font-oswald">Required</p>}
          <input
            onChange={handleAPIKeyInput}
            value={APIKeyDescription}
            className={`outline-none rounded-md ${
              required ? "border-2 border-red-600" : "border-2"
            } p-1 w-full mb-4 font-oswald text-gray-500  dark:bg-[#010409] dark:border-gray-600`}
            type="text"
            placeholder="Enter API Key description (Required)"
          />
          <p className="pb-2 text-sm font-bold font-oswald dark:text-gray-400">
            Expiration <span className="text-red-700">*</span>
          </p>
          <div className="flex items-center gap-2 mb-4">
            <select
              name="expiry"
              id="expiry"
              className="outline-none rounded-md border-2 p-1 w-36 font-oswald text-gray-500  dark:bg-[#010409] dark:border-gray-600"
              onChange={(event) => handleExpiryDate(event, setEpochDate)}
            >
              <option value="7 days">7 days</option>
              <option value="30 days">30 days</option>
              <option value="60 days">60 days</option>
              <option value="90 days">90 days</option>
              <option value="No expiration">No expiration</option>
            </select>
            <p className="text-sm font-oswald dark:text-gray-400">
              Expires on:
              {epochDate === 1
                ? "Never"
                : date.format(formatDate(epochDate), "ddd, MMM DD YYYY")}
            </p>
          </div>
        </div>
        <div>
          <p className="font-oswald">
            This API Key allows you to do all operations (ie gives you universal
            access). Refrain from creating such widely scoped keys as much as
            possible. Create a scoped key{" "}
            <span className="text-blue-500">
              <Link href={`/server/${serverId}/api-keys/search-api-key`}>
                here
              </Link>
            </span>
            .
          </p>
        </div>
        <div className="flex justify-between mt-3">
          <div />
          <Button onClick={generateAPIKey}>
            <div className="flex gap-2 font-mono">
              <Icons.Key />
              <p>Generate Key</p>
            </div>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateAdminAPIKeySideSheet;
