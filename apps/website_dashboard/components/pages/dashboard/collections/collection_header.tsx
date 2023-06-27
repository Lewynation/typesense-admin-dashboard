import React from "react";
import { Icons, ShadCnButton } from "ui";

const CollectionHeader = () => {
  return (
    <div className="flex justify-between mt-2">
      <div></div>
      <ShadCnButton.Button className="">
        <div className="flex items-center">
          <Icons.Plus />
          <p className="font-oswald">Create Collection</p>
        </div>
      </ShadCnButton.Button>
    </div>
  );
};

export default CollectionHeader;
