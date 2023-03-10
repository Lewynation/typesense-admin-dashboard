import { useDispatch } from "react-redux";
import Button from "../../../shared/button/button";
import ModalBackground from "../../../shared/modalBackground/modalBackground";
import { ReactComponent as Question } from "./svgs/question.svg";
import { ReactComponent as Cancel } from "./svgs/cancel.svg";
import { ReactComponent as Add } from "./svgs/plus.svg";
import { openAliasesModal } from "../../../../redux/slices/modalSlice/modalSlice";

function AddAliasesModal() {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(openAliasesModal());
  };

  const addAlias = () => {};

  const mockCollection = ["Books", "Users"];

  return (
    <ModalBackground>
      <div className="bg-white rounded-md p-4 w-3/5 dark:bg-[#0d1117]">
        <div className="flex justify-between items-center mb-1">
          <div className="flex gap-1 items-start">
            <p className="font-bold font-lato text-lg dark:text-gray-300">
              Add Alias
            </p>
            <a
              href="https://typesense.org/docs/0.24.0/api/collection-alias.html#collection-alias"
              target="_blank"
              rel="noreferrer"
            >
              <Question className="w-3 h-3 cursor-pointer dark:text-gray-400" />
            </a>
          </div>
          <Cancel
            className="cursor-pointer w-7 h-7 dark:text-gray-300"
            onClick={closeModal}
          />
        </div>
        <p className="mb-2 font-lato text-gray-500">
          A virtual collection name that points to a real collection
        </p>
        <p className="font-lato font-bold text-sm pb-2 dark:text-gray-400">
          {" "}
          Name <span className="text-red-700">*</span>
        </p>
        <input
          type="text"
          className="outline-none rounded-md border-2 p-1 w-full mb-3 font-lato text-gray-500 dark:bg-[#010409] dark:border-gray-600"
          placeholder="Give the alias a name (required)"
        />
        <p className="font-lato font-bold text-sm pb-2 dark:text-gray-400">
          {" "}
          Target Collection <span className="text-red-700">*</span>
        </p>
        <select
          name="collection"
          id="collection"
          className="outline-none rounded-md border-2 p-1 w-36 mb-4 font-lato text-gray-500 dark:bg-[#010409] dark:border-gray-600"
        >
          {mockCollection.map((collection) => {
            return (
              <option value={collection} key={collection}>
                {collection}
              </option>
            );
          })}
        </select>

        <div className="flex justify-between my-3">
          <div />
          <Button text="Add Alias" Icon={Add} onClick={addAlias} />
        </div>
      </div>
    </ModalBackground>
  );
}

export default AddAliasesModal;
