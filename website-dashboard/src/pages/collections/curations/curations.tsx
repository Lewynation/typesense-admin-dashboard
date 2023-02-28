import React from "react";
import CurationsListTile from "../../../components/pages/curations/curationsListTile";
import CurationsListTitle from "../../../components/pages/curations/curationsListTitle";
import ListLayout from "../../../layouts/listLayout/listLayout";
import { ReactComponent as AddIcon } from "./svgs/add.svg";

function Curations() {
  return (
    <div>
      <div className="">
        <button
          type="button"
          className="bg-[#f1f0fe] font-lato text-base px-3 py-2 rounded-md font-bold flex gap-3 flex-row justify-start items-center"
        >
          <AddIcon />

          <p>Add a Curation</p>
        </button>
      </div>
      <ListLayout>
        <CurationsListTitle />
        <CurationsListTile />
      </ListLayout>
    </div>
  );
}

export default Curations;
