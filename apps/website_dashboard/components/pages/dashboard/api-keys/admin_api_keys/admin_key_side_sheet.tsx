"use client";
import React, { useState } from "react";
import { Editor } from "@monaco-editor/react";
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
import * as epochTime from "@/constants/epoch_time";
import { useDependencies } from "@/contexts/dependency_provider";
import { formatDate, handleExpiryDate } from "@/utils";
import date from "date-and-time";
import { useAppDispatch } from "@/redux/store/store";
import {
  changeAdminApiKeyResultDialog,
  setAdminApiKey,
} from "@/redux/slices/alert_modals/alert_modals";

const CreateAdminAPIKeySideSheet = () => {
  const dependencies = useDependencies();
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
    const createdAdminKey = await dependencies?.typesense?.createAPIKey(schema);
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
        <ShadCnButton.Button id="abmin_side_panel" className="hidden">
          Open admin side sheet
        </ShadCnButton.Button>
      </SheetTrigger>
      <SheetContent position="right" size="lg">
        <SheetHeader>
          <SheetTitle className="font-oswald text-2xl">
            Generate Admin API Key
          </SheetTitle>
        </SheetHeader>
        <div className="">
          <p className="font-oswald font-bold text-sm pb-2 dark:text-gray-400">
            {" "}
            Description <span className="text-red-700">*</span>
          </p>
          {required ? (
            <p className="font-oswald text-red-600">Required</p>
          ) : null}{" "}
          <input
            onChange={handleAPIKeyInput}
            value={APIKeyDescription}
            className={`outline-none rounded-md ${
              required ? "border-2 border-red-600" : "border-2"
            } p-1 w-full mb-4 font-oswald text-gray-500  dark:bg-[#010409] dark:border-gray-600`}
            type="text"
            placeholder="Enter API Key description (Required)"
          />
          <p className="font-oswald font-bold text-sm pb-2 dark:text-gray-400">
            Expiration <span className="text-red-700">*</span>
          </p>
          <div className="flex gap-2 mb-4 items-center">
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
              Expires on:{" "}
              {epochDate === 1
                ? "Never"
                : date.format(formatDate(epochDate), "ddd, MMM DD YYYY")}
            </p>
          </div>
          <Editor
            height="200px"
            defaultLanguage="json"
            defaultValue={JSON.stringify(schema, null, 2)}
            loading={<BarLoaderSpinner />}
            theme="light" //vs-dark,light,hc-black
          />
        </div>
        <div className="mt-3 flex justify-between">
          <div />
          <ShadCnButton.Button onClick={generateAPIKey}>
            <div className="flex gap-2 font-mono">
              <Icons.Key />
              <p>Generate Key</p>
            </div>
          </ShadCnButton.Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateAdminAPIKeySideSheet;
