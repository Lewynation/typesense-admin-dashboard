/* eslint-disable jsx-a11y/label-has-associated-control */
import { useDispatch } from "react-redux";
import { openSynonymsModal } from "../../../../redux/slices/modalSlice/modalSlice";
import ModalBackground from "../../../shared/modalBackground/modalBackground";
import { ReactComponent as Question } from "./svgs/question.svg";
import { ReactComponent as Cancel } from "./svgs/cancel.svg";
import { ReactComponent as Add } from "./svgs/plus.svg";
import Button from "../../../shared/button/button";

function SynonymInput() {
  return (
    <>
      <input
        type="text"
        className="outline-none rounded-md border-2 p-1 w-full mb-2 font-lato text-gray-500  dark:bg-[#010409] dark:border-gray-600"
        placeholder="Give the synonym a name (required)"
      />
      <div>
        <input
          type="radio"
          name="synonym"
          value="Multi-way synonyms"
          id="multi-way"
          className="mr-2 dark:accent-[#3b3b3b]"
        />
        <label htmlFor="multi-way" className="font-lato dark:text-gray-500">
          Multi-way synonyms
        </label>
      </div>
      <div>
        <input
          type="radio"
          name="synonym"
          value="One-way synonyms"
          id="one-way"
          className="mr-2 dark:accent-[#3b3b3b]"
        />
        <label htmlFor="one-way" className="font-lato dark:text-gray-500">
          One-way synonyms
        </label>
      </div>
      <input
        type="text"
        className="outline-none rounded-md border-2 p-1 w-full my-2 font-lato text-gray-500  dark:bg-[#010409] dark:border-gray-600"
        placeholder="Root"
      />
      <input
        type="text"
        className="outline-none rounded-md border-2 p-1 w-full my-2 font-lato text-gray-500  dark:bg-[#010409] dark:border-gray-600"
        placeholder="Synonyms (comma separated)"
      />
    </>
  );
}

function AddSynonymModal() {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(openSynonymsModal());
  };

  const addSynonym = () => {};
  return (
    <ModalBackground>
      <div className="bg-white rounded-md p-4 w-1/2 dark:bg-[#0d1117]">
        <div className="flex justify-between items-center mb-1">
          <div className="flex gap-1 items-start">
            <p className="font-bold font-lato text-lg dark:text-gray-300">
              Add Synonym
            </p>
            <a
              href="https://typesense.org/docs/0.24.0/api/synonyms.html#synonyms"
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
          Allows you to define search terms that should be considered equivalent
        </p>
        <SynonymInput />
        <div className="flex justify-between my-3">
          <div />
          <Button text="Add Synonym" Icon={Add} onClick={addSynonym} />
        </div>
      </div>
    </ModalBackground>
  );
}

export default AddSynonymModal;
