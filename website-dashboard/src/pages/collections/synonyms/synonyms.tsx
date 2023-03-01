import React from "react";
import { useDispatch } from "react-redux";
import SynonymsListTile from "../../../components/pages/synonyms/synonymsListTile";
import SynonymsListTitle from "../../../components/pages/synonyms/synonymsListTitle";
import SecondaryButton from "../../../components/shared/secondaryButton/secondaryButton";
import ListLayout from "../../../layouts/listLayout/listLayout";
import { openSynonymsModal } from "../../../redux/slices/modalSlice/modalSlice";
import { ReactComponent as AddIcon } from "./svgs/plus.svg";

function Synonyms() {
  const dispatch = useDispatch();
  const synonymsModal = () => {
    dispatch(openSynonymsModal());
  };
  return (
    <div>
      <div>
        <SecondaryButton
          Icon={AddIcon}
          text="Add a Synonym"
          onClick={synonymsModal}
        />
      </div>
      <ListLayout>
        <SynonymsListTitle />
        <SynonymsListTile />
      </ListLayout>
    </div>
  );
}

export default Synonyms;
