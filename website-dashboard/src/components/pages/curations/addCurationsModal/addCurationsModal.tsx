import Editor from "@monaco-editor/react";
import { useDispatch } from "react-redux";
import Loading from "../../../shared/loading/loading";
import ModalBackground from "../../../shared/modalBackground/modalBackground";
import { ReactComponent as Question } from "./svgs/question.svg";
import { ReactComponent as Cancel } from "./svgs/cancel.svg";
import { ReactComponent as Add } from "./svgs/plus.svg";
import { openCurationsModal } from "../../../../redux/slices/modalSlice/modalSlice";
import Button from "../../../shared/button/button";

function AddCurationsModal() {
  const dispatch = useDispatch();
  const onChange = (value: any, event: any) => {
    console.log(value);
  };
  const schema = {
    rule: {
      query: "apple",
      match: "exact",
    },
    includes: [
      {
        id: "422",
        position: 1,
      },
      {
        id: "54",
        position: 2,
      },
    ],
    excludes: [
      {
        id: "287",
      },
    ],
  };

  const closeModal = () => {
    dispatch(openCurationsModal());
  };

  const addCuration = () => {};

  return (
    <ModalBackground>
      <div className="bg-white rounded-md p-4 w-3/5 h-[510px] dark:bg-[#0d1117]">
        <div className="flex justify-between items-center mb-1">
          <div className="flex gap-1 items-start">
            <p className="font-bold font-lato text-lg dark:text-gray-300">
              Add Curation
            </p>
            <a
              href="https://typesense.org/docs/0.24.0/api/curation.html#create-or-update-an-override"
              target="_blank"
              rel="noreferrer"
            >
              <Question className="w-3 h-3 cursor-pointer dark:text-gray-300" />
            </a>
          </div>
          <Cancel
            className="cursor-pointer w-7 h-7 dark:text-gray-300"
            onClick={closeModal}
          />
        </div>
        <p className="mb-2 font-lato text-gray-500">
          Using overrides, you can include or exclude specific documents for a
          given query.
        </p>
        <input
          type="text"
          className="outline-none rounded-md border-2 p-1 w-full mb-2 font-lato text-gray-500 dark:bg-[#010409] dark:border-gray-600"
          placeholder="Give the curation a name (required)"
        />
        <Editor
          height="310px"
          defaultLanguage="json"
          defaultValue={JSON.stringify(schema, null, 2)}
          onChange={onChange}
          loading={<Loading />}
          theme="vs-dark"
        />
        <div className="flex justify-between my-3">
          <div />
          <Button text="Add Curation" Icon={Add} onClick={addCuration} />
        </div>
      </div>
    </ModalBackground>
  );
}

export default AddCurationsModal;
