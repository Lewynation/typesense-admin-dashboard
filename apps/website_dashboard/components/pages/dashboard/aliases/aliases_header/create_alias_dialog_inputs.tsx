"use client";

import { useCollections } from "@/hooks";
import React from "react";

interface CreateAliasDialogProps {
  setAliasName: React.Dispatch<React.SetStateAction<string>>;
  setTargetCollection: React.Dispatch<React.SetStateAction<string>>;
}

const CreateAliasDialog: React.FC<CreateAliasDialogProps> = ({
  setAliasName,
  setTargetCollection,
}) => {
  const { collections } = useCollections();

  return (
    <div>
      <div>
        <p className="text-base font-bold font-oswald">
          Alias name<span className="text-red-700">*</span>
        </p>
        <input
          type="text"
          placeholder="Alias name(required)"
          className="w-full px-3 py-1 border-2 border-gray-300 rounded-md outline-none font-oswald placeholder:font-oswald"
          onChange={(e) => setAliasName(e.target.value)}
        />
      </div>
      <div className="my-2">
        <p className="text-base font-bold font-oswald">
          Target collection<span className="text-red-700">*</span>
        </p>
        <select
          defaultValue={"DEFAULT"}
          name="expiry"
          id="expiry"
          className={`outline-none rounded-md border-2 px-3 py-1 w-44 font-oswald text-gray-500 dark:bg-[#010409] dark:border-gray-600`}
          onChange={(e) => setTargetCollection(e.target.value)}
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
      </div>
    </div>
  );
};

export default CreateAliasDialog;
