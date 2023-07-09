import Link from "next/link";
import React from "react";
import { Icons, ShadCnButton } from "ui";

const CollectionHeader = () => {
  return (
    <div className="flex justify-between mt-2">
      <div></div>
      <Link href="collections/create-collection">
        <ShadCnButton.Button className="">
          <div className="flex items-center">
            <Icons.Plus />
            <p className="font-oswald">Create Collection</p>
          </div>
        </ShadCnButton.Button>
      </Link>
    </div>
  );
};

export default CollectionHeader;
