"use client";

import date from "date-and-time";
import * as epochTime from "@/constants/epoch_time";
import CollectionList from "./collections_list";
import { useAppDispatch, useAppSelector } from "@/redux/store/store";
import {
  setCollectionListEmpty,
  setRequired,
  storeAPIKeyDescription,
  storeCollections,
  storeExpiryDate,
} from "@/redux/slices/search_api_key_acctions/search_api_key_actions";
// import { collectionData as collections } from "./mock_collections";
import { formatDate } from "@/utils";
import { useCollections } from "@/hooks";

function SearchAPIKeysDataCollection() {
  const { collections } = useCollections();
  const dispatch = useAppDispatch();
  const {
    required,
    APIKeyDescription,
    expiryDate,
    collectionList,
    collectionEmpty,
  } = useAppSelector((state) => state.searchAPIKeyActionsSlice);

  const handleAPIKeyInput = (event: React.FormEvent<HTMLInputElement>) => {
    dispatch(setRequired(false));
    dispatch(storeAPIKeyDescription(event.currentTarget.value));
  };

  const handleExpiryDate = (event: React.FormEvent<HTMLSelectElement>) => {
    switch (event.currentTarget.value) {
      case "7 days":
        dispatch(storeExpiryDate(Date.now() + epochTime.SEVENDAYS));
        break;
      case "30 days":
        dispatch(storeExpiryDate(Date.now() + epochTime.THIRTYDAYS));
        break;
      case "60 days":
        dispatch(storeExpiryDate(Date.now() + epochTime.SIXTYDAYS));
        break;
      case "90 days":
        dispatch(storeExpiryDate(Date.now() + epochTime.NINETYDAYS));
        break;
      default:
        dispatch(storeExpiryDate(1));
        break;
    }
  };

  const handleCollection = (event: React.FormEvent<HTMLSelectElement>) => {
    dispatch(storeCollections(event.currentTarget.value));
    dispatch(setCollectionListEmpty(false));
  };

  return (
    <div className="px-4 pt-4 pb-1">
      <p className="font-oswald font-bold text-lg pb-2 dark:text-gray-300">
        {" "}
        Search only API Key
      </p>
      <p className="font-oswald font-bold text-sm pb-2 dark:text-gray-400">
        {" "}
        Description <span className="text-red-700">*</span>
      </p>
      {required ? <p className="font-oswald text-red-600 ">Required</p> : null}{" "}
      <input
        onChange={handleAPIKeyInput}
        value={APIKeyDescription}
        className={`outline-none rounded-md ${
          required ? "border-2 border-red-600" : "border-2"
        } p-1 w-full mb-4 font-oswald text-gray-500 dark:bg-[#010409] dark:border-gray-600`}
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
          className="outline-none rounded-md border-2 p-1 w-44 font-oswald text-gray-500 dark:bg-[#010409] dark:border-gray-600"
          onChange={handleExpiryDate}
        >
          <option value="7 days">7 days</option>
          <option value="30 days">30 days</option>
          <option value="60 days">60 days</option>
          <option value="90 days">90 days</option>
          <option value="No expiration">No expiration</option>
        </select>
        <p className="text-sm font-oswald dark:text-gray-400">
          Expires on:{" "}
          {expiryDate === 1
            ? "Never"
            : date.format(formatDate(expiryDate), "ddd, MMM DD YYYY")}
        </p>
      </div>
      <p className="font-oswald font-bold text-sm pb-2 dark:text-gray-400">
        Select Collections that this key is scoped to{" "}
        <span className="text-red-700">*</span>
      </p>
      {collectionEmpty ? (
        <p className="font-oswald text-red-600">Required</p>
      ) : null}{" "}
      <div className="">
        <select
          defaultValue={"DEFAULT"}
          name="expiry"
          id="expiry"
          className={`outline-none rounded-md ${
            collectionEmpty ? "border-2 border-red-600" : "border-2"
          } p-1 w-44 font-oswald text-gray-500 dark:bg-[#010409] dark:border-gray-600`}
          onChange={handleCollection}
        >
          <option value="DEFAULT" disabled>
            {" "}
            - select an option -{" "}
          </option>
          {collections.map((collection) => {
            return (
              <option key={collection.created_at} value={collection.name}>
                {collection.name}
              </option>
            );
          })}
        </select>
        <div className="flex gap-4">
          {collectionList.length > 0 ? (
            <CollectionList items={collectionList} />
          ) : null}
        </div>
      </div>
      <p className="font-oswald font-bold text-sm mt-3 dark:text-gray-400">
        {" "}
        Select Scopes
      </p>
      <p className="font-oswald text-gray-500 text-sm pb-2 dark:text-gray-500">
        {" "}
        Scopes define the access for search only API Keys.
      </p>
    </div>
  );
}

export default SearchAPIKeysDataCollection;
