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
        className="outline-none rounded-md border-2 p-1 w-full mb-2 font-lato text-gray-500"
        placeholder="Give the synonym a name (required)"
      />
      <div>
        <input
          type="radio"
          name="synonym"
          value="Multi-way synonyms"
          id="multi-way"
          className="mr-2"
        />
        <label htmlFor="multi-way" className="font-lato">
          Multi-way synonyms
        </label>
      </div>
      <div>
        <input
          type="radio"
          name="synonym"
          value="One-way synonyms"
          id="one-way"
          className="mr-2"
        />
        <label htmlFor="one-way" className="font-lato">
          One-way synonyms
        </label>
      </div>
      <input
        type="text"
        className="outline-none rounded-md border-2 p-1 w-full my-2 font-lato text-gray-500"
        placeholder="Root"
      />
      <input
        type="text"
        className="outline-none rounded-md border-2 p-1 w-full my-2 font-lato text-gray-500"
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
      <div className="bg-white rounded-md p-4 w-1/2">
        <div className="flex justify-between items-center mb-1">
          <div className="flex gap-1 items-start">
            <p className="font-bold font-lato text-lg">Add Synonym</p>
            <a
              href="https://typesense.org/docs/0.24.0/api/synonyms.html#synonyms"
              target="_blank"
              rel="noreferrer"
            >
              <Question className="w-3 h-3 cursor-pointer" />
            </a>
          </div>
          <Cancel className="cursor-pointer w-7 h-7" onClick={closeModal} />
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
