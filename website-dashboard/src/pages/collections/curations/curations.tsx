import React from "react";
import { useDispatch } from "react-redux";
import CurationsListTile from "../../../components/pages/curations/curationsListTile";
import CurationsListTitle from "../../../components/pages/curations/curationsListTitle";
import SecondaryButton from "../../../components/shared/secondaryButton/secondaryButton";
import ListLayout from "../../../layouts/listLayout/listLayout";
import { openCurationsModal } from "../../../redux/slices/modalSlice/modalSlice";
import { ReactComponent as AddIcon } from "./svgs/add.svg";

function Curations() {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(openCurationsModal());
  };

  return (
    <div>
      <div className="">
        <SecondaryButton
          Icon={AddIcon}
          text="Add a Curation"
          onClick={onClick}
        />
      </div>
      <ListLayout>
        <CurationsListTitle />
        <CurationsListTile />
      </ListLayout>
    </div>
  );
}

export default Curations;
