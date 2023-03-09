import Editor from "@monaco-editor/react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import date from "date-and-time";
import Button from "../../../shared/button/button";
import Loading from "../../../shared/loading/loading";
import ModalBackground from "../../../shared/modalBackground/modalBackground";
import { ReactComponent as Key } from "./svgs/key.svg";
import { ReactComponent as Cancel } from "./svgs/cancel.svg";
import { openAdminAPIKeyModal } from "../../../../redux/slices/modalSlice/modalSlice";
import { createAPIKey } from "../../../../redux/slices/typesenseSlice/asyncThunks";

const SEVENDAYS = 604800000;
const THIRTYDAYS = 2592000000;
const SIXTYDAYS = 5184000000;
const NINETYDAYS = 7776000000;

function AdminAPIKeyModal() {
  const dispatch = useDispatch();

  const [APIKeyDescription, setAPIKKeyDescription] = useState<string>("");
  const [required, setRequired] = useState(false);
  const [epochDate, setEpochDate] = useState<number>(Date.now() + 604800000);
  const [schema, setSchema] = useState({
    description: APIKeyDescription,
    actions: ["*"],
    collections: ["*"],
    expires_at: epochDate === 1 ? 64723363199 : Math.round(epochDate / 1000),
  });

  const onChange = (value: any, event: any) => {
    console.log(value);
  };

  const generateAPIKey = () => {
    if (APIKeyDescription === "") {
      setRequired(true);
      return;
    }
    dispatch(createAPIKey(schema)).unwrap();
    dispatch(openAdminAPIKeyModal());
  };

  const closeModal = () => {
    dispatch(openAdminAPIKeyModal());
  };

  const handleAPIKeyInput = (event: React.FormEvent<HTMLInputElement>) => {
    setRequired(false);
    setAPIKKeyDescription(event.currentTarget.value);
    setSchema({
      description: event.currentTarget.value,
      actions: ["*"],
      collections: ["*"],
      expires_at: epochDate === 1 ? 64723363199 : Math.round(epochDate / 1000),
    });
  };

  const handleExpiryDate = (event: React.FormEvent<HTMLSelectElement>) => {
    switch (event.currentTarget.value) {
      case "7 days":
        setEpochDate(Date.now() + SEVENDAYS);
        break;
      case "30 days":
        setEpochDate(Date.now() + THIRTYDAYS);
        break;
      case "60 days":
        setEpochDate(Date.now() + SIXTYDAYS);
        break;
      case "90 days":
        setEpochDate(Date.now() + NINETYDAYS);
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
    <ModalBackground>
      <div className="fixed top-0 right-0 bottom-0 w-96 bg-white z-10 py-3 px-4">
        <div className="flex justify-between">
          <p className="font-bold font-lato text-lg mb-4">
            Generate Admin API Key
          </p>
          <Cancel className="cursor-pointer w-7 h-7" onClick={closeModal} />
        </div>
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
        <Editor
          height="200px"
          defaultLanguage="json"
          defaultValue={JSON.stringify(schema, null, 2)}
          onChange={onChange}
          loading={<Loading />}
          theme="light"
        />
        <div className="mt-3 flex justify-between">
          <div />
          <Button Icon={Key} onClick={generateAPIKey} text="Generate Key" />
        </div>
      </div>
    </ModalBackground>
  );
}

export default AdminAPIKeyModal;
