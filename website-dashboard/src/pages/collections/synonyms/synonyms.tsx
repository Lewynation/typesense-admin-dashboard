import React from "react";
import SynonymsListTile from "../../../components/pages/synonyms/synonymsListTile";
import SynonymsListTitle from "../../../components/pages/synonyms/synonymsListTitle";
import SecondaryButton from "../../../components/shared/secondaryButton/secondaryButton";
import ListLayout from "../../../layouts/listLayout/listLayout";
import { ReactComponent as AddIcon } from "./svgs/plus.svg";

function Synonyms() {
  return (
    <div>
      <div>
        <SecondaryButton Icon={AddIcon} text="Add a Synonym" />
      </div>
      <ListLayout>
        <SynonymsListTitle />
        <SynonymsListTile />
      </ListLayout>
    </div>
  );
}

export default Synonyms;
