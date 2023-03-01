import Editor from "@monaco-editor/react";
import { useDispatch } from "react-redux";
import Button from "../../../shared/button/button";
import Loading from "../../../shared/loading/loading";
import ModalBackground from "../../../shared/modalBackground/modalBackground";
import { ReactComponent as Key } from "./svgs/key.svg";
import { ReactComponent as Cancel } from "./svgs/cancel.svg";
import { openAdminAPIKeyModal } from "../../../../redux/slices/modalSlice/modalSlice";

function AdminAPIKeyModal() {
  const dispatch = useDispatch();

  const schema = {
    description: "Admin key.",
    actions: ["*"],
    collections: ["*"],
  };
  const onChange = (value: any, event: any) => {
    console.log(value);
  };

  const generateAPIKey = () => {};

  const closeModal = () => {
    dispatch(openAdminAPIKeyModal());
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
        <input
          className="outline-none rounded-md border-2 p-1 w-full mb-4 font-lato text-gray-500"
          type="text"
          placeholder="Enter API Key description (Required)"
        />
        <p className="font-lato font-bold text-sm pb-2">
          Expiration <span className="text-red-700">*</span>
        </p>
        <select
          name="expiry"
          id="expiry"
          className="outline-none rounded-md border-2 p-1 w-36 mb-4 font-lato text-gray-500"
        >
          <option value="7 days">7 days</option>
          <option value="30 days">30 days</option>
          <option value="60 days">60 days</option>
          <option value="90 days">90 days</option>
          <option value="No expiration">No expiration</option>
        </select>
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
