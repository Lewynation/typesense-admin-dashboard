import { useState } from "react";
import date from "date-and-time";

import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { useNavigate } from "react-router-dom";
import Button from "../../../shared/button/button";
import CheckBoxesTree from "./checkBoxesTree";
import { ReactComponent as KeySVG } from "./svgs/key.svg";

function SearchAPIKeysDataCollection() {
  const [epochDate, setEpochDate] = useState<number>(Date.now() + 604800000);
  const [APIKeyDescription, setAPIKKeyDescription] = useState<string>("");
  const [required, setRequired] = useState(false);

  const handleAPIKeyInput = (event: React.FormEvent<HTMLInputElement>) => {
    setRequired(false);
    setAPIKKeyDescription(event.currentTarget.value);
  };

  const handleExpiryDate = (event: React.FormEvent<HTMLSelectElement>) => {
    switch (event.currentTarget.value) {
      case "7 days":
        setEpochDate(Date.now() + 604800000);
        break;
      case "30 days":
        setEpochDate(Date.now() + 2592000000);
        break;
      case "60 days":
        setEpochDate(Date.now() + 5184000000);
        break;
      case "90 days":
        setEpochDate(Date.now() + 7776000000);
        break;
      default:
        setEpochDate(1);
        break;
    }
  };

  const formatDate = (unformatedDate: number) => {
    const formatedDate = new Date(unformatedDate);
    return formatedDate;
  };

  return (
    <div className="px-4 pt-4 pb-1">
      <p className="font-lato font-bold text-lg pb-2"> Search only API Key</p>
      <p className="font-lato font-bold text-sm pb-2">
        {" "}
        Description <span className="text-red-700">*</span>
      </p>
      {required ? <p className="font-lato text-red-600">Required</p> : null}{" "}
      <input
        onChange={handleAPIKeyInput}
        value={APIKeyDescription}
        className={`outline-none rounded-md ${
          required ? "border-2 border-red-600" : "border-2"
        } p-1 w-full mb-4 font-lato text-gray-500`}
        type="text"
        placeholder="Enter API Key description (Required)"
      />
      <p className="font-lato font-bold text-sm pb-2">
        Expiration <span className="text-red-700">*</span>
      </p>
      <div className="flex gap-2 mb-4 items-center">
        <select
          name="expiry"
          id="expiry"
          className="outline-none rounded-md border-2 p-1 w-36 font-lato text-gray-500"
          onChange={handleExpiryDate}
        >
          <option value="7 days">7 days</option>
          <option value="30 days">30 days</option>
          <option value="60 days">60 days</option>
          <option value="90 days">90 days</option>
          <option value="No expiration">No expiration</option>
        </select>
        <p className="text-sm font-lato">
          Expires on:{" "}
          {epochDate === 1
            ? "Never"
            : date.format(formatDate(epochDate), "ddd, MMM DD YYYY")}
        </p>
      </div>
      <p className="font-lato font-bold text-sm"> Select Scopes</p>
      <p className="font-lato text-gray-500 text-sm pb-2">
        {" "}
        Scopes define the access for search only API Keys.
      </p>
    </div>
  );
}

function SearchAPIKeys() {
  const navigate = useNavigate();
  const onClick = () => {};
  return (
    <div className="flex flex-col items-center">
      <div>
        <SearchAPIKeysDataCollection />
        <CheckBoxesTree />
        <div className="flex gap-6 mt-2 mb-6 ml-2">
          <Button text="Generate API Key" onClick={onClick} Icon={KeySVG} />
          <button
            type="button"
            onClick={() => {
              navigate("/api-keys");
            }}
            className="outline-none text-blue-500 font-bold font-lato cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchAPIKeys;
