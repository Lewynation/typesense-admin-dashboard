import React from "react";
import CurationsListTile from "../../../components/pages/curations/curationsListTile";
import CurationsListTitle from "../../../components/pages/curations/curationsListTitle";
import SecondaryButton from "../../../components/shared/secondaryButton/secondaryButton";
import ListLayout from "../../../layouts/listLayout/listLayout";
import { ReactComponent as AddIcon } from "./svgs/add.svg";

function Curations() {
  return (
    <div>
      <div className="">
        <SecondaryButton Icon={AddIcon} text="Add a Curation" />
      </div>
      <ListLayout>
        <CurationsListTitle />
        <CurationsListTile />
      </ListLayout>
    </div>
  );
}

export default Curations;
