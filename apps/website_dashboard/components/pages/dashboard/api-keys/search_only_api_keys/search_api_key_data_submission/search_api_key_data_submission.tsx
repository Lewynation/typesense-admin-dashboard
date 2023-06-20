"use client";

import { useDependencies } from "@/contexts/dependency_provider";
import {
  changeSearchAPIKeyResultDialog,
  setSearchApiKey,
} from "@/redux/slices/alert_modals/alert_modals";
import {
  setCollectionListEmpty,
  setRequired,
} from "@/redux/slices/search_api_key_acctions/search_api_key_actions";
import { useAppDispatch, useAppSelector } from "@/redux/store/store";
import { generateKeySchema, validateSearchCheckBoxes } from "@/utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BarLoaderSpinner, Icons, ShadCnButton } from "ui";

const SearchApiKeysDataSubmisssion = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const dependencies = useDependencies();

  const [invalid, setInvalid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { searchCheckBoxes } = useAppSelector(
    (state) => state.searchCheckBoxes
  );
  const { APIKeyDescription, expiryDate, collectionList } = useAppSelector(
    (state) => state.searchAPIKeyActionsSlice
  );

  const validateDescription = () => {
    dispatch(setRequired(true));
  };

  const validateCollectionList = () => {
    dispatch(setCollectionListEmpty(true));
  };

  const onGenerateSearchAPIKeyBtnClick = async () => {
    setLoading(true);
    const isValid = validateSearchCheckBoxes(searchCheckBoxes);
    if (!isValid) {
      setInvalid(true);
      setLoading(false);
      return;
    }
    setInvalid(false);
    const keySchema = generateKeySchema({
      searchCheckBoxes,
      APIKeyDescription,
      collectionList,
      expiryDate,
      validateDescription,
      validateCollectionList,
    });
    if (!keySchema) {
      setLoading(false);
      return;
    }
    const createdKey = await dependencies?.typesense?.createAPIKey(keySchema);
    if (!createdKey) {
      return;
    }
    dispatch(setSearchApiKey(createdKey.value || ""));
    dispatch(changeSearchAPIKeyResultDialog(true));

    setLoading(false);
  };

  return (
    <div className="flex items-center gap-6 mt-2 mb-6 ml-2">
      {loading ? (
        <div className="flex items-center ml-3">
          <BarLoaderSpinner />
        </div>
      ) : (
        <ShadCnButton.Button onClick={onGenerateSearchAPIKeyBtnClick}>
          <div className="flex items-center gap-2">
            <Icons.Key />
            <p className="font-oswald">Generate API Key</p>
          </div>
        </ShadCnButton.Button>
      )}
      <button
        type="button"
        onClick={() => {
          router.replace("/api-keys");
        }}
        className="font-bold text-blue-500 outline-none cursor-pointer font-oswald"
      >
        Cancel
      </button>
      {invalid && (
        <p className="text-base font-bold text-red-600 font-oswald">
          Select a scope to continue...
        </p>
      )}
    </div>
  );
};

export default SearchApiKeysDataSubmisssion;
