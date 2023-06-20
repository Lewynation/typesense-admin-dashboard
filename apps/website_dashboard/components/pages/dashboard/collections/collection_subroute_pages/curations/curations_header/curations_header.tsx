import React from "react";
import { Icons, ShadCnButton } from "ui";

const CurationsHeader = () => {
  return (
    <div className="mt-2 flex justify-between">
      <div></div>
      <ShadCnButton.Button className="">
        <div className="flex items-center">
          <Icons.Plus />
          <p className="font-oswald">Create curation</p>
        </div>
      </ShadCnButton.Button>
    </div>
  );
};

export default CurationsHeader;
