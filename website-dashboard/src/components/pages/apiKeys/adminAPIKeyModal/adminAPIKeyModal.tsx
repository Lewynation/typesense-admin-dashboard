import Editor from "@monaco-editor/react";
import { useState } from "react";
import date from "date-and-time";
import Button from "../../../shared/button/button";
import Loading from "../../../shared/loading/loading";
import ModalBackground from "../../../shared/modalBackground/modalBackground";
import { ReactComponent as Key } from "./svgs/key.svg";
import { ReactComponent as Cancel } from "./svgs/cancel.svg";
import { openAdminAPIKeyModal } from "../../../../redux/slices/modalSlice/modalSlice";
import { createAPIKey } from "../../../../redux/slices/typesenseSlice/asyncThunks";
import { useAppDispatch, useAppSelector } from "../../../../redux/store/store";
import handleExpiryDate from "../utils/handleExpiryDate";
import * as epochTime from "../../../../constants/epochTime";

function AdminAPIKeyModal() {
  const dispatch = useAppDispatch();

  const [APIKeyDescription, setAPIKKeyDescription] = useState<string>("");
  const [required, setRequired] = useState(false);
  const [epochDate, setEpochDate] = useState<number>(
    Date.now() + epochTime.SEVENDAYS
  );
  const { apiKey, host, path, port, protocol } = useAppSelector(
    (state) => state.login
  );
  const [schema, setSchema] = useState({
    description: APIKeyDescription,
    actions: ["*"],
    collections: ["*"],
    expires_at:
      epochDate === 1 ? epochTime.NEVER : Math.round(epochDate / 1000),
  });

  const { theme } = useAppSelector((state) => state.theme);

  const generateAPIKey = () => {
    if (APIKeyDescription === "") {
      setRequired(true);
      return;
    }
    const authData = { apiKey, host, path, port, protocol };
    const CreateAPIKeySchema = {
      schema,
      authData,
    };
    dispatch(createAPIKey(CreateAPIKeySchema)).unwrap();
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
      expires_at:
        epochDate === 1 ? epochTime.NEVER : Math.round(epochDate / 1000),
    });
  };

  const formatDate = (unformatedDate: number) => {
    const formatedDate = new Date(unformatedDate);
    return formatedDate;
  };

  return (
    <ModalBackground>
      <div className="fixed top-0 right-0 bottom-0 w-96 bg-white z-10 py-3 px-4 dark:bg-[#0d1117]">
        <div className="flex justify-between">
          <p className="font-bold font-lato text-lg mb-4 dark:text-gray-300">
            Generate Admin API Key
          </p>
          <Cancel
            className="cursor-pointer w-7 h-7 dark:text-gray-300"
            onClick={closeModal}
          />
        </div>
        <p className="font-lato font-bold text-sm pb-2 dark:text-gray-400">
          {" "}
          Description <span className="text-red-700">*</span>
        </p>
        {required ? <p className="font-lato text-red-600">Required</p> : null}{" "}
        <input
          onChange={handleAPIKeyInput}
          value={APIKeyDescription}
          className={`outline-none rounded-md ${
            required ? "border-2 border-red-600" : "border-2"
          } p-1 w-full mb-4 font-lato text-gray-500  dark:bg-[#010409] dark:border-gray-600`}
          type="text"
          placeholder="Enter API Key description (Required)"
        />
        <p className="font-lato font-bold text-sm pb-2 dark:text-gray-400">
          Expiration <span className="text-red-700">*</span>
        </p>
        <div className="flex gap-2 mb-4 items-center">
          <select
            name="expiry"
            id="expiry"
            className="outline-none rounded-md border-2 p-1 w-36 font-lato text-gray-500  dark:bg-[#010409] dark:border-gray-600"
            onChange={(event) => handleExpiryDate(event, setEpochDate)}
          >
            <option value="7 days">7 days</option>
            <option value="30 days">30 days</option>
            <option value="60 days">60 days</option>
            <option value="90 days">90 days</option>
            <option value="No expiration">No expiration</option>
          </select>
          <p className="text-sm font-lato dark:text-gray-400">
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
          loading={<Loading />}
          theme={theme === "dark" ? "vs-dark" : "light"} // light, vs-dark, hc-black
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
